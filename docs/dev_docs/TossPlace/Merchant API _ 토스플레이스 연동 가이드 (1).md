---
title: "Merchant API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/open-api/merchant.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/reference/open-api/#VPContent)

## Merchant API

매장의 기본 정보를 조회하는 API입니다. 매장명, 사업자등록번호 등 매장의 기본 정보를 확인할 수 있습니다.

## Types

### 매장 (Merchant)

매장은 주문, 결제, 상품, 고객 관리 등 토스플레이스가 제공하는 서비스가 이루어지는 환경입니다. 매장은 보통 오프라인에서 하나의 사업장을 나타내며, 토스플레이스 Open API를 활용하여 매장이 보유한 데이터에 접근할 수 있습니다.

매장에서 앱을 설치하면, 앱에 등록된 key pair (access key와 secret key) 를 이용하여 매장의 데이터에 접근하는 Open API를 호출할 수 있습니다. 앱을 설치하지 않은 매장에 대해서는 API를 호출할 수 없습니다.

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `id` | `Long` | ✅ | 매장 ID | `42` |
| `name` | `String` | ✅ | 매장명 | `"플레이스 베이커리"` |
| `businessNumber` | `String` | ✅ | 사업자등록번호 | `"0000000000"` |

## Methods

### 매장 정보 조회

| Property | Value |
| --- | --- |
| Method | GET |
| Path | `/api-public/openapi/v1/merchants/{merchantId}` |
| Response Type | `Merchant` |
| Description | ID에 해당하는 매장 정보를 조회합니다. |

**요청 파라미터**

| Parameter | Location | Type | Required | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `merchantId` | Path | `Long` | ✅ | \- | 매장 ID |