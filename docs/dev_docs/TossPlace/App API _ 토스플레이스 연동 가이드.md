---
title: "App API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/front/app.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/reference/plugin-sdk/front/#VPContent)

## App API

토스 프론트의 기본 정보를 관리하는 API입니다. 단말기 설정, 매장 정보 조회, 시리얼 번호 확인 등의 기능을 제공합니다.

## Methods

### restartOnboarding

단말기를 로그아웃하고 온보딩 화면으로 이동합니다.

#### Example

### getSerialNumber

단말기의 고유 시리얼 번호를 조회합니다.

#### Example

### getMerchant

현재 로그인된 매장의 정보를 조회합니다.

#### Example

### openSetting

단말기의 설정 화면을 엽니다.

#### Example

### setIdle

첫화면으로 이동합니다.

#### Example

### isDebugMode

실행 중인 플러그인이 개발모드인지, 아닌지 확인합니다.

#### Example

## 사용 예시

### 단말기 관리 클래스

```js
jsclass DeviceManager {

  constructor() {

    this.serialNumber = null;

    this.merchant = null;

  }

  /**

   * 단말기 정보 초기화

   */

  async initialize() {

    try {

      const { serialNumber } = await sdk.app.getSerialNumber();

      this.serialNumber = serialNumber;

      this.merchant = await sdk.app.getMerchant();

    } catch (error) {

      console.error("단말기 정보 조회 실패:", error);

    }

  }

  /**

   * 단말기 로그아웃

   */

  async logout() {

    await sdk.app.restartOnboarding();

  }

  /**

   * 설정 화면 열기

   */

  async openSettings() {

    await sdk.app.openSetting();

  }

  /**

   * 매장 정보 조회

   * @returns {Object} 매장 정보

   */

  getMerchantInfo() {

    return this.merchant;

  }

  /**

   * 시리얼 번호 조회

   * @returns {string} 시리얼 번호

   */

  getSerialNumber() {

    return this.serialNumber;

  }

}

// 사용 예시

async function manageDevice() {

  const deviceManager = new DeviceManager();

  await deviceManager.initialize();

  // 매장 정보 출력

  const merchant = deviceManager.getMerchantInfo();

  console.log("매장명:", merchant.name);

  console.log("사업자등록번호:", merchant.businessNumber);

}
```