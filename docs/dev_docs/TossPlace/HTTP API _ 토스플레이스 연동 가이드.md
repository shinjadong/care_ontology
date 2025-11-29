---
title: "HTTP API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/http.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/reference/plugin-sdk/pos/#VPContent)

## HTTP API

Toss POS의 HTTP 클라이언트를 사용하여 외부 API를 호출할 수 있는 기능을 제공합니다. 다양한 HTTP 메서드를 지원하며, 요청 헤더와 응답 처리를 위한 타입을 제공합니다.

## Types

### PluginHttpResponse

HTTP 요청의 응답을 나타내는 객체입니다.

| 필드 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| body | string | 응답 본문 | `{"key": "value"}` |
| headers | \[string, string\]\[\] | 응답 헤더 | `[['Content-Type', 'application/json']]` |
| code | number | HTTP 상태 코드 | `200` |

## Methods

### get

GET 요청을 보냅니다.

### post

POST 요청을 보냅니다.

### put

PUT 요청을 보냅니다.

### patch

PATCH 요청을 보냅니다.

### delete

DELETE 요청을 보냅니다.

### head

HEAD 요청을 보냅니다.

### options

OPTIONS 요청을 보냅니다.