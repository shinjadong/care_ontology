---
title: "Printer API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/front/printer.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## Printer API

Toss POS에서 프린터를 제어하기 위한 API입니다. 결제된 건에 대한 영수증을 출력할 수 있습니다.

주의사항

**프린터 연결**: 토스 프론트에 프린터가 연결되어 있어야 합니다.

## Methods

### printReceipt

이미 결제된 건에 대해 토스 프론트에 연결된 프린터로 영수증을 출력합니다.

#### Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
| --- | --- | --- | --- | --- |
| `paymentKey` | `string` | ✓ | \- | 결제된 건의 paymentKey |
| `count` | `number` | ✓ | \- | 출력할 영수증 수량 |
| `orderInfo` | `Object` |  | \- | 주문 정보 (선택) |
| `additionalText` | `string` |  | \- | 추가 텍스트 (선택) |

#### Example

## 사용 예시

### 영수증 출력 관리 클래스

```js
jsclass ReceiptManager {

  /**

   * 영수증 출력

   * @param {string} paymentKey 결제 키

   * @param {number} count 출력 수량

   * @param {Object} [orderInfo] 주문 정보

   * @param {string} [additionalText] 추가 텍스트

   */

  async printReceipt(paymentKey, count = 1, orderInfo, additionalText) {

    try {

      await sdk.printer.printReceipt({

        paymentKey,

        count,

        orderInfo,

        additionalText,

      });

    } catch (error) {

      console.error("영수증 출력 실패:", error);

      throw error;

    }

  }

}

// 사용 예시

async function printReceiptExample() {

  const receiptManager = new ReceiptManager();

  try {

    await receiptManager.printReceipt(

      "paymentKey",

      1,

      {

        orderItems: [

          {

            count: 1,

            menu: {

              selectOptions: [

                {

                  title: "Extra Cheese",

                  price: 200,

                },

              ],

              title: "Pepperoni Pizza",

              originPrice: 600,

            },

            discounts: [

              {

                title: "Pepperoni Discount",

                price: 100,

              },

            ],

          },

        ],

        discounts: [

          {

            title: "Order Discount",

            price: 100,

          },

        ],

      },

      "Thank you for your purchase!"

    );

  } catch (error) {

    console.error("영수증 출력 중 오류 발생:", error);

  }

}
```
영수증 출력 예시

![영수증 출력 예시](https://docs.tossplace.com/images/front-plugin/%ED%94%84%EB%A6%B0%ED%84%B0%EC%98%88%EC%8B%9C.png)