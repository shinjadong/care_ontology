---
title: "토스 POS 플러그인 개발 시작하기 (튜토리얼) | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/guide/pos-integration/plugin/develop/develop-tutorial.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## 토스 POS 플러그인 개발 시작하기 (튜토리얼)

토스 POS 플러그인 개발을 위한 환경을 구성하는 단계별 가이드입니다.

튜토리얼 단계 설명

1 단계: 플러그인 생성  
2 단계: 테스트 매장 생성  
3 단계: 테스트 매장에 플러그인 연결(설치)  
4 단계: 토스 POS에서 테스트 매장에 온보딩하여 플러그인 동작 확인

## 1\. 플러그인 생성

- \[내 플러그인\] > \[플러그인 등록\] 버튼을 클릭하여 새로운 플러그인을 생성합니다.
	- **플러그인 타입**: **토스포스** 선택
	- **플러그인 이름**
	- **플러그인 ID**
	- **회사명**
	- **ACL(Access Control List)**: 플러그인에서는 ACL에 등록된 URL만 호출이 가능합니다.

![플러그인 정보 입력](https://docs.tossplace.com/images/pos-plugin/pos-plugin-1.png)

![플러그인 생성 완료](https://docs.tossplace.com/images/pos-plugin/pos-plugin-2.png)

## 2\. 플러그인 생성 후 번들(파일) 등록

- 플러그인 생성 후 예제 코드 기반의 플러그인을 zip 파일로 압축하여 업로드해주세요.

![플러그인 생성 완료](https://docs.tossplace.com/images/pos-plugin/pos-plugin-2.png)

## 3\. 테스트 매장 생성

- \[테스트 가맹점 관리\]에서 테스트 매장을 만들어주세요.
- 테스트 매장이 생성되면, 토스 POS에서 로그인을 하기 위한 정보가 생성됩니다.
	- 매장고유번호, 사업자번호, 휴대폰 번호

![테스트 매장 생성](https://docs.tossplace.com/images/developer-center/4-test-merchant3.png)

![테스트 매장 생성](https://docs.tossplace.com/images/developer-center/4-test-merchant5.png)

## 4\. 테스트 매장에 플러그인 연동

- 테스트 매장 상세 화면에서, 위에서 생성한 플러그인의 사용 여부를 변경해주세요.

![새 테스트 매장 생성 플러그인 연동](https://docs.tossplace.com/images/pos-plugin/pos-plugin-3.png)

## 5\. 토스 POS에서 테스트 매장으로 로그인

토스 POS를 테스트 매장에 연결하고 플러그인을 테스트하는 과정입니다.

토스 POS 준비

토스 POS가 없는 경우 [토스 POS 다운로드](https://tossplace.com/) 를 먼저 진행해주세요.

### 5-1. 토스 POS 온보딩

- 토스 POS 단말기를 켜고 다음 정보를 입력하여 온보딩을 진행합니다.
- 아래의 과정을 거쳐서 테스트 매장에 로그인 할 수 있습니다.
- **입력 정보**: 사업자번호, 매장고유번호, 핸드폰번호 ![로그인](https://docs.tossplace.com/images/pos-plugin/pos-login.png)

### 5-2. 토스 POS 온보딩 완료 확인

#### POS에서 시리얼 번호 확인

POS 온보딩 완료 후, POS 시리얼 번호를 확인합니다:

1. POS → **설정** → **정보** → **포스정보/소프트웨어**
2. **포스 시리얼 번호** 확인

![포스SN](https://docs.tossplace.com/images/pos-plugin/possn.png)

#### 개발자센터에서 연결 확인

개발자센터에서 POS 연결을 확인합니다:

1. 개발자센터 → **토스포스 목록**
2. 확인한 시리얼 번호로 검색하여 POS가 등록되었는지 확인

![개발자센터 포스 목록 검색](https://docs.tossplace.com/images/pos-plugin/poslist.png)

## 6\. 개발 모드 설정

플러그인 개발 및 테스트를 위해 토스 POS를 개발 모드로 설정합니다:

1. 개발자센터의 \*\*"토스포스 목록"\*\*에서 해당 POS를 찾습니다
2. **용도 설정** 을 "개발용"으로 변경합니다

![POS 관리 화면](https://docs.tossplace.com/images/pos-plugin/poslist.png)

개발 모드 설정

토스 POS를 개발용으로 설정해야 개발자센터에서 업로드한 플러그인 코드가 반영됩니다.

## 7\. 플러그인 개발 및 배포

### 7-1. 플러그인 코드 개발

- 기본 템플릿을 바탕으로 플러그인 코드를 작성합니다:
- [토스 POS 플러그인 SDK Reference](https://docs.tossplace.com/reference/plugin-sdk/pos/intro.html)

### 7-2. 플러그인 업로드

1. 개발 방식에 따른 가이드를 참고하여 zip 파일을 생성합니다.
2. 개발자센터 → 내 플러그인 → 개발 배포 → **개발용 파일 추가** 에서 업로드합니다

![플러그인 업로드](https://docs.tossplace.com/images/developer-center/2-pos-upload.png)

### 7-3. 플러그인 업데이트

재시작 완료 후 플러그인을 실행하여 새 버전이 정상 반영되었는지 확인합니다.

개발 배포 반영

새로운 버전을 업로드한 후에는 POS 앱 재시작이 필요합니다.  
POS 우측 상단 설정 → 다시 시작

- **개발 배포**: 검수 없이 즉시 배포 가능 (최대 5개 단말기)
- **라이브 배포**: 검수 후 모든 단말기에 배포

## 문의사항

개발 환경 구성 관련 문의는 **[developer-support@tossplace.com](https://docs.tossplace.com/guide/pos-integration/plugin/develop/)** 으로 연락주세요.