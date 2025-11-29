---
title: "Storage API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/storage.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/reference/plugin-sdk/pos/#VPContent)

## Storage API

POS 플러그인에서 로컬 데이터를 저장하고 관리하는 기능을 제공합니다. 데이터베이스를 사용하지 않고도 간단한 데이터 저장이 가능합니다.

주의사항

- 저장 가능한 데이터 타입은 문자열(string)만 지원합니다.
- 객체나 배열을 저장하려면 JSON.stringify()를 사용하여 문자열로 변환해야 합니다.

## Methods

### get

지정된 키에 해당하는 값을 조회합니다.

### set

지정된 키에 값을 저장합니다.

### del

지정된 키에 해당하는 값을 삭제합니다.