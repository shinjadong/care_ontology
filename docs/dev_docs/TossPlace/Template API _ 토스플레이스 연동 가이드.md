---
title: "Template API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/front/template.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Template API

토스 프론트의 UI 컴포넌트를 생성하고 관리하기 위한 템플릿 API입니다. 다양한 화면 유형과 사용자 인터랙션을 구현할 수 있습니다.

## 공통 파라미터

상단의 네비바가 있는 템플릿에서 사용할 수 있는 공통 파라미터입니다.

## openToast

상단에 토스트 메시지를 표시하는 API입니다.

### 사용 예시

토스트 예시

![성공 토스트](https://docs.tossplace.com/images/front-plugin/toast-1.png) ![실패 토스트](https://docs.tossplace.com/images/front-plugin/toast-2.png) 

## renderIdlePage

대기 화면을 렌더링하는 API입니다. 세 가지 타입을 지원합니다.

### 파라미터

### 기본 화면

- 토스 프론트의 "프론트 꾸미기" 기능을 사용하여 대기화면을 표시합니다.
- 화면 우측 상단을 5회 터치 후 7055를 입력하여 배경화면을 변경할 수 있습니다.
- 매장 이름이 하단에 표시됩니다.
```js
jssdk.template.renderIdlePage();
```
기본 대기화면 예시

![기본 대기화면](https://docs.tossplace.com/images/front-plugin/%EB%8C%80%EA%B8%B0%ED%99%94%EB%A9%B4-1.png)

### 원버튼

- 기본 대기화면 기능과 동일합니다.
- description 영역에 커스텀 문구를 표시할 수 있습니다.
- 하단에 버튼이 표시됩니다.
원버튼 대기화면 예시

![원버튼 대기화면](https://docs.tossplace.com/images/front-plugin/%EB%8C%80%EA%B8%B0%ED%99%94%EB%A9%B4-2.png)

### 투버튼

- 타이틀을 3줄로 표현할 수 있습니다 (2번째 줄은 강조).
- description 영역이 있으며, 종모양 아이콘은 변경할 수 없습니다.
- 하단에 2개의 버튼이 표시됩니다.
투버튼 대기화면 예시

![투버튼 대기화면](https://docs.tossplace.com/images/front-plugin/%EB%8C%80%EA%B8%B0%ED%99%94%EB%A9%B4.png)

## renderOrderPage

주문 내역을 표시하는 API입니다.

### 파라미터

### 주요 특징

- `localeCode` 가 "en"일 경우 텍스트가 영어로 표시됩니다.
- `order.items` 는 직접 영어로 요청해야 합니다.
- 할인 항목은 최대 3개까지 표시됩니다.

### 사용 예시

```js
jssdk.template.renderOrderPage({

  localeCode: "ko",

  order: {

    items: [

      {

        label: '아메리카노',

        value: 3000,

        imageUrl?: "https://example.com/image.jpg",

        options?: [

          {

            type: 'option',

            label: 'ICE',

            value: 0,

          },

          {

            type: 'option',

            label: '샷추가',

            value: 500,

          },

          {

            type: 'discount',

            label: '이벤트',

            value: 100,

          },

        ],

      },

      {

        label: '카페라떼',

        quantity?: 2,

        value: 6000,

      },

    ],

    discounts: [

      {

        label: '전체할인 10%',

        value: 940,

      },

    ],

    summary: {

      totalAmount: 15400,

      discountAmount: 1040,

      earned: {

        label: '매장 포인트 적립',

        value: 100,

        suffix: 'P',

      },

    },

  },

  onClick: async () => {

    const price = order.summary.totalAmount;

    const tax = Math.floor(price / 11);

    const supplyValue = price - tax;

    const result = await sdk.payment.requestPayment({

      paymentKey: 'paymentKey',

      tax,

      supplyValue,

      tip: 0,

    });

    if (result.type === 'CANCELED' || result.type === 'TIMEOUT') {

      return;

    }

    switch (result.response.paymentMethod) {

      case 'CARD':

        console.log(result.response.card);

        break;

      case 'BARCODE':

        console.log(result.response.barcode);

        break;

      case 'CASH':

        console.log(result.response.cash);

        break;

    }

  },

});
```
주문 목록 예시
- 이미지 없음 ![주문목록-1](https://docs.tossplace.com/images/front-plugin/%EC%A3%BC%EB%AC%B8%EB%AA%A9%EB%A1%9D-1.png)
- 이미지 있음 ![주문목록-2](https://docs.tossplace.com/images/front-plugin/%EC%A3%BC%EB%AC%B8%EB%AA%A9%EB%A1%9D-2.png) 

## renderOrderResultPage

주문 결과를 표시하는 API입니다.

### 파라미터

### 주요 특징

- 결제 완료 후 결과를 보여주는 용도입니다.
- `order.items` 는 직접 명시합니다.
- `summary.items` 를 통해 추가 정보를 표시할 수 있으며, `theme` 으로 색상을 지정할 수 있습니다.
- `cta` 버튼을 통해 다음 화면으로 이동합니다.
- `type` 의 `paid` 는 결제 금액을, `cancelled` 는 취소 금액을 나타냅니다.

### 사용 예시

주문 결과 예시
- paid ![주문결과](https://docs.tossplace.com/images/front-plugin/%EC%A3%BC%EB%AC%B8%EA%B2%B0%EA%B3%BC-1.png)
- cancelled ![주문결과](https://docs.tossplace.com/images/front-plugin/%EC%A3%BC%EB%AC%B8%EA%B2%B0%EA%B3%BC-2.png) 

## renderOnboardingPage

온보딩 화면을 렌더링하는 API입니다.

### 파라미터

### 사용 예시

```js
jssdk.template.renderOnboardingPage({

  title: "___ 로그인",

  inputs: {

    id: {

      label: "매장 아이디",

      type: "text",

      placeholder?: "매장 아이디를 입력해주세요",

    },

    password: {

      label: "숫자 비밀번호",

      type: "password",

      mode?: 'numeric', // numeric 키패드 모드 지원 (default: 'text')

      placeholder?: "비밀번호를 입력해주세요",

      maxLength?: 4,

      onChange?: (value) => { console.log(value) },

    },

  },

  onSubmit: async (values) => {

    try {

      const { serialNumber } = await sdk.app.getSerialNumber();

      const response = await fetch("https://example.com", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({ ...values, serialNumber }),

      });

      const { token } = await response.json();

      await sdk.storage.set({ key: "token", value: token });

      location.href = "./home";

    } catch (e) {

      throw new Error("서버 오류가 발생했습니다.");

    }

  },

  logoUrl?: '' // 커스텀 로고 URL

})
```
온보딩 화면 예시

![온보딩화면](https://docs.tossplace.com/images/front-plugin/%EC%98%A8%EB%B3%B4%EB%94%A9%ED%99%94%EB%A9%B4.png)

## renderSelectPage

단일 선택 화면을 렌더링하는 API입니다.

### 파라미터

### 사용 예시

선택 화면 예시

![언어선택](https://docs.tossplace.com/images/front-plugin/%EC%96%B8%EC%96%B4%EC%84%A0%ED%83%9D.png)

## renderMultiSelectPage

다중 선택 화면을 렌더링하는 API입니다.

### 파라미터

### 주요 특징

- 하단 버튼의 text에 함수를 넣으면 선택 항목에 따라 버튼 텍스트가 동적으로 변경됩니다.

### 사용 예시

다중 선택 화면 예시

![선택화면](https://docs.tossplace.com/images/front-plugin/%EC%84%A0%ED%83%9D%ED%99%94%EB%A9%B4.png)

## renderQRScanPage

QR/바코드 스캔 화면을 렌더링하는 API입니다.

### 파라미터

### 주요 특징

- 결제 이외의 QR/바코드 스캔에 사용됩니다.
- 스캔 성공 시 `onSuccess` 콜백이 호출됩니다.

### 사용 예시

QR 스캔 화면 예시

![QR코드스캔](https://docs.tossplace.com/images/front-plugin/QRcode.png)

## renderResultPage

결과 화면을 렌더링하는 API입니다.

### 파라미터

### 주요 특징

- 성공/실패 이미지 또는 텍스트 타입을 지원합니다.
- 3-10초 후 자동으로 `onTimeout` 이 호출됩니다.
- 최대 2개의 버튼을 표시할 수 있습니다.
- `localeCode` 가 'en'일 경우 영어 텍스트가 표시됩니다.

### 사용 예시

결과 화면 예시
- 성공 ![결과-성공](https://docs.tossplace.com/images/front-plugin/%EA%B2%B0%EA%B3%BC-%EC%84%B1%EA%B3%B5.png)
- 실패 ![결과-실패](https://docs.tossplace.com/images/front-plugin/%EA%B2%B0%EA%B3%BC-%EC%8B%A4%ED%8C%A8.png)
- 텍스트 ![결과-텍스트](https://docs.tossplace.com/images/front-plugin/%EA%B2%B0%EA%B3%BC-%ED%85%8D%EC%8A%A4%ED%8A%B8.png) 

## renderInputPage

사용자 입력 화면을 렌더링하는 API입니다. 4가지 입력 타입을 지원합니다.

### 파라미터

```typescript
typescripttype Params =

  | TextInputPage

  | NumberInputPage

  | PhoneInputPage

  | IdentificationInputPage;

interface TextInputPage {

  type: "text";

  top: {

    title: string;

    subtitle?: string;

  };

  input: {

    placeholder: string;

    type?: "password"; // default: 'text'

    maxLength?: number;

    onChange?: (value: string) => void;

  };

  button: {

    label: string;

  };

  disclaimer?: string;

  onSubmit: (value: string) => Promise<void> | void;

}

interface NumberInputPage {

  type: "number";

  top: {

    title: string;

    subtitle?: string;

  };

  input: {

    placeholder: string;

    type?: "password"; // default: 'number'

    maxLength?: number;

    onChange?: (value: string) => void;

  };

  button: {

    label: string;

  };

  disclaimer?: string;

  onSubmit: (value: string) => Promise<void> | void;

}

interface PhoneInputPage {

  type: "phone";

  top: {

    title: string;

    subtitle?: string;

  };

  input: {

    placeholder: string;

    onChange?: (value: string) => void;

  };

  disclaimer?: string;

  onSubmit: (value: string) => Promise<void> | void;

}

interface IdentificationInputPage {

  type: "identification";

  top: {

    title: string;

    subtitle?: string;

  };

  input: {

    onChange?: (value: string) => void;

  };

  disclaimer?: string;

  onSubmit: (value: string) => Promise<void> | void;

}
```

### 타입별 특징 및 예시

#### text

일반 텍스트 입력을 위한 화면입니다.

텍스트 입력 화면 예시

![이름입력](https://docs.tossplace.com/images/front-plugin/%EC%9D%B4%EB%A6%84%EC%9E%85%EB%A0%A5.png)

#### number

숫자 키패드를 지원하는 입력 화면입니다.

숫자 입력 화면 예시

![숫자입력](https://docs.tossplace.com/images/front-plugin/%EC%88%AB%EC%9E%90%EC%9E%85%EB%A0%A5.png)

#### phone

전화번호 입력을 위한 화면입니다. 11자리 입력 시 자동으로 `onSubmit` 이 실행됩니다.

전화번호 입력 화면 예시

![휴대폰번호입력](https://docs.tossplace.com/images/front-plugin/%ED%9C%B4%EB%8C%80%ED%8F%B0%EB%B2%88%ED%98%B8%EC%9E%85%EB%A0%A5.png)

#### identification

주민등록번호 입력을 위한 화면입니다. 앞자리 6자리/뒷자리 7자리 입력 시 자동으로 `onSubmit` 이 실행됩니다.

주민등록번호 입력 화면 예시

![주민등록번호입력](https://docs.tossplace.com/images/front-plugin/%EC%A3%BC%EB%AF%BC%EB%93%B1%EB%A1%9D%EB%B2%88%ED%98%B8%EC%9E%85%EB%A0%A5.png)

## renderSearchPage

검색 화면을 렌더링하는 API입니다.

### 파라미터

### 주요 특징

- 검색어는 debounce 처리됩니다.
- 검색어 변경 시 `getOptions` 가 실행되어 결과를 표시합니다.
- 옵션 선택 시 `onSubmit` 이 실행됩니다.

### 사용 예시

검색 화면 예시

![검색화면](https://docs.tossplace.com/images/front-plugin/%EA%B2%80%EC%83%89%ED%99%94%EB%A9%B4.png)

## renderSignPage

서명 입력 화면을 렌더링하는 API입니다.

### 파라미터

### 주요 특징

- 서명 완료 시 base64 형식의 이미지가 반환됩니다.
- 이미지는 `data:image/png;base64,<base64str>` 형식으로 확인할 수 있습니다.

### 사용 예시

## startTimer

렌더링된 페이지 내에서 타이머를 실행하는 API입니다.

### 파라미터

### 주요 특징

- 함수 호출 즉시 타이머가 실행됩니다. 중복 호출에 유의해주세요.
- `duration(sec)` 시간이 되면, `onTimeout` 콜백 함수가 호출되며, 타이머가 종료됩니다.
- `warnAt(sec)` 시간이 되면, 경고 모달이 노출됩니다. 경고 모달의 제목만 `title` 로 제어가 가능합니다.