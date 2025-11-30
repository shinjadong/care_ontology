/**
 * CareOn POS - 결제 라우트
 * 나이스페이 결제 처리 엔드포인트
 */

const express = require('express');
const router = express.Router();

module.exports = function(nicepay, db) {

  /**
   * POST /api/payment/request
   * 결제 요청 (결제창 파라미터 생성)
   */
  router.post('/request', (req, res) => {
    try {
      const { amount, goodsName, buyerName, buyerTel } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: '결제 금액이 올바르지 않습니다.'
        });
      }

      // 주문 생성
      const { orderId, orderNumber } = db.createOrder(
        [{ name: goodsName || '상품', price: amount, qty: 1 }],
        amount
      );

      // 결제 파라미터 생성
      const paymentParams = nicepay.createPaymentParams({
        orderId,
        amount: parseInt(amount),
        goodsName: goodsName || `주문 #${orderNumber}`,
        buyerName: buyerName || '고객',
        buyerTel: buyerTel || ''
      });

      console.log('[Payment] 결제 요청 생성:', orderId, amount);

      res.json({
        success: true,
        orderId,
        orderNumber,
        paymentParams
      });

    } catch (error) {
      console.error('[Payment] 결제 요청 실패:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  /**
   * POST /api/payment/approve
   * 결제 승인 (인증 완료 후 호출)
   */
  router.post('/approve', async (req, res) => {
    try {
      const authResult = req.body;

      console.log('[Payment] 인증 결과 수신:', {
        AuthResultCode: authResult.AuthResultCode,
        Moid: authResult.Moid,
        Amt: authResult.Amt
      });

      // 인증 실패 체크
      if (authResult.AuthResultCode !== '0000') {
        db.failTransaction(authResult.Moid, {
          code: authResult.AuthResultCode,
          message: authResult.AuthResultMsg
        });

        return res.status(400).json({
          success: false,
          code: authResult.AuthResultCode,
          message: authResult.AuthResultMsg
        });
      }

      // 승인 요청
      const approvalResult = await nicepay.requestApproval(authResult);

      if (approvalResult.success) {
        // DB 업데이트
        db.completeTransaction(authResult.Moid, approvalResult);
        db.completeOrder(authResult.Moid);

        console.log('[Payment] 결제 성공:', approvalResult.TID);

        res.json({
          success: true,
          tid: approvalResult.TID,
          authCode: approvalResult.AuthCode,
          cardName: approvalResult.CardName,
          amount: approvalResult.Amt,
          message: '결제가 완료되었습니다.'
        });
      } else {
        db.failTransaction(authResult.Moid, {
          code: approvalResult.ResultCode,
          message: approvalResult.ResultMsg
        });

        res.status(400).json({
          success: false,
          code: approvalResult.ResultCode,
          message: approvalResult.ResultMsg
        });
      }

    } catch (error) {
      console.error('[Payment] 승인 처리 실패:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  /**
   * POST /api/payment/cancel
   * 결제 취소
   */
  router.post('/cancel', async (req, res) => {
    try {
      const { tid, cancelAmt, cancelMsg } = req.body;

      if (!tid || !cancelAmt) {
        return res.status(400).json({
          success: false,
          message: 'TID와 취소금액이 필요합니다.'
        });
      }

      const cancelResult = await nicepay.requestCancel(
        tid,
        parseInt(cancelAmt),
        cancelMsg
      );

      if (cancelResult.success || cancelResult.ResultCode === '2001') {
        console.log('[Payment] 취소 성공:', tid);

        res.json({
          success: true,
          message: '취소가 완료되었습니다.',
          ...cancelResult
        });
      } else {
        res.status(400).json({
          success: false,
          code: cancelResult.ResultCode,
          message: cancelResult.ResultMsg
        });
      }

    } catch (error) {
      console.error('[Payment] 취소 실패:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  /**
   * GET /api/payment/stats
   * 오늘 매출 통계
   */
  router.get('/stats', (req, res) => {
    try {
      const stats = db.getTodayStats();
      const hourly = db.getHourlySales();

      res.json({
        success: true,
        today: stats,
        hourly
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  /**
   * GET /api/payment/transactions
   * 최근 거래 목록
   */
  router.get('/transactions', (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 20;
      const transactions = db.getRecentTransactions(limit);

      res.json({
        success: true,
        transactions
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });

  return router;
};
