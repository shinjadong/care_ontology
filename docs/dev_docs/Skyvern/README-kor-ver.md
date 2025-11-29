<!-- DOCTOC SKIP -->

<h1 align="center">
 <a href="https://www.skyvern.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="fern/images/skyvern_logo.png"/>
    <img height="120" src="fern/images/skyvern_logo_blackbg.png"/>
  </picture>
 </a>
 <br />
</h1>
<p align="center">
🐉 LLM과 컴퓨터 비전을 활용한 브라우저 기반 워크플로우 자동화 🐉
</p>
<p align="center">
  <a href="https://www.skyvern.com/"><img src="https://img.shields.io/badge/Website-blue?logo=googlechrome&logoColor=black"/></a>
  <a href="https://www.skyvern.com/docs/"><img src="https://img.shields.io/badge/Docs-yellow?logo=gitbook&logoColor=black"/></a>
  <a href="https://discord.gg/fG2XXEuQX3"><img src="https://img.shields.io/discord/1212486326352617534?logo=discord&label=discord"/></a>
  <!-- <a href="https://pepy.tech/project/skyvern" target="_blank"><img src="https://static.pepy.tech/badge/skyvern" alt="Total Downloads"/></a> -->
  <a href="https://github.com/skyvern-ai/skyvern"><img src="https://img.shields.io/github/stars/skyvern-ai/skyvern" /></a>
  <a href="https://github.com/Skyvern-AI/skyvern/blob/main/LICENSE"><img src="https://img.shields.io/github/license/skyvern-ai/skyvern"/></a>
  <a href="https://twitter.com/skyvernai"><img src="https://img.shields.io/twitter/follow/skyvernai?style=social"/></a>
  <a href="https://www.linkedin.com/company/95726232"><img src="https://img.shields.io/badge/Follow%20 on%20LinkedIn-8A2BE2?logo=linkedin"/></a>
</p>

[Skyvern](https://www.skyvern.com)은 LLM(대규모 언어 모델)과 컴퓨터 비전을 활용하여 브라우저 기반의 워크플로우를 자동화합니다. 이는 수많은 웹사이트에서 수동 작업을 완벽하게 자동화할 수 있는 단순한 API 엔드포인트를 제공하며, 기존의 불안정하거나 신뢰할 수 없는 자동화 솔루션을 대체합니다.

📖 **LLM (대규모 언어 모델, Large Language Model)**
├─ **정의**: 수십억 개의 파라미터로 훈련된 AI 모델로, 텍스트를 이해하고 생성할 수 있음
├─ **쉬운 비유**: 방대한 책을 읽은 뛰어난 학자가 패턴을 학습한 후 질문에 답하는 것처럼 작동
└─ **왜 중요한가**: 웹 페이지의 맥락을 이해하고 사용자 의도를 파악하는 데 필수적

<p align="center">
  <img src="fern/images/geico_shu_recording_cropped.gif"/>
</p>

## 전통적 방식의 한계

기존 브라우저 자동화 접근법은 각 웹사이트마다 커스텀 스크립트를 작성해야 했으며, DOM 파싱과 XPath 기반 상호작용에 의존했습니다. 이런 방식은 웹사이트 레이아웃이 조금만 변해도 즉시 작동이 중단되는 문제가 있었습니다.

📖 **XPath (XML 경로 언어)**
├─ **정의**: 웹 페이지의 특정 요소를 찾기 위한 경로 지정 언어
├─ **쉬운 비유**: 책의 특정 문장을 찾기 위해 "3장 5절 2번째 문단"처럼 경로를 지정하는 것
└─ **문제점**: 웹사이트 구조가 변하면 이 경로가 더 이상 유효하지 않음

Skyvern은 코드 기반의 XPath 상호작용만 의존하는 대신, **Vision LLM**을 활용하여 웹사이트를 학습하고 상호작용합니다.

📖 **Vision LLM (시각 기반 대규모 언어 모델)**
├─ **정의**: 텍스트뿐만 아니라 이미지와 비디오도 이해할 수 있는 AI 모델
├─ **쉬운 비유**: 사람처럼 화면을 "보고" 그 위의 버튼, 텍스트, 필드를 이해하고 조작
└─ **장점**: 페이지 구조 변화에 훨씬 더 유연하게 대응

# 작동 원리

Skyvern은 [BabyAGI](https://github.com/yoheinakajima/babyagi)와 [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)가 대중화시킨 작업 주도형 자율 에이전트 설계에서 영감을 받았으며, 한 가지 주요 차별점이 있습니다: **[Playwright](https://playwright.dev/) 같은 브라우저 자동화 라이브러리를 사용하여 웹사이트와 상호작용할 수 있다는 것입니다.**

📖 **에이전트 (Agent)**
├─ **정의**: 주어진 목표를 달성하기 위해 독립적으로 생각하고 행동하는 AI 프로그램
├─ **쉬운 비유**: 당신의 일을 대신 처리해주는 개인 비서가 스스로 판단하여 결정을 내리는 것
└─ **Skyvern의 에이전트**: 웹사이트를 분석하고 필요한 액션 계획을 세운 후 실행

Skyvern은 에이전트들의 집단(swarm)을 활용하여 웹사이트를 이해하고 액션을 계획 및 실행합니다:

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="fern/images/skyvern_2_0_system_diagram.png" />
  <img src="fern/images/skyvern_2_0_system_diagram.png" />
</picture>

## 이 접근법의 장점

1. **미지의 웹사이트도 처리 가능**: Skyvern은 처음 본 웹사이트도 시각적 요소를 액션으로 매핑할 수 있어 커스텀 코드 없이도 작동합니다.

2. **웹사이트 변경에 강함**: 미리 정해진 XPath나 선택자가 없기 때문에 웹사이트 레이아웃 변경에 강합니다.

3. **여러 웹사이트에 같은 워크플로우 적용 가능**: 상호작용 방식을 논리적으로 추론하므로 유사한 작업을 여러 사이트에서 수행할 수 있습니다.

4. **복잡한 상황 처리 가능**: LLM의 추론 능력을 활용하여 복잡한 상황들을 커버합니다. 예시:
   - "당신은 18세에 운전 면허를 취득할 수 있었나요?"라는 질문에 대해 "16세에 면허를 취득했다"는 정보로부터 운전 자격을 추론
   - 경쟁사 제품 분석 시 7-Eleven의 22 oz 아놀드 파머 캔과 Gopuff의 23 oz 캔이 같은 제품(크기 차이는 반올림 오류)임을 이해

더 자세한 기술 보고서는 [여기](https://www.skyvern.com/blog/skyvern-2-0-state-of-the-art-web-navigation-with-85-8-on-webvoyager-eval/)에서 확인할 수 있습니다.

# 데모

https://github.com/user-attachments/assets/5cab4668-e8e2-4982-8551-aab05ff73a7f

# 성능 및 평가

Skyvern은 [WebBench 벤치마크](webbench.ai)에서 64.4% 정확도로 **최고 성능(SOTA)**을 달성했습니다. 기술 보고서 및 평가는 [여기](https://www.skyvern.com/blog/web-bench-a-new-way-to-compare-ai-browser-agents/)에서 확인할 수 있습니다.

<p align="center">
  <img src="fern/images/performance/webbench_overall.png"/>
</p>

## WRITE 작업의 성능 (양식 작성, 로그인, 파일 다운로드 등)

Skyvern은 양식 작성, 로그인, 파일 다운로드 같은 WRITE 작업에서 최고 성능을 자랑하며, 이는 주로 RPA(Robotic Process Automation) 관련 작업에 사용됩니다.

📖 **RPA (로봇 프로세스 자동화, Robotic Process Automation)**
├─ **정의**: 반복적인 규칙 기반 업무를 소프트웨어 로봇이 수행하도록 자동화하는 기술
├─ **쉬운 비유**: 데이터 입력, 파일 이동, 보고서 작성 같은 반복 작업을 로봇이 처리
└─ **효과**: 인력 낭비 제거, 오류 감소, 처리 속도 향상

<p align="center">
  <img src="fern/images/performance/webbench_write.png"/>
</p>

# 빠른 시작

## Skyvern Cloud
[Skyvern Cloud](https://app.skyvern.com)는 관리형 클라우드 버전의 Skyvern으로, 인프라 관리 걱정 없이 Skyvern을 실행할 수 있게 해줍니다. 여러 Skyvern 인스턴스를 병렬로 실행할 수 있으며 봇 탐지 회피 메커니즘, 프록시 네트워크, CAPTCHA 솔버가 포함되어 있습니다.

시도해보고 싶다면 [app.skyvern.com](https://app.skyvern.com)으로 이동하여 계정을 생성하세요.

## 설치 및 실행

필요한 의존성:
- [Python 3.11.x](https://www.python.org/downloads/), 3.12도 작동하며 3.13은 아직 준비 중입니다.
- [NodeJS & NPM](https://nodejs.org/en/download/)

추가로 Windows의 경우:
- [Rust](https://rustup.rs/)
- VS Code(C++ 개발 도구 및 Windows SDK 포함)

### 1. Skyvern 설치

```bash
pip install skyvern
```

### 2. Skyvern 실행
처음 실행 시 권장됩니다(DB 설정, DB 마이그레이션 등).

```bash
skyvern quickstart
```

### 3. 작업 실행

#### UI (권장)

Skyvern 서비스와 UI 시작 (DB가 실행 중일 때)

```bash
skyvern run all
```

http://localhost:8080 으로 이동하여 UI를 사용해 작업을 실행합니다.

#### 코드

```python
from skyvern import Skyvern

skyvern = Skyvern()
task = await skyvern.run_task(prompt="Find the top post on hackernews today")
print(task)
```

Skyvern이 팝업된 브라우저에서 작업을 실행하기 시작하고 완료 시 닫습니다. http://localhost:8080/history 에서 작업을 확인할 수 있습니다.

다양한 대상에서 작업을 실행할 수도 있습니다:

```python
from skyvern import Skyvern

# Skyvern Cloud에서 실행
skyvern = Skyvern(api_key="SKYVERN API KEY")

# 로컬 Skyvern 서비스
skyvern = Skyvern(base_url="http://localhost:8000", api_key="LOCAL SKYVERN API KEY")

task = await skyvern.run_task(prompt="Find the top post on hackernews today")
print(task)
```

## 고급 사용법

### 자신의 브라우저 제어 (Chrome)
> ⚠️ 경고: [Chrome 136](https://developer.chrome.com/blog/remote-debugging-port) 이후로 Chrome은 기본 user_data_dir을 사용하는 CDP(Chrome DevTools Protocol) 연결을 거부합니다. 브라우저 데이터를 사용하려면 Skyvern이 처음 로컬 브라우저에 연결할 때 기본 user_data_dir을 `./tmp/user_data_dir`로 복사합니다. ⚠️

📖 **CDP (Chrome DevTools Protocol)**
├─ **정의**: Chrome 브라우저를 프로그래밍으로 제어하기 위한 통신 프로토콜
├─ **쉬운 비유**: 개발자 도구로 수동 조작하는 것을 프로그램이 자동으로 수행
└─ **목적**: 브라우저를 외부 프로그램에서 원격으로 조종

1. Python 코드만으로
```python
from skyvern import Skyvern

# Mac의 Chrome 브라우저 경로 예시
browser_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
skyvern = Skyvern(
    base_url="http://localhost:8000",
    api_key="YOUR_API_KEY",
    browser_path=browser_path,
)
task = await skyvern.run_task(
    prompt="Find the top post on hackernews today",
)
```

2. Skyvern 서비스로

.env 파일에 두 개의 변수를 추가하세요:
```bash
# Mac의 Chrome 브라우저 경로 예시
CHROME_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BROWSER_TYPE=cdp-connect
```

Skyvern 서비스를 다시 시작(`skyvern run all`)하고 UI나 코드를 통해 작업을 실행합니다.

### 원격 브라우저로 Skyvern 실행
CDP 연결 URL을 잡아서 Skyvern에 전달하세요.

```python
from skyvern import Skyvern

skyvern = Skyvern(cdp_url="your cdp connection url")
task = await skyvern.run_task(
    prompt="Find the top post on hackernews today",
)
```

### 실행에서 일관된 출력 스키마 가져오기
`data_extraction_schema` 파라미터를 추가하면 됩니다:

```python
from skyvern import Skyvern

skyvern = Skyvern()
task = await skyvern.run_task(
    prompt="Find the top post on hackernews today",
    data_extraction_schema={
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "description": "The title of the top post"
            },
            "url": {
                "type": "string",
                "description": "The URL of the top post"
            },
            "points": {
                "type": "integer",
                "description": "Number of points the post has received"
            }
        }
    }
)
```

### 문제 디버깅에 도움이 되는 명령어

```bash
# Skyvern 서버 따로 실행
skyvern run server

# Skyvern UI 실행
skyvern run ui

# Skyvern 서비스 상태 확인
skyvern status

# Skyvern 서비스 모두 중지
skyvern stop all

# Skyvern UI만 중지
skyvern stop ui

# Skyvern 서버만 중지
skyvern stop server
```

## Docker Compose 설정

1. 머신에 [Docker Desktop](https://www.docker.com/products/docker-desktop/)이 설치되어 있고 실행 중인지 확인하세요.
2. 로컬에서 실행 중인 postgres가 없는지 확인하세요 (`docker ps`로 확인).
3. 저장소를 클론하고 루트 디렉토리로 이동합니다.
4. `skyvern init llm`을 실행하여 `.env` 파일을 생성합니다. 이 파일이 Docker 이미지로 복사됩니다.
5. [docker-compose.yml](./docker-compose.yml)에서 LLM 공급자 키를 채워 넣으세요. *Skyvern을 원격 서버에서 실행하려면 [docker-compose.yml](./docker-compose.yml)의 UI 컨테이너에서 올바른 서버 IP를 설정해야 합니다.*
6. 명령줄에서 다음 명령을 실행합니다:
   ```bash
    docker compose up -d
   ```
7. 브라우저에서 `http://localhost:8080`으로 이동하여 UI 사용을 시작합니다.

> **중요:** 한 번에 포트 5432에서 실행할 수 있는 Postgres 컨테이너는 하나뿐입니다. CLI 관리 Postgres에서 Docker Compose로 전환하는 경우 먼저 기존 컨테이너를 제거해야 합니다:
> ```bash
> docker rm -f postgresql-container
> ```

Docker를 사용하여 Skyvern을 실행 중 DB 관련 오류가 발생하면 `docker ps`로 어느 Postgres 컨테이너가 실행 중인지 확인합니다.

# Skyvern 기능

## Skyvern 작업
작업(Task)은 Skyvern 내의 기본 구성 요소입니다. 각 작업은 웹사이트를 탐색하고 특정 목표를 달성하도록 Skyvern에 지시하는 단일 요청입니다.

작업은 `url`, `prompt`를 지정해야 하며, 선택적으로 `data schema`(출력이 특정 스키마를 따르도록 원할 때)와 `error codes`(특정 상황에서 실행을 중지하려 할 때)를 포함할 수 있습니다.

<p align="center">
  <img src="fern/images/skyvern_2_0_screenshot.png"/>
</p>

## Skyvern 워크플로우
워크플로우는 여러 작업을 함께 연결하여 하나의 통합된 작업 단위를 형성하는 방법입니다.

예를 들어, 1월 1일 이후의 모든 인보이스를 다운로드하려면 먼저 인보이스 페이지로 이동한 후 1월 1일 이후의 인보이스만 표시하도록 필터링하고, 적격 인보이스 목록을 추출한 다음, 각 인보이스를 순회하며 다운로드하는 워크플로우를 만들 수 있습니다.

또 다른 예는 전자상거래 스토어에서 상품 구매를 자동화하려면 먼저 원하는 제품으로 이동한 후 장바구니에 추가하고, 그 다음 장바구니로 이동하여 장바구니 상태를 검증한 후, 마지막으로 결제 프로세스를 진행하여 상품을 구매하는 워크플로우를 만드는 것입니다.

지원되는 워크플로우 기능:
1. 브라우저 작업
2. 브라우저 액션
3. 데이터 추출
4. 검증
5. For 루프
6. 파일 파싱
7. 이메일 전송
8. 텍스트 프롬프트
9. HTTP 요청 블록
10. 커스텀 코드 블록
11. 블록 스토리지에 파일 업로드
12. (출시 예정) 조건문

<p align="center">
  <img src="fern/images/block_example_v2.png"/>
</p>

## 라이브 스트리밍
Skyvern은 브라우저의 뷰포트를 로컬 머신으로 라이브 스트리밍할 수 있어 Skyvern이 웹에서 정확히 무엇을 하고 있는지 볼 수 있습니다. 이는 디버깅 및 Skyvern이 웹사이트와 상호작용하는 방식을 이해하고 필요할 때 개입할 수 있게 해줍니다.

## 양식 작성
Skyvern은 웹사이트의 양식 입력을 자동으로 작성할 수 있습니다. `navigation_goal`을 통해 정보를 전달하면 Skyvern이 정보를 이해하고 양식을 적절하게 작성합니다.

## 데이터 추출
Skyvern은 웹사이트에서 데이터를 추출할 수도 있습니다.

메인 프롬프트 내에 직접 `data_extraction_schema`를 지정하여 웹사이트에서 추출하고 싶은 데이터가 정확히 무엇인지 Skyvern에 알릴 수 있습니다(JSONC 형식). Skyvern의 출력은 제공된 스키마에 따라 구조화됩니다.

## 파일 다운로드
Skyvern은 웹사이트에서 파일을 다운로드할 수도 있습니다. 다운로드된 모든 파일은 자동으로 블록 스토리지에 업로드되며(구성된 경우) UI를 통해 접근할 수 있습니다.

## 인증
Skyvern은 로그인 뒤의 작업 자동화를 더 쉽게 만들기 위해 여러 인증 방법을 지원합니다. 시도해보고 싶다면 [이메일](mailto:founders@skyvern.com)이나 [Discord](https://discord.gg/fG2XXEuQX3)로 연락해주세요.

<p align="center">
  <img src="fern/images/secure_password_task_example.png"/>
</p>

### 🔐 2FA 지원 (TOTP)
Skyvern은 2FA가 필요한 워크플로우를 자동화할 수 있도록 여러 2FA 방법을 지원합니다.

예시:
1. QR 기반 2FA (예: Google Authenticator, Authy)
2. 이메일 기반 2FA
3. SMS 기반 2FA

📖 **2FA (2단계 인증, Two-Factor Authentication)**
├─ **정의**: 비밀번호와 추가 인증 수단을 함께 사용하는 보안 방법
├─ **쉬운 비유**: 은행 금고에 접근하려면 열쇠(비밀번호)와 지문(추가 수단)이 모두 필요
└─ **효과**: 계정 탈취 시도를 크게 어렵게 만들어 보안 강화

🔐 [여기](https://www.skyvern.com/docs/credentials/totp)에서 2FA 지원에 대해 자세히 알아보세요.

### 비밀번호 관리자 통합
Skyvern은 현재 다음의 비밀번호 관리자 통합을 지원합니다:
- [x] Bitwarden
- [ ] 1Password
- [ ] LastPass

## 모델 컨텍스트 프로토콜 (MCP)
Skyvern은 MCP를 지원하여 MCP를 지원하는 모든 LLM을 사용할 수 있습니다.

📖 **MCP (모델 컨텍스트 프로토콜, Model Context Protocol)**
├─ **정의**: 다양한 LLM 플랫폼 간의 표준화된 연결 방식
├─ **쉬운 비유**: 다양한 전자기기를 USB로 같은 컴퓨터에 연결하는 것처럼 여러 LLM을 통일된 방식으로 연결
└─ **장점**: 특정 LLM에 종속되지 않고 유연한 선택 가능

MCP 문서는 [여기](https://github.com/Skyvern-AI/skyvern/blob/main/integrations/mcp/README.md)에서 확인하세요.

## Zapier / Make.com / N8N 통합
Skyvern은 Zapier, Make.com, N8N을 지원하여 Skyvern 워크플로우를 다른 앱과 연결할 수 있습니다.

* [Zapier](https://www.skyvern.com/docs/integrations/zapier)
* [Make.com](https://www.skyvern.com/docs/integrations/make.com)
* [N8N](https://www.skyvern.com/docs/integrations/n8n)

🔐 [여기](https://www.skyvern.com/docs/credentials/totp)에서 2FA 지원에 대해 자세히 알아보세요.

# Skyvern의 실제 사용 사례
Skyvern이 현실에서 어떻게 활용되는지 보는 것을 좋아합니다. 여기는 Skyvern이 실제 세계에서 워크플로우를 자동화하는 데 사용되는 몇 가지 예시입니다. PR을 열어 자신의 사용 사례를 추가해주세요!

## 여러 웹사이트에서 인보이스 다운로드
[라이브 데모 예약](https://meetings.hubspot.com/skyvern/demo)

<p align="center">
  <img src="fern/images/invoice_downloading.gif"/>
</p>

## 채용 지원 프로세스 자동화
[💡 실제 동작 보기](https://app.skyvern.com/tasks/create/job_application)
<p align="center">
  <img src="fern/images/job_application_demo.gif"/>
</p>

## 제조업체를 위한 자재 조달 자동화
[💡 실제 동작 보기](https://app.skyvern.com/tasks/create/finditparts)
<p align="center">
  <img src="fern/images/finditparts_recording_crop.gif"/>
</p>

## 정부 웹사이트로 이동하여 계정 등록 또는 양식 작성
[💡 실제 동작 보기](https://app.skyvern.com/tasks/create/california_edd)
<p align="center">
  <img src="fern/images/edd_services.gif"/>
</p>
<!-- Add example of delaware entity lookups x2 -->

## 무작위 문의 양식 작성
[💡 실제 동작 보기](https://app.skyvern.com/tasks/create/contact_us_forms)
<p align="center">
  <img src="fern/images/contact_forms.gif"/>
</p>

## 어떤 언어의 보험사에서 보험료 견적 받기
[💡 실제 동작 보기](https://app.skyvern.com/tasks/create/bci_seguros)
<p align="center">
  <img src="fern/images/bci_seguros_recording.gif"/>
</p>

[💡 실제 동작 보기](https://app.skyvern.com/tasks/create/geico)

<p align="center">
  <img src="fern/images/geico_shu_recording_cropped.gif"/>
</p>

# 개발자 설정
[uv](https://docs.astral.sh/uv/getting-started/installation/)가 설치되어 있는지 확인하세요.

1. 가상 환경(`.venv`)을 만들기 위해 다음을 실행합니다:
    ```bash
    uv sync --group dev
    ```
2. 초기 서버 구성 수행
    ```bash
    uv run skyvern quickstart
    ```
3. 브라우저에서 `http://localhost:8080`으로 이동하여 UI 사용을 시작합니다.
   *Skyvern CLI는 Windows, WSL, macOS, Linux 환경을 지원합니다.*

# 문서

더 광범위한 문서는 [📕 문서 페이지](https://www.skyvern.com/docs)에서 확인할 수 있습니다. 뭔가 불명확하거나 누락된 부분이 있으면 [이슈를 열거나](https://github.com/skyvern-ai/skyvern/issues) [이메일](mailto:founders@skyvern.com)이나 [Discord](https://discord.gg/fG2XXEuQX3)로 연락해주세요.

# 지원되는 LLM
| 공급자 | 지원되는 모델 |
| -------- | ------- |
| OpenAI   | gpt-4-turbo, gpt-4o, gpt-4o-mini |
| Anthropic | Claude 3 (Haiku, Sonnet, Opus), Claude 3.5 (Sonnet) |
| Azure OpenAI | 모든 GPT 모델. 멀티모달 LLM(azure/gpt-4o)의 성능이 더 우수합니다 |
| AWS Bedrock | Anthropic Claude 3 (Haiku, Sonnet, Opus), Claude 3.5 (Sonnet) |
| Gemini | Gemini 2.5 Pro and Flash, Gemini 2.0 |
| Ollama | [Ollama](https://github.com/ollama/ollama)를 통해 로컬에서 호스팅되는 모든 모델 실행 |
| OpenRouter | [OpenRouter](https://openrouter.ai)를 통해 모델 접근 |
| OpenAI 호환 | OpenAI API 형식을 따르는 커스텀 API 엔드포인트 ([liteLLM](https://docs.litellm.ai/docs/providers/openai_compatible)을 통해) |

## 환경 변수

### OpenAI
| 변수 | 설명 | 타입 | 샘플 값 |
| -------- | ------- | ------- | ------- |
| `ENABLE_OPENAI` | OpenAI 모델 등록 | 부울 | `true`, `false` |
| `OPENAI_API_KEY` | OpenAI API 키 | 문자열 | `sk-1234567890` |
| `OPENAI_API_BASE` | OpenAI API 기본 주소(선택사항) | 문자열 | `https://openai.api.base` |
| `OPENAI_ORGANIZATION` | OpenAI 조직 ID(선택사항) | 문자열 | `your-org-id` |

권장 `LLM_KEY`: `OPENAI_GPT4O`, `OPENAI_GPT4O_MINI`, `OPENAI_GPT4_1`, `OPENAI_O4_MINI`, `OPENAI_O3`

### Anthropic
| 변수 | 설명 | 타입 | 샘플 값 |
| -------- | ------- | ------- | ------- |
| `ENABLE_ANTHROPIC` | Anthropic 모델 등록 | 부울 | `true`, `false` |
| `ANTHROPIC_API_KEY` | Anthropic API 키 | 문자열 | `sk-1234567890` |

권장 `LLM_KEY`: `ANTHROPIC_CLAUDE3.5_SONNET`, `ANTHROPIC_CLAUDE3.7_SONNET`, `ANTHROPIC_CLAUDE4_OPUS`, `ANTHROPIC_CLAUDE4_SONNET`

### Azure OpenAI
| 변수 | 설명 | 타입 | 샘플 값 |
| -------- | ------- | ------- | ------- |
| `ENABLE_AZURE` | Azure OpenAI 모델 등록 | 부울 | `true`, `false` |
| `AZURE_API_KEY` | Azure 배포 API 키 | 문자열 | `sk-1234567890` |
| `AZURE_DEPLOYMENT` | Azure OpenAI 배포 이름 | 문자열 | `skyvern-deployment` |
| `AZURE_API_BASE` | Azure 배포 api 기본 주소 | 문자열 | `https://skyvern-deployment.openai.azure.com/` |
| `AZURE_API_VERSION` | Azure API 버전 | 문자열 | `2024-02-01` |

권장 `LLM_KEY`: `AZURE_OPENAI`

### AWS Bedrock
| 변수 | 설명 | 타입 | 샘플 값 |
| -------- | ------- | ------- | ------- |
| `ENABLE_BEDROCK` | AWS Bedrock 모델 등록. AWS Bedrock을 사용하려면 먼저 [AWS 구성](https://github.com/boto/boto3?tab=readme-ov-file#using-boto3)이 올바르게 설정되어 있는지 확인해야 합니다. | 부울 | `true`, `false` |

권장 `LLM_KEY`: `BEDROCK_ANTHROPIC_CLAUDE3.7_SONNET_INFERENCE_PROFILE`, `BEDROCK_ANTHROPIC_CLAUDE4_OPUS_INFERENCE_PROFILE`, `BEDROCK_ANTHROPIC_CLAUDE4_SONNET_INFERENCE_PROFILE`

### Gemini
| 변수 | 설명 | 타입 | 샘플 값 |
| -------- | ------- | ------- | ------- |
| `ENABLE_GEMINI` | Gemini 모델 등록 | 부울 | `true`, `false` |
| `GEMINI_API_KEY` | Gemini API 키 | 문자열 | `your_google_gemini_api_key` |

권장 `LLM_KEY`: `GEMINI_2.5_PRO_PREVIEW`, `GEMINI_2.5_FLASH_PREVIEW`

### Ollama
| 변수 | 설명 | 타입 | 샘플 값 |
| -------- | ------- | ------- | ------- |
| `ENABLE_OLLAMA` | Ollama를 통해 로컬 모델 등록 | 부울 | `true`, `false` |
| `OLLAMA_SERVER_URL` | Ollama 서버의 URL | 문자열 | `http://host.docker.internal:11434` |
| `OLLAMA_MODEL` | 로드할 Ollama 모델 이름 | 문자열 | `qwen2.5:7b-instruct` |

권장 `LLM_KEY`: `OLLAMA`

참고: Ollama는 아직 비전을 지원하지 않습니다.

### OpenRouter
| 변수 | 설명 | 타입 | 샘플 값 |
| -------- | ------- | ------- | ------- |
| `ENABLE_OPENROUTER` | OpenRouter 모델 등록 | 부울 | `true`, `false` |
| `OPENROUTER_API_KEY` | OpenRouter API 키 | 문자열 | `sk-1234567890` |
| `OPENROUTER_MODEL` | OpenRouter 모델 이름 | 문자열 | `mistralai/mistral-small-3.1-24b-instruct` |
| `OPENROUTER_API_BASE` | OpenRouter API 기본 URL | 문자열 | `https://api.openrouter.ai/v1` |

권장 `LLM_KEY`: `OPENROUTER`

### OpenAI 호환
| 변수 | 설명 | 타입 | 샘플 값 |
| -------- | ------- | ------- | ------- |
| `ENABLE_OPENAI_COMPATIBLE` | 커스텀 OpenAI 호환 API 엔드포인트 등록 | 부울 | `true`, `false` |
| `OPENAI_COMPATIBLE_MODEL_NAME` | OpenAI 호환 엔드포인트의 모델 이름 | 문자열 | `yi-34b`, `gpt-3.5-turbo`, `mistral-large` 등 |
| `OPENAI_COMPATIBLE_API_KEY` | OpenAI 호환 엔드포인트의 API 키 | 문자열 | `sk-1234567890` |
| `OPENAI_COMPATIBLE_API_BASE` | OpenAI 호환 엔드포인트의 기본 URL | 문자열 | `https://api.together.xyz/v1`, `http://localhost:8000/v1` 등 |
| `OPENAI_COMPATIBLE_API_VERSION` | OpenAI 호환 엔드포인트의 API 버전(선택사항) | 문자열 | `2023-05-15` |
| `OPENAI_COMPATIBLE_MAX_TOKENS` | 완료에 대한 최대 토큰 수(선택사항) | 정수 | `4096`, `8192` 등 |
| `OPENAI_COMPATIBLE_TEMPERATURE` | 온도 설정(선택사항) | 실수 | `0.0`, `0.5`, `0.7` 등 |
| `OPENAI_COMPATIBLE_SUPPORTS_VISION` | 모델이 비전을 지원하는지 여부(선택사항) | 부울 | `true`, `false` |

지원되는 LLM 키: `OPENAI_COMPATIBLE`

### 일반 LLM 구성
| 변수 | 설명 | 타입 | 샘플 값 |
| -------- | ------- | ------- | ------- |
| `LLM_KEY` | 사용하려는 모델의 이름 | 문자열 | 위의 지원되는 LLM 키 참조 |
| `SECONDARY_LLM_KEY` | Skyvern이 실행하는 미니 에이전트용 모델의 이름 | 문자열 | 위의 지원되는 LLM 키 참조 |
| `LLM_CONFIG_MAX_TOKENS` | LLM에서 사용하는 최대 토큰 오버라이드 | 정수 | `128000` |

# 기능 로드맵
다음 몇 개월 동안의 계획된 로드맵입니다. 제안이 있거나 추가되기를 원하는 기능이 있으면 [이메일](mailto:founders@skyvern.com)이나 [Discord](https://discord.gg/fG2XXEuQX3)를 통해 주저 말고 연락해주세요.

- [x] **오픈소스** - Skyvern 핵심 코드베이스 오픈소스화
- [x] **워크플로우 지원** - 여러 Skyvern 호출을 함께 연결할 수 있는 지원
- [x] **향상된 컨텍스트** - 상호작용 가능한 요소 주변의 콘텐츠 이해 능력 개선(텍스트 프롬프트를 통해 관련 레이블 컨텍스트 제공)
- [x] **비용 절감** - Skyvern의 안정성 개선 및 컨텍스트 트리 최적화를 통해 Skyvern 실행 비용 감소
- [x] **셀프서비스 UI** - Streamlit UI를 단계별로 폐기하고 Skyvern에서 새 작업을 시작할 수 있는 React 기반 UI 컴포넌트 도입
- [x] **워크플로우 UI 빌더** - 사용자가 워크플로우를 시각적으로 구축하고 분석할 수 있는 UI 도입
- [x] **Chrome 뷰포트 스트리밍** - Chrome 뷰포트를 사용자 브라우저로 라이브 스트리밍하는 방식 도입(셀프서비스 UI의 일부)
- [x] **과거 실행 UI** - Streamlit UI를 단계별로 폐기하고 과거 실행 및 결과를 시각화할 수 있는 React 기반 UI 도입
- [X] **자동 워크플로우 빌더("Observer" 모드)** - Skyvern이 웹을 탐색할 때 자동으로 워크플로우를 생성하여 새로운 워크플로우를 더 쉽게 구축
- [x] **프롬프트 캐싱** - LLM 호출에 캐싱 레이어를 도입하여 Skyvern 실행 비용을 크게 감소(과거 액션을 기억하고 반복)
- [x] **웹 평가 데이터셋** - 공개 벤치마크 테스트와 Skyvern 통합하여 시간에 따른 모델 품질 추적
- [ ] **향상된 디버그 모드** - Skyvern이 액션을 계획하고 실행 전 "승인"을 받을 수 있도록 하여 작동 내용을 디버그하고 더 쉽게 반복
- [ ] **Chrome 확장 프로그램** - 사용자가 Chrome 확장 프로그램을 통해 Skyvern과 상호작용 가능(음성 모드, 작업 저장 등 포함)
- [ ] **Skyvern 액션 레코더** - Skyvern이 사용자가 작업을 완료하는 것을 관찰하고 자동으로 워크플로우 생성
- [ ] **상호작용 가능한 라이브스트림** - 사용자가 라이브스트림과 실시간으로 상호작용하여 필요할 때 개입(예: 민감한 양식 수동 제출)
- [ ] **LLM 옵저버빌리티 도구 통합** - LLM 옵저버빌리티 도구 통합하여 특정 데이터셋으로 프롬프트 변경사항을 백테스팅하고 시간에 따른 Skyvern 성능 시각화
- [x] **Langchain 통합** - langchain_community에서 Langchain 통합 생성하여 Skyvern을 "도구"로 사용

# 기여

PR과 제안을 환영합니다! [이메일](mailto:founders@skyvern.com)이나 [Discord](https://discord.gg/fG2XXEuQX3)로 주저 말고 PR/이슈를 열거나 연락해주세요.
기여 가이드](CONTRIBUTING.md)와 ["도움 필요"(Help Wanted) 이슈](https://github.com/skyvern-ai/skyvern/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)를 꼭 확인해주세요!

skyvern 저장소와 대화를 나누고 어떻게 구조화되어 있는지, 어떻게 확장할 수 있는지, 사용 질문을 어떻게 해결하는지에 대한 고수준 개요를 얻으려면 [Code Sage](https://sage.storia.ai?utm_source=github&utm_medium=referral&utm_campaign=skyvern-readme)를 확인하세요.

# 원격 측정(Telemetry)

기본적으로 Skyvern은 Skyvern의 사용 방식을 이해하기 위해 기본 사용 통계를 수집합니다. 원격 측정을 거부하려면 `SKYVERN_TELEMETRY` 환경 변수를 `false`로 설정하세요.

📖 **원격 측정 (Telemetry)**
├─ **정의**: 사용자의 동의 하에 소프트웨어 사용 데이터를 수집하고 분석하는 기술
├─ **쉬운 비유**: 음악 스트리밍 서비스가 "당신이 가장 많이 들은 곡"을 추천해주기 위해 청취 기록을 기록
└─ **목적**: 서비스 개선에 필요한 사용 패턴 파악 (개인정보는 수집하지 않음)

# 라이선스

Skyvern의 오픈소스 저장소는 관리형 클라우드를 통해 지원됩니다. Skyvern을 구동하는 핵심 로직은 모두 [AGPL-3.0 라이선스](LICENSE)로 라이선스되어 있는 이 오픈소스 저장소에서 사용 가능하며, 봇 탐지 회피 메커니즘은 관리형 클라우드 제품으로만 사용 가능합니다.

라이선싱에 관한 질문이나 우려사항이 있으면 [문의](mailto:support@skyvern.com)해주세요. 기꺼이 도와드리겠습니다.

# Star 히스토리

[![Star History Chart](https://api.star-history.com/svg?repos=Skyvern-AI/skyvern&type=Date)](https://star-history.com/#Skyvern-AI/skyvern&Date)