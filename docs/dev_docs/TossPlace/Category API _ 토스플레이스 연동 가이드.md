---
title: "Category API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/category.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
[Skip to content](https://docs.tossplace.com/reference/plugin-sdk/pos/#VPContent)

## Category API

Toss POS 플러그인에서 메뉴를 카테고리별로 관리하는 API입니다. 메뉴를 논리적으로 그룹화하여 보기 쉽게 구성할 수 있습니다.

## Types

### PluginCatalogCategory

메뉴 카테고리의 정보를 나타내는 객체입니다.

| 필드 | 타입 | 필수 | 설명 | 예시 |
| --- | --- | --- | --- | --- |
| id | number | 필수 | 카테고리의 고유 ID | 1 |
| title | string | 필수 | 카테고리명 | '커피' |
| titleI18n | [PluginLanguagePack](https://docs.tossplace.com/reference/plugin-sdk/pos/languagePack.html) | 선택 | 다국어 지원을 위한 카테고리명 |  |

## Methods

### getCategory

메뉴의 카테고리를 조회합니다.

### getCategories

메뉴의 카테고리 목록을 조회합니다.

## on

### update

카테고리가 업데이트 되었을 때 발생하는 이벤트입니다

### delete

카테고리가 삭제되었을 때 발생하는 이벤트입니다

### add

카테고리가 추가되었을 때 발생하는 이벤트입니다