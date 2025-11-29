---
title: "Camera API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/front/camera.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Camera API

토스 프론트에서 QR 코드 스캔 기능을 제공하는 API입니다. 카메라를 통한 QR 코드 인식 및 데이터 처리를 지원합니다.

## Methods

### startQrScan

QR 코드 스캔을 위한 카메라를 실행합니다.

**주의사항**: 카메라를 실행하는 동안 `document.body` 에 `background: transparent` 가 적용됩니다.

#### Example

### stopQrScan

실행 중인 QR 코드 스캔 카메라를 종료합니다.

#### Example

### listenData

QR 코드 스캔 결과를 이벤트로 수신합니다.

#### Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `callback` | `Function` | ✓ | \- | 스캔 결과를 처리할 콜백 함수 |

**콜백 함수 파라미터**:

- `params.value` (string): 스캔된 QR 코드 값

#### Example

## 사용 예시

### QR 스캔 관리 클래스

```js
jsclass QrScanner {

  constructor() {

    this.isScanning = false;

    this.unlistenData = null;

  }

  /**

   * QR 코드 스캔 시작

   */

  async startScan() {

    if (this.isScanning) {

      console.warn("이미 스캔 중입니다.");

      return;

    }

    try {

      await sdk.camera.startQrScan();

      this.isScanning = true;

      this.setupEventListener();

    } catch (error) {

      console.error("QR 스캔 시작 실패:", error);

      throw error;

    }

  }

  /**

   * QR 코드 스캔 종료

   */

  async stopScan() {

    if (!this.isScanning) {

      console.warn("스캔 중이 아닙니다.");

      return;

    }

    try {

      await sdk.camera.stopQrScan();

      this.isScanning = false;

      this.cleanupEventListener();

    } catch (error) {

      console.error("QR 스캔 종료 실패:", error);

      throw error;

    }

  }

  /**

   * 이벤트 리스너 설정

   */

  setupEventListener() {

    this.unlistenData = sdk.camera.listenData(this.handleScanResult.bind(this));

  }

  /**

   * 이벤트 리스너 정리

   */

  cleanupEventListener() {

    if (this.unlistenData) {

      this.unlistenData();

      this.unlistenData = null;

    }

  }

  /**

   * 스캔 결과 처리

   * @param {Object} params 스캔 결과 파라미터

   */

  handleScanResult(params) {

    console.log("QR 코드 스캔 결과:", params.value);

    // 스캔 결과에 따른 추가 처리 로직

  }

}

// 사용 예시

async function scanQrCode() {

  const scanner = new QrScanner();

  try {

    // QR 코드 스캔 시작

    await scanner.startScan();

    // 일정 시간 후 스캔 종료 (예: 30초)

    setTimeout(async () => {

      await scanner.stopScan();

    }, 30000);

  } catch (error) {

    console.error("QR 코드 스캔 중 오류 발생:", error);

  }

}
```