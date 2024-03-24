# Game Pick
게임을 소개하고, 관심있는 게임을 등록할 수 있는 서비스<br/>
**[서비스 링크](http://game-pick.ap-northeast-2.elasticbeanstalk.com/)**<br/>
<br/>

### 데스크탑 버전
<img src="https://github.com/Woohyeok97/Hi-Tel/assets/75671909/9199fdf4-a300-4ccd-b583-c6b983593795" width="80%"/>

### 모바일 버전
<img src="https://github.com/Woohyeok97/Hi-Tel/assets/75671909/13e48871-8033-4000-8748-2b7889f4a6c1" width="40%"/>

<br/>
<br/>

## 🔎 사용기술
- Next.js
- Typescript
- React Query
- Redux Toolkit
- React Hook Form
- Zod
- MongoDB
- Elastic Beanstalk
- AWS S3
- TailwindCSS
- Github Actions
- Yarn berry

<br/>
<br/>

## 🔎 서비스 구조
- Server Side Rendering 및 Router Cache를 위해 Next.js의 App Router 방식을 선택
- Github Actions를 사용한 CI/CD 파이프라인 구축
- MongoDB를 DB로 사용 /Elastic Beanstalk 배포
- AWS S3에서 이미지 관리 및 PresignURL을 이용한 이미지 업로드
- Yarn berry를 사용한 패키지 의존성관리
- Zod 스키마를 사용하여 런타임 타입체크

<br/>
<img src="https://github.com/Woohyeok97/Hi-Tel/assets/75671909/61da26d9-3f52-45d3-a9fc-2313ab56d0a4" width="80%"/>

<br/>
<br/>


## 🔎 주요 구현기능

### 관심게임 등록
- 사용자가 관심게임을 추가 / 삭제 하면 동적으로 UI를 변경하는 기능을 구현
- 불필요한 API 재요청 최소화를 위해  React Query의 Client Cache를 사용하여 인터렉션을 처리
- Optimistic Update 방식으로 UI를 변경하여, 느린 인터넷 환경에 대응

### 게임 데이터 생성 / 수정
- React Hook Form을 사용하여 게임 데이터 생성 / 수정 페이지를 구현
- File 타입처럼 value값 가공이 필요한 필드에 useController를 사용하여 value값을 추출
- 런타임 상황의 타입검사를 위해 zod 스키마를 생성하고, Resolver로 사용하여 검증

### 오버레이
- 모달, 팝업 등의 오버레이를 다룰 수 있는 Custom hook 구현
- open / close 함수로 제어하고, 선언적으로 사용할 수 있도록 JSX.Element 타입을 오버레이 요소로 주입
- 전역적으로 사용하기 위해 오버레이의 열림 상태를 redux slice로 관리

### 소셜 회원가입 / 로그인
- NextAuth를 사용하여 Google, Naver, Kakao 로그인 구현
- 로그인시 생성되는 JWT를 session에 주입하여 사용자 인증에 사용
- middleware를 설정하여 미인증 유저의 특정 페이지 접근 차단

### 이미지 업로드
- 게임 데이터 생성과 동시에, AWS S3 버켓에 게임 이미지 업로드 기능을 구현
- PresginURL을 사용하여 서버측에 큰 부담없이 클라이언트에서 업로드 가능


<br/>

## 🔎 프리뷰

### 관심게임 등록

<img src="https://github.com/Woohyeok97/Hi-Tel/assets/75671909/a64122b3-ad5b-480f-8dc9-1ea893b31634" width="80%"/><br/>

<!-- 검색 캐싱
https://github.com/Woohyeok97/Hi-Tel/assets/75671909/bd8af9db-16f7-4656-b84c-b5cfd8c092e6 -->

<br/>

### 게임 데이터 생성 / 삭제

<img src="https://github.com/Woohyeok97/Hi-Tel/assets/75671909/86bd159c-290d-488b-9fa8-37d7ddefb926" width="80%"/><br/>

<br/>

### 터미널 명령어

<img src="https://github.com/Woohyeok97/Hi-Tel/assets/75671909/e7003200-0860-44f6-840b-44bdf4a36eec" width="80%"/><br/>

<br/>

### 알림 페이지

<img src="https://github.com/Woohyeok97/Hi-Tel/assets/75671909/0acdd586-69d7-4b3b-817a-5ad26a8ae847" width="80%"/><br/>

<br/>

### 언어설정

<img src="https://github.com/Woohyeok97/Hi-Tel/assets/75671909/a55892eb-2b1b-42c7-81c8-4b33f9c5ad89" width="80%"/><br/>

<br/>

### 게시글 작성

<img src="https://github.com/Woohyeok97/Hi-Tel/assets/75671909/62dd5099-16f2-48c4-a392-754398c73b48" width="40%"/><br/>

<br/>
<br/>
<br/>
