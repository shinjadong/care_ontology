---
title: "PaymentMethod API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/paymentMethod.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/reference/plugin-sdk/pos/#VPContent)

## PaymentMethod API

Toss POS에 커스텀 결제 수단을 추가하고 관리하는 API입니다. 포인트 결제, 바코드 결제 등 파트너사에서 제공하는 결제 수단을 등록하여 사용할 수 있습니다.

## Types

### PaymentMethodResponse

결제 완료 시 반환되는 응답 객체입니다.

| 필드 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| approvedAt | string | 결제 승인 시간 | '2024-09-26T17:32:19' |
| paymentKey | string | 결제 고유 ID | 'plugin-payment-unique-id' |

### PluginCancelledPaymentDto

결제 취소 시 반환되는 응답 객체입니다.

| 필드 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| cancelledAt | string | 결제 취소 시간 | '2024-09-26T17:32:19' |

### PluginPrice

결제 금액 정보를 나타내는 객체입니다.

| 필드 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| amountMoney | number | 지불액 | 10000 |
| taxMoney | number | 부가가치세 | 1000 |
| supplyMoney | number | 공급가액 | 9000 |
| tipMoney | number | 봉사료 | 0 |
| taxExemptMoney | number | 면세금액 | 0 |

## Methods

### add

Toss POS에 새로운 결제 수단을 등록합니다.

#### 주요 기능

- 결제 수단 등록 및 관리
- 결제 이벤트 처리
- 결제 취소 이벤트 처리

#### 콜백 함수

- **payCallback**: 결제 시 실행되는 콜백
	- 사용자 취소 시 `undefined` 반환
- **cancelCallback**: 결제 취소 시 실행되는 콜백
	- 사용자 취소 시 `undefined` 반환