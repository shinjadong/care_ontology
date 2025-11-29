---
title: "Discount API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/open-api/discount.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Discount API

토스 POS의 **\[상품\] - \[상품 · 할인\] - \[할인\]** 메뉴를 통해 할인 정책을 관리할 수 있습니다. Discount API를 통해 매장 내의 할인 정책을 조회할 수 있습니다.

## Types

### 할인 정책 (DiscountPolicy)

할인 정책은 특정 주문에 대해 할인 적용 여부, 어떤 상품에 할인이 적용되는지, 적용 금액을 정의하는 규칙입니다.

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `id` | `String` | ✅ | 할인 정책 ID | `"42"` |
| `title` | `String` | ✅ | 할인명 | `"PROMOTION"` |
| `type` | `String` | ✅ | 할인 종류 (예: `"FIXED_AMOUNT"`, `"FIXED_PERCENTAGE"`) | `"FIXED_AMOUNT"` |
| `code` | `String` |  | 할인 코드 | `"PROMOTION_00"` |
| `amount` | `Long` | ✅ | 정액할인 금액 (정액할인이 아닌 경우 0) | `1000` |
| `percentage` | `Double` | ✅ | 정률할인 비율 (정률할인이 아닌 경우 0.0) | `0.0` |
| `maxAmount` | `Long` |  | 최대 할인 금액 | `3000` |
| `autoApply` | `DiscountAutoApply` |  | 할인 자동 적용 규칙 |  |

### 할인 자동 적용 규칙 (DiscountAutoApply)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `condition` | `DiscountAutoApplyCondition` | ✅ | 할인 자동 적용 조건 |  |
| `targets` | `DiscountAutoApplyTarget[]` |  | 할인 자동 적용 대상 |  |

### 할인 자동 적용 조건 (DiscountAutoApplyCondition)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `appliedToAll` | `Boolean` | ✅ | 모든 주문에 할인 적용 여부 | `true` |
| `diningOptions` | `OrderDiningOption[]` |  | 할인을 적용할 식사 옵션 (매장 식사, 포장 등) | `["HERE", "TOGO"]` |
| `schedule` | `DiscountAutoApplySchedule` |  | 할인 자동 적용 스케줄 |  |

### 할인 자동 적용 스케줄 (DiscountAutoApplySchedule)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `dayOfWeeks` | `String[]` |  | 할인 자동 적용 요일 | `["SATURDAY", "SUNDAY"]` |
| `dateRange` | `{ "start": LocalDate, "end": LocalDate }` |  | 할인 자동 적용 기간 (inclusive) | `{ "start": "2025-09-01", "end": "2025-09-30" }` |
| `timeRange` | `{ "start": LocalTime, "end": LocalTime }` |  | 할인 자동 적용 시간대 (inclusive) | `{ "start": "10:00:00", "end": "17:59:59" }` |

### 할인 적용 대상 (DiscountAutoApplyTarget)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `targetType` | `DiscountAutoApplyTargetType` | ✅ | 할인 적용 대상 종류 (카테고리, 상품) | `"ITEM"` |
| `targetId` | `String` | ✅ | 할인 적용 대상 ID | `"42"` |

### 할인 적용 대상 종류 (DiscountAutoApplyTargetType)

| Value | Description |
| --- | --- |
| `"ITEM"` | 상품 |
| `"CATEGORY"` | 카테고리 |
| `"UNDEFINED"` |  |

### 할인 (Discount)

할인 정책이 주문에 적용된 결과입니다. 주문 조회 시 할인 관련 필드를 통해 적용 결과를 함께 확인할 수 있습니다.

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `title` | `String` | ✅ | 할인명 | `"PROMOTION"` |
| `type` | `String` |  | 할인 종류 (예: `"FIXED_AMOUNT"`, `"FIXED_PERCENTAGE"`) | `"FIXED_AMOUNT"` |
| `code` | `String` |  | 할인 코드 | `"PROMOTION_00"` |
| `amount` | `Long` | ✅ | 할인 적용 금액 | `1000` |
| `percentage` | `Double` | ✅ | 정률할인 비율 (정률할인이 아닌 경우 0.0) | `0.0` |
| `fixedAmount` | `Long` | ✅ | 정액할인 금액 (정액할인이 아닌 경우 0) | `1000` |
| `precedence` | `Int` |  | 할인 적용 우선순위 (값이 작을수록 높은 우선순위) | `1` |

## Methods

### 할인 정책 자동 적용

| Property | Value |
| --- | --- |
| Method | POST |
| Path | `/api-public/openapi/v1/merchants/{merchantId}/discount/discount-policies/auto-apply` |
| Response Body | `DiscountPolicy[]` |
| Description | 주어진 요청에 자동 적용될 수 있는 할인 정책을 확인합니다. |

**요청 파라미터**

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `merchantId` | Path | `Long` | ✅ | 매장 ID |

**요청 Body**

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `itemId` | `String` |  | 상품 ID      상품은 할인 정책의 자동 적용 대상 (DiscountAutoApplyTarget) 에 따라 할인이 적용됩니다. 상품 또는 상품이 속한 카테고리를 대상으로 하는 할인 정책이 자동 적용됩니다. | `"42"` |