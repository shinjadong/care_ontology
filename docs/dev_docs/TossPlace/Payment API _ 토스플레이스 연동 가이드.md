---
title: "Payment API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/payment.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Payment API

Toss POS의 결제 정보를 관리하는 API입니다. 다양한 결제 수단을 지원하며, 각각의 결제 유형에 따라 다른 정보를 처리합니다.

## 결제 유형

- **CARD**: 카드 결제 정보
- **CASH**: 현금 결제 정보
- **EXTERNAL**: 외부 결제 정보
	- 플러그인 내부에서 결제하는 경우 사용
	- CARD, CASH 타입의 결제 취소는 Toss POS를 통해 처리

## Types

### PluginPaymentDto

결제 생성을 위한 데이터 전송 객체(DTO)입니다. Toss POS에서만 결제를 생성할 수 있습니다.

```ts
ts{

    /** 결제수단 */

    sourceType: 'CARD';

    orderId: string;

    /** 지불액 */

    amountMoney: number;

    /** 부가가치세 */

    taxMoney: number;

    /** 승인번호 */

    approvedNo: string;

    /** 승인일시 */

    approvedAt: string;

    /** 플러그인에서 발행시킨 payment의 unique한 값 중복되지 않도록 주의해주세요 */

    paymentKey: string;

    /** 공급가액 */

    supplyMoney: number;

    /** 봉사료 */

    tipMoney: number;

    /** 면세 금액. 값을 지정하지 않으면 기본으로 0원이 지정됨 */

    taxExemptMoney?: number;

    /**

     * 완료처리여부

     * default: true

     * 테이블 주문인 경우 결제가 완료되면 주문이 완료처리되어 테이블이 자동으로 비워집니다

     * false로 설정하면 결제가 완료되어도 테이블은 비워지지 않습니다

     */

    autocomplete?: boolean;

    cardDetails: {

        /** 할부개월 수 */

        installmentMonth: PluginPaymentInstallment;

        cardType: 'CREDIT' | 'DEBIT' | 'PREPAID' | 'FOREIGN';

        /** 발급사명 */

        cardBrand: string;

        /** 발급사 코드 */

        cardBrandId?: string;

        /** 카드번호 */

        cardNo: string;

        /** 매입사명 */

        source?: string;

        /** 매입사 코드 */

        sourceId?: string;

        /** 선불카드일 때 잔액 */

        balance?: number;

        /** VAN사 */

        van?: VanType;

    };

}
```
```ts
ts{

    /** 결제수단 */

    sourceType: 'CASH';

    orderId: string;

    /** 지불액 */

    amountMoney: number;

    /** 부가가치세 */

    taxMoney: number;

    /** 승인번호 */

    approvedNo: string;

    /** 승인일시 */

    approvedAt: string;

    /** 플러그인에서 발행시킨 payment의 unique한 값 중복되지 않도록 주의해주세요 */

    paymentKey: string;

    /** 공급가액 */

    supplyMoney: number;

    /** 봉사료 */

    tipMoney: number;

    /** 면세 금액. 값을 지정하지 않으면 기본으로 0원이 지정됨 */

    taxExemptMoney?: number;

    /**

     * 완료처리여부

     * default: true

     * 테이블 주문인 경우 결제가 완료되면 주문이 완료처리되어 테이블이 자동으로 비워집니다

     * false로 설정하면 결제가 완료되어도 테이블은 비워지지 않습니다

     */

    autocomplete?: boolean;

    /** 현금영수증 정보 */

    cashReceipt?: {

        /** 현금영수증 식별번호 */

        identityNumber: string;

        /**

         * 현금영수증 발급 유형

         * CONSUMER: 개인

         * BUSINESSES: 사업자

         */

        issuerType: 'CONSUMER' | 'BUSINESSES';

        /**

         * PHONE: 휴대폰번호

         * BUSINESS_NUMBER: 사업자번호

         * CARD: 현금영수증 카드

         */

        issuanceType: 'PHONE' | 'BUSINESS_NUMBER' | 'CARD';

        /** 자진 발급 여부 */

        selfIssuance: boolean;

    };

}
```

### PluginPayment

POS에서 생성된 결제 정보를 나타내는 객체입니다.

```ts
ts{

  /** 결제수단 */

  sourceType: 'CARD';

  id: string;

  orderId: string;

  /** 결제상태 */

  state: 'APPROVED' | 'COMPLETED' | 'CANCELLED';

  /** 지불액 */

  amountMoney: number;

  /** 부가가치세 */

  taxMoney: number;

  /** 공급가액 */

  supplyMoney: number;

  /** 봉사료 */

  tipMoney: number;

  /** 면세 금액. 값을 지정하지 않으면 기본으로 0원이 지정됨 */

  taxExemptMoney?: number;

  /** 승인번호 */

  approvedNo: string;

  /** 승인일시 */

  approvedAt: string;

  /** 취소거래인 경우에만 값 존재 */

  cancelledAt?: string;

  /** 플러그인에서 발행시킨 payment의 unique한 값 중복되지 않도록 주의해주세요 */

  paymentKey: string;

  /**

   * 완료처리여부

   * default: true

   * 테이블 주문인 경우 결제가 완료되면 주문이 완료처리되어 테이블이 자동으로 비워집니다

   * false로 설정하면 결제가 완료되어도 테이블은 비워지지 않습니다

   */

  autocomplete?: boolean;

  cardDetails: {

    /** 할부개월 수 */

    installmentMonth: PluginPaymentInstallment;

    cardType: 'CREDIT' | 'DEBIT' | 'PREPAID' | 'FOREIGN';

    /** 발급사명 */

    cardBrand: string;

    /** 발급사 코드 */

    cardBrandId?: string;

    /** 카드번호 */

    cardNo: string;

    /** 매입사명 */

    source?: string;

    /** 매입사 코드 */

    sourceId?: string;

    /** 선불카드일 때 잔액 */

    balance?: number;

    /** VAN사 */

    van?: VanType;

  };

}
```
```ts
ts{

  /** 결제수단 */

  sourceType: 'CARD';

  id: string;

  orderId: string;

  /** 결제상태 */

  state: 'APPROVED' | 'COMPLETED' | 'CANCELLED';

  /** 지불액 */

  amountMoney: number;

  /** 부가가치세 */

  taxMoney: number;

  /** 공급가액 */

  supplyMoney: number;

  /** 봉사료 */

  tipMoney: number;

  /** 면세 금액. 값을 지정하지 않으면 기본으로 0원이 지정됨 */

  taxExemptMoney?: number;

  /** 승인번호 */

  approvedNo: string;

  /** 승인일시 */

  approvedAt: string;

  /** 취소거래인 경우에만 값 존재 */

  cancelledAt?: string;

  /** 플러그인에서 발행시킨 payment의 unique한 값 중복되지 않도록 주의해주세요 */

  paymentKey: string;

  /**

   * 완료처리여부

   * default: true

   * 테이블 주문인 경우 결제가 완료되면 주문이 완료처리되어 테이블이 자동으로 비워집니다

   * false로 설정하면 결제가 완료되어도 테이블은 비워지지 않습니다

   */

  autocomplete?: boolean;

}
```
```ts
ts{

  /** 결제수단 */

  sourceType: 'EXTERNAL';

  id: string;

  orderId: string;

  /** 결제상태 */

  state: 'APPROVED' | 'COMPLETED' | 'CANCELLED';

  /** 지불액 */

  amountMoney: number;

  /** 부가가치세 */

  taxMoney: number;

  /** 공급가액 */

  supplyMoney: number;

  /** 봉사료 */

  tipMoney: number;

  /** 면세 금액. 값을 지정하지 않으면 기본으로 0원이 지정됨 */

  taxExemptMoney?: number;

  /** 승인번호 */

  approvedNo: string;

  /**

   * 승인일시

   */

  approvedAt: string;

  /** 취소거래인 경우에만 값 존재 */

  cancelledAt?: string;

  /** 플러그인에서 발행시킨 payment의 unique한 값 중복되지 않도록 주의해주세요 */

  paymentKey: string;

  /**

   * 완료처리여부

   * default: true

   * 테이블 주문인 경우 결제가 완료되면 주문이 완료처리되어 테이블이 자동으로 비워집니다

   * false로 설정하면 결제가 완료되어도 테이블은 비워지지 않습니다

   */

  autocomplete?: boolean;

  externalDetails: {

    /** 결제가 발생 된 플러그인 or 기타결제 원천 (ex ZERO PAY...) */

    source?: string;

    /** 결제수단 */

    sourceId?: string;

  };

}
```

## Methods

### add

주문에 결제 정보를 추가합니다. 결제가 완료된 후 실행합니다.

### cancel

주문의 결제를 취소합니다.

### on

결제 상태 변경 이벤트를 수신하기 위한 핸들러를 등록합니다.

#### paid

- 결제가되었을 때 실행됩니다.
- order의 결제가 완료되었을때 발생되는 것이 아닌 order에 결제가 발생할때 마다 발생합니다
	- 한 주문을 3번에 나누어 분할결제했다면 paid가 3번 발생합니다
- order.paymentPrice.paymentUnpaidValue가 0원이라면 전체 결제가 완료된 건입니다.

#### cancel

- 결제가 취소되었을 때 실행됩니다.
- order가 취소되었을때 발생되는 것이 아닌 결제가 취소가 되었을 때 발생합니다
	- 한 주문을 3번에 나누어 분할결제했고 3건을 모두 취소한다면 cancel 이벤트가 3번 발생합니다
- order.paymentPrice.paymentPaidValue가 0원이라면 전체 취소가 완료된 건입니다.