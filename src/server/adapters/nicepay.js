/**
 * CareOn POS - 나이스페이 어댑터
 * 나이스페이 결제 API와의 통신을 담당
 */

const axios = require('axios');
const CryptoJS = require('crypto-js');
const format = require('date-format');

class NicePayAdapter {
  constructor(config) {
    this.mid = config.mid;
    this.merchantKey = config.merchantKey;
    this.returnURL = config.returnURL;

    // API 엔드포인트
    this.endpoints = {
      // 결제창 (테스트)
      paymentPage: 'https://web.nicepay.co.kr/v3/v3Payment.jsp',
      // 승인 API
      approve: 'https://pg-api.nicepay.co.kr/webapi/pay_process.jsp',
      approveBackup: 'https://dc1-api.nicepay.co.kr/webapi/pay_process.jsp',
      // 취소 API
      cancel: 'https://pg-api.nicepay.co.kr/webapi/cancel_process.jsp',
      // 거래 조회
      inquiry: 'https://webapi.nicepay.co.kr/webapi/inquiry/trans_status.jsp'
    };

    console.log('[NicePay] 어댑터 초기화 완료 - MID:', this.mid);
  }

  /**
   * SHA-256 서명 데이터 생성
   */
  generateSignData(...args) {
    const str = args.join('');
    return CryptoJS.SHA256(str).toString();
  }

  /**
   * 현재 시간을 EdiDate 형식으로 반환
   */
  getEdiDate() {
    return format.asString('yyyyMMddhhmmss', new Date());
  }

  /**
   * 결제창 호출을 위한 파라미터 생성
   */
  createPaymentParams(order) {
    const ediDate = this.getEdiDate();
    const moid = order.orderId || `MOID_${ediDate}`;

    const signData = this.generateSignData(
      ediDate,
      this.mid,
      order.amount.toString(),
      this.merchantKey
    );

    return {
      // 필수 파라미터
      PayMethod: order.payMethod || 'CARD',
      GoodsName: order.goodsName || '케어온 주문',
      Amt: order.amount.toString(),
      MID: this.mid,
      Moid: moid,
      BuyerName: order.buyerName || '고객',
      BuyerEmail: order.buyerEmail || '',
      BuyerTel: order.buyerTel || '',
      ReturnURL: this.returnURL,
      EdiDate: ediDate,
      SignData: signData,
      CharSet: 'utf-8',

      // 선택 파라미터
      GoodsCl: '1', // 실물(1), 디지털(0)

      // 결제창 설정
      NpLang: 'KO',
      NpLogoYN: 'Y',
      ConfirmMail: 'N',
    };
  }

  /**
   * 결제 승인 요청
   * - 결제창 인증 완료 후 호출
   */
  async requestApproval(authResult) {
    const ediDate = this.getEdiDate();

    const signData = this.generateSignData(
      authResult.AuthToken,
      authResult.MID,
      authResult.Amt,
      ediDate,
      this.merchantKey
    );

    const requestData = {
      TID: authResult.TxTid,
      AuthToken: authResult.AuthToken,
      MID: authResult.MID,
      Amt: authResult.Amt,
      EdiDate: ediDate,
      SignData: signData,
      CharSet: 'utf-8'
    };

    try {
      const response = await axios({
        url: authResult.NextAppURL || this.endpoints.approve,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        data: new URLSearchParams(requestData).toString(),
        timeout: 30000 // 30초 타임아웃
      });

      console.log('[NicePay] 승인 응답:', response.data);
      return this.parseResponse(response.data);
    } catch (error) {
      console.error('[NicePay] 승인 요청 실패:', error.message);

      // 망취소 시도
      if (authResult.NetCancelURL) {
        return this.requestNetCancel(authResult, ediDate, signData);
      }

      throw error;
    }
  }

  /**
   * 망취소 요청
   * - 승인 API 응답이 없을 경우 호출
   */
  async requestNetCancel(authResult, ediDate, signData) {
    console.log('[NicePay] 망취소 요청 시작');

    try {
      const response = await axios({
        url: authResult.NetCancelURL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        data: new URLSearchParams({
          TID: authResult.TxTid,
          AuthToken: authResult.AuthToken,
          MID: authResult.MID,
          Amt: authResult.Amt,
          EdiDate: ediDate,
          SignData: signData,
          NetCancel: '1',
          CharSet: 'utf-8'
        }).toString(),
        timeout: 30000
      });

      console.log('[NicePay] 망취소 응답:', response.data);
      return {
        success: false,
        netCancelled: true,
        ...this.parseResponse(response.data)
      };
    } catch (error) {
      console.error('[NicePay] 망취소 실패:', error.message);
      throw new Error('결제 승인 및 망취소 모두 실패');
    }
  }

  /**
   * 결제 취소 요청
   */
  async requestCancel(tid, cancelAmt, cancelMsg = '고객 요청') {
    const ediDate = this.getEdiDate();

    const signData = this.generateSignData(
      this.mid,
      cancelAmt.toString(),
      ediDate,
      this.merchantKey
    );

    try {
      const response = await axios({
        url: this.endpoints.cancel,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        data: new URLSearchParams({
          TID: tid,
          MID: this.mid,
          CancelAmt: cancelAmt.toString(),
          CancelMsg: cancelMsg,
          EdiDate: ediDate,
          SignData: signData,
          CharSet: 'utf-8'
        }).toString(),
        timeout: 30000
      });

      console.log('[NicePay] 취소 응답:', response.data);
      return this.parseResponse(response.data);
    } catch (error) {
      console.error('[NicePay] 취소 요청 실패:', error.message);
      throw error;
    }
  }

  /**
   * 거래 상태 조회
   */
  async inquireTransaction(tid) {
    const ediDate = this.getEdiDate();

    const signData = this.generateSignData(
      tid,
      this.mid,
      ediDate,
      this.merchantKey
    );

    try {
      const response = await axios({
        url: this.endpoints.inquiry,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        data: new URLSearchParams({
          TID: tid,
          MID: this.mid,
          EdiDate: ediDate,
          SignData: signData,
          CharSet: 'utf-8'
        }).toString(),
        timeout: 30000
      });

      return this.parseResponse(response.data);
    } catch (error) {
      console.error('[NicePay] 조회 실패:', error.message);
      throw error;
    }
  }

  /**
   * 응답 데이터 파싱
   */
  parseResponse(data) {
    // 응답이 문자열인 경우 (key=value 형식)
    if (typeof data === 'string') {
      const parsed = {};
      data.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        parsed[key] = decodeURIComponent(value || '');
      });
      data = parsed;
    }

    return {
      success: data.ResultCode === '0000' || data.ResultCode === '3001',
      ...data
    };
  }

  /**
   * 결제 결과 검증 (위변조 방지)
   */
  verifySignature(data, receivedSignature) {
    const calculatedSignature = this.generateSignData(
      data.AuthToken || data.TID,
      data.MID,
      data.Amt,
      this.merchantKey
    );

    return calculatedSignature === receivedSignature;
  }
}

module.exports = NicePayAdapter;
