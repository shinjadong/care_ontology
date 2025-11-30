/**
 * CareOn POS - 메인 서버
 * 소상공인 디지털 트윈 OS의 결제 파이프라인
 */

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// 모듈 임포트
const CareOnDB = require('./db/sqlite');
const NicePayAdapter = require('./adapters/nicepay');
const paymentRoutes = require('./routes/payment');
const webhookRoutes = require('./routes/webhook');

// 환경변수
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || './data/careon.db';

// Express 앱 초기화
const app = express();

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// CORS 설정 (개발용)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 데이터베이스 초기화
const db = new CareOnDB(DB_PATH);

// 나이스페이 어댑터 초기화
const nicepay = new NicePayAdapter({
  mid: process.env.NICEPAY_MID || 'nicepay00m',
  merchantKey: process.env.NICEPAY_MERCHANT_KEY ||
    'EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==',
  returnURL: `${process.env.WEBHOOK_BASE_URL || 'http://localhost:' + PORT}/api/payment/approve`
});

// ==================== 라우트 설정 ====================

// API 라우트
app.use('/api/payment', paymentRoutes(nicepay, db));
app.use('/webhook', webhookRoutes(db));

// 메인 페이지 (POS 화면)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API 상태 확인
app.get('/api/status', (req, res) => {
  const stats = db.getTodayStats();
  res.json({
    status: 'running',
    service: 'CareOn POS',
    version: '0.1.0',
    nicepay: {
      mid: nicepay.mid,
      mode: nicepay.mid === 'nicepay00m' ? 'TEST' : 'PRODUCTION'
    },
    today: stats,
    timestamp: new Date().toISOString()
  });
});

// 이벤트 로그 조회 (디지털 트윈 데이터)
app.get('/api/events', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const events = db.getEventLog(limit);
  res.json({ success: true, events });
});

// ==================== 결제창 콜백 (HTML 응답) ====================

// 나이스페이 결제창에서 인증 완료 후 리다이렉트되는 페이지
app.post('/payment/result', async (req, res) => {
  const authResult = req.body;

  console.log('[Payment Result] 인증 결과 수신:', authResult.AuthResultCode);

  // 인증 실패
  if (authResult.AuthResultCode !== '0000') {
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>결제 실패</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f5f5f5; }
          .container { text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          h1 { color: #e74c3c; }
          button { margin-top: 20px; padding: 12px 24px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>결제 실패</h1>
          <p>${authResult.AuthResultMsg || '인증에 실패했습니다.'}</p>
          <p>오류 코드: ${authResult.AuthResultCode}</p>
          <button onclick="window.close(); window.opener && window.opener.paymentFailed && window.opener.paymentFailed();">닫기</button>
        </div>
      </body>
      </html>
    `);
  }

  // 승인 요청
  try {
    const approvalResult = await nicepay.requestApproval(authResult);

    if (approvalResult.success) {
      db.completeTransaction(authResult.Moid, approvalResult);
      db.completeOrder(authResult.Moid);

      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>결제 완료</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f5f5f5; }
            .container { text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #27ae60; }
            .info { margin: 20px 0; text-align: left; background: #f8f9fa; padding: 20px; border-radius: 8px; }
            .info p { margin: 8px 0; }
            .amount { font-size: 24px; font-weight: bold; color: #2c3e50; }
            button { margin-top: 20px; padding: 12px 24px; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>결제 완료</h1>
            <div class="info">
              <p class="amount">${parseInt(approvalResult.Amt).toLocaleString()}원</p>
              <p>카드: ${approvalResult.CardName || '-'}</p>
              <p>승인번호: ${approvalResult.AuthCode || '-'}</p>
              <p>거래번호: ${approvalResult.TID}</p>
            </div>
            <button onclick="window.close(); window.opener && window.opener.paymentSuccess && window.opener.paymentSuccess(${JSON.stringify(approvalResult)});">확인</button>
          </div>
          <script>
            // 부모 창에 결과 전달
            if (window.opener && window.opener.paymentSuccess) {
              window.opener.paymentSuccess(${JSON.stringify(approvalResult)});
            }
          </script>
        </body>
        </html>
      `);
    } else {
      throw new Error(approvalResult.ResultMsg || '승인 실패');
    }
  } catch (error) {
    db.failTransaction(authResult.Moid, { code: 'ERROR', message: error.message });

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>결제 실패</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f5f5f5; }
          .container { text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          h1 { color: #e74c3c; }
          button { margin-top: 20px; padding: 12px 24px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>결제 실패</h1>
          <p>${error.message}</p>
          <button onclick="window.close();">닫기</button>
        </div>
      </body>
      </html>
    `);
  }
});

// ==================== 서버 시작 ====================

app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('   CareOn POS - 디지털 트윈 OS');
  console.log('========================================');
  console.log(`서버 실행 중: http://localhost:${PORT}`);
  console.log(`나이스페이 MID: ${nicepay.mid}`);
  console.log(`모드: ${nicepay.mid === 'nicepay00m' ? '테스트' : '운영'}`);
  console.log('----------------------------------------');
  console.log('POS 화면:     http://localhost:' + PORT);
  console.log('API 상태:     http://localhost:' + PORT + '/api/status');
  console.log('Webhook URL:  http://localhost:' + PORT + '/webhook/nicepay');
  console.log('========================================\n');
});

// 종료 처리
process.on('SIGINT', () => {
  console.log('\n서버 종료 중...');
  db.close();
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('예기치 않은 오류:', error);
});
