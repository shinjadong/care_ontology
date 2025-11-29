---
title: "Order API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/open-api/order.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Order API

매장의 주문 정보를 조회하는 API입니다. 주문 내역, 상품 정보, 할인 내역 등 주문과 관련된 모든 정보를 확인할 수 있습니다.

## Types

### 주문 (Order)

주문은 매장에서 소비자가 상품을 구매하고 결제하는 것을 표현하는 개념입니다. 주문은 구매한 상품 목록, 결제 내역, 결제 금액 등 이 과정에서 기록되는 정보를 모두 포함하고 있습니다.

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `id` | `String` | ✅ | 주문 ID | `"620000000000000000"` |
| `merchantId` | `Long` | ✅ | 매장 ID | `42` |
| `source` | `String` | ✅ | 주문이 인입된 경로 | `"POS"` |
| `orderState` | `OrderState` | ✅ | 주문 상태 | `"OPENED"` |
| `createdAt` | `timestamp` | ✅ | 생성 시각 | `"2025-09-01T00:00:00"` |
| `updatedAt` | `timestamp` | ✅ | 변경 시각 | `"2025-09-01T00:00:00"` |
| `openedAt` | `timestamp` |  | 주문 수락 시각 | `"2025-09-01T00:00:00"` |
| `completedAt` | `timestamp` |  | 주문 완료 시각 | `"2025-09-01T00:00:00"` |
| `cancelledAt` | `timestamp` |  | 주문 취소 시각 | `"2025-09-01T00:00:00"` |
| `lineItems` | `OrderLineItem[]` | ✅ | 주문 항목 |  |
| `payments` | `Payment[]` | ✅ | 결제 내역 |  |
| `discounts` | `Discount[]` | ✅ | 할인 내역 |  |
| `chargePrice` | `OrderChargePrice` | ✅ | 청구 금액 |  |

### 주문 상태 (OrderState)

| Value | Description |
| --- | --- |
| `"REQUESTED"` | 주문 수락 전 (픽업 주문 등의 경우) |
| `"OPENED"` | 시작됨 |
| `"COMPLETED"` | 완료됨 (결제까지 완료된 상태) |
| `"CANCELLED"` | 취소됨 |
| `"UNDEFINED"` |  |

### 주문 내역 (OrderLineItem)

주문에 포함된 개별 상품 주문 건입니다.

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `diningOption` | `OrderDiningOption` | ✅ | 식사 옵션 | `"HERE"` |
| `item` | `OrderItem` | ✅ | 상품 |  |
| `itemPrice` | `OrderItemPrice` | ✅ | 상품 가격 |  |
| `optionChoices` | `OrderItemOptionChoice[]` | ✅ | 선택한 옵션 |  |
| `appliedDiscounts` | `Discount[]` | ✅ | 항목별 적용 할인 내역 |  |
| `quantity` | `Long` | ✅ | 수량 | `1` |

### 주문 식사 옵션 (OrderDiningOption)

| Value | Description |
| --- | --- |
| `"HERE"` | 매장 식사 |
| `"TOGO"` | 포장 |
| `"DELIVERY"` | 배달 |
| `"PICKUP"` | 포장 (픽업) |
| `"UNDEFINED"` |  |

### 상품 (OrderItem)

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `title` | `String` | ✅ | 상품명 | `"아메리카노"` |
| `code` | `String` |  | 상품 코드 | `""` |
| `category` | `OrderItemCategory` | ✅ | 상품이 속한 카테고리 |  |

### 상품 가격 (OrderItemPrice)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `title` | `String` | ✅ | 가격명 | `"기본"` |
| `priceType` | `OrderItemPriceType` | ✅ | 가격 종류 | `"FIXED"` |
| `priceUnit` | `Long` | ✅ | 가격 단위 | `1` |
| `priceValue` | `Long` | ✅ | 가격 | `3000` |
| `isTaxFree` | `Boolean` | ✅ | 면세 여부 | `false` |
| `taxPercentage` | `Int` |  | 세율 | `10` |
| `taxInclusive` | `Boolean` | ✅ | 부가세 포함 여부 | `true` |

### 상품 가격 종류 (OrderItemPriceType)

| Value | Description |
| --- | --- |
| `"FIXED"` | 정가 |
| `"VARIABLE"` | 시가 |
| `"UNIT"` | 단위가격 |
| `"UNDEFINED"` |  |

### 카테고리 (OrderItemCategory)

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `title` | `String` | ✅ | 카테고리명 | `"커피"` |
| `code` | `String` |  | 카테고리 코드 | `""` |

### 옵션 (OrderItemOption)

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `title` | `String` | ✅ | 옵션명 | `"온도"` |

### 옵션 선택지 (OrderItemOptionChoice)

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `title` | `String` | ✅ | 선택지명 | `"ICE"` |
| `code` | `String` |  | 선택지 코드 | `"ICE"` |
| `priceValue` | `Long` | ✅ | 가격 | `500` |
| `quantity` | `Long` | ✅ | 수량 | `1` |
| `option` | `OrderItemOption` |  | 선택지가 속한 옵션 |  |

### 주문 청구 금액 (OrderChargePrice)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `listPrice` | `Long` | ✅ | 원금액 | `3500` |
| `discountAmount` | `Long` | ✅ | 할인금액 | `-300` |
| `tipAmount` | `Long` | ✅ | 팁 | `0` |
| `serviceChargeAmount` | `Long` | ✅ | 봉사료 | `0` |
| `taxAmount` | `Long` | ✅ | 세액 | `291` |
| `supplyAmount` | `Long` | ✅ | 공급가액 | `2909` |
| `taxExemptAmount` | `Long` | ✅ | 면세금액 | `0` |
| `totalAmount` | `Long` | ✅ | 최종금액 | `3200` |

## Methods

### 주문 단건 조회

| Property | Value |
| --- | --- |
| Method | GET |
| Path | `/api-public/openapi/v1/merchants/{merchantId}/order/orders/{orderId}` |
| Response Type | `Order` |
| Description | 매장의 주문 하나를 조회합니다. |

**요청 파라미터**

| Parameter | Location | Type | Required | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `merchantId` | Path | `Long` | ✅ | \- | 매장 ID |
| `orderId` | Path | `String` | ✅ | \- | 주문 ID |

### 주문 복수건 조회

| Property | Value |
| --- | --- |
| Method | GET |
| Path | `/api-public/openapi/v1/merchants/{merchantId}/order/orders/by-ids` |
| Response Type | `Order[]` |
| Description | ID를 통해 매장의 주문 여러 건을 조회합니다. 최대 25건까지 조회 가능합니다. |

**요청 파라미터**

| Parameter | Location | Type | Required | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `merchantId` | Path | `Long` | ✅ | \- | 매장 ID |
| `ids` | Query | `String[]` | ✅ | \- | 주문 ID 목록 |

### 주문 목록 조회

| Property | Value |
| --- | --- |
| Method | GET |
| Path | `/api-public/openapi/v1/merchants/{merchantId}/order/orders` |
| Response Type | `Order[]` |
| Description | 매장의 주문 목록을 주문 생성 시각 순으로 조회합니다. |

**요청 파라미터**

| Parameter | Location | Type | Required | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `merchantId` | Path | `Long` | ✅ | \- | 매장 ID |
| `from` | Query | `timestamp` |  | \- | 조회 범위 시작점으로, 이 시점 이후에 생성된 주문만 조회합니다. |
| `to` | Query | `timestamp` |  | \- | 조회 범위 끝점으로, 이 시점 이전에 생성된 주문만 조회합니다. |
| `orderStates` | Query | `OrderState[]` |  | \- | 주문 상태 필터로, 파라미터로 주어진 값의 상태를 가지는 주문만 조회합니다. |
| `sources` | Query | `String[]` |  | \- | 주문 채널 필터로, 파라미터로 주어진 값의 주문 채널을 가지는 주문만 조회합니다. |
| `page` | Query | `Int` |  | `1` | 조회할 페이지 |
| `size` | Query | `Int` |  | `100` | 페이지 크기 |
| `sortOrder` | Query | `SortOrder` |  | `"DESC"` | 정렬 순서 (주문 생성 시각 기준) |