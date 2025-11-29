---
title: "Open API 개발 시작하기 (튜토리얼) | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/guide/pos-integration/open-api/develop-tutorial.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/guide/pos-integration/open-api/#VPContent)

## Open API 개발 시작하기 (튜토리얼)

Open API 개발을 위한 환경을 구성하는 단계별 가이드입니다.

튜토리얼

1 단계: 애플리케이션 생성  
2 단계: 테스트 매장 생성  
3 단계: 테스트 매장에 애플리케이션 연결(설치)  
4 단계: Open API 동작 확인

## 1\. 애플리케이션 생성

- \[내 애플리케이션\] > \[애플리케이션 등록\] 버튼을 클릭하여 새로운 애플리케이션을 생성합니다.
	- **애플리케이션 타입**: **API** 선택
	- **애플리케이션 이름**
	- **애플리케이션 ID**
	- **회사명**

![애플리케이션 정보 입력](https://docs.tossplace.com/images/developer-center/2-create-plugin2-api.png)

![애플리케이션 생성 완료](https://docs.tossplace.com/images/developer-center/2-create-plugin3.png)

## 2\. 애플리케이션 생성 인증 정보 발급

- 애플리케이션 생성 후 Open API 인증을 위한 인증 키를 발급해주세요.
- \[생성하기\] 버튼을 눌러 인증 정보의 별칭을 입력해주세요. ![인증 정보 생성 1](https://docs.tossplace.com/images/developer-center/2-create-plugin-api-key-1.png)
- 생성 완료 후 **Access Key와** **Access Secret** 이 표시됩니다. Access Secret은 생성시에만 확인이 가능하니 꼭 확인해주세요. 만약 Access Secret을 분실하셨을 경우 인증 정보를 삭제하고 새로운 인증 정보를 생성해야 합니다. ![인증 정보 생성 2](https://docs.tossplace.com/images/developer-center/2-create-plugin-api-key-2.png)

## 3\. 테스트 매장 생성

- \[테스트 가맹점 관리\]에서 테스트 매장을 만들어주세요.
- 테스트 매장이 생성되면, 프론트에서 로그인을 하기 위한 정보가 생성됩니다.
	- 매장고유번호, 사업자번호, 휴대폰 번호

![테스트 매장 생성](https://docs.tossplace.com/images/developer-center/4-test-merchant3.png)

![테스트 매장 생성](https://docs.tossplace.com/images/developer-center/4-test-merchant5.png)

## 4\. 테스트 매장에 애플리케이션 연동

- 테스트 매장 상세 화면에서, 위에서 생성한 애플리케이션의 사용 여부를 변경해주세요.

![새 테스트 매장 생성 애플리케이션 연동](https://docs.tossplace.com/images/developer-center/5-test-merchant-plugin-connected-api.png)

## 5\. API 호출 테스트

### 5-1. API 인증 정보 준비

앞서 발급받은 API Key 정보를 준비합니다:

### 5-2. 매장 정보 조회 API 테스트

첫 번째로 매장 정보를 조회해보겠습니다:

## 문의사항

API 사용 관련 문의는 **[developer-support@tossplace.com](https://docs.tossplace.com/guide/pos-integration/open-api/)** 으로 연락주세요.