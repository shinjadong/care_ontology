---
title: "Catalog API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/open-api/catalog.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Catalog API

토스 POS의 **\[상품\] - \[상품 · 할인\]** 내 **\[상품\], \[옵션\], \[카테고리\]** 메뉴를 통해 매장의 카탈로그를 관리할 수 있습니다. Catalog API를 통해 해당 정보를 조회할 수 있으며, 매장의 메뉴 구성과 상품 정보를 제공합니다.

## Types

### 상품 (CatalogItem)

매장에 등록된 상품입니다. 소비자가 주문할 때 하나 또는 여러 상품을 주문에 포함하게 됩니다.

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `id` | `String` | ✅ | 상품 ID | `"42"` |
| `merchantId` | `Long` | ✅ | 매장 ID | `42` |
| `title` | `String` | ✅ | 상품명 | `"아메리카노"` |
| `code` | `String` |  | 상품코드 | `""` |
| `description` | `String` | ✅ | 상품 설명 | `""` |
| `imageUrl` | `String` |  | 상품 이미지 URL | `""` |
| `price` | `CatalogItemPrice` | ✅ | 가격 |  |
| `createdAt` | `timestamp` | ✅ | 생성 시각 | `"2025-09-01T00:00:00"` |
| `updatedAt` | `timestamp` | ✅ | 수정 시각 | `"2025-09-01T00:00:00"` |

### 상품 가격 (CatalogItemPrice)

| Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `title` | `String` | ✅ | 가격명 | `"기본"` |
| `priceType` | `CatalogItemPriceType` | ✅ | 가격 종류 | `"FIXED"` |
| `priceUnit` | `Long` | ✅ | 가격 단위 | `1` |
| `priceValue` | `Long` | ✅ | 가격 | `3000` |
| `barcode` | `String` |  | 바코드 | `""` |

### 상품 가격 종류 (CatalogItemPriceType)

| Value | Description |
| --- | --- |
| `"FIXED"` | 정가 |
| `"VARIABLE"` | 시가 |
| `"UNIT"` | 단위가격 |
| `"UNDEFINED"` |  |

## Methods

### 상품 단건 조회

| Property | Value |
| --- | --- |
| Method | GET |
| Path | `/api-public/openapi/v1/merchants/{merchantId}/catalog/items/{itemId}` |
| Response Type | `CatalogItem` |
| Description | 매장의 상품 하나를 조회합니다. |

**요청 파라미터**

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `merchantId` | Path | `Long` | ✅ | 매장 ID |
| `itemId` | Path | `String` | ✅ | 상품 ID |

### 상품 복수건 조회

| Property | Value |
| --- | --- |
| Method | GET |
| Path | `/api-public/openapi/v1/merchants/{merchantId}/catalog/items/by-ids` |
| Response Type | `CatalogItem[]` |
| Description | ID를 통해 매장의 상품 여러 건을 조회합니다. 최대 25건까지 조회 가능합니다. |

**요청 파라미터**

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `merchantId` | Path | `Long` | ✅ | 매장 ID |
| `ids` | Query | `String[]` | ✅ | 상품 ID 목록 |

### 상품 목록 조회

| Property | Value |
| --- | --- |
| Method | GET |
| Path | `/api-public/openapi/v1/merchants/{merchantId}/catalog/items` |
| Response Type | `CatalogItem[]` |
| Description | 매장의 상품 목록을 상품 ID 순으로 조회합니다. |

**요청 파라미터**

| Parameter | Location | Type | Required | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `merchantId` | Path | `Long` | ✅ | \- | 매장 ID |
| `page` | Query | `Int` |  | `1` | 조회할 페이지 |
| `size` | Query | `Int` |  | `100` | 페이지 크기 |