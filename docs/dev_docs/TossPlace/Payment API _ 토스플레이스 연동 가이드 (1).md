---
title: "Payment API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/open-api/payment.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Payment API

매장의 결제 정보를 조회하는 API입니다. 결제 내역과 결제 수단별 세부 정보를 확인할 수 있습니다.

## Types

### 결제 (Payment)

결제 금액과 내역, 결제 수단별 세부 데이터를 포함하는 개념입니다.

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `id` | `String` | ✅ | 결제 ID | `"640000000000000000"` |
| `merchantId` | `Long` | ✅ | 매장 ID | `42` |
| `orderId` | `String` | ✅ | 주문 ID | `"620000000000000000"` |
| `state` | `PaymentState` | ✅ | 결제 상태 | `"COMPLETED"` |
| `sourceType` | `PaymentSourceType` | ✅ | 결제수단 대분류 | `"CARD"` |
| `paymentMethod` | `String` | ✅ | 결제수단 세부 분류 | `"CARD_NFC"` |
| `van` | `String` |  | VAN | `"NICE"` |
| `amount` | `Long` | ✅ | 결제금액 | `3200` |
| `taxAmount` | `Long` | ✅ | 세액 | `291` |
| `supplyAmount` | `Long` | ✅ | 공급가액 | `2909` |
| `taxExemptAmount` | `Long` | ✅ | 면세금액 | `0` |
| `tipAmount` | `Long` | ✅ | 봉사료 | `0` |
| `approvedNo` | `String` | ✅ | 승인번호 | `"00000000"` |
| `approvedAt` | `timestamp` |  | 승인 시각 | `"2025-09-01T00:00:00"` |
| `cancelledAt` | `timestamp` |  | 취소 시각 | `"2025-09-01T00:00:00"` |
| `cashDetails` | `PaymentCashDetails` |  | 현금결제 세부 내역 |  |
| `cardDetails` | `PaymentCardDetails` |  | 카드결제 세부 내역 |  |
| `accountTransferDetails` | `PaymentAccountTransferDetails` |  | 계좌이체 세부 내역 |  |
| `easyPayDetails` | `PaymentEasyPayDetails` |  | 간편결제 세부 내역 |  |
| `externalDetails` | `PaymentExternalDetails` |  | 외부 결제수단 세부 내역 |  |
| `cashReceipt` | `PaymentCashReceipt` |  | 현금영수증 세부 내역 |  |
| `createdAt` | `timestamp` | ✅ | 생성 시각 | `"2025-09-01T00:00:00"` |
| `updatedAt` | `timestamp` | ✅ | 변경 시각 | `"2025-09-01T00:00:00"` |

### 결제 상태 (PaymentState)

| Value | Description |
| --- | --- |
| `"APPROVED"` | 승인됨 |
| `"CANCELLED"` | 취소됨 |
| `"UNDEFINED"` |  |

### 결제 수단 분류 (PaymentSourceType)

| Value | Description |
| --- | --- |
| `"CASH"` | 현금 |
| `"CARD"` | 카드 |
| `"ACCOUNT_TRANSFER"` | 계좌이체 |
| `"BARCODE"` | 간편결제 |
| `"EXTERNAL"` | 외부 결제수단 |
| `"UNDEFINED"` |  |

### 현금결제 상세 (PaymentCashDetails)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |

### 카드결제 상세 (PaymentCardDetails)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `cardType` | `CardType` |  | 카드 종류 | `"CREDIT"` |
| `cardBrand` | `String` |  | 발급사명 |  |
| `cardNo` | `String` |  | 카드번호 (마스킹 적용) | `"00000000********"` |
| `cardBrandId` | `String` |  | 발급사 코드 |  |
| `acquirer` | `String` |  | 매입사명 |  |
| `acquirerId` | `String` |  | 매입사 코드 |  |
| `balance` | `Long` |  | 잔액 |  |
| `van` | `String` |  | VAN | `"NICE"` |
| `installmentMonth` | `String` |  | 할부개월 수 | `"00"` |

### 카드 종류 (CardType)

| Value | Description |
| --- | --- |
| `"CREDIT"` | 신용카드 |
| `"DEBIT"` | 직불카드 |
| `"PREPAID"` | 선불카드 |
| `"FOREIGN"` | 해외 카드 사용 |
| `"UNDEFINED"` |  |

### 계좌이제 상세 (PaymentAccountTransferDetails)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |

### 간편결제 상세 (PaymentEasyPayDetails)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `provider` | `String` |  | 간편결제 제공사 | `"토스페이"` |
| `acquirer` | `String` |  | 매입사 | `"토스머니"` |
| `acquirerId` | `String` |  | 매입사 코드 | `"TS"` |
| `payType` | `PaymentEasyPayType` |  | 간편결제에 연결된 결제 수단 종류 | `"ACCOUNT"` |

### 간편결제 결제수단 종류 (PaymentEasyPayType)

| Value | Description |
| --- | --- |
| `"ACCOUNT"` | 계좌 |
| `"CARD"` | 카드 |
| `"UNDEFINED"` |  |

### 외부 결제수단 상세 (PaymentExternalDetails)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `source` | `String` |  | 결제수단명 | `"모바일 상품권"` |

### 현금영수증 상세 (PaymentCashReceipt)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `identityNumber` | `String` | ✅ | 발급 번호 | `"**********"` |
| `issuerType` | `PaymentCashReceiptIssuerType` | ✅ | 발급 종류 | `"CONSUMER"` |
| `issuanceType` | `PaymentCashReceiptIssuanceType` | ✅ | 발급 방법 | `"PHONE"` |
| `selfIssuance` | `Boolean` | ✅ | 자진 발급 여부 | `true` |

### 현금영수증 발급 종류 (PaymentCashReceiptIssuerType)

| Value | Description |
| --- | --- |
| `"CONSUMER"` | 개인 소득공제용 |
| `"BUSINESSES"` | 사업자 지출증빙용 |
| `"UNDEFINED"` |  |

### 현금영수증 발급 방법 (PaymentCashReceiptIssuanceType)

| Value | Description |
| --- | --- |
| `"PHONE"` | 핸드폰 번호 |
| `"BUSINESS_NUMBER"` | 사업자 번호 |
| `"CARD"` | 현금영수증 카드 |
| `"UNDEFINED"` |  |

## Methods

### 결제 단건 조회

| Property | Value |
| --- | --- |
| Method | GET |
| Path | `/api-public/openapi/v1/merchants/{merchantId}/payment/payments/{paymentId}` |
| Response Type | `Payment` |
| Description | 매장의 결제 하나를 조회합니다. |

**요청 파라미터**

| Parameter | Location | Type | Required | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `merchantId` | Path | `Long` | ✅ | \- | 매장 ID |
| `paymentId` | Path | `String` | ✅ | \- | 결제 ID |

### 주문의 결제건 모두 조회

| Property | Value |
| --- | --- |
| Method | GET |
| Path | `/api-public/openapi/v1/merchants/{merchantId}/payment/payments/by-order-id` |
| Response Type | `Payment[]` |
| Description | 주문 하나의 결제 건을 모두 조회합니다. |

**요청 파라미터**

| Parameter | Location | Type | Required | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `merchantId` | Path | `Long` | ✅ | \- | 매장 ID |
| `orderId` | Query | `String` | ✅ | \- | 주문 ID |