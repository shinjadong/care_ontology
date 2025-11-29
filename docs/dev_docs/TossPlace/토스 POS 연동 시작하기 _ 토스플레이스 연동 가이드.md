---
title: "토스 POS 연동 시작하기 | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/guide/pos-integration/getting-started.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## 토스 POS 연동 시작하기

## 토스 POS 연동 방법

토스 POS는 다음 두 가지 방법 중 하나를 선택하여 연동할 수 있습니다.

### 1\. POS 플러그인 SDK

POS 화면에 직접 UI를 추가하고 실시간 이벤트를 처리하고 싶은 경우에 적합합니다.

**특징:**

- 실시간 UI 확장 가능
- POS 내부 데이터 활용
- TypeScript 기반 개발 환경
- 로컬 개발 환경 지원

**적합한 사례:** 배달앱 연동, 테이블 오더 연동, 외부 결제수단 추가

### 2\. POS Open API

서버 간 데이터 동기화나 외부 시스템 연동이 필요한 경우에 적합합니다.

**특징:**

- 서버 간 안정적 연동
- 주문, 매출 데이터 실시간 동기화
- 웹훅 이벤트 지원
- HTTP API 제공

**적합한 사례:** ERP 시스템 통합, 백오피스 시스템 연동, 매출 데이터 분석

## 자주 묻는 질문

### 연동 방법

#### Q. Plugin SDK와 Open API 중 어떤 것을 선택해야 하나요?

**A.** 용도에 따라 선택하시면 됩니다.

- **Plugin SDK**: POS 화면에 직접 UI를 추가하고 실시간 이벤트를 처리하고 싶은 경우
- **Open API**: 서버 간 데이터 동기화나 외부 시스템 연동이 필요한 경우

### 플러그인 SDK 개발 환경

#### Q. 로컬에서 POS 개발 환경을 구성할 수 있나요?

**A.** 네, POS Plugin SDK는 로컬 개발 환경을 지원합니다. 테스트 매장 생성 후 로컬에서 개발하고 테스트할 수 있습니다.

#### Q. TypeScript를 꼭 사용해야 하나요?

**A.** JavaScript도 사용 가능하지만, 타입 안전성과 개발 생산성을 위해 TypeScript 사용을 권장합니다.

### 데이터 연동

#### Q. 실시간으로 주문 데이터를 받을 수 있나요?

**A.** 네, 두 가지 방법이 있습니다.

- **Plugin SDK**: 이벤트 리스너로 실시간 데이터 수신
- **Open API**: 웹훅 이벤트 등록을 통한 실시간 데이터 수신

#### Q. 과거 주문 데이터도 조회할 수 있나요?

**A.** 네, Plugin SDK와 Open API를 통해 기간별 주문 데이터를 조회할 수 있습니다.

## 문의사항

추가 문의는 **[developer-support@tossplace.com](https://docs.tossplace.com/guide/pos-integration/)** 으로 연락주세요.