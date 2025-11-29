---
title: "Order API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/order.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Order API

주문 데이터를 관리하는 API입니다. 결제 여부와 상관없이 주문을 생성하고 관리할 수 있습니다.

## Types

### PluginOrderDto

주문 생성을 위한 데이터 전송 객체(DTO)입니다. POS에서만 주문을 생성할 수 있습니다.

```ts
ts{

  memo?: string;                    // 주문 메모

  discounts: PluginDiscount[];      // 주문 할인 정보

  tableId?: number;                 // 테이블 번호

  lineItems: Array<{

    diningOption: 'HERE' | 'TOGO' | 'DELIVERY' | 'PICKUP';  // 주문 방식

    item: {

      id: number;                   // 상품 ID

      title: string;

      category: PluginCatalogCategory;  // 카테고리

      code?: string;                    // 플러그인에서 생성하면 토스포스 서버에 저장되어 항상 같이 내려옴

      type: 'ITEM' | 'DELIVERY_FEE' | 'PREPAID_CARD' | 'MULTI_USE_TICKET';  // item 상품, delivery_fee 배달비, prepaid_card 선불권, multi_use_ticket 선불횟수권

    };

    quantity: {

      value: number;                // 주문 수량

    };

    chargePrice: {

      value: number;                // 실제 결제 금액

    };

    optionChoices: { id: number; quantity: number; }[];  // 선택된 옵션, 수량

    discounts?: PluginDiscount[];     // 상품별 할인

    memo?: string;                    // 상품별 메모

  }>;

}
```

| Name | Type | Optional | Description | Example |
| --- | --- | --- | --- | --- |
| memo | string | true | 주문 메모 | '매운맛으로 부탁드립니다' |
| discounts | [PluginDiscount](https://docs.tossplace.com/reference/plugin-sdk/pos/#plugindiscount) \[\] | false | 주문 할인 |  |
| tableId | number | true | 테이블 번호 | 1 |
| lineItems.diningOption | 'HERE' \| 'TOGO' \| 'DELIVERY' \| 'PICKUP' | false | 주문 방식 | 'HERE' |
| lineItems.item.id | number | false | 주문 메뉴 아이디 | 1 |
| lineItems.quantity.value | number | false | 주문 수량 | 1 |
| lineItems.chargePrice.value | number | false | 주문 금액 | 10000 |
| lineItems.optionChoices | { id: number }\[\] | true | 주문 옵션 | \[{ id: 1 }\] |
| lineItems.discounts | [PluginDiscount](https://docs.tossplace.com/reference/plugin-sdk/pos/#plugindiscount) \[\] | true | 주문 할인 |  |
| lineItems.memo | string | true | 주문 메모 | '매운맛으로 부탁드립니다' |

### PluginOrder

주문 정보를 나타내는 객체입니다.

```ts
ts{

    id: string;                       // 주문 ID

    tableId?:  number;                 // 테이블 번호

    table?:  PluginTable;              // 테이블 정보

    orderKey: string;                 // 주문 키

    /**

     * OPENED: 결제 전 (초기 상태)

     * PAID: 부분 결제 (일부 금액만 결제된 상태)

     * CANCELLED: 취소

     * COMPLETED: 결제 완료 (주문 금액이 모두 결제된 경우)

     * REFUNDED: 환불 (모든 결제가 취소된 상태)

     */

    paymentState: 'OPENED' | 'PAID' | 'CANCELLED' | 'COMPLETED' | 'REFUNDED'; // 결제상태

    /**

     * - REQUEST: 주문 접수 (requestedInfo가 있는 주문의 초기 상태)

     * - OPENED: 주문 진행중 (포스 등 일반적인 환경에서 주문의 초기 상태)

     * - COMPLETED: 주문 완료

     * - CANCELLED: 주문 취소

     */

    orderState: 'REQUESTED' | 'OPENED' | 'COMPLETED' | 'CANCELLED'; // 주문상태

    lineItems: PluginOrderItem[];     // 주문 항목

    discounts? : PluginDiscount[];      // 할인 정보

    payments: PluginPayment[];         // 결제 정보

    chargePrice: {                    // 청구 금액 정보

        chargeDiscountValue: number;     // 청구 할인 금액

        chargeListPriceValue: number;    // 청구 원주문 금액

        chargePriceValue: number;        // 청구 금액

        chargeSupplyValue: number;       // 청구 공급 가액

        chargeTaxValue: number;          // 청구 세액

        chargeTipValue: number;          // 청구 봉사료

    };

    paymentPrice: {                   // 결제 금액 정보

        paymentUnpaidValue: number;      // 미납 금액

        paymentPaidValue: number;        // 완납 금액

    };

    requestedInfo?:  {                 // 요청 정보

        requestAt: string;              // 요청 시간

        expiredAt: string;              // 만료 시간

        expectedReadyAt: string;        // 픽업 시간

        estimatedReadyAt? : string;      // 예상 완료 시간

        acceptedAt? : string;            // 접수 시간

        declinedAt? : string;            // 거부 시간

        declinedReason? : string;        // 거부 사유

    };

    source: string;                   // 주문 출처

    numGuests?: number;               // 방문 인원

    memo?:  string;                    // 주문 메모

    openedAt?:  string;                // 주문 시작 시간

    createdAt: string;                // 생성 시간

    updatedAt?:  string;               // 수정 시간

    cancelledAt?:  string;             // 취소 시간

    completedAt?:  string;             // 완료 시간

}
```

| Name | Type | Optional | Description | Example |
| --- | --- | --- | --- | --- |
| id | string | false | 주문 아이디 | '1' |
| tableId | number | true | 테이블 번호 | 1 |
| table | [PluginTable](https://docs.tossplace.com/reference/plugin-sdk/pos/table.html#plugintable) | true | 테이블 정보 |  |
| orderKey | string | false | 주문 키 | '1' |
| state | OPENED: 주문시작, PAID: 분할결제 중, CANCELLED: 주문취소, COMPLETED: 주문완료. 결제까지 완료된 상태, REFUNDED: 환불 | false | 주문 상태 | 'OPENED' |
| lineItems | [PluginOrderItem](https://docs.tossplace.com/reference/plugin-sdk/pos/#pluginorderitem) \[\] | false | 주문된 메뉴 |  |
| discounts | [PluginDiscount](https://docs.tossplace.com/reference/plugin-sdk/pos/#plugindiscount) \[\] | true | 주문 할인 |  |
| payments | [PluginPayment](https://docs.tossplace.com/reference/plugin-sdk/pos/#pluginpayment) \[\] | false | 결제정보 |  |
| chargePrice.chargeDiscountValue | number | false | 청구 할인 금액 | 1000 |
| chargePrice.chargeListPriceValue | number | false | 청구 원주문 금액 | 10000 |
| chargePrice.chargePriceValue | number | false | 청구 금액 | 9000 |
| chargePrice.chargeSupplyValue | number | false | 청구 공급 가액 | 8000 |
| chargePrice.chargeTaxValue | number | false | 청구 세액 | 1000 |
| chargePrice.chargeTipValue | number | false | 청구 봉사료 | 0 |
| paymentPrice.paymentUnpaidValue | number | false | 미납 결제 금액 | 0 |
| paymentPrice.paymentPaidValue | number | false | 완납 결제 금액 | 9000 |
| requestedInfo.requestAt | string | false | 요청 시간 | '2021-01-01T00:00:00' |
| requestedInfo.expiredAt | string | false | 만료 시간 | '2021-01-01T00:00:00' |
| requestedInfo.expectedReadyAt | string | false | 픽업 시간 | '2021-01-01T00:00:00' |
| requestedInfo.estimatedReadyAt | string | true | 예상 완료 시간 | '2021-01-01T00:00:00' |
| requestedInfo.acceptedAt | string | true | 접수 시간 | '2021-01-01T00:00:00' |
| requestedInfo.declinedAt | string | true | 거부 시간 | '2021-01-01T00:00:00' |
| requestedInfo.declinedReason | string | true | 거부 사유 | '재료 소진' |
| source | string | false | 주문 원천 | 'POS' |
| memo | string | true | 주문 메모 | '매운맛으로 부탁드립니다' |
| numGuests | number | true | 방문 인원 | 1 |
| openedAt | string | true | 주문 시작 시간 | '2021-01-01T00:00:00' |
| createdAt | string | false | 주문 생성 시간 | '2021-01-01T00:00:00' |
| updatedAt | string | true | 주문 수정 시간 | '2021-01-01T00:00:00' |
| cancelledAt | string | true | 주문 취소 시간 | '2021-01-01T00:00:00' |
| completedAt | string | true | 주문 완료 시간 | '2021-01-01T00:00:00' |

### PluginDiscount

주문의 할인 정보를 나타내는 객체입니다.

| Name | Type | Optional | Description | Example |
| --- | --- | --- | --- | --- |
| amountMoney.value | number | false | 할인 금액 | 1000 |
| title | string | false | 할인 명칭 | '10% 할인' |
| titleI18n | [PluginLanguagePack](https://docs.tossplace.com/reference/plugin-sdk/pos/languagePack.html) | true | 할인 명칭 다국어 |  |

### PluginOrderItem

주문된 메뉴 정보를 나타내는 객체입니다.

| Name | Type | Optional | Description | Example |
| --- | --- | --- | --- | --- |
| id | string | false | 주문 메뉴 아이디 | '1' |
| orderId | string | false | 주문 아이디 | '1' |
| diningOption | HERE: 매장내, TOGO: 포장, DELIVERY: 배달, PICKUP: 픽업 | false | 주문 방식 | 'HERE' |
| item.id | number | false | 주문 메뉴 아이디 | 1 |
| item.title | string | false | 주문 메뉴 이름 | '아메리카노' |
| item.category | [PluginCatalogCategory](https://docs.tossplace.com/reference/plugin-sdk/pos/catalog.html#plugincatalogcategory) | false | 주문 메뉴 카테고리 |  |
| item.type | ITEM: 상품, DELIVERY\_FEE: 배달료, PREPAID\_CARD: 선불권 | false | 주문 메뉴 타입 | 'ITEM' |
| item.priceValue | number | false | 주문 메뉴 가격 | 10000 |
| quantity.value | number | false | 주문 수량 | 1 |
| chargePrice.value | number | false | 실제 고객이 결제하는 금액에 대한 정보 | 10000 |
| optionChoices | [PluginOrderItemOptionChoice](https://docs.tossplace.com/reference/plugin-sdk/pos/option.html#PluginOrderItemOptionChoice) \[\] | true | 주문된 옵션 |  |
| discounts | [PluginDiscount](https://docs.tossplace.com/reference/plugin-sdk/pos/#plugindiscount) \[\] | true | 적용된 할인 |  |
| memo | string | true | 주문 메모 | '매운맛으로 부탁드립니다' |

## Methods

### getOrder

주문을 조회합니다.

### getOrders

주문목록을 조회합니다. 주문상태(orderStates) 조건을 넣어 조회가 가능합니다. 페이징은 결과의 길이가 size보다 작을때까지 조회하면 완료됩니다

### add

새로운 주문을 생성합니다. 생성된 주문의 ID를 확인할 수 있습니다.

### cancel

주문을 취소합니다.

### addMenu

추가 주문이 발생했을 때 사용합니다. 이전 주문 정보를 포함한 전체 주문 정보를 전달해야 합니다.

### complete

주문을 완료 처리합니다. 사장님에게 주문을 전달하기 위해 사용됩니다.

WARNING

후불 POS에서만 사용 가능합니다.

### on

주문 상태 변경 이벤트를 수신하기 위한 핸들러를 등록합니다.

#### cancel

주문이 취소되었을 때 실행됩니다.