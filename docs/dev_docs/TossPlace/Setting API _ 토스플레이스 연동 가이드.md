---
title: "Setting API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/setting.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Setting API

해당 api를 사용할 경우 설정 -> 외부서비스 설정 하위의 설정 페이지를 만들고 유저가 입력한 값을 조회할 수 있습니다

## Types

### PluginInputType

플러그인 입력 타입을 나타내는 유니온 타입입니다.

### BaseInput

모든 입력 타입의 기본 속성을 정의하는 객체입니다.

### TextInput

텍스트 입력 필드를 정의하는 타입입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| label | string | 필수 | 입력 필드 라벨 | 'API 키' |
| required | boolean | 필수 | 필수 입력 여부 | true |
| id | string | 필수 | 입력 필드 ID | 'api\_key' |
| type | 'text' | 필수 | 입력 타입 | 'text' |
| default | string | 필수 | 기본값 | 'default\_value' |
| placeholder | string | 선택 | 플레이스홀더 | 'API 키를 입력하세요' |

### PasswordInput

비밀번호 입력 필드를 정의하는 타입입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| label | string | 필수 | 입력 필드 라벨 | '비밀번호' |
| required | boolean | 필수 | 필수 입력 여부 | true |
| id | string | 필수 | 입력 필드 ID | 'password' |
| type | 'password' | 필수 | 입력 타입 | 'password' |
| default | string | 필수 | 기본값 | '' |
| placeholder | string | 선택 | 플레이스홀더 | '비밀번호를 입력하세요' |

### InputValue

선택 옵션의 값을 정의하는 타입입니다.

### RadioInput

라디오 버튼 입력 필드를 정의하는 타입입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| label | string | 필수 | 입력 필드 라벨 | '결제 방식' |
| required | boolean | 필수 | 필수 입력 여부 | true |
| id | string | 필수 | 입력 필드 ID | 'payment\_method' |
| type | 'radio' | 필수 | 입력 타입 | 'radio' |
| default | string | 필수 | 선택된 value의 id | 'card' |
| values | InputValue\[\] | 필수 | 선택 옵션 목록 | \[{ id: 'card', label: '카드' }\] |

### CheckBoxInput

체크박스 입력 필드를 정의하는 타입입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| label | string | 필수 | 입력 필드 라벨 | '알림 설정' |
| required | boolean | 필수 | 필수 입력 여부 | false |
| id | string | 필수 | 입력 필드 ID | 'notification\_settings' |
| type | 'checkbox' | 필수 | 입력 타입 | 'checkbox' |
| default | string\[\] | 필수 | 선택된 value의 id의 배열 | \['email', 'sms'\] |
| values | InputValue\[\] | 필수 | 선택 옵션 목록 | \[{ id: 'email', label: '이메일' }\] |

### ToggleInput

토글 입력 필드를 정의하는 타입입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| label | string | 필수 | 입력 필드 라벨 | '자동 저장' |
| required | boolean | 필수 | 필수 입력 여부 | false |
| id | string | 필수 | 입력 필드 ID | 'auto\_save' |
| type | 'toggle' | 필수 | 입력 타입 | 'toggle' |
| default | boolean | 필수 | 기본값 | true |

### SliderInput

슬라이더 입력 필드를 정의하는 타입입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| label | string | 필수 | 입력 필드 라벨 | '음량' |
| required | boolean | 필수 | 필수 입력 여부 | false |
| id | string | 필수 | 입력 필드 ID | 'volume' |
| type | 'slider' | 필수 | 입력 타입 | 'slider' |
| default | number | 필수 | 기본값 | 50 |
| min | number | 필수 | 최소값 | 0 |
| max | number | 필수 | 최대값 | 100 |
| step | number | 필수 | 단계값 | 5 |

### PluginInputs

플러그인 설정 입력 필드의 유니온 타입입니다.

### SettingInputs

플러그인 설정 입력 필드들의 집합을 나타내는 객체입니다.

## Methods

### setInputs

input을 이용해 설정화면을 만듭니다

### getValues

setInputs를 이용해 설정화면을 만들고 유저가 입력한 값을 불러옵니다