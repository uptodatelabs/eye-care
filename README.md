# eye-care

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](#)

A PC eye-exercise reminder app for monitor-heavy users. Built with Electron + TypeScript. Open source (MIT).

> **Medical disclaimer:** This software is for eye-fatigue relief and rest reminders only. It is NOT a medical device, does not diagnose or treat any condition, and is not a substitute for professional ophthalmologic care. Claims about "vision restoration" or "curing myopia" are not supported by modern ophthalmology; this app intentionally avoids them.

---

## English

### Why

Mobile apps for eye exercises are common, but well-made PC apps that **guide actual eye exercises** (not just "take a break" reminders) are rare. `eye-care` periodically overlays a guided exercise on your screen based on ophthalmologist-recommended practices.

### Features

- **Guided eye exercises** with animated SVG visual guides — not just text reminders
- **6 evidence-based exercises** sourced from the American Academy of Ophthalmology (AAO) and American Optometric Association (AOA):
  - **20-20-20 rule** — every 20 min, look 20 ft (6 m) away for 20 s
  - **Conscious blinking** — counter the ~66% reduction in blink rate during screen work
  - **Near-far focus shift** — alternate focus between near and distant targets
  - **Figure-8 tracing** — slow eye movement to relieve fatigue
  - **Palming** — cover eyes with warm palms to relax
  - **Horizontal eye rolls** — slow horizontal sweeping
- **Two break types** with configurable intervals:
  - Mini break (default: every 20 min, 20 s)
  - Long break (default: every 50 min, 5 min)
- **Audio cues** — chimes on exercise start, step end, and break complete (helps during eyes-closed exercises like palming)
- **Background images** — 5 built-in nature scenes (sunny sky, forest, sea, mountains, sunset) or upload your own. Adjustable blur strength.
- **Languages** — English and Korean
- **System tray** integration — lives in your tray, breaks appear as fullscreen overlay
- **Cross-platform** — Windows, macOS, Linux

### Install

#### Option 1: Desktop installer (recommended for general users)

Download the latest installer from [GitHub Releases](https://github.com/uptodatelabs/eye-care/releases):

- **Windows**: `eye-care Setup 1.0.0.exe` — auto-creates desktop and start menu shortcuts
- **macOS**: `eye-care-1.0.0.dmg`
- **Linux**: `eye-care-1.0.0.AppImage` or `.deb`

#### Option 2: npm (for developers)

```bash
npm install -g eye-care
eye-care
```

### Build from source

Requirements: Node.js >= 18, npm >= 9.

```bash
git clone https://github.com/uptodatelabs/eye-care.git
cd eye-care
npm install
npm start
```

### Usage

1. Launch eye-care — it lives in your system tray.
2. Right-click the tray icon to:
   - Take a mini / long break now
   - Pause breaks for 1 hour
   - Open settings
   - Quit
3. When a break starts, a fullscreen overlay appears with a guided exercise. Follow the animated guide and on-screen instructions.
4. Click "Skip break" or press the tray menu to dismiss early.

### Settings

- **Language** — English / 한국어
- **Background** — None / Built-in / User images / Random, with adjustable blur
- **Mini break** — enable, interval, duration
- **Long break** — enable, interval, duration
- **Sound notifications** — on/off
- **Strict mode** — disable skipping

### Screenshots

_Screenshots coming soon._

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). We welcome translations, new exercises (with ophthalmology citations), OS testing, and accessibility improvements.

### License

MIT — see [LICENSE](LICENSE).

---

## 한국어

### 왜 만들었나요

모바일용 눈운동 앱은 많지만, PC에서 **실제 운동을 가이드**해주는 앱 (단순 휴식 알림이 아닌)은 드뭅니다. `eye-care`는 안과 의사가 권장하는 방법에 따라 주기적으로 화면에 가이드 운동을 띄워줍니다.

### 기능

- **애니메이션 SVG 가이드**가 포함된 안내식 눈 운동 — 글자만 보여주는 알림이 아닙니다
- **안과학회(AAO)와 검안사협회(AOA) 근거의 6가지 운동:**
  - **20-20-20 규칙** — 20분마다 20피트(6m) 너머를 20초간 응시
  - **의식적 깜빡임** — 모니터 작업 시 1/3로 줄어드는 깜빡임 보충
  - **원근 촛점 교대** — 가까운 곳과 먼 곳을 번갈아 응시
  - **8자 추적** — 느린 눈 운동으로 피로 완화
  - **파밍** — 따뜻한 손바닥으로 감은 눈을 덮어 휴식
  - **좌우 눈 운동** — 느린 좌우 스윕
- **두 가지 휴식 (설정 가능):**
  - 짧은 휴식 (기본: 20분 간격, 20초)
  - 긴 휴식 (기본: 50분 간격, 5분)
- **효과음** — 운동 시작, 단계 종료, 휴식 완료 시 차임 (파밍처럼 눈 감는 운동에서 유용)
- **배경화면** — 5가지 기본 자연 풍경(맑은 하늘, 숲, 바다, 산, 노을) 또는 사용자 이미지 업로드. 흐림 정도 조절 가능.
- **언어** — 영어 / 한국어
- **시스템 트레이** — 트레이에 상주, 휴식 시 전체화면 오버레이
- **크로스플랫폼** — Windows, macOS, Linux

### 설치

#### 방법 1: 데스크톱 설치 파일 (일반 사용자 권장)

[GitHub Releases](https://github.com/uptodatelabs/eye-care/releases)에서 최신 설치 파일을 다운로드:

- **Windows**: `eye-care Setup 1.0.0.exe` — 바탕화면 및 시작 메뉴 바로가기 자동 생성
- **macOS**: `eye-care-1.0.0.dmg`
- **Linux**: `eye-care-1.0.0.AppImage` 또는 `.deb`

#### 방법 2: npm (개발자용)

```bash
npm install -g eye-care
eye-care
```

### 소스에서 빌드

요구사항: Node.js 18 이상, npm 9 이상.

```bash
git clone https://github.com/uptodatelabs/eye-care.git
cd eye-care
npm install
npm start
```

### 사용법

1. eye-care를 실행하면 시스템 트레이에 상주합니다.
2. 트레이 아이콘 우클릭:
   - 지금 짧은 / 긴 휴식하기
   - 1시간 동안 휴식 일시정지
   - 설정 열기
   - 종료
3. 휴식이 시작되면 전체화면 오버레이로 가이드 운동이 나타납니다. 애니메이션과 지시문을 따라 하세요.
4. "휴식 건너뛰기" 버튼이나 트레이 메뉴로 일찍 종료할 수 있습니다.

### 설정

- **언어** — English / 한국어
- **배경화면** — 없음 / 기본 제공 / 사용자 이미지 / 랜덤, 흐림 정도 조절
- **짧은 휴식** — 사용 여부, 간격, 시간
- **긴 휴식** — 사용 여부, 간격, 시간
- **소리 알림** — 켜기/끄기
- **엄격 모드** — 건너뛰기 금지

### 기여

[CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요. 번역, 새 운동 추가 (안과 출처 필수), OS별 테스트, 접근성 개선을 환영합니다.

### 라이선스

MIT — [LICENSE](LICENSE) 참고.