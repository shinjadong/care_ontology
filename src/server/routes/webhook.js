/**
 * CareOn POS - Webhook 라우트
 * 나이스페이에서 결제 결과 통보 수신
 */

const express = require('express');
const router = express.Router();

module.exports = function(db) {

  /**
   * POST /webhook/nicepay
   * 나이스페이 결제 통보 수신
   *
   * 나이스페이에서 결제 완료 시 자동으로 호출됨
   * (가맹점 관리자에서 통보 URL 설정 필요)
   */
  router.post('/nicepay', (req, res) => {
    try {
      const notification = req.body;

      console.log('========================================');
      console.log('[Webhook] 나이스페이 결제 통보 수신');
      console.log('========================================');
      console.log('TID:', notification.TID);
      console.log('주문번호:', notification.MOID);
      console.log('금액:', notification.Amt);
      console.log('결과코드:', notification.ResultCode);
      console.log('결과메시지:', notification.ResultMsg);
      console.log('결제수단:', notification.PayMethod);
      console.log('카드사:', notification.CardName);
      console.log('승인번호:', notification.AuthCode);
      console.log('========================================');

      // 결제 상태에 따른 처리
      const resultCode = notification.ResultCode;
      const stateCd = notification.StateCd;

      if (resultCode === '0000' || resultCode === '3001') {
        // 결제 성공
        console.log('[Webhook] 결제 성공 처리');
        db.completeTransaction(notification.MOID, {
          TID: notification.TID,
          AuthCode: notification.AuthCode,
          AuthDate: notification.AuthDate,
          CardName: notification.CardName,
          CardNo: notification.CardNo,
          ResultCode: notification.ResultCode,
          ResultMsg: notification.ResultMsg
        });

      } else if (resultCode === '4110') {
        // 가상계좌 입금 완료
        console.log('[Webhook] 가상계좌 입금 완료');
        db.completeTransaction(notification.MOID, notification);

      } else if (stateCd === '1' || stateCd === '2') {
        // 취소 통보
        console.log('[Webhook] 결제 취소 통보');
        db.logEvent('PAYMENT_CANCELLED', 'transaction', notification.TID, notification);

      } else {
        // 결제 실패
        console.log('[Webhook] 결제 실패:', notification.ResultMsg);
        db.failTransaction(notification.MOID, {
          code: notification.ResultCode,
          message: notification.ResultMsg
        });
      }

      // 이벤트 로그 저장
      db.logEvent('WEBHOOK_RECEIVED', 'nicepay', notification.TID, notification);

      // 나이스페이에 OK 응답 (필수!)
      // "OK"를 받아야 재전송하지 않음
      res.send('OK');

    } catch (error) {
      console.error('[Webhook] 처리 실패:', error);

      // 에러 발생 시에도 OK 응답 (무한 재시도 방지)
      db.logEvent('WEBHOOK_ERROR', 'nicepay', 'unknown', { error: error.message });
      res.send('OK');
    }
  });

  /**
   * GET /webhook/test
   * Webhook 테스트 엔드포인트
   */
  router.get('/test', (req, res) => {
    res.json({
      success: true,
      message: 'Webhook 엔드포인트가 정상 작동 중입니다.',
      timestamp: new Date().toISOString()
    });
  });

  /**
   * POST /webhook/simulate
   * 결제 통보 시뮬레이션 (테스트용)
   */
  router.post('/simulate', (req, res) => {
    const mockNotification = {
      TID: `TEST_${Date.now()}`,
      MOID: req.body.orderId || `ORD_${Date.now()}`,
      Amt: req.body.amount || '10000',
      ResultCode: '0000',
      ResultMsg: '성공',
      PayMethod: 'CARD',
      CardName: '테스트카드',
      CardNo: '1234****5678',
      AuthCode: '123456',
      AuthDate: new Date().toISOString()
    };

    console.log('[Webhook] 시뮬레이션 결제 통보:', mockNotification);

    db.completeTransaction(mockNotification.MOID, mockNotification);
    db.logEvent('WEBHOOK_SIMULATED', 'nicepay', mockNotification.TID, mockNotification);

    res.json({
      success: true,
      message: '시뮬레이션 결제 통보가 처리되었습니다.',
      notification: mockNotification
    });
  });

  return router;
};
