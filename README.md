# ☁️ LUCAUS Client

중앙대학교 축제 사이트 **LUCAUS**의 웹사이트 **프론트엔드(Client)** 레포지토리입니다.

---

## 🧑‍💻 Ground Rules (협업 규칙)

프로젝트의 일관성과 효율적인 협업을 위해 아래 규칙을 반드시 준수합니다.

### ✅ Branch Strategy

브랜치는 아래 규칙에 따라 생성하며, `main` 브랜치 직접 Push는 엄격히 금지합니다.

| Branch       | Purpose    | 설명                                   |
| :----------- | :--------- | :------------------------------------- |
| **main**     | Production | 배포 가능한 안정 버전                  |
| **develop**  | Staging    | 기능 개발 통합 및 테스트 브랜치        |
| **feature/** | Feature    | 새로운 기능 개발 (예: `feature/login`) |
| **fix/**     | Bug Fix    | 버그 수정                              |
| **hotfix/**  | Emergency  | 배포 중인 버전의 긴급 수정             |

---

### ✅ Commit Convention

커밋 메시지는 작업 성격을 한눈에 알 수 있도록 아래 형식을 따릅니다.
`타입: 작업 내용` (예: `feat: 로그인 기능 구현`)

| Type         | Meaning       | 설명                                         |
| :----------- | :------------ | :------------------------------------------- |
| **feat**     | Feature       | 새로운 기능 추가                             |
| **fix**      | Bug Fix       | 버그 수정                                    |
| **chore**    | Chore         | 설정, 환경 설정, 패키지 관리                 |
| **docs**     | Documentation | 문서 수정 (README 등)                        |
| **scaffold** | Structure     | 프로젝트 초기 구조 세팅                      |
| **refactor** | Refactoring   | 코드 리팩토링                                |
| **style**    | Style         | 코드 포맷팅, 세미콜론 누락 등 (UI 수정 아님) |
| **test**     | Test          | 테스트 코드 추가 및 수정                     |

---

### ✅ Issue & PR Rule

모든 작업은 **Issue 기반**으로 진행하며, PR을 통해 코드 리뷰를 거칩니다.

#### 🔄 Workflow

1. **Issue 생성**: 작업 할당 및 번호 생성
2. **브랜치 생성**: `feature/#이슈번호-기능명` 형식
3. **기능 개발**: 커밋 컨벤션 준수
4. **Pull Request 생성**: 템플릿에 맞춰 상세 내용 작성
5. **코드 리뷰**: 팀원 확인 및 피드백
6. **Merge**: 최소 1명 이상의 승인(Approve) 후 Merge

#### 📝 PR Title Convention

`[TYPE] 작업 내용` 형식으로 작성합니다.

- `[FEAT] 로그인 페이지 구현`
- `[FIX] 헤더 UI 깨짐 수정`
- `[CHORE] 프로젝트 환경 설정 변경`

#### 📋 PR Checklist

- [ ] 기능이 정상적으로 동작하는가?
- [ ] Console Error/Warning이 없는가?
- [ ] 관련 Issue를 연결(`Closes #이슈번호`) 했는가?
- [ ] UI 변경 시 스크린샷을 첨부했는가?
- [ ] 불필요한 주석 및 `console.log`를 제거했는가?

---

### ✅ Code Style & Structure

- **Styling**: `TailwindCSS`를 사용하여 일관된 디자인 시스템 유지
- **Naming**: 컴포넌트는 `PascalCase`, 일반 함수/변수는 `camelCase` 사용
- **Structure**: 기능 단위 폴더 관리를 지향합니다.

```bash
src/
 ┣ app/               # Next.js App Router (라우팅 단위)
 │  ┣ (home)/         # Route Group 예시
 │  ┣ layout.tsx      # 루트 레이아웃
 │  ┗ page.tsx        # 루트 페이지
 ┣ components/        # 재사용 가능한 UI 컴포넌트
 │  ┣ ui/             # 공통 기본 컴포넌트 (Button, Input 등)
 │  ┗ layouts/        # Header, Footer 등 레이아웃 컴포넌트
 ┣ api/               # API 호출 함수
 ┣ assets/            # SVG, 아이콘 컴포넌트 (코드로 쓰는 것들)
 ┣ constants/         # 공통 상수
 ┣ hooks/             # 커스텀 훅
 ┣ styles/            # 글로벌 CSS, Tailwind 설정
 ┗ utils/             # 유틸리티 함수

public/               # 정적 파일 (이미지, 폰트 등) ← Next.js 기본
```
