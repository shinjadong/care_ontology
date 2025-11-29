---
title: "Merchant API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/merchant.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Merchant API

POS 플러그인에서 현재 설치된 가맹점의 정보를 조회할 수 있는 API입니다. 매장의 기본 정보와 시리얼 번호 등을 확인할 수 있습니다.

## Types

### TossMerchant

가맹점의 기본 정보를 나타내는 객체입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| name | string | 필수 | 매장명 | '토스카페' |
| id | number | 필수 | 매장 고유 ID | 12345 |
| serialNumber | string | 필수 | 매장 시리얼 번호 | 'SN123456789' |

## Methods

### getMerchant

현재 플러그인이 설치된 매장의 정보를 조회합니다.

## 사용 예시

### 매장 정보 관리 클래스

```ts
tsimport { posPluginSdk } from '@tossplace/pos-plugin-sdk';

class MerchantManager {

    private merchant: TossMerchant | null = null;

    /**

     * 매장 정보 조회 및 초기화

     */

    async initialize() {

        try {

            this.merchant = await posPluginSdk.merchant.getMerchant();

            console.log('매장 정보 로드 완료:', this.merchant.name);

        } catch (error) {

            console.error('매장 정보 조회 실패:', error);

        }

    }

    /**

     * 매장명 조회

     * @returns 매장명

     */

    getStoreName(): string | null {

        return this.merchant?.name ?? null;

    }

    /**

     * 매장 ID 조회

     * @returns 매장 ID

     */

    getStoreId(): number | null {

        return this.merchant?.id ?? null;

    }

    /**

     * 시리얼 번호 조회

     * @returns 시리얼 번호

     */

    getSerialNumber(): string | null {

        return this.merchant?.serialNumber ?? null;

    }

}

// 사용 예시

async function manageMerchant() {

    const merchantManager = new MerchantManager();

    await merchantManager.initialize();

    const storeName = merchantManager.getStoreName();

    const storeId = merchantManager.getStoreId();

    const serialNumber = merchantManager.getSerialNumber();

    console.log('매장 정보:', {

        name: storeName,

        id: storeId,

        serialNumber: serialNumber

    });

}
```

### 매장 정보 검증

```ts
tsimport { posPluginSdk } from '@tossplace/pos-plugin-sdk';

/**

 * 매장 정보 유효성 검사

 * @param merchant 매장 정보

 * @returns 유효성 검사 결과

 */

function validateMerchant(merchant: TossMerchant): boolean {

    if (!merchant.name || merchant.name.trim() === '') {

        console.error('매장명이 유효하지 않습니다.');

        return false;

    }

    if (!merchant.id || merchant.id <= 0) {

        console.error('매장 ID가 유효하지 않습니다.');

        return false;

    }

    if (!merchant.serialNumber || merchant.serialNumber.trim() === '') {

        console.error('시리얼 번호가 유효하지 않습니다.');

        return false;

    }

    return true;

}

// 사용 예시

async function verifyMerchant() {

    try {

        const merchant = await posPluginSdk.merchant.getMerchant();

        const isValid = validateMerchant(merchant);

        

        if (isValid) {

            console.log('매장 정보가 유효합니다.');

        } else {

            console.error('매장 정보가 유효하지 않습니다.');

        }

    } catch (error) {

        console.error('매장 정보 검증 실패:', error);

    }

}
```