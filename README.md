# CareOn POS - 디지털 트윈 OS

소상공인을 위한 AI 기반 매장 운영 시스템의 결제 파이프라인입니다.

## 프로젝트 구조

```
care_ontology/
├── src/
│   ├── server/
│   │   ├── index.js              # 메인 서버
│   │   ├── adapters/
│   │   │   └── nicepay.js        # 나이스페이 결제 어댑터
│   │   ├── routes/
│   │   │   ├── payment.js        # 결제 API 라우트
│   │   │   └── webhook.js        # Webhook 수신 라우트
│   │   └── db/
│   │       └── sqlite.js         # SQLite 데이터베이스
│   └── public/
│       └── index.html            # POS 웹 인터페이스
├── data/                         # 데이터베이스 저장 (자동 생성)
├── docs/                         # 문서 및 리서치
│   └── dev_docs/
│       ├── nicepay/              # 나이스페이 연동 문서
│       └── TossPlace/            # 토스플레이스 문서 (참고용)
├── .env                          # 환경 설정
├── .env.example                  # 환경 설정 예시
└── package.json
```

## 빠른 시작

### 1. 의존성 설치

```bash
cd /home/user/care_ontology
npm install
```

### 2. 환경 설정

`.env` 파일을 편집하여 나이스페이 설정을 입력합니다:

```bash
# 테스트 모드 (기본값)
NICEPAY_MID=nicepay00m
NICEPAY_MERCHANT_KEY=EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==

# 운영 모드 (실제 가맹점 정보)
# NICEPAY_MID=케어온실제MID
# NICEPAY_MERCHANT_KEY=케어온실제키
```

### 3. 서버 실행

```bash
npm start
```

### 4. POS 접속

브라우저에서 열기: **http://localhost:3000**

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/` | POS 웹 인터페이스 |
| GET | `/api/status` | 서버 상태 확인 |
| POST | `/api/payment/request` | 결제 요청 생성 |
| POST | `/api/payment/approve` | 결제 승인 |
| POST | `/api/payment/cancel` | 결제 취소 |
| GET | `/api/payment/stats` | 오늘 매출 통계 |
| GET | `/api/payment/transactions` | 최근 거래 목록 |
| POST | `/webhook/nicepay` | 나이스페이 결제 통보 수신 |
| GET | `/api/events` | 이벤트 로그 (디지털 트윈 데이터) |

## 외부에서 Webhook 수신하기 (Ngrok)

WSL 환경에서 나이스페이 Webhook을 수신하려면 터널링이 필요합니다:

```bash
# 1. Ngrok 설치
# https://ngrok.com 에서 다운로드

# 2. 터널 실행
ngrok http 3000

# 3. 생성된 URL을 .env에 설정
# WEBHOOK_BASE_URL=https://xxxx.ngrok.io

# 4. 나이스페이 가맹점 관리자에서 통보 URL 설정
# https://merchants.nicepay.co.kr
# 결제통보 URL: https://xxxx.ngrok.io/webhook/nicepay
```

## 테스트 결제

테스트 모드에서는 다음 테스트 카드를 사용할 수 있습니다:
- **테스트 계정**: nicepay00m (자동 설정됨)
- **테스트 결제**: 23:30분에 일괄 취소됨

## 데이터베이스 스키마

### transactions (거래)
- `tid`: 거래 ID
- `order_id`: 주문 번호
- `amount`: 결제 금액
- `status`: pending | completed | failed | cancelled
- `card_name`: 카드사명
- `auth_code`: 승인번호

### orders (주문)
- `id`: 주문 ID
- `order_number`: 주문 번호 (당일 순번)
- `total_amount`: 총액
- `status`: pending | completed
- `items`: 주문 항목 (JSON)

### event_log (이벤트 로그)
- `event_type`: 이벤트 종류
- `entity_type`: 엔티티 타입
- `entity_id`: 엔티티 ID
- `payload`: 이벤트 데이터 (JSON)

## 개발 로드맵

- [x] **Phase 1**: 나이스페이 결제 파이프라인
- [ ] **Phase 2**: 메뉴/상품 관리
- [ ] **Phase 3**: 디지털 트윈 대시보드
- [ ] **Phase 4**: 음성 수집 인터페이스
- [ ] **Phase 5**: AI 분석 엔진

## 기술 스택

- **Backend**: Node.js, Express
- **Database**: SQLite (better-sqlite3)
- **Payment**: NicePay API
- **Frontend**: Vanilla JS (추후 React 마이그레이션 예정)

## 라이선스

MIT License - CareOn
