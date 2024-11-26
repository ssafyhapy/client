# 프로젝트 개요
- 프로젝트 이름 : `사르르`
- 프로젝트 기간 : 7주
- 프로젝트 인원 : 프론트엔드 3명, 백엔드 3명
  - SSAFY에서 진행한 다인원 (6인) 첫번째 프로젝트
- 프로젝트 설명 :
  - 해당 프로젝트는 웹기술 트랙을 기반으로 하여 진행되어 webRTC를 반드시 사용해야하는 프로젝트였다.
  - webRTC를 반드시 사용해야하는 아이디어를 생각해내기 위해 고심한 결과 아이스브레이킹을 하게 되는 상황은 많으나 (각종 동아리 첫만남, 프로젝트 첫만남, 교회 레크레이션 등) 매번 게임을 준비해야만 한다는 어려움이 존재하고 사회자에게 많은 부담을 준다는 단점이 있다는 것을 유념하여 만들게 된 프로젝트이다.
  - 사르르 서비스는 최대 6인까지 한 섹션에 들어와서 온라인으로 줌이나 웨벡스처럼 영상과 소리를 통해 진행된다. 사용자는 레크레이션용으로 정해진 3개의 미니 게임(한 줄 자기소개, 나를 맞춰봐, 밸런스 게임)을 진행할 수 있다.
- 서비스 목표 : 사회자가 아닌 서비스에서 제공하는 온라인 아이스브레이킹 게임으로 통하여 사용자들이 서로의 취향이나 이력들을 손쉽게 이야기하고 친해질 수 있다. 이로 인해 서로의 마음의 장벽이 `사르르` 녹을 수 있도록 하는 것이 서비스의 목표이다.

# 프로젝트 프로토타입
[피그마 프로토타입](https://www.figma.com/design/9Wu3Xf8yS1KYarcoweQm5t/%EC%82%AC%EB%A5%B4%EB%A5%B4-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?node-id=1-2&t=m0LXGc2HX1n00cuf-1)

# 브랜치 전략 (페이지 별로 고유한 branch를 가짐)
- 메인 페이지 : Main_page
- 플레이 페이지 : Play_page
- 마이 페이지 : My_page
- 대기실 : Waiting_room
- 한줄 자기소개 : Self_introduction
- 나를 맞춰봐 : Guess_me
- 밸런스 게임 : Balance_game
- Wrap up : Wrap_up
- 기념촬영 : Photo
- 레포트 : Report

# 커밋 컨벤션 전략
| 커밋 유형        | 의미                                                         |
| ---------------- | ------------------------------------------------------------ |
| feat             | 새로운 기능 추가                                             |
| fix              | 버그 수정                                                    |
| docs             | 문서 수정                                                    |
| style            | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| refactor         | 코드 리팩토링                                                |
| test             | 테스트 코드, 리팩토링 테스트 코드 추가                       |
| setting          | 패키지 매니저 수정 등 설정 파일 추가, 수정                   |
| chore            | 그 외 기타 수정 (ex: .gitignore)                             |
| Design           | CSS 등 사용자 UI 디자인 변경                                 |
| Comment          | 필요한 주석 추가 및 변경                                     |
| Rename           | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우          |
| Remove           | 파일을 삭제하는 작업만 수행한 경우                           |
| !BREAKING CHANGE | 커다란 API 변경의 경우                                       |
| !HOTFIX          | 급하게 치명적인 버그를 고쳐야 하는 경우                      |

# 시연 시나리오
[시연 시나리오](http://warp-fisherman-adf.notion.site/e684d1bce4fc4f4cb8d81ecf11854bb4?pvs=74)

# 아키텍쳐 구조
![!\[alt text\](image.png)
](<아키텍쳐 구조.png>)

# 사용 기술 스택
- 리액트
- OpenVidu
- WebSocket
- Teachable Machine
- Jenkins
- Nginx
- Amazon S3
- Redis
- Spring
- SpringBoot
- JWT
등등

# 협업 툴
- GitLab
- Jira
- Figma


