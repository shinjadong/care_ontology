---
title: "Storage API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/front/storage.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Storage API

토스 프론트에서 로컬 데이터 저장소를 관리하기 위한 API입니다. 간단한 키-값 형태의 데이터를 저장하고 관리할 수 있습니다.

## Methods

### get

저장소에서 특정 키에 해당하는 값을 조회합니다.

#### Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `params` | `Object` | ✓ | \- | 조회 파라미터 |
| `params.key` | `string` | ✓ | \- | 조회할 키 |

#### Example

### set

저장소에 새로운 값을 저장하거나 기존 값을 업데이트합니다.

#### Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `params` | `Object` | ✓ | \- | 저장 파라미터 |
| `params.key` | `string` | ✓ | \- | 저장할 키 |
| `params.value` | `string` | ✓ | \- | 저장할 값 |

#### Example

### remove

저장소에서 특정 키에 해당하는 값을 삭제합니다.

#### Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `params` | `Object` | ✓ | \- | 삭제 파라미터 |
| `params.key` | `string` | ✓ | \- | 삭제할 키 |

#### Example

### clear

저장소의 모든 데이터를 삭제합니다.

#### Example

## 사용 예시

### 설정 관리 클래스

```js
jsclass SettingsManager {

  constructor() {

    this.PREFIX = "settings_";

  }

  /**

   * 설정 저장

   * @param {string} key 설정 키

   * @param {string} value 설정 값

   */

  async setSetting(key, value) {

    try {

      await sdk.storage.set({

        key: this.getFullKey(key),

        value,

      });

    } catch (error) {

      console.error("설정 저장 실패:", error);

      throw error;

    }

  }

  /**

   * 설정 조회

   * @param {string} key 설정 키

   * @returns {string|null} 설정 값

   */

  async getSetting(key) {

    try {

      const item = await sdk.storage.get({

        key: this.getFullKey(key),

      });

      return item.value;

    } catch (error) {

      console.error("설정 조회 실패:", error);

      throw error;

    }

  }

  /**

   * 설정 삭제

   * @param {string} key 설정 키

   */

  async removeSetting(key) {

    try {

      await sdk.storage.remove({

        key: this.getFullKey(key),

      });

    } catch (error) {

      console.error("설정 삭제 실패:", error);

      throw error;

    }

  }

  /**

   * 모든 설정 삭제

   */

  async clearSettings() {

    try {

      await sdk.storage.clear();

    } catch (error) {

      console.error("설정 초기화 실패:", error);

      throw error;

    }

  }

  /**

   * 전체 키 생성

   * @param {string} key 기본 키

   * @returns {string} 네임스페이스가 포함된 키

   */

  getFullKey(key) {

    return \`${this.PREFIX}${key}\`;

  }

}

// 사용 예시

async function manageSettings() {

  const settings = new SettingsManager();

  try {

    // 설정 저장

    await settings.setSetting("theme", "dark");

    // 설정 조회

    const theme = await settings.getSetting("theme");

    console.log("현재 테마:", theme);

    // 설정 삭제

    await settings.removeSetting("theme");

    // 모든 설정 초기화

    await settings.clearSettings();

  } catch (error) {

    console.error("설정 관리 중 오류 발생:", error);

  }

}
```