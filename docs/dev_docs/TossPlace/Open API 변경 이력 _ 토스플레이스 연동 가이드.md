---
title: "Open API 변경 이력 | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/open-api/changelog.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/reference/open-api/#VPContent)

## Open API 변경 이력

## 2025-11-28

카탈로그와 할인 관련 API가 추가되었습니다.

- 카탈로그
	- **\[신규\]** 상품 단건 조회
	- **\[신규\]** 상품 복수건 조회
	- **\[신규\]** 상품 목록 조회
- 할인
	- **\[신규\]** 할인 정책 자동 적용
- 주문
	- `Discount` 모델이 할인 하위 모델로 이동했습니다.

## 2025-09-01

Open API의 초기 버전입니다.

- 일반
	- **\[신규\]** Open API 버전 정보 조회
- 매장
	- **\[신규\]** 매장 정보 조회
- 주문
	- **\[신규\]** 주문 단건 조회
	- **\[신규\]** 주문 복수건 조회
	- **\[신규\]** 주문 목록 조회
- 결제
	- **\[신규\]** 결제 단건 조회
	- **\[신규\]** 주문의 결제건 모두 조회