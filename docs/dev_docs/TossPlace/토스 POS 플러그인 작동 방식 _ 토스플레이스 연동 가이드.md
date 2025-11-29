---
title: "토스 POS 플러그인 작동 방식 | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/guide/pos-integration/plugin/how-to-work.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/guide/pos-integration/plugin/#VPContent)

## 토스 POS 플러그인 작동 방식

## 플러그인 구조

POS 플러그인의 기본 구조를 도식화한 것입니다.

![POS 플러그인 구조](https://docs.tossplace.com/images/tossposplugin.png)

### 주요 특징

- **SDK 활용**: POS의 다양한 데이터와 이벤트에 접근 가능
- **서버 통신**: 3rd party 서버와의 통신 지원
- **데이터 저장**: 추가/수정된 데이터(주문, 결제 등)는 플레이스 서버에 저장

## 플러그인 실행 환경

### 1\. 웹 워커 기반 실행

- **실행 환경**: Toss POS 내부의 웹뷰에서 [웹워커](https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API) 로 실행
- **개발 가이드**: 모든 개발은 웹워커 환경을 가정하고 진행
- **문서 기준**: TypeScript 기반으로 작성

### 2\. Iframe 기반 실행

- **실행 환경**: Toss POS 탭으로 렌더링되는 웹뷰에서 [Iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) 으로 HTML 파일 렌더링
- **개발 가이드**: 모든 개발은 Iframe 환경을 가정하고 진행
- **문서 기준**: TypeScript 기반으로 작성

### 3\. 실행 환경별 비교

| 항목 | 웹 브라우저 | 웹 워커 | Iframe |
| --- | --- | --- | --- |
| **실행 환경** | 메인 스레드 | 백그라운드 스레드 | 메인 스레드 |
| **DOM 접근** | 가능 | 불가능 | 불가능 |
| **UI 업데이트** | 가능 | 불가능 | 가능 (Iframe 내부) |
| **병렬 처리** | 불가능 (UI 멈춤 가능성 있음) | 가능 (메인 스레드와 분리) | 불가능 |
| **통신 방식** | 직접 실행 및 전역 객체 접근 | `postMessage()` 를 통한 메시지 기반 통신 | `postMessage()` 를 통한 메시지 기반 통신 |
| **사용 목적** | UI 처리, DOM 조작, 이벤트 핸들링 | 무거운 연산, 데이터 처리, 백그라운드 작업 | UI 표기, 데이터 처리 |