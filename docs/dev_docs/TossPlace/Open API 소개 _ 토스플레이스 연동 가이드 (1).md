---
title: "Open API 소개 | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/open-api/intro.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/reference/open-api/#VPContent)

## Open API 소개

토스플레이스 Open API는 서버 간 안정적인 데이터 연동을 위한 API입니다. POS 시스템의 주문, 결제, 상품 정보에 안전하게 접근할 수 있습니다.

## 주요 특징

- **서버 간 통신**: 안정적인 서버 간 데이터 연동
- **실시간 데이터**: 주문, 결제, 상품 정보를 실시간으로 조회
- **보안**: API 인증으로 안전한 데이터 접근

## 적용 사례

- **ERP/CRM 시스템 연동**: 매장 운영 시스템과 토스플레이스 POS 데이터 연동
- **매출 분석**: 실시간 매출 및 주문 데이터 분석
- **재고 관리**: 상품 및 카테고리 정보 동기화
- **회계 시스템 연동**: 결제 데이터를 회계 시스템에 자동 반영

## 주요 API 카테고리

### 매장 (Merchant)

매장 기본 정보를 조회할 수 있습니다.

- 매장명, 사업자등록번호 등 기본 정보

### 주문 (Order)

주문 정보를 조회할 수 있습니다.

- 주문 상태, 주문 항목, 결제 상태
- 주문 생성/완료/취소 시각
- 할인 및 가격 정보

### 결제 (Payment)

결제 정보를 조회할 수 있습니다.

- 결제 수단별 상세 정보
- 카드, 현금, 간편결제 등
- 승인번호, 취소 내역