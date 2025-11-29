---
title: "탭 화면(iframe) 패키지 설치 방식 개발 가이드 | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/guide/pos-integration/plugin/develop/iframe-package.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/guide/pos-integration/plugin/develop/#VPContent)

## 탭 화면(iframe) 패키지 설치 방식 개발 가이드

## 시작하기

### 1\. 샘플코드

- [TypeScript 플러그인 샘플코드](https://github.com/tossplace/toss-pos-plugin-template/tree/main/iframe-plugin-ts)
- [JavaScript 플러그인 샘플코드](https://github.com/tossplace/toss-pos-plugin-template/tree/main/iframe-plugin-js)

### 2\. 프로젝트 설정

- 압축 해제 후 프로젝트 디렉토리에서 다음 명령어 실행:
```shell
shellnpm install
```
- SDK 라이브러리 버전 최신화:

## 개발 가이드

### 1\. 코드 작성

- `src/App.tsx` or `src/App.jsx` 파일을 수정하여 플러그인 기능 구현
- TypeScript 타입 지원으로 안정적인 개발 가능

### 2\. 탭 정보 작성하기

- `public/iframe-manifest.json` 파일을 알맞게 수정하여 Toss POS 탭에 노출되는 정보 수정
	- `tab.title`: 탭에 표기되는 탭 이름
	- `tab.description`: 탭의 설명 (짧은 문구 권장)

## 배포 가이드

### 1\. 패키지 생성

배포를 위해 다음 명령어 실행:

### 2\. 배포

1. 생성된 `dist` 파일을 zip 파일로 압축
2. zip 파일을 개발자 센터에 업로드
3. 플러그인 검수 및 배포 진행