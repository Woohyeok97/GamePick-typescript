# Game Pick
게임을 소개하고, 관심있는 게임을 등록할 수 있는 서비스<br/>
**[서비스 링크](http://game-pick.ap-northeast-2.elasticbeanstalk.com/)**<br/>
<br/>

<img src="https://github.com/Woohyeok97/GamePick-typescript/assets/75671909/f98e1e66-2407-4aa5-9285-19cb05d054b3" width="40%"/>

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
<img src="https://github.com/Woohyeok97/GamePick-typescript/assets/75671909/1cbc997d-2d7c-4cd1-9c38-ebae77b74a83" width="80%"/>

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

### 소셜 로그인

<img src="https://github.com/Woohyeok97/GamePick-typescript/assets/75671909/f43c4dfa-f77d-4c1c-bbf3-955c1bd9ec91" width="50%"/>
<br/>
<br/>

<br/>

### 게임 트레일러

<img src="https://github.com/Woohyeok97/GamePick-typescript/assets/75671909/f0fbabd8-3f6f-4319-9a96-afded271e174" width="50%"/>
<br/>
<br/>

<br/>

### 관심게임 등록

<img src="https://github.com/Woohyeok97/GamePick-typescript/assets/75671909/1889244a-ec5f-4650-977b-a4faadf21abb" width="50%"/>
<br/>
<br/>

<br/>

### 게임 데이터 생성 / 삭제

<img src="https://github.com/Woohyeok97/GamePick-typescript/assets/75671909/ee5527cf-29ca-471b-9215-8f6adf1646e1" width="50%"/>
<br/>
<br/>

<br/>

<img src="https://github.com/Woohyeok97/GamePick-typescript/assets/75671909/7996a69d-2602-43a7-a795-3dd574ab14da" width="50%"/>
<br/>
<br/>

<br/>
<br/>

<br/>


<br/>
<br/>
<br/>
