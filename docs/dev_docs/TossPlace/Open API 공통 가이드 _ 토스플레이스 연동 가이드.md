---
title: "Open API 공통 가이드 | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/open-api/common.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Open API 공통 가이드

## HTTP API 공통

### HTTP 요청 및 응답 Header

- **인증**
	- 인증을 위해 개발자 센터에서 발급한 API key pair를 사용합니다. HTTP 요청 header를 다음과 같이 지정해야 합니다.
		- `x-access-key`: `<API Access Key>`
		- `x-secret-key`: `<API Secret Key>`
- **요청 및 응답 형태**
	- 요청과 응답은 모두 `Content-Type: application/json` 형태여야 합니다.

### 응답 코드 및 Body 형태

- **응답 코드**: API가 성공적으로 응답할 시 응답 코드 200을 반환합니다. 응답 실패 시 실패 이유에 따라 401, 429, 500 등 상응하는 응답 코드를 반환합니다.
- **응답 형태**: 모든 HTTP API 응답 body는 기본적으로 아래 형태와 같습니다.

**성공 응답**

**실패 응답**

API 요청과 응답에 사용되는 모든 시각 (`timestamp`) 타입은 ISO 8601 형태(예: `2025-09-01T00:00:00Z`)의 문자열입니다.

### Pagination

너무 많은 정보를 한 번에 조회하지 않도록 목록 조회 시 페이지네이션을 사용합니다. 페이지 기반으로 목록을 조회할 수 있으며, `page`,`size`, `sortOrder` 파라미터를 사용합니다.

```
httpGET https://open-api.tossplace.com/api-public/openapi/v1/merchants/{merchantId}/order/orders?page=1&size=100&sortOrder=DESC
```
- `page`: 조회할 페이지입니다. 1페이지가 목록의 시작입니다.
- `size`: 페이지의 크기입니다. 최소 1, 최대 500 값을 사용할 수 있으며 기본값은 100입니다.
- `sortOrder`: 목록의 정렬 순서입니다. `"ASC"`, `"DESC"` 값을 사용할 수 있습니다.

### 에러 처리

API 에러 응답은 HTTP 상태 코드와 함께 구체적인 에러 정보를 제공합니다.

### 요청 추적

모든 Open API 응답은 `x-toss-event-id` HTTP 헤더를 포함합니다. 이 값은 요청 추적 및 문의 시 필요합니다.

Open API 사용 중 문의가 있으시다면, `x-toss-event-id` 헤더 값을 함께 제공해주세요. 기술 지원 중 개별 요청을 추적할 때 도움이 됩니다.