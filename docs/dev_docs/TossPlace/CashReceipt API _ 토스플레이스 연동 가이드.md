---
title: "CashReceipt API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/cashReceipt.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/reference/plugin-sdk/pos/#VPContent)

## CashReceipt API

현금영수증 발행 결과를 Toss POS에 등록하는 API입니다. Toss POS에서 현금 결제 시 자동으로 처리되지만, 플러그인에서 별도로 현금영수증을 발행한 경우 결과를 등록할 때 사용합니다.

## Types

### CashReceipt

현금영수증 발행 결과를 나타내는 객체입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| orderId | string | 필수 | 현금영수증이 발행된 주문 ID | 'order-id' |
| amount | number | 필수 | 현금영수증 발행 금액 | 10000 |
| issueDate | string | 필수 | 현금영수증 발행 날짜 (YYYYMMDDHHmmss 형식) | '20210101120000' |
| issueNumber | string | 필수 | 현금영수증 발행 번호 | 'issue-number' |
| cardNumber | string | 필수 | 현금영수증 발행 카드 또는 휴대폰 번호 | '1234123412341234' |

## Methods

### add

현금영수증 발행 결과를 Toss POS에 등록합니다.

주의사항

이 API는 현금영수증을 발행하는 기능이 아닙니다. 외부 시스템에서 발행한 현금영수증의 결과를 Toss POS에 등록하는 API입니다.