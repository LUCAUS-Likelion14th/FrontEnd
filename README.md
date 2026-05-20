# LUCAUS 

<p align="center">
  <img width="100%" height="627" alt="LUCAUS Banner" src="https://github.com/user-attachments/assets/5c0df293-a452-4edb-9b0c-d2794e7588f2" />
</p>

> **LIKELION CAU × 2026 LUCAUS**  
> 중앙대학교 축제 **LUCAUS**의 공식 웹사이트입니다.

<p align="center">
  <a href="https://www.lucaus.com"><strong>🌐 공식 웹사이트 방문하기 (www.lucaus.com)</strong></a>
</p>

---

## 📝 프로젝트 소개

LUCAUS는 중앙대학교 축제 정보를 한곳에서 확인할 수 있는 모바일 웹 서비스입니다.  
공연 타임라인, 실시간 인기 부스 랭킹, 푸드트럭 정보, 모바일 도장판, 분실물 조회 기능 등을 통해 축제를 더욱 편리하게 즐길 수 있습니다.

---

## ✨ 주요 기능

> 📱 **모바일 환경에 최적화된 UX/UI**를 제공합니다. 타임라인과 실시간 데이터 기반으로 축제 현황을 빠르게 파악할 수 있습니다.

| 🏠 홈 (실시간 정보) | 🎤 공연 (타임라인) |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/be7af102-6a4f-41e3-917c-a3c0489401e1" width="300" /> <br> 현재 본무대 진행 상황과 <br> 좋아요 기반 **인기 랭킹** 확인 | <img src="https://github.com/user-attachments/assets/3909533c-8782-41e0-8802-349c392132fd" width="300" /> <br> 날짜·시간대별 **공연 라인업**과 <br> 세부 일정을 한눈에 확인 |

| 🏪 부스 안내 | 🍔 푸드트럭 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/179fac7f-07ca-430c-9471-9734e3fc02b9" width="300" /> <br> 카테고리 필터, 검색, **지도 기반 위치** 및 <br> 부스 상세 정보와 좋아요 기능 | <img src="https://github.com/user-attachments/assets/9325840f-0150-4428-8fca-21cb81278ed4" width="300" /> <br> 축제 현장의 모든 **먹거리 정보**와 <br> 메뉴 및 가격 안내 |

| ⭐ 모바일 도장판 | 🔍 분실물 센터 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/84c9626f-ff6b-49c8-ac0c-2f7f62236284" width="300" /> <br> STAFF 인증 코드를 통한 **별빛 도장** 획득 및 <br> 경품 이벤트 응모 기능 | <img src="https://github.com/user-attachments/assets/92fab55a-4d45-4928-aa21-cf396962b299" width="300" /> <br> 날짜·카테고리별 **분실물 현황** 조회 및 <br> 카카오톡 채널 연동 문의 |

| 👤 마이페이지 |
| :---: |
| <img src="https://github.com/user-attachments/assets/2c36ffd3-aa40-4b0f-92f9-59c612e19b86" width="300" /> <br> 내가 좋아요를 누른 부스·푸드트럭 목록과 <br> 현재까지 모은 **도장 개수**를 한눈에 확인 |

---

## 🛠 기술 스택

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38BDF8?logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Zustand-443E38?logo=zustand" alt="Zustand" />
  <img src="https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=white" alt="React Query" />
  <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white" alt="Framer Motion" />
</p>

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **State Management** | Zustand, TanStack Query (React Query) |
| **Animation** | Framer Motion |
| **Font** | Pretendard |

---

## 📂 폴더 구조

```text
src/
 ├── app/            # Next.js App Router (페이지 및 라우팅)
 ├── components/     # UI 컴포넌트
 │    ├── layout/    # Header, BottomNav 등 공통 레이아웃
 │    ├── ui/        # Atomic 구조의 공통 기본 UI 컴포넌트
 │    └── ...        # 기능별 도메인 컴포넌트
 ├── api/            # API 호출 함수 및 Axios/Fetch 설정
 ├── assets/         # 이미지, 아이콘 등 정적 자산
 ├── hooks/          # 재사용 가능한 커스텀 훅
 ├── store/          # Zustand 전역 상태 관리
 ├── types/          # TypeScript 타입 정의 파일
 └── utils/          # 공통 유틸리티 함수

public/              # 폰트, 로고 등 정적 파일
```

---

## 🚀 시작하기

```bash
# 의존성 패키지 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

---

## 👥 팀원 소개

| 강지혜 | 김유겸 | 이은지 |
| :---: | :---: | :---: |
| <img src="https://github.com/Jihaeee.png" width="100" height="100" style="border-radius:50%"/> | <img src="https://github.com/kimyugyum.png" width="100" height="100" style="border-radius:50%"/> | <img src="https://github.com/eunjilee0311.png" width="100" height="100" style="border-radius:50%"/> |
| [@Jihaeee](https://github.com/Jihaeee) | [@kimyugyum](https://github.com/kimyugyum) | [@eunjilee0311](https://github.com/eunjilee0311) |
| Frontend Developer | Frontend Developer | Frontend Developer |
