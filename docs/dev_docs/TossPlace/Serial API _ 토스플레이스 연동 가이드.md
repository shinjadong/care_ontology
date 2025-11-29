---
title: "Serial API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/front/serial.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Serial API

토스 프론트에서 시리얼 포트 통신을 위한 API입니다. 외부 장치와의 데이터 송수신을 지원합니다.

## Methods

### open

시리얼 포트를 열고 통신을 시작합니다.

#### Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `options` | `Object` |  | \- | 시리얼 포트 설정 |
| `options.baudRate` | `number` |  | 9600 | 통신 속도 |

#### Example

### close

열려있는 시리얼 포트를 닫습니다.

#### Example

### write

시리얼 포트를 통해 데이터를 송신합니다.

#### Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `data` | `Object` | ✓ | \- | 송신할 데이터 객체 |
| `data.data` | `Uint8Array` | ✓ | \- | 송신할 데이터 배열 |

#### Example

### listen

시리얼 포트로부터 데이터를 수신합니다.

#### Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `callback` | `Function` | ✓ | \- | 수신된 데이터를 처리할 콜백 함수 |

**콜백 함수 파라미터**:

- `params.data` (Uint8Array): 수신된 데이터 배열

#### Example

## 사용 예시

### 시리얼 통신 관리 클래스

```js
jsclass SerialManager {

  constructor() {

    this.isOpen = false;

    this.unlisten = null;

  }

  /**

   * 시리얼 포트 열기

   * @param {number} baudRate 통신 속도

   */

  async open(baudRate = 9600) {

    if (this.isOpen) {

      console.warn("이미 시리얼 포트가 열려있습니다.");

      return;

    }

    try {

      await sdk.serial.open({ baudRate });

      this.isOpen = true;

      this.setupEventListener();

    } catch (error) {

      console.error("시리얼 포트 열기 실패:", error);

      throw error;

    }

  }

  /**

   * 시리얼 포트 닫기

   */

  async close() {

    if (!this.isOpen) {

      console.warn("시리얼 포트가 열려있지 않습니다.");

      return;

    }

    try {

      await sdk.serial.close();

      this.isOpen = false;

      this.cleanupEventListener();

    } catch (error) {

      console.error("시리얼 포트 닫기 실패:", error);

      throw error;

    }

  }

  /**

   * 데이터 송신

   * @param {Uint8Array} data 송신할 데이터

   */

  async write(data) {

    if (!this.isOpen) {

      throw new Error("시리얼 포트가 열려있지 않습니다.");

    }

    try {

      await sdk.serial.write({ data });

    } catch (error) {

      console.error("데이터 송신 실패:", error);

      throw error;

    }

  }

  /**

   * 이벤트 리스너 설정

   */

  setupEventListener() {

    this.unlisten = sdk.serial.listen(this.handleData.bind(this));

  }

  /**

   * 이벤트 리스너 정리

   */

  cleanupEventListener() {

    if (this.unlisten) {

      this.unlisten();

      this.unlisten = null;

    }

  }

  /**

   * 수신 데이터 처리

   * @param {Object} params 수신된 데이터

   * @param {Uint8Array} params.data 수신된 데이터 배열

   */

  handleData(params) {

    console.log("수신된 데이터:", params.data);

    // 수신된 데이터에 따른 추가 처리 로직

  }

}

// 사용 예시

async function communicateWithDevice() {

  const serial = new SerialManager();

  try {

    // 시리얼 포트 열기

    await serial.open(9600);

    // 데이터 송신

    await serial.write(Uint8Array.from([0x04]));

    // 일정 시간 후 시리얼 포트 닫기

    setTimeout(async () => {

      await serial.close();

    }, 5000);

  } catch (error) {

    console.error("시리얼 통신 중 오류 발생:", error);

  }

}
```