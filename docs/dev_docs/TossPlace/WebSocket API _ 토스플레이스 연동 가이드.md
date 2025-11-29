---
title: "WebSocket API | 토스플레이스 연동 가이드"
source: "https://docs.tossplace.com/reference/plugin-sdk/pos/websocket.html"
author:
published:
created: 2025-11-29
description: "토스 프론트, 토스 POS 연동 개발을 위한 가이드입니다"
tags:
  - "clippings"
---
## WebSocket API

POS 플러그인에서 실시간 양방향 통신을 위한 WebSocket 인터페이스를 제공합니다. 실시간 데이터 동기화나 이벤트 수신이 필요한 경우에 사용할 수 있습니다.

## WebSocket 생성

WebSocket 연결을 생성합니다.

## Methods

### connect

WebSocket 연결을 시작합니다.

### disconnect

WebSocket 연결을 종료합니다.

### send

메시지를 WebSocket 서버로 전송합니다.

## Event Handlers

### onMessage

메시지 수신 시 호출되는 콜백을 설정합니다.

### onError

에러 발생 시 호출되는 콜백을 설정합니다.

### onClose

연결 종료 시 호출되는 콜백을 설정합니다.

### onOpen

연결 성공 시 호출되는 콜백을 설정합니다.

## 사용 예시

### 실시간 주문 상태 모니터링

```ts
tsimport { websocket } from '@tossplace/pos-plugin-sdk';

class OrderMonitor {

    private ws: WebSocket;

    constructor(private url: string, private token: string) {}

    async connect() {

        // WebSocket 연결 생성

        this.ws = await websocket.create(this.url, {

            Authorization: \`Bearer ${this.token}\`,

        }, {

            timeout: 5000,

            rejectUnauthorized: true,

        });

        // 이벤트 핸들러 설정

        this.ws.onOpen(() => {

            console.log('주문 모니터링 시작');

        });

        this.ws.onMessage((message) => {

            const orderUpdate = JSON.parse(message);

            this.handleOrderUpdate(orderUpdate);

        });

        this.ws.onError((errorName, errorMessage) => {

            console.error('모니터링 에러:', errorName, errorMessage);

        });

        this.ws.onClose((code) => {

            console.log('모니터링 종료:', code);

        });

        // 연결 시작

        await this.ws.connect();

    }

    private handleOrderUpdate(update: any) {

        console.log('주문 상태 변경:', update);

        // 주문 상태 변경 처리 로직

    }

    async disconnect() {

        await this.ws.disconnect();

    }

}

// 사용 예시

async function monitorOrders() {

    const monitor = new OrderMonitor(

        'wss://api.example.com/orders',

        'your-auth-token'

    );

    try {

        await monitor.connect();

        // 모니터링 중...

    } catch (error) {

        console.error('모니터링 시작 실패:', error);

    } finally {

        await monitor.disconnect();

    }

}
```