---
title: "Table API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/table.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Table API

Toss POS에서 테이블 관리를 위한 API입니다. 테이블 정보 조회, 퇴장 처리, 이벤트 구독 등의 기능을 제공합니다.

주의사항

이 API는 POS에서 업종이 `음식점 -> 후불형 매장` 일 때만 활성화됩니다.

## Types

### PluginTable

테이블의 기본 정보를 나타내는 객체입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| id | number | 필수 | 테이블 ID | 1 |
| hallId | number | 필수 | 공간 ID | 1 |
| title | string | 필수 | 테이블명 | '1번 테이블' |
| capacity | number | 선택 | 테이블에 앉을 수 있는 인원 수 | 4 |
| group | [PluginTableGroup](https://docs.tossplace.com/reference/plugin-sdk/pos/#plugintablegroup) | 선택 | 테이블 그룹 정보 |  |

### PluginTableGroup

테이블 그룹의 정보를 나타내는 객체입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| id | number | 필수 | 그룹 ID | 1 |
| color | string | 필수 | 그룹 색상 | '#FF0000' |
| merchantId | number | 필수 | 매장 ID | 1 |
| tableIds | number\[\] | 필수 | 그룹에 속한 테이블 ID | \[1, 2\] |

## Methods

### getTable

매장의 전체 테이블 목록을 조회합니다.

### getTables

매장의 전체 테이블 목록을 조회합니다.

### clearTable

테이블을 퇴장 처리합니다.

### on

이벤트 구독을 위한 메서드입니다.

#### order-update

테이블의 변경되었을 때 발생하는 이벤트입니다.

#### order-add

테이블에 새로운 주문이 추가되었을 때 발생하는 이벤트입니다.

#### clear

테이블이 비워졌을 때 발생하는 이벤트입니다.

#### add

테이블이 새로 추가되었을 때 발생하는 이벤트입니다.

#### delete

테이블이 삭제되었을때 발생하는 이벤트입니다.

#### update

테이블의 정보가 수정되었을 때 발생하는 이벤트입니다

#### swap, move

테이블이 이동되었을 때 발생하는 이벤트입니다.

#### merge

테이블이 합쳐졌을 때 발생하는 이벤트입니다.

## 사용 예시

### 테이블 관리 클래스

```ts
tsimport { posPluginSdk } from '@tossplace/pos-plugin-sdk';

class TableManager {

  private tables: PluginTable[] = [];

  /**

   * 테이블 목록 조회 및 초기화

   */

  async initialize() {

    try {

      this.tables = await posPluginSdk.table.getTables();

      this.setupEventListeners();

    } catch (error) {

      console.error('테이블 초기화 실패:', error);

    }

  }

  /**

   * 이벤트 리스너 설정

   */

  private setupEventListeners() {

    posPluginSdk.table.on('order-update', this.handleOrderUpdate.bind(this));

    posPluginSdk.table.on('add', this.handleTableAdd.bind(this));

    posPluginSdk.table.on('clear', this.handleTableClear.bind(this));

    posPluginSdk.table.on('swap', this.handleTableSwap.bind(this));

    posPluginSdk.table.on('merge', this.handleTableMerge.bind(this));

  }

  /**

   * 주문 변경 이벤트 처리

   */

  private handleOrderUpdate(table: PluginTable) {

    console.log('주문 변경:', table.title);

  }

  /**

   * 테이블 점유 이벤트 처리

   */

  private handleTableAdd(table: PluginTable) {

    console.log('테이블 점유:', table.title);

  }

  /**

   * 테이블 비우기 이벤트 처리

   */

  private handleTableClear(table: PluginTable) {

    console.log('테이블 비우기:', table.title);

  }

  /**

   * 테이블 이동 이벤트 처리

   */

  private handleTableSwap(before: PluginTable, after: PluginTable) {

    console.log('테이블 이동:', {

      from: before.title,

      to: after.title,

    });

  }

  /**

   * 테이블 합치기 이벤트 처리

   */

  private handleTableMerge(before: PluginTable, after: PluginTable) {

    console.log('테이블 합치기:', {

      from: before.title,

      to: after.title,

    });

  }

  /**

   * 테이블 퇴장 처리

   * @param tableId 테이블 ID

   */

  async clearTable(tableId: number) {

    const table = this.tables.find((t) => t.id === tableId);

    if (table) {

      await posPluginSdk.table.clearTable(table);

    }

  }

}

// 사용 예시

async function manageTables() {

  const tableManager = new TableManager();

  await tableManager.initialize();

}
```