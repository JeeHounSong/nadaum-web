import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Award,
  Bell,
  BookOpenCheck,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  Coffee,
  Dumbbell,
  Gamepad2,
  Heart,
  HeartHandshake,
  Home,
  LockKeyhole,
  Map,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Moon,
  PenLine,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Trophy,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import "./styles.css";

const A = {
  logo: "/assets/logo.png",
  hero: "/assets/hero-community.png",
  map: "/assets/map-people.png",
  map2: "/assets/map-people2.png",
  walk: "/assets/walking-challenge.png",
  mental: "/assets/mental-test.png",
  safe: "/assets/banner-safe-meeting.png",
  supportHome: "/assets/support-home.png",
  supportJob: "/assets/support-job.png",
  supportHeart: "/assets/support-heart.png",
  supportEducation: "/assets/support-education.png",
  emptyMeeting: "/assets/empty-meeting.png",
  emptySave: "/assets/empty-save.png",
  emptySearch: "/assets/empty-search.png",
  emptyMeetingDark: "/assets/empty-meeting2.png",
  emptySaveDark: "/assets/empty-save2.png",
  emptySearchDark: "/assets/empty-search2.png",
};

const avatars = [
  "/assets/avatar-01.png",
  "/assets/avatar-02.png",
  "/assets/avatar-03.png",
  "/assets/avatar-04.png",
  "/assets/avatar-05.png",
  "/assets/avatar-06.png",
];
const profileTags = ["재학생", "자취중", "취업준비", "영상편집", "운동시작"];
const tabs = [
  { id: "home", label: "홈", icon: Home },
  { id: "community", label: "커뮤니티", icon: MessagesSquare },
  { id: "plus", label: "", icon: Plus },
  { id: "meetups", label: "모임", icon: UsersRound },
  { id: "my", label: "마이", icon: CircleUserRound },
];

const colorClass = {
  mint: { text: "text-mint", bg: "bg-mint", soft: "bg-mint/10", ring: "ring-mint/20", border: "border-mint/25", bar: "bg-mint/70" },
  blue: { text: "text-blue", bg: "bg-blue", soft: "bg-blue/10", ring: "ring-blue/20", border: "border-blue/25", bar: "bg-blue/70" },
  purple: { text: "text-purple", bg: "bg-purple", soft: "bg-purple/10", ring: "ring-purple/20", border: "border-purple/25", bar: "bg-purple/70" },
  coral: { text: "text-coral", bg: "bg-coral", soft: "bg-coral/10", ring: "ring-coral/20", border: "border-coral/25", bar: "bg-coral/70" },
  yellow: { text: "text-yellow", bg: "bg-yellow", soft: "bg-yellow/15", ring: "ring-yellow/25", border: "border-yellow/30", bar: "bg-yellow/80" },
};

const initialPosts = [
  { id: 1, category: "질문", author: "자취 2년차", avatar: avatars[0], time: "12분 전", title: "자취하면서 요리 시작했는데 간단한 레시피 추천해주세요!", body: "퇴근 후 15분 안에 만들 수 있는 메뉴면 더 좋아요.", likes: 24, comments: 17, color: "mint", commentList: ["계란볶음밥에 냉동야채 넣으면 빨라요.", "두부김치도 의외로 간단해요."] },
  { id: 2, category: "고민상담", author: "취준하는 청년", avatar: avatars[1], time: "34분 전", title: "면접 준비 같이 하실 분 구해요!", body: "서로 예상 질문 봐주고 피드백하면 좋을 것 같아요.", likes: 15, comments: 8, color: "purple", commentList: ["저도 참여하고 싶어요.", "온라인으로 하면 부담이 덜할 것 같아요."] },
  { id: 3, category: "자유", author: "독서 좋아하는 사람", avatar: avatars[2], time: "5시간 전", title: "이번 주말 독서 모임 모집합니다", body: "가볍게 읽은 책 이야기 나누는 모임이에요.", likes: 18, comments: 12, color: "yellow", commentList: ["장소가 어디인가요?", "처음 참여해도 괜찮나요?"] },
  { id: 4, category: "정보공유", author: "강서구 주민", avatar: avatars[3], time: "어제", title: "강서구 근처 조용한 카페 추천해요", body: "작업하기 좋고 콘센트 많은 곳 위주로 정리했어요.", likes: 31, comments: 14, color: "blue", commentList: ["공유 감사합니다!", "주말에도 조용한지 궁금해요."] },
];

const meetupItems = [
  { id: "walk", title: "한강 저녁 산책", type: "오프라인", place: "여의나루역", date: "6.24 수 19:00", count: 9, max: 12, intro: "퇴근 후 가볍게 걷고 이야기하는 산책 모임이에요.", tags: ["운동", "동네", "건강"], icon: Dumbbell, color: "mint" },
  { id: "career", title: "취업 포트폴리오 리뷰", type: "온라인", place: "줌 링크", date: "6.27 토 16:00", count: 5, max: 8, intro: "서로 포트폴리오를 보고 개선 포인트를 나눠요.", tags: ["스터디", "자격증", "취업"], icon: BookOpenCheck, color: "blue" },
  { id: "coffee", title: "낯가림 적은 커피챗", type: "오프라인", place: "홍대입구", date: "6.29 월 14:00", count: 3, max: 6, intro: "처음 만나는 사람도 부담 없도록 짧고 편하게 진행해요.", tags: ["대화", "친목", "동네"], icon: Coffee, color: "coral" },
  { id: "game", title: "롤 같이 할 사람", type: "온라인", place: "디스코드", date: "6.30 화 21:00", count: 4, max: 5, intro: "승패보다 즐겁게 같이 게임할 분을 찾아요.", tags: ["게임", "LOL", "친목"], icon: Gamepad2, color: "purple" },
  { id: "book", title: "독서 모임", type: "오프라인", place: "홍대", date: "이번 주말", count: 6, max: 10, intro: "읽고 있는 책을 가볍게 소개하고 서로의 문장을 나눠요.", tags: ["독서", "자유", "취향"], icon: BookOpenCheck, color: "yellow" },
];

const supportItems = [
  { id: 1, title: "청년 월세 한시 지원", status: "신청 가능", desc: "월 최대 20만원, 최대 12개월 지원", category: "주거", target: "만 19~34세 무주택 청년", period: "2026.06.01 ~ 2026.08.31", docs: "주민등록등본, 임대차계약서, 소득 확인 서류", method: "복지로 또는 주민센터 신청", note: "예산 소진 시 조기 마감될 수 있어요.", icon: Home, color: "mint", image: A.supportHome },
  { id: 2, title: "구직활동 응원 패키지", status: "맞춤 추천", desc: "면접 정장, 프로필 사진, 컨설팅 바우처 지원", category: "취업", target: "취업 준비 중인 청년", period: "상시 모집", docs: "신분증, 구직활동 증빙", method: "온라인 신청 후 승인", note: "지역별 지원 수량이 다를 수 있어요.", icon: ClipboardCheck, color: "blue", image: A.supportJob },
  { id: 3, title: "마음건강 상담권", status: "오늘 마감", desc: "전문 상담 1:1 연계, 상담권 제공", category: "마음", target: "심리 상담이 필요한 청년", period: "오늘 마감", docs: "간단 자가진단 결과", method: "앱 내 신청 후 상담기관 연계", note: "위기 상황이라면 즉시 전문기관에 연락하세요.", icon: HeartHandshake, color: "coral", image: A.supportHeart },
  { id: 4, title: "청년 교육 클래스", status: "추천", desc: "디자인, 영상, 취업 역량 강화 클래스", category: "교육", target: "역량 강화를 원하는 청년", period: "매월 모집", docs: "없음", method: "앱에서 바로 신청", note: "선착순 클래스는 빠르게 마감될 수 있어요.", icon: Sprout, color: "purple", image: A.supportEducation },
];

const badges = [
  { label: "첫 댓글", icon: MessageCircle, color: "yellow" },
  { label: "첫 모임", icon: UsersRound, color: "mint" },
  { label: "온라인", icon: Gamepad2, color: "blue" },
  { label: "청년패스", icon: ShieldCheck, color: "purple" },
  { label: "7일 체크인", icon: Trophy, color: "coral" },
];

const psychQuestions = [
  "오늘은 혼자 있는 시간이 더 편하다.",
  "누군가와 가볍게 대화하고 싶다.",
  "새로운 모임에 참여하는 것이 부담스럽다.",
  "관심사가 비슷한 사람과 연결되고 싶다.",
  "지금은 쉬는 시간이 필요하다.",
  "목표를 정하고 움직이면 기분이 나아진다.",
  "오프라인 만남보다 온라인 대화가 편하다.",
  "가벼운 산책이나 활동이 도움이 될 것 같다.",
  "취업이나 진로 고민을 나누고 싶다.",
  "내 생활권 안의 정보를 알고 싶다.",
  "정기적인 모임보다 짧은 만남이 좋다.",
  "내가 먼저 말을 거는 것이 어렵다.",
  "누군가의 응원이 필요하다.",
  "새로운 습관을 만들고 싶다.",
  "지금 나에게 필요한 건 정보보다 관계다.",
  "오늘의 상태를 기록하고 싶다.",
];

const psychResults = [
  {
    title: "차분한 회복형",
    line: "지금은 속도를 낮추고 나를 돌볼 때예요.",
    desc: "혼자 쉬는 시간이 에너지를 회복시키는 상태입니다.",
    actions: ["오늘 상태를 짧게 기록하기", "무리한 약속은 줄이기", "가벼운 산책으로 몸 풀기"],
    meetups: ["한강 저녁 산책", "낯가림 적은 커피챗"],
    support: "마음건강 상담권",
  },
  {
    title: "연결 충전형",
    line: "가벼운 대화와 관계가 힘이 되는 날이에요.",
    desc: "혼자보다 누군가와 느슨하게 연결될 때 안정감을 느낍니다.",
    actions: ["커뮤니티에 댓글 남기기", "짧은 커피챗 살펴보기", "관심사 태그 업데이트하기"],
    meetups: ["낯가림 적은 커피챗", "독서 모임"],
    support: "마음건강 상담권",
  },
  {
    title: "도전 에너지형",
    line: "작은 목표를 세우면 움직임이 살아나는 상태예요.",
    desc: "새로운 시도와 성취 경험이 오늘의 기분을 끌어올립니다.",
    actions: ["오늘 목표 하나 정하기", "걸음수 챌린지 참여하기", "포트폴리오 리뷰 신청하기"],
    meetups: ["취업 포트폴리오 리뷰", "한강 저녁 산책"],
    support: "구직활동 응원 패키지",
  },
  {
    title: "정보 탐색형",
    line: "지금은 관계보다 필요한 정보를 모으고 싶은 날이에요.",
    desc: "생활권 안의 정책과 기회를 확인하면 불안이 줄어듭니다.",
    actions: ["청년지원 저장하기", "내 생활권 정보 확인하기", "궁금한 점 커뮤니티에 질문하기"],
    meetups: ["취업 포트폴리오 리뷰", "독서 모임"],
    support: "청년 월세 한시 지원",
  },
  {
    title: "관계 회복형",
    line: "조금씩 다시 사람들과 가까워질 준비가 된 상태예요.",
    desc: "깊은 만남보다 안전하고 편안한 연결이 잘 맞습니다.",
    actions: ["부담 적은 모임 찜하기", "댓글로 먼저 반응하기", "안전 모임 안내 확인하기"],
    meetups: ["낯가림 적은 커피챗", "독서 모임"],
    support: "마음건강 상담권",
  },
  {
    title: "조용한 관찰형",
    line: "바로 참여하기보다 둘러보며 감을 잡는 날이에요.",
    desc: "관찰과 탐색을 통해 나에게 맞는 속도를 찾고 있습니다.",
    actions: ["나다움 지도 둘러보기", "모임 상세만 살펴보기", "관심 태그 저장하기"],
    meetups: ["독서 모임", "한강 저녁 산책"],
    support: "청년 교육 클래스",
  },
  {
    title: "루틴 성장형",
    line: "작은 습관을 반복하면 안정감이 커지는 상태예요.",
    desc: "정기적인 체크인과 생활 루틴이 현재의 나를 지탱합니다.",
    actions: ["7일 체크인 시작하기", "걸음수 기록 확인하기", "이번 주 목표 적기"],
    meetups: ["한강 저녁 산책", "취업 포트폴리오 리뷰"],
    support: "청년 교육 클래스",
  },
  {
    title: "활동 전환형",
    line: "가벼운 움직임으로 기분 전환이 필요한 날이에요.",
    desc: "생각이 많을수록 몸을 움직이는 활동이 도움이 됩니다.",
    actions: ["산책 모임 보기", "운동 태그 추가하기", "오늘 5,000보 넘기기"],
    meetups: ["한강 저녁 산책", "롤 같이 할 사람"],
    support: "구직활동 응원 패키지",
  },
];

function pickPsychResult(answers) {
  const total = answers.reduce((sum, value) => sum + (value ?? 1), 0);
  const relation = (answers[1] ?? 0) + (answers[3] ?? 0) + (answers[12] ?? 0) + (answers[14] ?? 0);
  const routine = (answers[5] ?? 0) + (answers[7] ?? 0) + (answers[13] ?? 0) + (answers[15] ?? 0);
  const info = (answers[8] ?? 0) + (answers[9] ?? 0);
  const quiet = (answers[0] ?? 0) + (answers[2] ?? 0) + (answers[6] ?? 0) + (answers[11] ?? 0);
  if (relation >= 11) return psychResults[1];
  if (routine >= 11) return psychResults[6];
  if (info >= 5) return psychResults[3];
  if (quiet >= 10 && relation <= 7) return psychResults[5];
  if (quiet >= 9) return psychResults[0];
  if (total >= 42) return psychResults[2];
  if (total >= 34) return psychResults[7];
  return psychResults[4];
}

function App() {
  const [stage, setStage] = useState("login");
  const [activeTab, setActiveTab] = useState("home");
  const [detail, setDetail] = useState(null);
  const [overlay, setOverlay] = useState(null);
  const [verified, setVerified] = useState(false);
  const [joinedMeetups, setJoinedMeetups] = useState(["walk"]);
  const [savedSupports, setSavedSupports] = useState([2]);
  const [moodResult, setMoodResult] = useState(null);
  const [likedPosts, setLikedPosts] = useState([3]);
  const [posts, setPosts] = useState(initialPosts);
  const [customMeetups, setCustomMeetups] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const meetups = useMemo(() => [...customMeetups, ...meetupItems], [customMeetups]);

  const user = useMemo(
    () => ({
      name: verified ? "이나담" : "게스트",
      badge: verified ? "청년 인증 완료" : "인증 대기",
      level: "Lv.23",
      joinedCount: joinedMeetups.length,
      savedCount: savedSupports.length,
      moodResult,
    }),
    [verified, joinedMeetups.length, savedSupports.length, moodResult],
  );

  const navigateDetail = (next) => setDetail(next);
  const goBack = () => setDetail(null);
  const goTab = (tab) => {
    setDetail(null);
    setActiveTab(tab);
  };

  const state = {
    activeTab,
    setActiveTab: goTab,
    setStage,
    detail,
    setDetail: navigateDetail,
    goBack,
    overlay,
    setOverlay,
    verified,
    joinedMeetups,
    setJoinedMeetups,
    savedSupports,
    setSavedSupports,
    moodResult,
    setMoodResult,
    likedPosts,
    setLikedPosts,
    posts,
    setPosts,
    meetups,
    setCustomMeetups,
    darkMode,
    setDarkMode,
    user,
  };

  if (stage === "login") return <LoginScreen onLogin={() => setStage("onboarding")} />;
  if (stage === "onboarding") {
    return (
      <OnboardingScreen
        verified={verified}
        onVerify={() => setVerified(true)}
        onStart={() => {
          setVerified(true);
          setStage("app");
        }}
      />
    );
  }
  return <MobileShell {...state} />;
}

function LoginScreen({ onLogin }) {
  return (
    <ScreenFrame>
      <div className="flex min-h-[100dvh] flex-col justify-between bg-white px-6 py-7 sm:min-h-[860px]">
        <div className="flex justify-center pt-2">
          <img className="h-20 w-52 object-contain" src={A.logo} alt="나다움" />
        </div>
        <section className="space-y-6">
          <div className="mx-auto overflow-hidden rounded-[30px] border border-slate-100 bg-white p-3 shadow-card">
            <img className="h-[280px] w-full rounded-[24px] object-cover" src={A.hero} alt="나다움 청년 커뮤니티" />
          </div>
          <div className="text-center">
            <h1 className="text-[30px] font-black leading-tight text-ink">나답게 사는 하루를 시작해요</h1>
            <p className="mx-auto mt-3 max-w-[310px] text-[14px] font-semibold leading-6 text-sub">
              생활 정보, 모임, 지원 정책, 마음 체크를 한 곳에서 이어가요.
            </p>
          </div>
          <div className="space-y-2.5">
            <button className="primary-btn mint-btn" type="button" onClick={onLogin}><LockKeyhole size={18} />휴대폰 번호로 시작</button>
            <button className="kakao-btn" type="button" onClick={onLogin}><MessageCircle size={18} />카카오로 계속</button>
            <button className="google-btn" type="button" onClick={onLogin}><span className="google-dot">G</span>구글로 시작하기</button>
          </div>
        </section>
        <p className="pb-1 text-center text-xs font-bold text-slate-400">서울, 경기, 인천 청년 생활권 기반</p>
      </div>
    </ScreenFrame>
  );
}

function OnboardingScreen({ verified, onVerify, onStart }) {
  const rows = [
    { icon: ShieldCheck, title: "만 19-39세", desc: "청년 지원 기준에 맞는지 확인", color: "mint" },
    { icon: MapPin, title: "생활권 선택", desc: "서울, 경기, 인천 관심 지역 설정", color: "blue" },
    { icon: HeartHandshake, title: "관심사 선택", desc: "주거, 취업, 마음건강, 모임", color: "purple" },
  ];

  return (
    <ScreenFrame>
      <div className="flex min-h-[100dvh] flex-col bg-white px-6 py-7 sm:min-h-[860px]">
        <TopLogo />
        <div className="mt-8">
          <p className="text-sm font-black text-blue">청년 인증</p>
          <h1 className="mt-2 text-[27px] font-black leading-tight text-ink">내 지역과 나이에 맞는<br />혜택을 먼저 보여드릴게요</h1>
        </div>
        <div className="mt-6 space-y-3">
          {rows.map((row) => <VerifyRow key={row.title} done={verified} {...row} />)}
        </div>
        <div className="mt-4 rounded-3xl border border-yellow/30 bg-[#FFF9E8] p-4 shadow-card">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-yellow shadow-sm"><Award size={22} /></div>
            <div>
              <p className="font-black text-ink">나다움 청년패스</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-sub">인증하면 맞춤 지원, 모임 참여, 커뮤니티 배지가 열려요.</p>
            </div>
          </div>
        </div>
        <div className="mt-auto space-y-3 pb-2">
          <button className={verified ? "primary-btn mint-btn" : "primary-btn"} type="button" onClick={verified ? onStart : onVerify}>
            {verified ? <Check size={18} /> : <ClipboardCheck size={18} />}
            {verified ? "나다움 시작하기" : "청년 인증하기"}
          </button>
          <button className="secondary-btn" type="button" onClick={onStart}>나중에 할게요</button>
        </div>
      </div>
    </ScreenFrame>
  );
}

function MobileShell(props) {
  const mainScreens = {
    home: HomeScreen,
    community: CommunityScreen,
    meetups: MeetupsScreen,
    support: SupportScreen,
    my: MyPageScreen,
  };
  const detailScreens = {
    mapDetail: MapDetailScreen,
    walkDetail: WalkDetailScreen,
    meetingDetail: MeetingDetailScreen,
    communityDetail: CommunityDetailScreen,
    supportDetail: SupportDetailScreen,
    myMeetups: MyMeetupsScreen,
    savedSupports: SavedSupportsScreen,
    psychTest: PsychTestScreen,
  };
  const Screen = props.detail ? detailScreens[props.detail.type] : mainScreens[props.activeTab] || HomeScreen;
  const showTabs = !props.detail;

  return (
    <ScreenFrame darkMode={props.darkMode}>
      <div className={`flex min-h-[100dvh] flex-col bg-white sm:min-h-[860px] ${props.darkMode ? "theme-dark" : ""}`}>
        <main className={`app-scroll flex-1 overflow-y-auto ${showTabs ? "pb-28" : "pb-6"}`}>
          <Screen {...props} />
        </main>
        {showTabs && <BottomTabs activeTab={props.activeTab} setActiveTab={props.setActiveTab} onPlus={() => props.setOverlay("actions")} />}
        <Overlay {...props} />
      </div>
    </ScreenFrame>
  );
}

function HomeScreen({ user, setMoodResult, moodResult, joinedMeetups, setActiveTab, setDetail }) {
  const moods = [
    { id: "calm", label: "회복형", full: "차분한 회복형", icon: Moon, color: "mint" },
    { id: "spark", label: "도전형", full: "도전 에너지형", icon: Sparkles, color: "blue" },
    { id: "care", label: "연결형", full: "연결 충전형", icon: Heart, color: "purple" },
  ];
  const recommendations = [
    { title: "월세 지원 신청 기간", desc: "서울시 청년 월세 지원", icon: WalletCards, color: "mint", tab: "support" },
    { title: "낯가림 적은 커피챗", desc: "6.29 월 · 홍대입구", icon: Coffee, color: "coral", tab: "meetups" },
  ];

  return (
    <PagePadding>
      <TopBar title="나다움" subtitle={`${user.name}님의 오늘`} />
      <section className="mt-4 rounded-[26px] bg-white p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-mint">오늘의 체크인</p>
            <h2 className="mt-1 text-[21px] font-black leading-tight text-ink">{moodResult || "지금 기분은 어때요?"}</h2>
          </div>
          <Sparkles className="text-mint" size={27} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const active = moodResult === mood.full;
            return (
              <button key={mood.id} className={`h-[68px] rounded-2xl border text-center transition ${active ? `${colorClass[mood.color].bg} border-transparent text-white shadow-lift` : "border-slate-100 bg-slate-50 text-sub"}`} type="button" onClick={() => setMoodResult(mood.full)}>
                <Icon className="mx-auto mb-1" size={20} />
                <span className="block text-xs font-black">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </section>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <CompactMapCard onClick={() => setDetail({ type: "mapDetail" })} />
        <CompactWalkCard onClick={() => setDetail({ type: "walkDetail" })} />
      </div>
      <SectionHeader title="오늘 추천" action="더보기" onClick={() => setActiveTab("support")} />
      <div className="space-y-2.5">
        {recommendations.map((item) => <ActionPanel key={item.title} {...item} onClick={() => setActiveTab(item.tab)} />)}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <MiniStat label="참여 모임" value={`${joinedMeetups.length}개`} />
        <MiniStat label="마음 결과" value={moodResult ? "완료" : "대기"} />
        <MiniStat label="레벨" value={user.level} />
      </div>
    </PagePadding>
  );
}

function MapDetailScreen({ goBack, setActiveTab, setDetail }) {
  const mapMeetups = [
    { meetupId: "walk", title: "한강 저녁 산책", place: "여의나루역", type: "오프라인", date: "6.24 수 19:00", color: "mint" },
    { meetupId: "coffee", title: "낯가림 적은 커피챗", place: "홍대입구", type: "오프라인", date: "6.29 월 14:00", color: "coral" },
    { meetupId: "book", title: "독서 모임", place: "홍대", type: "오프라인", date: "이번 주말", color: "yellow" },
    { meetupId: "career", title: "취업 포트폴리오 리뷰", place: "온라인", type: "온라인", date: "6.27 토 16:00", color: "blue" },
  ];
  return (
    <DetailPage title="나다움 지도" onBack={goBack}>
      <img className="h-56 w-full rounded-[28px] object-cover shadow-card" src={A.map2} alt="나다움 지도" onError={(e) => { e.currentTarget.src = A.map; }} />
      <p className="text-sm font-semibold leading-6 text-sub">내 주변에서 예정된 모임 위치를 확인해요.</p>
      <TagCloud className="mt-0" />
      <section className="rounded-[24px] bg-white p-4 shadow-card">
        <SectionTitle title="주변 모임 예정 위치" />
        <div className="mt-3 space-y-2">
          {mapMeetups.map((item) => (
            <button
              key={item.title}
              className="flex w-full items-center justify-between rounded-2xl bg-slate-50 p-3 text-left"
              type="button"
              onClick={() => setDetail({ type: "meetingDetail", meetupId: item.meetupId })}
            >
              <span>
                <span className="block text-sm font-black text-ink">{item.title}</span>
                <span className="mt-1 block text-xs font-bold text-sub">{item.place} · {item.date}</span>
              </span>
              <span className={`rounded-full px-2 py-1 text-[10px] font-black ${item.type === "온라인" ? "bg-purple/10 text-purple" : "bg-mint/10 text-mint"}`}>{item.type}</span>
            </button>
          ))}
        </div>
      </section>
      <button className="primary-btn mint-btn" type="button" onClick={() => { setDetail(null); setActiveTab("meetups"); }}>지도에서 모임 찾기</button>
    </DetailPage>
  );
}

function WalkDetailScreen({ goBack, setOverlay }) {
  const weekly = [
    ["월", "3,200보"], ["화", "4,800보"], ["수", "5,300보"], ["목", "0보"], ["금", "0보"],
  ];
  return (
    <DetailPage title="걸음수 챌린지" onBack={goBack}>
      <img className="h-52 w-full rounded-[28px] object-cover shadow-card" src={A.walk} alt="걸음수 챌린지" />
      <section className="rounded-[24px] bg-white p-4 shadow-card">
        <div className="grid grid-cols-3 gap-2">
          <MiniStat label="오늘" value="5,300보" />
          <MiniStat label="목표" value="10,000보" />
          <MiniStat label="진행률" value="53%" />
        </div>
        <ProgressBar value={53} color="mint" />
        <p className="mt-3 rounded-2xl bg-mint/10 p-3 text-sm font-black text-mint">완료 시 50P 지급</p>
      </section>
      <section className="rounded-[24px] bg-white p-4 shadow-card">
        <SectionTitle title="주간 기록" />
        <div className="mt-3 grid grid-cols-5 gap-2">
          {weekly.map(([day, steps], index) => (
            <div key={day} className={`rounded-2xl p-2 text-center ${index < 3 ? "bg-mint/10" : "bg-slate-50"}`}>
              <p className="text-xs font-black text-sub">{day}</p>
              <p className="mt-1 text-[11px] font-black text-ink">{steps}</p>
            </div>
          ))}
        </div>
      </section>
      <button className="primary-btn mint-btn" type="button" onClick={() => setOverlay("walkRecord")}>오늘 기록 확인</button>
    </DetailPage>
  );
}

function CommunityScreen({ likedPosts, setLikedPosts, posts, setDetail, setOverlay, darkMode }) {
  const [category, setCategory] = useState("전체");
  const categories = ["전체", "질문", "정보공유", "고민상담", "자유"];
  const visiblePosts = category === "전체" ? posts : posts.filter((post) => post.category === category);
  const toggleLike = (id) => setLikedPosts((prev) => (prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]));

  return (
    <PagePadding>
      <TopBar title="커뮤니티" subtitle="동네 청년들과 가볍게 소통해요" />
      <SegmentedTabs items={categories} active={category} onChange={setCategory} />
      <div className="mt-4 space-y-2.5">
        {visiblePosts.length === 0 ? <EmptyCard image={A.emptySearch} text="검색 결과가 없어요" darkMode={darkMode} /> : visiblePosts.map((post) => {
          const liked = likedPosts.includes(post.id);
          return (
            <article key={post.id} className="rounded-[24px] bg-white p-4 shadow-card" onClick={() => setDetail({ type: "communityDetail", postId: post.id })}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <img className="h-10 w-10 rounded-2xl object-cover" src={post.avatar || avatars[4]} alt="" />
                  <div>
                    <p className="text-sm font-black text-ink">{post.author}</p>
                    <p className="text-xs font-bold text-sub">{post.time}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${colorClass[post.color].soft} ${colorClass[post.color].text}`}>{post.category}</span>
              </div>
              <h2 className="mt-3 text-[16px] font-black leading-6 text-ink">{post.title}</h2>
              <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-5 text-sub">{post.body}</p>
              <div className="mt-3 flex items-center gap-4">
                <button className={`flex items-center gap-1 text-sm font-black ${liked ? "text-coral" : "text-sub"}`} type="button" onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}>
                  <Heart size={16} fill={liked ? "currentColor" : "none"} />{post.likes + (liked ? 1 : 0)}
                </button>
                <span className="flex items-center gap-1 text-sm font-black text-sub"><MessageCircle size={16} />{post.comments}</span>
              </div>
            </article>
          );
        })}
      </div>
      <button className="floating-action" type="button" aria-label="글쓰기" onClick={() => setOverlay("write")}><PenLine size={21} /></button>
    </PagePadding>
  );
}

function CommunityDetailScreen({ detail, posts, setPosts, goBack, likedPosts, setLikedPosts, darkMode }) {
  const post = posts.find((item) => item.id === detail.postId);
  const [comment, setComment] = useState("");
  if (!post) return <DetailPage title="게시글" onBack={goBack}><EmptyCard image={A.emptySearch} text="게시글을 찾을 수 없어요" darkMode={darkMode} /></DetailPage>;
  const liked = likedPosts.includes(post.id);
  const toggleLike = () => setLikedPosts((prev) => (prev.includes(post.id) ? prev.filter((id) => id !== post.id) : [...prev, post.id]));
  const addComment = () => {
    const text = comment.trim();
    if (!text) return;
    setPosts((prev) => prev.map((item) => item.id === post.id ? { ...item, comments: item.comments + 1, commentList: [...(item.commentList || []), text] } : item));
    setComment("");
  };
  return (
    <DetailPage title="게시글 상세" onBack={goBack}>
      <section className="rounded-[26px] bg-white p-4 shadow-card">
        <span className={`rounded-full px-3 py-1 text-xs font-black ${colorClass[post.color].soft} ${colorClass[post.color].text}`}>{post.category}</span>
        <div className="mt-4 flex items-center gap-3">
          <img className="h-11 w-11 rounded-2xl object-cover" src={post.avatar || avatars[4]} alt="" />
          <div>
            <p className="text-sm font-black text-ink">{post.author}</p>
            <p className="text-xs font-bold text-sub">{post.time}</p>
          </div>
        </div>
        <h1 className="mt-4 text-xl font-black leading-7 text-ink">{post.title}</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-sub">{post.body}</p>
        <div className="mt-4 flex gap-4 text-sm font-black text-sub">
          <button className={`flex items-center gap-1 font-black ${liked ? "text-coral" : "text-sub"}`} type="button" onClick={toggleLike}>
            <Heart size={17} fill={liked ? "currentColor" : "none"} />
            좋아요 {post.likes + (liked ? 1 : 0)}
          </button>
          <span>댓글 {post.comments}</span>
        </div>
      </section>
      <section className="rounded-[24px] bg-white p-4 shadow-card">
        <SectionTitle title="댓글" />
        <div className="mt-3 space-y-2">
          {(post.commentList || []).map((item, index) => (
            <div key={`${item}-${index}`} className="flex gap-2 rounded-2xl bg-slate-50 p-3">
              <img className="h-8 w-8 rounded-full object-cover" src={avatars[(index + 1) % avatars.length]} alt="" />
              <p className="text-sm font-semibold leading-5 text-sub">{item}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="flex gap-2 rounded-[22px] bg-white p-3 shadow-card">
        <input className="modal-input min-w-0 flex-1" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="댓글을 입력해요" />
        <button className="rounded-2xl bg-mint px-4 text-sm font-black text-white" type="button" onClick={addComment}>작성</button>
      </div>
    </DetailPage>
  );
}

function MeetupsScreen({ joinedMeetups, setJoinedMeetups, setDetail, meetups, darkMode }) {
  const [filter, setFilter] = useState("전체");
  const filters = ["전체", "온라인", "오프라인", "스터디", "운동", "게임"];
  const visibleMeetups = filter === "전체" ? meetups : meetups.filter((item) => item.type === filter || item.tags.includes(filter));
  const toggleJoin = (id) => setJoinedMeetups((prev) => (prev.includes(id) ? prev.filter((meetupId) => meetupId !== id) : [...prev, id]));

  return (
    <PagePadding>
      <TopBar title="모임" subtitle="편하게 들어갈 수 있는 자리" />
      <section className="mt-4 overflow-hidden rounded-[24px] bg-white shadow-card">
        <img className="h-32 w-full object-contain" src={A.safe} alt="나다움 안전 모임" />
      </section>
      <section className="mt-4 rounded-[24px] bg-white p-4 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue"><CalendarDays size={24} /></div>
          <div>
            <p className="text-xs font-black text-sub">이번 주 참여 예정</p>
            <p className="mt-0.5 text-lg font-black text-ink">{joinedMeetups.length}개 모임</p>
          </div>
        </div>
      </section>
      <SegmentedTabs items={filters} active={filter} onChange={setFilter} />
      <div className="mt-4 space-y-2.5">
        {visibleMeetups.length === 0 ? <EmptyCard image={A.emptySearch} text="조건에 맞는 모임이 없어요" darkMode={darkMode} /> : visibleMeetups.map((meetup) => {
          const joined = joinedMeetups.includes(meetup.id);
          const Icon = meetup.icon;
          const count = meetup.count + (joined ? 1 : 0);
          return (
            <article key={meetup.id} className="rounded-[24px] bg-white p-4 shadow-card" onClick={() => setDetail({ type: "meetingDetail", meetupId: meetup.id })}>
              <div className="flex items-start gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${colorClass[meetup.color].soft} ${colorClass[meetup.color].text}`}><Icon size={22} /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${meetup.type === "온라인" ? "bg-purple/10 text-purple" : "bg-mint/10 text-mint"}`}>{meetup.type}</span>
                    <span className="truncate text-xs font-bold text-sub">{meetup.date}</span>
                  </div>
                  <h2 className="mt-1.5 text-base font-black text-ink">{meetup.title}</h2>
                  <p className="mt-1 flex items-center gap-1 text-xs font-bold text-sub"><MapPin size={13} />{meetup.place}</p>
                </div>
                <button className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-black ${joined ? "bg-ink text-white" : "bg-mint/10 text-mint"}`} type="button" onClick={(e) => { e.stopPropagation(); toggleJoin(meetup.id); }}>{joined ? "참여중" : "참여"}</button>
              </div>
              <ProgressBar value={(count / meetup.max) * 100} color={meetup.color} compact />
              <p className="mt-2 text-xs font-black text-sub">{count}명 / {meetup.max}명</p>
            </article>
          );
        })}
      </div>
    </PagePadding>
  );
}

function MeetingDetailScreen({ detail, joinedMeetups, setJoinedMeetups, goBack, meetups, darkMode }) {
  const meetup = meetups.find((item) => item.id === detail.meetupId);
  if (!meetup) return <DetailPage title="모임 상세" onBack={goBack}><EmptyCard image={A.emptySearch} text="모임을 찾을 수 없어요" darkMode={darkMode} /></DetailPage>;
  const joined = joinedMeetups.includes(meetup.id);
  const count = meetup.count + (joined ? 1 : 0);
  const join = () => setJoinedMeetups((prev) => (prev.includes(meetup.id) ? prev : [...prev, meetup.id]));
  return (
    <DetailPage title="모임 상세" onBack={goBack}>
      <section className="overflow-hidden rounded-[28px] bg-white shadow-card">
        <img className="h-36 w-full object-cover" src={A.safe} alt="안전 모임" />
        <div className="p-4">
          <span className={`rounded-full px-3 py-1 text-xs font-black ${meetup.type === "온라인" ? "bg-purple/10 text-purple" : "bg-mint/10 text-mint"}`}>{meetup.type}</span>
          <h1 className="mt-3 text-2xl font-black text-ink">{meetup.title}</h1>
          <p className="mt-2 text-sm font-bold text-sub">{meetup.date}</p>
          <p className="mt-1 flex items-center gap-1 text-sm font-bold text-sub"><MapPin size={15} />{meetup.place}</p>
          <ProgressBar value={(count / meetup.max) * 100} color={meetup.color} />
          <p className="mt-2 text-sm font-black text-sub">{count}명 / {meetup.max}명</p>
        </div>
      </section>
      <section className="rounded-[24px] bg-white p-4 shadow-card">
        <SectionTitle title="모임 소개" />
        <p className="mt-3 text-sm font-semibold leading-6 text-sub">{meetup.intro}</p>
        <div className="mt-3 flex flex-wrap gap-2">{meetup.tags.map((tag) => <Tag key={tag} color={meetup.color}>{tag}</Tag>)}</div>
      </section>
      <section className="rounded-[24px] bg-white p-4 shadow-card">
        <SectionTitle title="참여자" />
        <div className="mt-3 flex -space-x-2">{avatars.slice(0, 5).map((avatar) => <img key={avatar} className="h-11 w-11 rounded-full border-2 border-white object-cover" src={avatar} alt="" />)}</div>
      </section>
      <button className="primary-btn mint-btn" type="button" onClick={join}>{joined ? "참여중" : "참여하기"}</button>
    </DetailPage>
  );
}

function SupportScreen({ savedSupports, setSavedSupports, setDetail }) {
  const [category, setCategory] = useState("주거");
  const categories = ["주거", "취업", "마음", "교육"];
  const ordered = supportItems.filter((item) => item.category === category).concat(supportItems.filter((item) => item.category !== category));
  const toggleSave = (id) => setSavedSupports((prev) => (prev.includes(id) ? prev.filter((supportId) => supportId !== id) : [...prev, id]));

  return (
    <PagePadding>
      <TopBar title="청년지원" subtitle="내 상황에 맞춘 정책과 혜택" />
      <div className="mt-4 flex h-[48px] items-center gap-3 rounded-2xl bg-white px-4 text-sub shadow-card"><Search size={18} /><span className="text-sm font-bold">주거, 취업, 상담 검색</span></div>
      <SegmentedTabs items={categories} active={category} onChange={setCategory} />
      <div className="mt-4 space-y-2.5">
        {ordered.map((item) => {
          const saved = savedSupports.includes(item.id);
          const Icon = item.icon;
          return (
            <article key={item.id} className={`relative overflow-hidden rounded-[24px] border bg-white p-4 shadow-card ${colorClass[item.color].border}`} onClick={() => setDetail({ type: "supportDetail", supportId: item.id })}>
              <img className="absolute bottom-2 right-12 h-16 w-16 object-contain opacity-95" src={item.image} alt="" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${colorClass[item.color].soft} ${colorClass[item.color].text}`}><Icon size={23} /></div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2"><span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${colorClass[item.color].soft} ${colorClass[item.color].text}`}>{item.status}</span><span className="text-xs font-bold text-sub">{item.category}</span></div>
                    <h2 className="mt-2 truncate text-base font-black text-ink">{item.title}</h2>
                    <p className="mt-1 text-sm font-semibold leading-5 text-sub">{item.desc}</p>
                  </div>
                </div>
                <button className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${saved ? "bg-yellow text-white" : "bg-slate-100 text-sub"}`} type="button" aria-label="저장" onClick={(event) => { event.stopPropagation(); toggleSave(item.id); }}>{saved ? <Check size={18} /> : <Plus size={18} />}</button>
              </div>
            </article>
          );
        })}
      </div>
    </PagePadding>
  );
}

function SupportDetailScreen({ detail, savedSupports, setSavedSupports, goBack, darkMode }) {
  const support = supportItems.find((item) => item.id === detail.supportId);
  if (!support) return <DetailPage title="청년지원 상세" onBack={goBack}><EmptyState image={A.emptySearch} title="지원 정보를 찾을 수 없어요" desc="다시 목록에서 선택해주세요." darkMode={darkMode} /></DetailPage>;
  const saved = savedSupports.includes(support.id);
  const toggleSave = () => setSavedSupports((prev) => (prev.includes(support.id) ? prev.filter((id) => id !== support.id) : [...prev, support.id]));
  return (
    <DetailPage title="청년지원 상세" onBack={goBack}>
      <section className={`overflow-hidden rounded-[28px] border bg-white shadow-card ${colorClass[support.color].border}`}>
        <img className="h-48 w-full object-cover" src={support.image} alt={support.title} />
        <div className="p-4">
          <span className={`rounded-full px-3 py-1 text-xs font-black ${colorClass[support.color].soft} ${colorClass[support.color].text}`}>{support.category}</span>
          <h1 className="mt-3 text-2xl font-black text-ink">{support.title}</h1>
          <p className="mt-2 text-sm font-black text-mint">{support.status}</p>
        </div>
      </section>
      <section className="space-y-2 rounded-[24px] bg-white p-4 shadow-card">
        <InfoLine label="지원 대상" value={support.target} />
        <InfoLine label="지원 내용" value={support.desc} />
        <InfoLine label="신청 기간" value={support.period} />
        <InfoLine label="필요 서류" value={support.docs} />
        <InfoLine label="신청 방법" value={support.method} />
        <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-sub">{support.note}</p>
      </section>
      <button className="primary-btn mint-btn" type="button" onClick={toggleSave}>{saved ? "저장됨" : "저장하기"}</button>
    </DetailPage>
  );
}

function MyMeetupsScreen({ joinedMeetups, setDetail, goBack, meetups, darkMode }) {
  const joined = meetups.filter((item) => joinedMeetups.includes(item.id));
  return (
    <DetailPage title="내가 참여한 모임" onBack={goBack}>
      {joined.length === 0 ? (
        <EmptyState image={A.emptyMeeting} title="참여 중인 모임이 없어요" desc="관심 있는 모임을 찾아 참여해보세요." darkMode={darkMode} />
      ) : (
        <div className="space-y-2.5">
          {joined.map((meetup) => {
            const Icon = meetup.icon;
            return (
              <button key={meetup.id} className="flex w-full gap-3 rounded-[24px] bg-white p-4 text-left shadow-card" type="button" onClick={() => setDetail({ type: "meetingDetail", meetupId: meetup.id })}>
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${colorClass[meetup.color].soft} ${colorClass[meetup.color].text}`}><Icon size={22} /></div>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-black text-ink">{meetup.title}</span>
                  <span className="mt-1 block text-xs font-bold text-sub">{meetup.date} · {meetup.place}</span>
                </span>
                <ChevronRight className="mt-3 text-slate-300" size={18} />
              </button>
            );
          })}
        </div>
      )}
    </DetailPage>
  );
}

function SavedSupportsScreen({ savedSupports, setDetail, goBack, darkMode }) {
  const saved = supportItems.filter((item) => savedSupports.includes(item.id));
  return (
    <DetailPage title="저장한 청년지원" onBack={goBack}>
      {saved.length === 0 ? (
        <EmptyState image={A.emptySave} title="저장한 청년지원이 없어요" desc="필요한 지원을 저장해두면 여기서 확인할 수 있어요." darkMode={darkMode} />
      ) : (
        <div className="space-y-2.5">
          {saved.map((item) => (
            <button key={item.id} className="flex w-full items-center gap-3 rounded-[24px] bg-white p-4 text-left shadow-card" type="button" onClick={() => setDetail({ type: "supportDetail", supportId: item.id })}>
              <img className="h-14 w-14 rounded-2xl object-cover" src={item.image} alt="" />
              <span className="min-w-0 flex-1">
                <span className="block text-base font-black text-ink">{item.title}</span>
                <span className="mt-1 block text-xs font-bold text-sub">{item.category} · {item.status}</span>
              </span>
              <ChevronRight className="text-slate-300" size={18} />
            </button>
          ))}
        </div>
      )}
    </DetailPage>
  );
}

function MyPageScreen({ user, verified, setStage, setDetail, darkMode, setDarkMode }) {
  const records = [
    { label: "모임 참여", value: 12, color: "mint" },
    { label: "온라인 모임", value: 18, color: "blue" },
    { label: "오프라인", value: 5, color: "yellow" },
    { label: "댓글/글", value: 36, color: "purple" },
  ];
  return (
    <PagePadding>
      <TopBar title="마이페이지" subtitle="내 활동과 인증" />
      <section className="mt-4 rounded-[26px] bg-white p-4 shadow-card">
        <div className="flex items-center gap-3">
          <img className="h-16 w-16 rounded-[22px] object-cover shadow-lift ring-4 ring-mint/10" src={avatars[5]} alt="프로필" />
          <div>
            <div className="flex items-center gap-2"><h2 className="text-xl font-black text-ink">이나담</h2><span className="rounded-full bg-mint/10 px-2 py-0.5 text-xs font-black text-mint">{user.level}</span></div>
            <p className="mt-1 text-sm font-bold text-sub">{verified ? "청년 인증 완료" : user.badge}</p>
            <p className="mt-1 text-xs font-bold text-mint">나다움을 찾아가는 중</p>
          </div>
        </div>
      </section>
      <section className="mt-3 rounded-[24px] bg-white p-4 shadow-card"><SectionTitle title="나다움 지도" /><TagCloud className="mt-3" /></section>
      <section className="mt-3 rounded-[24px] bg-white p-4 shadow-card">
        <SectionTitle title="활동 기록" />
        <div className="mt-3 grid grid-cols-2 gap-2.5">{records.map((record) => <div key={record.label} className={`rounded-2xl p-3 ${colorClass[record.color].soft}`}><p className="text-xl font-black text-ink">{record.value}</p><p className="mt-1 text-xs font-black text-sub">{record.label}</p></div>)}</div>
      </section>
      <section className="mt-3 rounded-[24px] bg-white p-4 shadow-card">
        <SectionTitle title="성장 배지" action="14개" />
        <div className="mt-3 grid grid-cols-5 gap-2">{badges.map((badge) => { const Icon = badge.icon; return <div key={badge.label} className="text-center"><div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${colorClass[badge.color].soft} ${colorClass[badge.color].text} ring-2 ${colorClass[badge.color].ring}`}><Icon size={20} /></div><p className="mt-1.5 text-[10px] font-black leading-3 text-slate-600">{badge.label}</p></div>; })}</div>
      </section>
      <div className="mt-3 space-y-2.5">
        <MenuRow icon={BookOpenCheck} label={user.moodResult ? `심리테스트 결과: ${user.moodResult}` : "심리테스트 하기"} color="purple" image={A.mental} onClick={() => setDetail({ type: "psychTest" })} />
        <MenuRow icon={UsersRound} label="내가 참여한 모임" color="blue" onClick={() => setDetail({ type: "myMeetups" })} />
        <MenuRow icon={WalletCards} label="저장한 청년지원" color="mint" onClick={() => setDetail({ type: "savedSupports" })} />
        <MenuRow icon={ShieldCheck} label="청년 인증 다시 보기" color="yellow" onClick={() => setStage("onboarding")} />
        <button className="flex w-full items-center justify-between rounded-[22px] bg-white p-3.5 text-left shadow-card" type="button" onClick={() => setDarkMode((value) => !value)}>
          <span className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-ink"><Moon size={20} /></span><span className="text-sm font-black text-ink">다크모드</span></span>
          <span className={`flex h-7 w-12 items-center rounded-full p-1 transition ${darkMode ? "bg-mint" : "bg-slate-200"}`}><span className={`h-5 w-5 rounded-full bg-white transition ${darkMode ? "translate-x-5" : ""}`} /></span>
        </button>
      </div>
    </PagePadding>
  );
}

function PsychTestScreen({ goBack, setMoodResult, setActiveTab, setDetail }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(psychQuestions.length).fill(null));
  const [result, setResult] = useState(null);
  const options = ["매우 아니다", "아니다", "그렇다", "매우 그렇다"];
  const current = psychQuestions[step];
  const calculated = pickPsychResult(answers);

  if (result) {
    return (
      <DetailPage title="심리테스트 결과" onBack={goBack}>
        <img className="h-52 w-full rounded-[28px] object-cover shadow-card" src={A.mental} alt="심리테스트 결과" />
        <section className="rounded-[24px] bg-white p-4 shadow-card">
          <p className="text-sm font-black text-mint">오늘의 나</p>
          <h1 className="mt-2 text-2xl font-black text-ink">{result.title}</h1>
          <p className="mt-2 text-sm font-black text-mint">{result.line}</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-sub">{result.desc}</p>
        </section>
        <section className="rounded-[24px] bg-white p-4 shadow-card">
          <SectionTitle title="추천 행동" />
          <div className="mt-3 space-y-2">{result.actions.map((item) => <p key={item} className="rounded-2xl bg-mint/10 px-4 py-3 text-sm font-black text-mint">{item}</p>)}</div>
        </section>
        <section className="rounded-[24px] bg-white p-4 shadow-card">
          <SectionTitle title="추천 모임" />
          <div className="mt-3 space-y-2">{result.meetups.map((item) => <p key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-ink">{item}</p>)}</div>
        </section>
        <ActionPanel icon={WalletCards} title={result.support} desc="추천 청년지원 확인하기" color="coral" onClick={() => setActiveTab("support")} />
        <button className="primary-btn mint-btn" type="button" onClick={() => { setMoodResult(result.title); setActiveTab("home"); setDetail(null); }}>홈에 반영하기</button>
        <button className="secondary-btn" type="button" onClick={() => { setResult(null); setStep(0); setAnswers(Array(psychQuestions.length).fill(null)); }}>다시 테스트하기</button>
      </DetailPage>
    );
  }

  return (
    <DetailPage title="심리테스트" onBack={goBack}>
      <img className="h-44 w-full rounded-[28px] object-cover shadow-card" src={A.mental} alt="심리테스트" />
      <section className="rounded-[24px] bg-white p-4 shadow-card">
        <h1 className="text-xl font-black text-ink">오늘의 나를 확인해볼까요?</h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-sub">16개의 질문에 답하면 현재 나에게 맞는 연결 방식과 마음 상태를 알려드려요.</p>
        <ProgressBar value={((step + 1) / psychQuestions.length) * 100} color="mint" />
        <p className="mt-2 text-xs font-black text-sub">{step + 1} / {psychQuestions.length}</p>
      </section>
      <section className="rounded-[24px] bg-white p-4 shadow-card">
        <p className="text-lg font-black leading-7 text-ink">{current}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {options.map((option, index) => (
            <button key={option} className={`rounded-2xl px-3 py-4 text-sm font-black ${answers[step] === index ? "bg-mint text-white" : "bg-slate-50 text-sub"}`} type="button" onClick={() => setAnswers((prev) => prev.map((value, i) => i === step ? index : value))}>{option}</button>
          ))}
        </div>
      </section>
      <div className="grid grid-cols-2 gap-2">
        <button className="secondary-btn" type="button" onClick={() => setStep((value) => Math.max(value - 1, 0))}>이전</button>
        {step === psychQuestions.length - 1 ? <button className="primary-btn mint-btn" type="button" onClick={() => setResult(calculated)}>결과 보기</button> : <button className="primary-btn mint-btn" type="button" onClick={() => setStep((value) => Math.min(value + 1, psychQuestions.length - 1))}>다음</button>}
      </div>
    </DetailPage>
  );
}

function Overlay(props) {
  const { overlay, setOverlay, setDetail, setActiveTab, setPosts, setCustomMeetups } = props;
  const [draftTitle, setDraftTitle] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [meetupDraft, setMeetupDraft] = useState({
    title: "",
    type: "오프라인",
    date: "",
    place: "",
    max: "8",
    intro: "",
    tags: "",
  });
  if (!overlay) return null;
  const close = () => setOverlay(null);

  if (overlay === "actions") {
    const actions = [
      { label: "글쓰기", icon: PenLine, color: "mint", run: () => setOverlay("write") },
      { label: "모임 만들기", icon: UsersRound, color: "blue", run: () => setOverlay("createMeetup") },
      { label: "청년지원 보기", icon: WalletCards, color: "purple", run: () => { setActiveTab("support"); close(); } },
      { label: "심리테스트 하기", icon: BookOpenCheck, color: "coral", run: () => { setDetail({ type: "psychTest" }); close(); } },
    ];
    return <OverlayShell title="빠른 실행" onClose={close}>{actions.map((action) => { const Icon = action.icon; return <button key={action.label} className="flex w-full items-center gap-3 rounded-2xl bg-slate-50 p-4 text-left" type="button" onClick={action.run}><span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${colorClass[action.color].soft} ${colorClass[action.color].text}`}><Icon size={20} /></span><span className="font-black text-ink">{action.label}</span></button>; })}</OverlayShell>;
  }
  if (overlay === "write") {
    const submit = () => {
      const title = draftTitle.trim() || "새로운 나다움 이야기를 공유해요";
      const body = draftBody.trim() || "오늘의 기록을 남겼어요.";
      setPosts((prev) => [{ id: Date.now(), category: "자유", author: "이나담", avatar: avatars[5], time: "방금 전", title, body, likes: 0, comments: 0, color: "mint", commentList: [] }, ...prev]);
      setDraftTitle("");
      setDraftBody("");
      setActiveTab("community");
      close();
    };
    return <OverlayShell title="글쓰기" onClose={close}><input className="modal-input" value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} placeholder="제목을 입력해요" /><textarea className="modal-input min-h-28 resize-none" value={draftBody} onChange={(e) => setDraftBody(e.target.value)} placeholder="동네 청년들과 나누고 싶은 이야기를 적어보세요" /><button className="primary-btn mint-btn" type="button" onClick={submit}><Send size={18} />등록하기</button></OverlayShell>;
  }
  if (overlay === "createMeetup") {
    const update = (key, value) => setMeetupDraft((prev) => ({ ...prev, [key]: value }));
    const submitMeetup = () => {
      const title = meetupDraft.title.trim() || "새로운 동네 모임";
      const tags = meetupDraft.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      setCustomMeetups((prev) => [
        {
          id: `custom-${Date.now()}`,
          title,
          type: meetupDraft.type,
          place: meetupDraft.place.trim() || (meetupDraft.type === "온라인" ? "온라인" : "장소 미정"),
          date: meetupDraft.date.trim() || "일정 조율 중",
          count: 0,
          max: Number(meetupDraft.max) || 8,
          intro: meetupDraft.intro.trim() || "나다움에서 새롭게 만든 모임이에요.",
          tags: tags.length ? tags : ["새 모임"],
          icon: UsersRound,
          color: meetupDraft.type === "온라인" ? "purple" : "mint",
        },
        ...prev,
      ]);
      setMeetupDraft({ title: "", type: "오프라인", date: "", place: "", max: "8", intro: "", tags: "" });
      setActiveTab("meetups");
      close();
    };
    return (
      <OverlayShell title="모임 만들기" onClose={close}>
        <input className="modal-input" value={meetupDraft.title} onChange={(e) => update("title", e.target.value)} placeholder="모임 제목" />
        <div className="grid grid-cols-2 gap-2">
          {["오프라인", "온라인"].map((type) => (
            <button key={type} className={`rounded-2xl px-3 py-3 text-sm font-black ${meetupDraft.type === type ? "bg-mint text-white" : "bg-slate-50 text-sub"}`} type="button" onClick={() => update("type", type)}>{type}</button>
          ))}
        </div>
        <input className="modal-input" value={meetupDraft.date} onChange={(e) => update("date", e.target.value)} placeholder="날짜/시간 예: 7.3 금 19:00" />
        <input className="modal-input" value={meetupDraft.place} onChange={(e) => update("place", e.target.value)} placeholder="장소 또는 플랫폼" />
        <input className="modal-input" type="number" min="2" value={meetupDraft.max} onChange={(e) => update("max", e.target.value)} placeholder="최대 인원" />
        <textarea className="modal-input min-h-24 resize-none" value={meetupDraft.intro} onChange={(e) => update("intro", e.target.value)} placeholder="소개글" />
        <input className="modal-input" value={meetupDraft.tags} onChange={(e) => update("tags", e.target.value)} placeholder="태그 입력 예: 산책,동네,친목" />
        <button className="primary-btn mint-btn" type="button" onClick={submitMeetup}>모임 등록하기</button>
      </OverlayShell>
    );
  }
  if (overlay === "walkRecord") {
    return (
      <OverlayShell title="오늘의 걸음 기록" onClose={close}>
        <div className="grid grid-cols-3 gap-2">
          <MiniStat label="오늘" value="5,300보" />
          <MiniStat label="목표" value="10,000보" />
          <MiniStat label="진행률" value="53%" />
        </div>
        <p className="rounded-2xl bg-mint/10 p-4 text-sm font-black text-mint">아직 목표까지 4,700보 남았어요</p>
        <div className="grid grid-cols-5 gap-2 text-center">
          {[["월", "3,200"], ["화", "4,800"], ["수", "5,300"], ["목", "0"], ["금", "0"]].map(([day, steps]) => (
            <div key={day} className="rounded-2xl bg-slate-50 p-2">
              <p className="text-xs font-black text-sub">{day}</p>
              <p className="mt-1 text-[11px] font-black text-ink">{steps}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="secondary-btn" type="button" onClick={close}>확인</button>
          <button className="primary-btn mint-btn" type="button" onClick={close}>내일도 참여하기</button>
        </div>
      </OverlayShell>
    );
  }
  return null;
}

function BottomTabs({ activeTab, setActiveTab, onPlus }) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-30 rounded-t-[28px] border-t border-slate-100 bg-white px-3 pb-4 pt-2 shadow-tab">
      <div className="grid grid-cols-5 items-center gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          if (tab.id === "plus") return <button key={tab.id} className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint text-white shadow-lift" type="button" onClick={onPlus} aria-label="추가"><Plus size={27} /></button>;
          const active = activeTab === tab.id;
          return <button key={tab.id} className={`flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-black transition ${active ? "bg-mint/10 text-mint" : "text-sub"}`} type="button" onClick={() => setActiveTab(tab.id)}><Icon size={20} strokeWidth={active ? 2.8 : 2.2} />{tab.label}</button>;
        })}
      </div>
    </nav>
  );
}

function DetailPage({ title, onBack, children }) {
  return (
    <div className="px-5 pb-6 pt-5">
      <header className="mb-4 flex items-center gap-3">
        <button className="icon-btn" type="button" onClick={onBack} aria-label="뒤로가기"><ChevronLeft size={20} /></button>
        <h1 className="text-xl font-black text-ink">{title}</h1>
      </header>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ScreenFrame({ children, darkMode = false }) {
  return (
    <div className={`min-h-screen bg-[#F8FAFC] font-sans text-ink ${darkMode ? "theme-dark" : ""}`}>
      <div className="mx-auto min-h-[100dvh] w-full max-w-[430px] overflow-hidden bg-white shadow-2xl sm:my-6 sm:min-h-[860px] sm:rounded-[34px]">
        <div className="relative min-h-[100dvh] sm:min-h-[860px]">{children}</div>
      </div>
    </div>
  );
}

function PagePadding({ children }) {
  return <div className="px-5 pb-6 pt-5">{children}</div>;
}

function TopLogo() {
  return <img className="h-11 w-32 object-contain" src={A.logo} alt="나다움" />;
}

function TopBar({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2"><img className="h-7 w-20 object-contain" src={A.logo} alt="나다움" /></div>
        <h1 className="text-[24px] font-black text-ink">{title}</h1>
        <p className="mt-0.5 text-sm font-bold text-sub">{subtitle}</p>
      </div>
      <button className="icon-btn" type="button" aria-label="알림"><Bell size={18} /></button>
    </header>
  );
}

function VerifyRow({ icon: Icon, title, desc, done, color }) {
  return (
    <div className="flex items-center gap-3 rounded-[24px] bg-white p-4 shadow-card">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${done ? "bg-mint text-white" : `${colorClass[color].soft} ${colorClass[color].text}`}`}>{done ? <Check size={22} /> : <Icon size={22} />}</div>
      <div className="min-w-0 flex-1"><p className="font-black text-ink">{title}</p><p className="mt-1 text-sm font-semibold text-sub">{desc}</p></div>
    </div>
  );
}

function SegmentedTabs({ items, active, onChange }) {
  return (
    <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto pb-1">
      {items.map((item) => <button key={item} className={`h-9 shrink-0 rounded-full px-3.5 text-xs font-black transition ${active === item ? "bg-mint text-white shadow-lift" : "bg-white text-sub shadow-sm"}`} type="button" onClick={() => onChange(item)}>{item}</button>)}
    </div>
  );
}

function SectionHeader({ title, action, onClick }) {
  return (
    <div className="mb-2.5 mt-5 flex items-center justify-between">
      <h2 className="text-lg font-black text-ink">{title}</h2>
      <button className="flex items-center text-sm font-black text-sub" type="button" onClick={onClick}>{action}<ChevronRight size={16} /></button>
    </div>
  );
}

function SectionTitle({ title, action }) {
  return <div className="flex items-center justify-between"><h2 className="text-base font-black text-ink">{title}</h2>{action && <span className="text-xs font-black text-sub">{action}</span>}</div>;
}

function ActionPanel({ icon: Icon, title, desc, color, onClick }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-[24px] bg-white p-3.5 text-left shadow-card" type="button" onClick={onClick}>
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${colorClass[color].soft} ${colorClass[color].text}`}><Icon size={22} /></div>
      <div className="min-w-0 flex-1"><p className="truncate font-black text-ink">{title}</p><p className="mt-0.5 truncate text-xs font-semibold text-sub">{desc}</p></div>
      <ChevronRight className="text-slate-300" size={17} />
    </button>
  );
}

function ProgressBar({ value, color = "mint", compact = false }) {
  return <div className={`${compact ? "mt-2 h-1.5" : "mt-3 h-2"} overflow-hidden rounded-full bg-slate-100`}><div className={`h-full rounded-full ${colorClass[color].bar}`} style={{ width: `${Math.min(value, 100)}%` }} /></div>;
}

function MiniStat({ label, value }) {
  return <div className="rounded-2xl bg-slate-50 p-3 text-center"><p className="text-sm font-black text-ink">{value}</p><p className="mt-1 text-[10px] font-black text-sub">{label}</p></div>;
}

function MenuRow({ icon: Icon, label, color, onClick, image }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-[22px] bg-white p-3.5 text-left shadow-card" type="button" onClick={onClick}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${colorClass[color].soft} ${colorClass[color].text}`}>{image ? <img className="h-8 w-8 object-contain" src={image} alt="" /> : <Icon size={20} />}</div>
      <span className="min-w-0 flex-1 text-sm font-black text-ink">{label}</span><ChevronRight className="text-slate-300" size={17} />
    </button>
  );
}

function TagCloud({ className = "mt-4" }) {
  return <div className={`flex flex-wrap gap-2 ${className}`}>{profileTags.map((tag, index) => { const color = ["mint", "blue", "purple", "yellow", "coral"][index]; return <span key={tag} className={`rounded-full px-3 py-1.5 text-xs font-black ${colorClass[color].soft} ${colorClass[color].text}`}>{tag}</span>; })}</div>;
}

function Tag({ children, color = "mint" }) {
  return <span className={`rounded-full px-3 py-1.5 text-xs font-black ${colorClass[color].soft} ${colorClass[color].text}`}>{children}</span>;
}

function AvatarRow({ name, meta, avatar }) {
  return <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"><img className="h-10 w-10 rounded-full object-cover" src={avatar} alt="" /><div><p className="text-sm font-black text-ink">{name}</p><p className="text-xs font-bold text-sub">{meta}</p></div></div>;
}

function resolveEmptyImage(image, darkMode) {
  if (!darkMode) return image;
  if (image === A.emptyMeeting) return A.emptyMeetingDark;
  if (image === A.emptySave) return A.emptySaveDark;
  if (image === A.emptySearch) return A.emptySearchDark;
  return image;
}

function EmptyCard({ image, text, darkMode = false }) {
  return (
    <div className="rounded-[24px] bg-white p-6 text-center shadow-card">
      <img className="mx-auto h-44 w-52 object-contain" src={resolveEmptyImage(image, darkMode)} alt="" />
      <p className="mt-4 text-sm font-black text-sub">{text}</p>
    </div>
  );
}

function EmptyState({ image, title, desc, darkMode = false }) {
  return (
    <section className="rounded-[28px] bg-white p-6 text-center shadow-card">
      <img className="mx-auto h-52 w-60 object-contain" src={resolveEmptyImage(image, darkMode)} alt="" />
      <h2 className="mt-4 text-lg font-black text-ink">{title}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-sub">{desc}</p>
    </section>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-black text-sub">{label}</p>
      <p className="mt-1 text-sm font-bold leading-5 text-ink">{value}</p>
    </div>
  );
}

function CompactMapCard({ onClick }) {
  return <button className="rounded-[24px] bg-white p-3 text-left shadow-card" type="button" onClick={onClick}><div className="flex items-center justify-between"><p className="text-sm font-black text-blue">나다움 지도</p><Map className="text-blue" size={20} /></div><img className="mt-2 h-24 w-full rounded-2xl object-cover" src={A.map} alt="나다움 지도" /></button>;
}

function CompactWalkCard({ onClick }) {
  return <button className="rounded-[24px] bg-white p-3 text-left shadow-card" type="button" onClick={onClick}><div className="flex items-center justify-between"><p className="text-sm font-black text-mint">걸음 챌린지</p><Dumbbell className="text-mint" size={20} /></div><img className="mt-2 h-16 w-full rounded-2xl object-cover" src={A.walk} alt="걸음수 챌린지" /><h2 className="mt-2 text-xl font-black text-ink">5,300보</h2><ProgressBar value={53} color="mint" compact /></button>;
}

function OverlayShell({ title, onClose, children }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center bg-ink/25 px-4 pb-24 backdrop-blur-sm">
      <div className="w-full rounded-[28px] bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-black text-ink">{title}</h2><button className="icon-btn" type="button" onClick={onClose} aria-label="닫기"><X size={18} /></button></div>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
