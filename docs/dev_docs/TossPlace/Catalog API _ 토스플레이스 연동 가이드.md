---
title: "Catalog API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/catalog.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Catalog API

Toss POS 플러그인에서 매장의 메뉴 정보를 관리하는 API입니다. 메뉴의 기본 정보, 가격, 옵션 등을 포함하여 종합적인 메뉴 관리를 제공합니다.

## Types

### PluginCatalogItem

메뉴의 기본 정보를 나타내는 객체입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| id | number | 필수 | 메뉴의 고유 ID | 1 |
| title | string | 필수 | 메뉴명 | '아메리카노' |
| titleI18n | [PluginLanguagePack](https://docs.tossplace.com/reference/plugin-sdk/pos/languagePack.html) | 선택 | 다국어 지원 메뉴명 |  |
| state | 'ON\_SALE' \| 'SOLD\_OUT' \| 'UNAVAILABLE' \| 'DELETED' | 필수 | 메뉴 상태 | 'ON\_SALE' |
| description | string | 선택 | 메뉴 설명 | '아메리카노' |
| descriptionI18n | [PluginLanguagePack](https://docs.tossplace.com/reference/plugin-sdk/pos/languagePack.html) | 선택 | 다국어 지원 설명 |  |
| category |  | 필수 | 메뉴 카테고리 |  |
| labels.title | string | 필수 | 라벨명 | 'HOT' |
| labels.color | string | 필수 | 라벨 색상 | '#FF0000' |
| imageUrl | string | 선택 | 메뉴 이미지 URL | ' [https://toss.imimages/americano.png](https://toss.imimages/americano.png) ' |
| price | [PluginCatalogItemPrice](https://docs.tossplace.com/reference/plugin-sdk/pos/#plugincatalogitemprice) | 필수 | 가격 정보 |  |
| options | [PluginCatalogItemOption](https://docs.tossplace.com/reference/plugin-sdk/pos/option.html#plugincatalogitemoption) \[\] | 필수 | 옵션 목록 |  |

### PluginCatalogItemPrice

메뉴의 가격 정보를 나타내는 객체입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| id | number | 필수 | 가격 ID | 1 |
| title | string | 필수 | 가격명 | '기본가격' |
| isDefault | boolean | 필수 | 기본 가격 여부 | true |
| state | 'ON\_SALE' \| 'SOLD\_OUT' \| 'UNAVAILABLE' \| 'DELETED' | 필수 | 가격 상태 | 'ON\_SALE' |
| sku | string | 선택 | 재고 관리 코드 | '123456' |
| barcode | string | 선택 | 바코드 정보 | '123456' |
| priceType | 'FIXED' \| 'VARIABLE' \| 'UNIT' | 필수 | 가격 유형 | 'FIXED' |
| priceUnit | number | 필수 | 기본 수량 | 1 |
| priceValue | number | 필수 | 부가세 포함 가격 | 10000 |
| isTaxFree | boolean | 필수 | 비과세 여부 | false |
| isStockable | boolean | 필수 | 재고 관리 여부 | true |
| stockQuantity.remainQuantity | number | 필수 | 현재 재고 | 10 |
| stockQuantity.lastChangeDateTime | string | 필수 | 마지막 변경 시간 | '2021-01-01T00:00:00Z' |

## Methods

### getCatalog

매장의 카탈로그를 조회합니다.

### getCatalogs

매장의 카탈로그 목록을 조회합니다.

### on

이벤트 구독을 위한 메서드입니다.

#### sold-out

메뉴가 품절되었을 때 발생하는 이벤트입니다.

#### on-sale

메뉴가 판매 가능 상태로 변경되었을 때 발생하는 이벤트입니다.

#### update

메뉴의 정보가 업데이트되었을 때 발생하는 이벤트입니다.

#### add

메뉴가 추가되었을 때 발생하는 이벤트입니다

#### delete

메뉴가 삭제되었을 때 발생하는 이벤트입니다

## 사용 예시

### 카탈로그 관리 클래스

```ts
tsimport { posPluginSdk } from '@tossplace/pos-plugin-sdk';

class CatalogManager {

    private catalogs: PluginCatalogItem[] = [];

    /**

     * 카탈로그 목록 조회 및 초기화

     */

    async initialize() {

        try {

            this.catalogs = await posPluginSdk.catalog.getCatalogs();

            this.setupEventListeners();

        } catch (error) {

            console.error('카탈로그 초기화 실패:', error);

        }

    }

    /**

     * 이벤트 리스너 설정

     */

    private setupEventListeners() {

        posPluginSdk.catalog.on('sold-out', this.handleSoldOut.bind(this));

        posPluginSdk.catalog.on('on-sale', this.handleOnSale.bind(this));

    }

    /**

     * 품절 이벤트 처리

     * @param catalog 품절된 메뉴 정보

     */

    private handleSoldOut(catalog: PluginCatalogItem) {

        console.log('품절 알림:', catalog.title);

        // 품절 처리 로직

    }

    /**

     * 판매 가능 이벤트 처리

     * @param catalog 판매 가능 상태로 변경된 메뉴 정보

     */

    private handleOnSale(catalog: PluginCatalogItem) {

        console.log('판매 가능 알림:', catalog.title);

        // 판매 가능 처리 로직

    }

    /**

     * 메뉴 정보 조회

     * @param menuId 메뉴 ID

     * @returns 메뉴 정보

     */

    getMenu(menuId: number): PluginCatalogItem | undefined {

        return this.catalogs.find(menu => menu.id === menuId);

    }

}

// 사용 예시

async function manageCatalog() {

    const catalogManager = new CatalogManager();

    await catalogManager.initialize();

}
```

### 재고 관리 예시

```ts
tsimport { posPluginSdk } from '@tossplace/pos-plugin-sdk';

/**

 * 재고 상태 확인

 * @param catalog 메뉴 정보

 * @returns 재고 상태 메시지

 */

function checkStockStatus(catalog: PluginCatalogItem): string {

    const price = catalog.price;

    if (!price.isStockable || !price.stockQuantity) {

        return '재고 관리 대상이 아닙니다.';

    }

    const { remainQuantity } = price.stockQuantity;

    if (remainQuantity <= 0) {

        return '품절';

    } else if (remainQuantity <= 5) {

        return \`재고 부족 (${remainQuantity}개 남음)\`;

    }

    return \`재고 있음 (${remainQuantity}개)\`;

}

// 사용 예시

async function monitorStock() {

    const catalogs = await posPluginSdk.catalog.getCatalogs();

    catalogs.forEach(catalog => {

        const status = checkStockStatus(catalog);

        console.log(\`${catalog.title}: ${status}\`);

    });

}

// 품절 이벤트 구독

posPluginSdk.catalog.on("sold-out", (catalog) => {

  console.log("품절된 메뉴:", catalog.title);

});

// 판매중 이벤트 구독

posPluginSdk.catalog.on("on-sale", (catalog) => {

  console.log("판매중으로 변경된 메뉴:", catalog.title);

});
```