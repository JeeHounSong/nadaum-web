import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Award,
  Bell,
  BookOpenCheck,
  CalendarDays,
  Check,
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

const LOGO_SRC = "/assets/logo.png";
const ASSETS = {
  logo: "/assets/logo.png",
  hero: "/assets/hero-community.png",
  map: "/assets/map-people.png",
  walk: "/assets/walking-challenge.png",
  mental: "/assets/mental-test.png",
  safeMeeting: "/assets/banner-safe-meeting.png",
  supportHome: "/assets/support-home.png",
  supportJob: "/assets/support-job.png",
  supportHeart: "/assets/support-heart.png",
  supportEducation: "/assets/support-education.png",
};
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
  { id: 1, category: "질문", author: "자취 2년차", time: "12분 전", title: "자취하면서 요리 시작했는데 간단한 레시피 추천해주세요!", body: "퇴근 후 15분 안에 만들 수 있는 메뉴면 더 좋아요.", likes: 24, comments: 17, color: "mint", commentList: ["계란볶음밥에 냉동야채 넣으면 빨라요.", "두부김치도 의외로 간단해요."] },
  { id: 2, category: "고민상담", author: "취준하는 청년", time: "34분 전", title: "면접 준비 같이 하실 분 구해요!", body: "서로 예상 질문 봐주고 피드백하면 좋을 것 같아요.", likes: 15, comments: 8, color: "purple", commentList: ["저도 참여하고 싶어요.", "온라인으로 하면 부담이 덜할 것 같아요."] },
  { id: 3, category: "자유", author: "독서 좋아하는 사람", time: "5시간 전", title: "이번 주말 독서 모임 모집합니다", body: "가볍게 읽은 책 이야기 나누는 모임이에요.", likes: 18, comments: 12, color: "yellow", commentList: ["장소가 어디인가요?", "처음 참여해도 괜찮나요?"] },
  { id: 4, category: "정보공유", author: "강서구 주민", time: "어제", title: "강서구 근처 조용한 카페 추천해요", body: "작업하기 좋고 콘센트 많은 곳 위주로 정리했어요.", likes: 31, comments: 14, color: "blue", commentList: ["공유 감사합니다!", "주말에도 조용한지 궁금해요."] },
];

const meetupItems = [
  { id: "walk", title: "한강 저녁 산책", type: "오프라인", place: "여의나루역", date: "6.24 수 19:00", count: 9, max: 12, intro: "퇴근 후 가볍게 걷고 이야기하는 산책 모임이에요.", tags: ["운동", "동네", "건강"], icon: Dumbbell, color: "mint" },
  { id: "career", title: "취업 포트폴리오 리뷰", type: "온라인", place: "줌 링크", date: "6.27 토 16:00", count: 5, max: 8, intro: "서로 포트폴리오를 보고 개선 포인트를 나눠요.", tags: ["스터디", "자격증", "취업"], icon: BookOpenCheck, color: "blue" },
  { id: "coffee", title: "낯가림 적은 커피챗", type: "오프라인", place: "홍대입구", date: "6.29 월 14:00", count: 3, max: 6, intro: "처음 만나는 사람도 부담 없도록 짧고 편하게 진행해요.", tags: ["대화", "친목", "동네"], icon: Coffee, color: "coral" },
  { id: "game", title: "롤 같이 할 사람", type: "온라인", place: "디스코드", date: "6.30 화 21:00", count: 4, max: 5, intro: "승패보다 즐겁게 같이 게임할 분을 찾아요.", tags: ["게임", "LOL", "친목"], icon: Gamepad2, color: "purple" },
];

const supportItems = [
  { id: 1, title: "청년 월세 한시 지원", status: "신청 가능", desc: "월 최대 20만원, 12개월 지원", category: "주거", target: "만 19-39세 무주택 청년", period: "2026.06.01 - 2026.07.15", icon: Home, color: "mint", image: ASSETS.supportHome },
  { id: 2, title: "구직활동 응원 패키지", status: "맞춤 추천", desc: "면접 정장, 사진, 컨설팅 바우처", category: "취업", target: "구직활동 중인 청년", period: "상시 접수", icon: ClipboardCheck, color: "blue", image: ASSETS.supportJob },
  { id: 3, title: "마음건강 상담권", status: "오늘 마감", desc: "전문 상담 1:1 연계", category: "마음", target: "심리 상담이 필요한 청년", period: "2026.06.21 마감", icon: HeartHandshake, color: "coral", image: ASSETS.supportHeart },
  { id: 4, title: "청년 교육 클래스", status: "추천", desc: "디자인·영상·취업 역량 강화", category: "교육", target: "역량 강화를 원하는 청년", period: "2026.06.25 - 2026.08.30", icon: Sprout, color: "purple", image: ASSETS.supportEducation },
];

const badges = [
  { label: "첫 댓글", icon: MessageCircle, color: "yellow" },
  { label: "첫 모임", icon: UsersRound, color: "mint" },
  { label: "온라인", icon: Gamepad2, color: "blue" },
  { label: "청년패스", icon: ShieldCheck, color: "purple" },
  { label: "7일 체크인", icon: Trophy, color: "coral" },
];

function App() {
  const [stage, setStage] = useState("login");
  const [activeTab, setActiveTab] = useState("home");
  const [verified, setVerified] = useState(false);
  const [joinedMeetups, setJoinedMeetups] = useState(["walk"]);
  const [savedSupports, setSavedSupports] = useState([2]);
  const [moodResult, setMoodResult] = useState(null);
  const [likedPosts, setLikedPosts] = useState([3]);
  const [posts, setPosts] = useState(initialPosts);
  const [modal, setModal] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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

  const appState = {
    activeTab,
    setActiveTab,
    setStage,
    verified,
    setVerified,
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
    modal,
    setModal,
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
  return <MobileShell {...appState} />;
}

function LoginScreen({ onLogin }) {
  return (
    <ScreenFrame>
      <div className="flex min-h-[100dvh] flex-col justify-between bg-white px-6 py-7 sm:min-h-[860px]">
        <div className="flex justify-center pt-2">
          <img className="h-20 w-52 object-contain" src={LOGO_SRC} alt="나다움" />
        </div>

        <section className="space-y-6">
          <div className="mx-auto overflow-hidden rounded-[30px] border border-slate-100 bg-white p-3 shadow-card">
            <img className="h-[280px] w-full rounded-[24px] object-cover" src={ASSETS.hero} alt="나다움 청년 커뮤니티" />
          </div>

          <div className="text-center">
            <h1 className="text-[30px] font-black leading-tight text-ink">나답게 사는 하루를 시작해요</h1>
            <p className="mx-auto mt-3 max-w-[310px] text-[14px] font-semibold leading-6 text-sub">
              생활 정보, 모임, 지원 정책, 마음 체크를 한 곳에서 이어가요.
            </p>
          </div>

          <div className="space-y-2.5">
            <button className="primary-btn mint-btn" type="button" onClick={onLogin}>
              <LockKeyhole size={18} />
              휴대폰 번호로 시작
            </button>
            <button className="kakao-btn" type="button" onClick={onLogin}>
              <MessageCircle size={18} />
              카카오로 계속
            </button>
            <button className="google-btn" type="button" onClick={onLogin}>
              <span className="google-dot">G</span>
              구글로 시작하기
            </button>
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
          <h1 className="mt-2 text-[27px] font-black leading-tight text-ink">
            내 지역과 나이에 맞는
            <br />
            혜택을 먼저 보여드릴게요
          </h1>
        </div>
        <div className="mt-6 space-y-3">
          {rows.map((row) => (
            <VerifyRow key={row.title} done={verified} {...row} />
          ))}
        </div>
        <div className="mt-4 rounded-3xl border border-yellow/30 bg-[#FFF9E8] p-4 shadow-card">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-yellow shadow-sm">
              <Award size={22} />
            </div>
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
  const CurrentScreen = {
    home: HomeScreen,
    community: CommunityScreen,
    meetups: MeetupsScreen,
    support: SupportScreen,
    my: MyPageScreen,
  }[props.activeTab] || HomeScreen;

  const openAction = () => props.setModal({ type: "actions" });
  const closeModal = () => props.setModal(null);

  return (
    <ScreenFrame darkMode={props.darkMode}>
      <div className={`flex min-h-[100dvh] flex-col bg-white sm:min-h-[860px] ${props.darkMode ? "theme-dark" : ""}`}>
        <main className="app-scroll flex-1 overflow-y-auto pb-28">
          <CurrentScreen {...props} />
        </main>
        <BottomTabs activeTab={props.activeTab} setActiveTab={props.setActiveTab} onPlus={openAction} />
        <AppModal {...props} closeModal={closeModal} />
      </div>
    </ScreenFrame>
  );
}

function HomeScreen({ user, setMoodResult, moodResult, joinedMeetups, setActiveTab, setModal }) {
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
            <h2 className="mt-1 text-[21px] font-black leading-tight text-ink">지금 기분은 어때요?</h2>
          </div>
          <Sparkles className="text-mint" size={27} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const active = moodResult === mood.full;
            return (
              <button
                key={mood.id}
                className={`h-[68px] rounded-2xl border text-center transition ${active ? `${colorClass[mood.color].bg} border-transparent text-white shadow-lift` : "border-slate-100 bg-slate-50 text-sub"}`}
                type="button"
                onClick={() => setMoodResult(mood.full)}
              >
                <Icon className="mx-auto mb-1" size={20} />
                <span className="block text-xs font-black">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <CompactMapCard onClick={() => setModal({ type: "mapDetail" })} />
        <CompactWalkCard onClick={() => setModal({ type: "walkDetail" })} />
      </div>

      <SectionHeader title="오늘 추천" action="더보기" onClick={() => setActiveTab("support")} />
      <div className="space-y-2.5">
        {recommendations.map((item) => (
          <ActionPanel key={item.title} {...item} onClick={() => setActiveTab(item.tab)} />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <MiniStat label="참여 모임" value={`${joinedMeetups.length}개`} />
        <MiniStat label="마음 결과" value={moodResult ? "완료" : "대기"} />
        <MiniStat label="레벨" value={user.level} />
      </div>
    </PagePadding>
  );
}

function CommunityScreen({ likedPosts, setLikedPosts, posts, setModal }) {
  const [category, setCategory] = useState("전체");
  const categories = ["전체", "질문", "정보공유", "고민상담", "자유"];
  const visiblePosts = category === "전체" ? posts : posts.filter((post) => post.category === category);

  const toggleLike = (id) => {
    setLikedPosts((prev) => (prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]));
  };

  return (
    <PagePadding>
      <TopBar title="커뮤니티" subtitle="동네 청년들과 가볍게 소통해요" />
      <SegmentedTabs items={categories} active={category} onChange={setCategory} />
      <div className="mt-4 space-y-2.5">
        {visiblePosts.map((post) => {
          const liked = likedPosts.includes(post.id);
          return (
            <article key={post.id} className="rounded-[24px] bg-white p-4 shadow-card" onClick={() => setModal({ type: "post", postId: post.id })}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${colorClass[post.color].soft} ${colorClass[post.color].text}`}>
                    <CircleUserRound size={21} />
                  </div>
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
                <button
                  className={`flex items-center gap-1 text-sm font-black ${liked ? "text-coral" : "text-sub"}`}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleLike(post.id);
                  }}
                >
                  <Heart size={16} fill={liked ? "currentColor" : "none"} />
                  {post.likes + (liked ? 1 : 0)}
                </button>
                <span className="flex items-center gap-1 text-sm font-black text-sub">
                  <MessageCircle size={16} />
                  {post.comments}
                </span>
              </div>
            </article>
          );
        })}
      </div>
      <button className="floating-action" type="button" aria-label="글쓰기" onClick={() => setModal({ type: "write" })}>
        <PenLine size={21} />
      </button>
    </PagePadding>
  );
}

function MeetupsScreen({ joinedMeetups, setJoinedMeetups, setModal }) {
  const [filter, setFilter] = useState("전체");
  const filters = ["전체", "온라인", "오프라인", "스터디", "운동", "게임"];
  const visibleMeetups = filter === "전체" ? meetupItems : meetupItems.filter((item) => item.type === filter || item.tags.includes(filter));

  const toggleJoin = (id) => {
    setJoinedMeetups((prev) => (prev.includes(id) ? prev.filter((meetupId) => meetupId !== id) : [...prev, id]));
  };

  return (
    <PagePadding>
      <TopBar title="모임" subtitle="편하게 들어갈 수 있는 자리" />
      <section className="mt-4 overflow-hidden rounded-[24px] bg-blue/10 shadow-card">
        <img className="h-24 w-full object-cover" src={ASSETS.safeMeeting} alt="나다움 안전 모임" />
        <p className="px-4 pb-3 pt-2 text-sm font-black text-ink">나다움 모임은 단계별로 안전하게 연결돼요</p>
      </section>
      <section className="mt-4 rounded-[24px] bg-white p-4 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue">
            <CalendarDays size={24} />
          </div>
          <div>
            <p className="text-xs font-black text-sub">이번 주 참여 예정</p>
            <p className="mt-0.5 text-lg font-black text-ink">{joinedMeetups.length}개 모임</p>
          </div>
        </div>
      </section>
      <SegmentedTabs items={filters} active={filter} onChange={setFilter} />
      <div className="mt-4 space-y-2.5">
        {visibleMeetups.map((meetup) => {
          const joined = joinedMeetups.includes(meetup.id);
          const Icon = meetup.icon;
          const count = meetup.count + (joined ? 1 : 0);
          return (
            <article key={meetup.id} className="rounded-[24px] bg-white p-4 shadow-card" onClick={() => setModal({ type: "meetup", meetup })}>
              <div className="flex items-start gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${colorClass[meetup.color].soft} ${colorClass[meetup.color].text}`}>
                  <Icon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${meetup.type === "온라인" ? "bg-purple/10 text-purple" : "bg-mint/10 text-mint"}`}>{meetup.type}</span>
                    <span className="truncate text-xs font-bold text-sub">{meetup.date}</span>
                  </div>
                  <h2 className="mt-1.5 text-base font-black text-ink">{meetup.title}</h2>
                  <p className="mt-1 flex items-center gap-1 text-xs font-bold text-sub">
                    <MapPin size={13} />
                    {meetup.place}
                  </p>
                </div>
                <button
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-black ${joined ? "bg-ink text-white" : "bg-mint/10 text-mint"}`}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleJoin(meetup.id);
                  }}
                >
                  {joined ? "참여중" : "참여"}
                </button>
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

function SupportScreen({ savedSupports, setSavedSupports, setModal }) {
  const [category, setCategory] = useState("주거");
  const categories = ["주거", "취업", "마음", "교육"];
  const ordered = supportItems.filter((item) => item.category === category).concat(supportItems.filter((item) => item.category !== category));
  const toggleSave = (id) => {
    setSavedSupports((prev) => (prev.includes(id) ? prev.filter((supportId) => supportId !== id) : [...prev, id]));
  };

  return (
    <PagePadding>
      <TopBar title="청년지원" subtitle="내 상황에 맞춘 정책과 혜택" />
      <div className="mt-4 flex h-[48px] items-center gap-3 rounded-2xl bg-white px-4 text-sub shadow-card">
        <Search size={18} />
        <span className="text-sm font-bold">주거, 취업, 상담 검색</span>
      </div>
      <SegmentedTabs items={categories} active={category} onChange={setCategory} />
      <div className="mt-4 space-y-2.5">
        {ordered.map((item) => {
          const saved = savedSupports.includes(item.id);
          const Icon = item.icon;
          return (
            <article key={item.id} className={`relative overflow-hidden rounded-[24px] border bg-white p-4 shadow-card ${colorClass[item.color].border}`} onClick={() => setModal({ type: "support", support: item })}>
              <div className={`absolute -right-7 -top-8 h-20 w-20 rounded-full ${colorClass[item.color].soft}`} />
              <img className="absolute bottom-2 right-12 h-16 w-16 object-contain opacity-95" src={item.image} alt="" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${colorClass[item.color].soft} ${colorClass[item.color].text}`}>
                    <Icon size={23} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${colorClass[item.color].soft} ${colorClass[item.color].text}`}>{item.status}</span>
                      <span className="text-xs font-bold text-sub">{item.category}</span>
                    </div>
                    <h2 className="mt-2 truncate text-base font-black text-ink">{item.title}</h2>
                    <p className="mt-1 text-sm font-semibold leading-5 text-sub">{item.desc}</p>
                  </div>
                </div>
                <button
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${saved ? "bg-yellow text-white" : "bg-slate-100 text-sub"}`}
                  type="button"
                  aria-label="저장"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSave(item.id);
                  }}
                >
                  {saved ? <Check size={18} /> : <Plus size={18} />}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </PagePadding>
  );
}

function MyPageScreen({ user, verified, setStage, setActiveTab, setModal, darkMode, setDarkMode }) {
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
          <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white p-3 shadow-lift ring-4 ring-mint/10">
            <img className="h-full w-full object-contain" src={LOGO_SRC} alt="나다움" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-ink">이나담</h2>
              <span className="rounded-full bg-mint/10 px-2 py-0.5 text-xs font-black text-mint">{user.level}</span>
            </div>
            <p className="mt-1 text-sm font-bold text-sub">{verified ? "청년 인증 완료" : user.badge}</p>
            <p className="mt-1 text-xs font-bold text-mint">나다움을 찾아가는 중</p>
          </div>
        </div>
      </section>

      <section className="mt-3 rounded-[24px] bg-white p-4 shadow-card">
        <SectionTitle title="나다움 지도" />
        <TagCloud className="mt-3" />
      </section>

      <section className="mt-3 rounded-[24px] bg-white p-4 shadow-card">
        <SectionTitle title="활동 기록" />
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {records.map((record) => (
            <div key={record.label} className={`rounded-2xl p-3 ${colorClass[record.color].soft}`}>
              <p className="text-xl font-black text-ink">{record.value}</p>
              <p className="mt-1 text-xs font-black text-sub">{record.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-3 rounded-[24px] bg-white p-4 shadow-card">
        <SectionTitle title="성장 배지" action="14개" />
        <div className="mt-3 grid grid-cols-5 gap-2">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="text-center">
                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${colorClass[badge.color].soft} ${colorClass[badge.color].text} ring-2 ${colorClass[badge.color].ring}`}>
                  <Icon size={20} />
                </div>
                <p className="mt-1.5 text-[10px] font-black leading-3 text-slate-600">{badge.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-3 space-y-2.5">
        <MenuRow
          icon={BookOpenCheck}
          label={user.moodResult ? `심리테스트 결과: ${user.moodResult}` : "심리테스트 하기"}
          color="purple"
          image={ASSETS.mental}
          onClick={() => setModal({ type: "mentalTest" })}
        />
        <MenuRow icon={UsersRound} label="내가 참여한 모임" color="blue" onClick={() => setActiveTab("meetups")} />
        <MenuRow icon={WalletCards} label="저장한 청년지원" color="mint" onClick={() => setActiveTab("support")} />
        <MenuRow icon={ShieldCheck} label="청년 인증 다시 보기" color="yellow" onClick={() => setStage("onboarding")} />
        <button className="flex w-full items-center justify-between rounded-[22px] bg-white p-3.5 text-left shadow-card" type="button" onClick={() => setDarkMode((value) => !value)}>
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-ink">
              <Moon size={20} />
            </span>
            <span className="text-sm font-black text-ink">다크모드</span>
          </span>
          <span className={`flex h-7 w-12 items-center rounded-full p-1 transition ${darkMode ? "bg-mint" : "bg-slate-200"}`}>
            <span className={`h-5 w-5 rounded-full bg-white transition ${darkMode ? "translate-x-5" : ""}`} />
          </span>
        </button>
      </div>
    </PagePadding>
  );
}

function AppModal(props) {
  const { modal, setModal, setActiveTab, setMoodResult, posts, setPosts, joinedMeetups, setJoinedMeetups, savedSupports, setSavedSupports, closeModal } = props;
  const [draftTitle, setDraftTitle] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [commentText, setCommentText] = useState("");
  const [answers, setAnswers] = useState({});
  if (!modal) return null;

  const joinMeetup = (id) => {
    setJoinedMeetups((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  const saveSupport = (id) => {
    setSavedSupports((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  if (modal.type === "actions") {
    const actions = [
      { label: "글쓰기", icon: PenLine, color: "mint", run: () => setModal({ type: "write" }) },
      { label: "모임 만들기", icon: UsersRound, color: "blue", run: () => setModal({ type: "createMeetup" }) },
      { label: "청년지원 보기", icon: WalletCards, color: "purple", run: () => { setActiveTab("support"); closeModal(); } },
      { label: "심리테스트 하기", icon: BookOpenCheck, color: "coral", run: () => setModal({ type: "mentalTest" }) },
    ];
    return (
      <ModalShell onClose={closeModal} sheet>
        <div className="space-y-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.label} className="flex w-full items-center gap-3 rounded-2xl bg-slate-50 p-4 text-left" type="button" onClick={action.run}>
                <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${colorClass[action.color].soft} ${colorClass[action.color].text}`}>
                  <Icon size={20} />
                </span>
                <span className="font-black text-ink">{action.label}</span>
              </button>
            );
          })}
        </div>
      </ModalShell>
    );
  }

  if (modal.type === "write") {
    const submit = () => {
      const title = draftTitle.trim() || "새로운 나다움 이야기를 공유해요";
      const body = draftBody.trim() || "오늘의 기록을 남겼어요.";
      setPosts((prev) => [
        { id: Date.now(), category: "자유", author: "이나담", time: "방금 전", title, body, likes: 0, comments: 0, color: "mint" },
        ...prev,
      ]);
      setDraftTitle("");
      setDraftBody("");
      closeModal();
      setActiveTab("community");
    };
    return (
      <ModalShell title="글쓰기" onClose={closeModal}>
        <input className="modal-input" value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} placeholder="제목을 입력해요" />
        <textarea className="modal-input min-h-28 resize-none" value={draftBody} onChange={(event) => setDraftBody(event.target.value)} placeholder="동네 청년들과 나누고 싶은 이야기를 적어보세요" />
        <button className="primary-btn mint-btn" type="button" onClick={submit}>
          <Send size={18} />
          등록하기
        </button>
      </ModalShell>
    );
  }

  if (modal.type === "post") {
    const post = posts.find((item) => item.id === modal.postId);
    if (!post) return null;
    const addComment = () => {
      const text = commentText.trim();
      if (!text) return;
      setPosts((prev) =>
        prev.map((item) =>
          item.id === post.id
            ? { ...item, comments: item.comments + 1, commentList: [...(item.commentList || []), text] }
            : item,
        ),
      );
      setCommentText("");
    };
    return (
      <ModalShell title="게시글" onClose={closeModal}>
        <div>
          <span className={`rounded-full px-2.5 py-1 text-xs font-black ${colorClass[post.color].soft} ${colorClass[post.color].text}`}>{post.category}</span>
          <h2 className="mt-3 text-xl font-black leading-7 text-ink">{post.title}</h2>
          <p className="mt-2 text-xs font-bold text-sub">{post.author} · {post.time}</p>
          <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-sub">{post.body}</p>
          <div className="mt-3 flex gap-4 text-sm font-black text-sub">
            <span>공감 {post.likes}</span>
            <span>댓글 {post.comments}</span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-black text-ink">댓글</p>
          {(post.commentList || []).map((comment, index) => (
            <p key={`${comment}-${index}`} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-sub">{comment}</p>
          ))}
        </div>
        <div className="flex gap-2">
          <input className="modal-input min-w-0 flex-1" value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="댓글을 입력해요" />
          <button className="rounded-2xl bg-mint px-4 text-sm font-black text-white" type="button" onClick={addComment}>작성</button>
        </div>
      </ModalShell>
    );
  }

  if (modal.type === "mapDetail") {
    const people = ["서연 24세 · 자취중", "지훈 23세 · 취업준비", "민지 25세 · 영상편집"];
    return (
      <ModalShell title="나다움 지도" onClose={closeModal}>
        <img className="h-44 w-full rounded-3xl object-cover" src={ASSETS.map} alt="나다움 지도" />
        <p className="text-sm font-semibold leading-6 text-sub">내 주변 청년들의 관심사와 생활권을 확인해요.</p>
        <TagCloud className="mt-0" />
        <div className="space-y-2">
          {people.map((person) => <p key={person} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-ink">{person}</p>)}
        </div>
        <button className="primary-btn mint-btn" type="button" onClick={() => { setActiveTab("meetups"); closeModal(); }}>지도에서 모임 찾기</button>
      </ModalShell>
    );
  }

  if (modal.type === "walkDetail") {
    return (
      <ModalShell title="걸음수 챌린지" onClose={closeModal}>
        <img className="h-44 w-full rounded-3xl object-cover" src={ASSETS.walk} alt="걸음수 챌린지" />
        <div className="grid grid-cols-3 gap-2">
          <MiniStat label="오늘" value="5,300보" />
          <MiniStat label="목표" value="10,000보" />
          <MiniStat label="진행률" value="53%" />
        </div>
        <ProgressBar value={53} color="mint" />
        <p className="rounded-2xl bg-mint/10 p-4 text-sm font-black text-mint">완료 시 50P 지급</p>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-sub">
          {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => <span key={day} className={`rounded-xl py-2 ${index < 4 ? "bg-mint/10 text-mint" : "bg-slate-50"}`}>{day}</span>)}
        </div>
        <button className="primary-btn mint-btn" type="button" onClick={closeModal}>오늘 기록 확인</button>
      </ModalShell>
    );
  }

  if (modal.type === "mentalTest") {
    const questions = [
      { id: "energy", title: "오늘 에너지는 어떤가요?", options: ["낮아요", "보통이에요", "높아요"] },
      { id: "connect", title: "사람들과 연결되고 싶은 정도는?", options: ["혼자 쉴래요", "가볍게", "많이 만나고 싶어요"] },
      { id: "need", title: "지금 가장 필요한 것은?", options: ["휴식", "도전", "연결"] },
    ];
    const result = answers.need === "도전" ? "도전 에너지형" : answers.need === "연결" || answers.connect === "많이 만나고 싶어요" ? "연결 충전형" : "차분한 회복형";
    return (
      <ModalShell title="심리테스트" onClose={closeModal}>
        <img className="h-40 w-full rounded-3xl object-cover" src={ASSETS.mental} alt="심리테스트" />
        <div>
          <h2 className="text-xl font-black text-ink">오늘의 나를 확인해볼까요?</h2>
          <p className="mt-1 text-sm font-semibold text-sub">세 가지 질문에 답하면 오늘의 유형을 알려드려요.</p>
        </div>
        {questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <p className="text-sm font-black text-ink">{question.title}</p>
            <div className="grid grid-cols-3 gap-2">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={`rounded-2xl px-2 py-3 text-xs font-black ${answers[question.id] === option ? "bg-mint text-white" : "bg-slate-50 text-sub"}`}
                  type="button"
                  onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button className="primary-btn mint-btn" type="button" onClick={() => { setMoodResult(result); setActiveTab("home"); closeModal(); }}>결과 보기</button>
      </ModalShell>
    );
  }

  if (modal.type === "createMeetup") {
    return (
      <ModalShell title="모임 만들기" onClose={closeModal}>
        <p className="text-sm font-semibold leading-6 text-sub">프로토타입에서는 모임 만들기 흐름을 간단히 보여줘요. 실제 서비스에서는 일정, 장소, 모집 인원을 입력하게 됩니다.</p>
        <button className="primary-btn mint-btn" type="button" onClick={() => { setActiveTab("meetups"); closeModal(); }}>모임 화면으로 이동</button>
      </ModalShell>
    );
  }

  if (modal.type === "meetup") {
    const meetup = modal.meetup;
    const joined = joinedMeetups.includes(meetup.id);
    const count = meetup.count + (joined ? 1 : 0);
    return (
      <ModalShell title={meetup.title} onClose={closeModal}>
        <div className="space-y-3 text-sm font-bold text-sub">
          <InfoLine label="유형" value={meetup.type} />
          <InfoLine label="날짜" value={meetup.date} />
          <InfoLine label={meetup.type === "온라인" ? "플랫폼" : "장소"} value={meetup.place} />
          <InfoLine label="인원" value={`${count}명 / ${meetup.max}명`} />
          <p className="rounded-2xl bg-slate-50 p-4 leading-6">{meetup.intro}</p>
          <div className="flex flex-wrap gap-2">
            {meetup.tags.map((tag) => <span key={tag} className="rounded-full bg-mint/10 px-3 py-1 text-xs font-black text-mint">{tag}</span>)}
          </div>
        </div>
        <button className="primary-btn mint-btn" type="button" onClick={() => joinMeetup(meetup.id)}>{joined ? "참여중" : "참여하기"}</button>
      </ModalShell>
    );
  }

  if (modal.type === "support") {
    const support = modal.support;
    const saved = savedSupports.includes(support.id);
    return (
      <ModalShell title={support.title} onClose={closeModal}>
        <img className="h-40 w-full rounded-3xl object-cover" src={support.image} alt={support.title} />
        <div className="space-y-3 text-sm font-bold text-sub">
          <InfoLine label="대상" value={support.target} />
          <InfoLine label="지원 내용" value={support.desc} />
          <InfoLine label="신청 기간" value={support.period} />
          <p className={`rounded-2xl p-4 ${colorClass[support.color].soft} ${colorClass[support.color].text}`}>{support.status}</p>
        </div>
        <button className="primary-btn mint-btn" type="button" onClick={() => saveSupport(support.id)}>{saved ? "저장됨" : "저장하기"}</button>
      </ModalShell>
    );
  }

  return null;
}

function ModalShell({ title, onClose, children, sheet = false }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center bg-ink/25 px-4 pb-24 backdrop-blur-sm">
      <div className={`w-full bg-white p-5 shadow-2xl ${sheet ? "rounded-[28px]" : "rounded-[28px]"}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-ink">{title || "빠른 실행"}</h2>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="닫기">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
      <span className="text-sub">{label}</span>
      <span className="text-right text-ink">{value}</span>
    </div>
  );
}

function CompactMapCard({ onClick }) {
  return (
    <button className="rounded-[24px] bg-white p-3 text-left shadow-card" type="button" onClick={onClick}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-black text-blue">나다움 지도</p>
        <Map className="text-blue" size={20} />
      </div>
      <img className="mt-2 h-24 w-full rounded-2xl object-cover" src={ASSETS.map} alt="나다움 지도" />
    </button>
  );
}

function CompactWalkCard({ onClick }) {
  return (
    <button className="rounded-[24px] bg-white p-3 text-left shadow-card" type="button" onClick={onClick}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-black text-mint">걸음 챌린지</p>
        <Dumbbell className="text-mint" size={20} />
      </div>
      <img className="mt-2 h-16 w-full rounded-2xl object-cover" src={ASSETS.walk} alt="걸음수 챌린지" />
      <h2 className="mt-2 text-xl font-black text-ink">5,300보</h2>
      <ProgressBar value={53} color="mint" compact />
    </button>
  );
}

function BottomTabs({ activeTab, setActiveTab, onPlus }) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-30 rounded-t-[28px] border-t border-slate-100 bg-white px-3 pb-4 pt-2 shadow-tab">
      <div className="grid grid-cols-5 items-center gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          if (tab.id === "plus") {
            return (
              <button key={tab.id} className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint text-white shadow-lift" type="button" onClick={onPlus} aria-label="추가">
                <Plus size={27} />
              </button>
            );
          }
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} className={`flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-black transition ${active ? "bg-mint/10 text-mint" : "text-sub"}`} type="button" onClick={() => setActiveTab(tab.id)}>
              <Icon size={20} strokeWidth={active ? 2.8 : 2.2} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
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
  return <img className="h-11 w-32 object-contain" src={LOGO_SRC} alt="나다움" />;
}

function TopBar({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2">
          <img className="h-7 w-20 object-contain" src={LOGO_SRC} alt="나다움" />
        </div>
        <h1 className="text-[24px] font-black text-ink">{title}</h1>
        <p className="mt-0.5 text-sm font-bold text-sub">{subtitle}</p>
      </div>
      <button className="icon-btn" type="button" aria-label="알림">
        <Bell size={18} />
      </button>
    </header>
  );
}

function VerifyRow({ icon: Icon, title, desc, done, color }) {
  return (
    <div className="flex items-center gap-3 rounded-[24px] bg-white p-4 shadow-card">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${done ? "bg-mint text-white" : `${colorClass[color].soft} ${colorClass[color].text}`}`}>
        {done ? <Check size={22} /> : <Icon size={22} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-black text-ink">{title}</p>
        <p className="mt-1 text-sm font-semibold text-sub">{desc}</p>
      </div>
    </div>
  );
}

function SegmentedTabs({ items, active, onChange }) {
  return (
    <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto pb-1">
      {items.map((item) => (
        <button key={item} className={`h-9 shrink-0 rounded-full px-3.5 text-xs font-black transition ${active === item ? "bg-mint text-white shadow-lift" : "bg-white text-sub shadow-sm"}`} type="button" onClick={() => onChange(item)}>
          {item}
        </button>
      ))}
    </div>
  );
}

function SectionHeader({ title, action, onClick }) {
  return (
    <div className="mb-2.5 mt-5 flex items-center justify-between">
      <h2 className="text-lg font-black text-ink">{title}</h2>
      <button className="flex items-center text-sm font-black text-sub" type="button" onClick={onClick}>
        {action}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function SectionTitle({ title, action }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-black text-ink">{title}</h2>
      {action && <span className="text-xs font-black text-sub">{action}</span>}
    </div>
  );
}

function ActionPanel({ icon: Icon, title, desc, color, onClick }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-[24px] bg-white p-3.5 text-left shadow-card" type="button" onClick={onClick}>
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${colorClass[color].soft} ${colorClass[color].text}`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-black text-ink">{title}</p>
        <p className="mt-0.5 truncate text-xs font-semibold text-sub">{desc}</p>
      </div>
      <ChevronRight className="text-slate-300" size={17} />
    </button>
  );
}

function ProgressBar({ value, color = "mint", compact = false }) {
  return (
    <div className={`${compact ? "mt-2 h-1.5" : "mt-3 h-2"} overflow-hidden rounded-full bg-slate-100`}>
      <div className={`h-full rounded-full ${colorClass[color].bar}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 text-center">
      <p className="text-sm font-black text-ink">{value}</p>
      <p className="mt-1 text-[10px] font-black text-sub">{label}</p>
    </div>
  );
}

function MenuRow({ icon: Icon, label, color, onClick, image }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-[22px] bg-white p-3.5 text-left shadow-card" type="button" onClick={onClick}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${colorClass[color].soft} ${colorClass[color].text}`}>
        {image ? <img className="h-8 w-8 object-contain" src={image} alt="" /> : <Icon size={20} />}
      </div>
      <span className="min-w-0 flex-1 text-sm font-black text-ink">{label}</span>
      <ChevronRight className="text-slate-300" size={17} />
    </button>
  );
}

function TagCloud({ className = "mt-4" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {profileTags.map((tag, index) => {
        const color = ["mint", "blue", "purple", "yellow", "coral"][index];
        return <span key={tag} className={`rounded-full px-3 py-1.5 text-xs font-black ${colorClass[color].soft} ${colorClass[color].text}`}>{tag}</span>;
      })}
    </div>
  );
}

function AvatarBubble({ icon: Icon, color }) {
  return (
    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${colorClass[color].soft} ${colorClass[color].text} shadow-card`}>
      <Icon size={23} />
    </div>
  );
}

function PastelBlob({ className }) {
  return <div className={`absolute rounded-full blur-[1px] ${className}`} />;
}

createRoot(document.getElementById("root")).render(<App />);
