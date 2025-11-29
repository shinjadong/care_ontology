---
title: "Option API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/option.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Option API

Toss POS에서 카탈로그와 함께 사용할 수 있는 옵션 관리 API입니다. 토핑 선택, 사이즈 선택, 샷 추가 등의 옵션을 관리할 수 있습니다.

## Types

### PluginCatalogItemOption

카탈로그 아이템의 옵션 정보를 나타내는 객체입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| id | number | 필수 | 옵션 ID | 1 |
| title | string | 필수 | 옵션명 | '커피온도' |
| titleI18n | [PluginLanguagePack](https://docs.tossplace.com/reference/plugin-sdk/pos/languagePack.html) | 선택 | 옵션명 다국어 |  |
| isRequired | boolean | 필수 | 필수 옵션 여부 | true |
| minChoices | number | 필수 | 최소 선택 수량 | 1 |
| maxChoices | number | 필수 | 최대 선택 수량 (-1: 무제한) | 1 |
| choices | [PluginCatalogItemOptionChoice](https://docs.tossplace.com/reference/plugin-sdk/pos/#plugincatalogitemoptionchoice) \[\] | 필수 | 옵션 선택지 목록 | \[hot, ice\] |
| defaultChoices | number\[\] | 필수 | 기본 선택된 옵션 ID 목록 | \[1\] |

### PluginCatalogItemOptionChoice

옵션의 선택지 정보를 나타내는 객체입니다. 포스에 등록되어있는 옵션의 선택지입니다

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| id | number | 필수 | 선택지 ID | 1 |
| title | string | 필수 | 선택지명 | 'hot' |
| titleI18n | [PluginLanguagePack](https://docs.tossplace.com/reference/plugin-sdk/pos/languagePack.html) | 선택 | 선택지명 다국어 |  |
| priceValue | number | 필수 | 추가 가격 | 0 |
| imageUrl | string \| null | 필수 | 아이콘 URL | ' [https://toss.imimages/option.png](https://toss.imimages/option.png) ' |
| state | 'ON\_SALE' \| 'SOLD\_OUT' | 필수 | 판매 상태 | 'ON\_SALE' |
| quantityInputEnabled | boolean | 필수 | 옵션이 수량선택 가능한지 여부 | false |

### PluginOrderItemOptionChoice

옵션의 선택지 정보를 나타내는 객체입니다. 손님이 선택하는 옵션의 정보입니다

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| id | number | 필수 | 선택지 ID | 1 |
| title | string | 필수 | 선택지명 | 'hot' |
| titleI18n | [PluginLanguagePack](https://docs.tossplace.com/reference/plugin-sdk/pos/languagePack.html) | 선택 | 선택지명 다국어 |  |
| priceValue | number | 필수 | 추가 가격 | 0 |
| imageUrl | string \| null | 필수 | 아이콘 URL | ' [https://toss.imimages/option.png](https://toss.imimages/option.png) ' |
| state | 'ON\_SALE' \| 'SOLD\_OUT' | 필수 | 판매 상태 | 'ON\_SALE' |
| quantity | number | 필수 | 판매 수량 | 1 |

## Methods

### getOption

모든 옵션 목록을 조회합니다.

### getOptions

모든 옵션 목록을 조회합니다.

### on

이벤트 구독을 위한 메서드입니다.

#### sold-out

옵션이 품절되었을 때 발생하는 이벤트입니다.

#### on-sale

옵션의 상태가 판매중으로 변경되었을 때 발생하는 이벤트입니다.

#### update

옵션의 정보가 업데이트 되었을 때 발생하는 이벤트입니다.

#### add

옵션이 새로 추가되었을 때 발생하는 이벤트입니다.

#### delete

옵션이 삭제되었을 때 발생하는 이벤트입니다.

## 사용 예시

### 옵션 관리 클래스

```ts
tsimport { posPluginSdk } from '@tossplace/pos-plugin-sdk';

class OptionManager {

  private options: PluginCatalogItemOption[] = [];

  /**

   * 옵션 목록 조회 및 초기화

   */

  async initialize() {

    try {

      this.options = await posPluginSdk.option.getOptions();

      this.setupEventListeners();

    } catch (error) {

      console.error('옵션 초기화 실패:', error);

    }

  }

  /**

   * 이벤트 리스너 설정

   */

  private setupEventListeners() {

    posPluginSdk.option.on('sold-out', this.handleSoldOut.bind(this));

    posPluginSdk.option.on('on-sale', this.handleOnSale.bind(this));

    posPluginSdk.option.on('update', this.handleUpdate.bind(this));

    posPluginSdk.option.on('add', this.handleAdd.bind(this));

    posPluginSdk.option.on('delete', this.handleDelete.bind(this));

  }

  /**

   * 품절 이벤트 처리

   */

  private handleSoldOut(option: PluginCatalogItemOption) {

    console.log('옵션 품절:', option.title);

  }

  /**

   * 판매중 이벤트 처리

   */

  private handleOnSale(option: PluginCatalogItemOption) {

    console.log('옵션 판매중:', option.title);

  }

  /**

   * 옵션 업데이트 이벤트 처리

   */

  private handleUpdate(option: PluginCatalogItemOption) {

    console.log('옵션 업데이트:', option.title);

  }

  /**

   * 옵션 추가 이벤트 처리

   */

  private handleAdd(option: PluginCatalogItemOption) {

    console.log('옵션 추가:', option.title);

  }

  /**

   * 옵션 삭제 이벤트 처리

   */

  private handleDelete(option: PluginCatalogItemOption) {

    console.log('옵션 삭제:', option.title);

  }

  /**

   * 필수 옵션 목록 조회

   */

  getRequiredOptions(): PluginCatalogItemOption[] {

    return this.options.filter((option) => option.isRequired);

  }

  /**

   * 옵션 ID로 조회

   */

  getOptionById(id: number): PluginCatalogItemOption | undefined {

    return this.options.find((option) => option.id === id);

  }

}

// 사용 예시

async function manageOptions() {

  const optionManager = new OptionManager();

  await optionManager.initialize();

}
```