---
title: "FacePass API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/front/face-pass.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## FacePass API

토스 프론트에서 얼굴입장 인증 기능을 제공하는 API입니다. 얼굴 인식을 통한 사용자 인증 및 결과 처리를 지원합니다.

## Methods

### start

얼굴입장 인증을 시작합니다.

#### Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `params` | `Object` |  | \- | 인증 시작 파라미터 |
| `params.showResultScreen` | `boolean` |  | `true` | 결과 화면 직접 표시 여부 |

#### Response

**성공 시 (`type: 'SUCCESS'`)**

**취소 시 (`type: 'CANCELED'`)**

#### Example

### listenData

얼굴입장 인증 결과를 이벤트로 수신합니다.

#### Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `callback` | `Function` | ✓ | \- | 인증 결과를 처리할 콜백 함수 |

**콜백 함수 파라미터**:

- `params.merchantUserKey` (string, optional): 가맹점 사용자 키
- `params.authenticated` (boolean): 인증 성공 여부 (항상 `false`)
- `params.result` (string): 인증 결과 코드
	- `'Authenticated'`: 인증 성공
	- `'FaceFailed'`: 얼굴 인식 실패
	- `'Blocked'`: 차단됨
	- `'Denied'`: 거부됨
	- `'Disconnected'`: 연결 해제
	- `'WrongCode'`: 잘못된 코드
	- `'Timeout'`: 시간 초과
- `params.message` (string): 결과 메시지

#### Response

**성공 시**

#### Example

## 사용 예시

### 얼굴입장 인증 관리 클래스

```js
jsclass FacePassManager {

  constructor() {

    this.isAuthenticating = false;

    this.unlistenData = null;

  }

  /**

   * 얼굴입장 인증 시작

   * @param {boolean} showResultScreen 결과 화면 표시 여부

   */

  async startAuthentication(showResultScreen = true) {

    // 중복 인증 방지

    if (this.isAuthenticating) return;

    this.isAuthenticating = true;

    this.setupEventListener();

    const result = await sdk.facePass.start({ showResultScreen });

    if (result.type === "CANCELED") {

      this.cleanup();

    }

    return result;

  }

  /**

   * 인증 프로세스 정리

   */

  cleanup() {

    this.isAuthenticating = false;

    if (this.unlistenData) {

      this.unlistenData();

      this.unlistenData = null;

    }

  }

  /**

   * 이벤트 리스너 설정

   */

  setupEventListener() {

    this.unlistenData = sdk.facePass.listenData((params) => {

      this.handleData(params);

      this.cleanup();

    });

  }

  /**

   * 인증 결과 처리

   * @param {Object} params 인증 결과 파라미터

   */

  handleData(params) {

    switch (params.result) {

      case "Authenticated":

        console.log("인증 성공:", params.message);

        break;

      case "FaceFailed":

        console.log("얼굴 인식 실패:", params.message);

        break;

      case "Blocked":

        console.log("차단된 사용자:", params.message);

        break;

      case "Denied":

        console.log("인증 거부:", params.message);

        break;

      case "Disconnected":

        console.log("연결 해제:", params.message);

        break;

      case "WrongCode":

        console.log("잘못된 코드:", params.message);

        break;

      case "Timeout":

        console.log("인증 시간 초과:", params.message);

        break;

      default:

        console.log("알 수 없는 결과:", params.result, params.message);

    }

  }

}

// 사용 예시

const facePassManager = new FacePassManager();

// 기본 사용법

await facePassManager.startAuthentication();

// 결과 화면을 직접 처리하는 경우

await facePassManager.startAuthentication(false);
```