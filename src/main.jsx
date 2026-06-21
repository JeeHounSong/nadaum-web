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
  ShieldCheck,
  Sparkles,
  Sprout,
  Trophy,
  UsersRound,
  WalletCards,
} from "lucide-react";
import "./styles.css";

const LOGO_SRC = "/assets/nadaum-logo.png";
const profileTags = ["재학생", "자취중", "취업준비", "영상편집", "운동시작"];

const tabs = [
  { id: "home", label: "홈", icon: Home },
  { id: "community", label: "커뮤니티", icon: MessagesSquare },
  { id: "meetups", label: "모임", icon: UsersRound },
  { id: "support", label: "지원", icon: WalletCards },
  { id: "my", label: "마이", icon: CircleUserRound },
];

const colorClass = {
  mint: { text: "text-mint", bg: "bg-mint", soft: "bg-mint/10", ring: "ring-mint/20", border: "border-mint/25" },
  blue: { text: "text-blue", bg: "bg-blue", soft: "bg-blue/10", ring: "ring-blue/20", border: "border-blue/25" },
  purple: { text: "text-purple", bg: "bg-purple", soft: "bg-purple/10", ring: "ring-purple/20", border: "border-purple/25" },
  coral: { text: "text-coral", bg: "bg-coral", soft: "bg-coral/10", ring: "ring-coral/20", border: "border-coral/25" },
  yellow: { text: "text-yellow", bg: "bg-yellow", soft: "bg-yellow/15", ring: "ring-yellow/25", border: "border-yellow/30" },
};

const communityPosts = [
  {
    id: 1,
    category: "질문",
    author: "자취 2년차",
    time: "12분 전",
    title: "자취하면서 요리 시작했는데 간단한 레시피 추천해주세요!",
    body: "퇴근 후 15분 안에 만들 수 있는 메뉴면 더 좋아요.",
    likes: 24,
    comments: 17,
    color: "mint",
  },
  {
    id: 2,
    category: "고민상담",
    author: "취준하는 청년",
    time: "34분 전",
    title: "면접 준비 같이 하실 분 구해요!",
    body: "서로 예상 질문 봐주고 피드백하면 좋을 것 같아요.",
    likes: 15,
    comments: 8,
    color: "purple",
  },
  {
    id: 3,
    category: "자유",
    author: "독서 좋아하는 사람",
    time: "5시간 전",
    title: "이번 주말 독서 모임 모집합니다",
    body: "가볍게 읽은 책 이야기 나누는 모임이에요.",
    likes: 18,
    comments: 12,
    color: "yellow",
  },
  {
    id: 4,
    category: "정보공유",
    author: "강서구 주민",
    time: "어제",
    title: "강서구 근처 조용한 카페 추천해요",
    body: "작업하기 좋고 콘센트 많은 곳 위주로 정리했어요.",
    likes: 31,
    comments: 14,
    color: "blue",
  },
];

const meetupItems = [
  {
    id: "walk",
    title: "한강 저녁 산책",
    type: "오프라인",
    place: "여의나루역",
    date: "6.24 수 19:00",
    count: 9,
    max: 12,
    tags: ["운동", "동네", "건강"],
    icon: Dumbbell,
    color: "mint",
  },
  {
    id: "career",
    title: "취업 포트폴리오 리뷰",
    type: "온라인",
    place: "줌 링크",
    date: "6.27 토 16:00",
    count: 5,
    max: 8,
    tags: ["스터디", "자격증", "취업"],
    icon: BookOpenCheck,
    color: "blue",
  },
  {
    id: "coffee",
    title: "낯가림 적은 커피챗",
    type: "오프라인",
    place: "홍대입구",
    date: "6.29 월 14:00",
    count: 3,
    max: 6,
    tags: ["대화", "친목", "동네"],
    icon: Coffee,
    color: "coral",
  },
  {
    id: "game",
    title: "롤 같이 할 사람",
    type: "온라인",
    place: "디스코드",
    date: "6.30 화 21:00",
    count: 4,
    max: 5,
    tags: ["게임", "LOL", "친목"],
    icon: Gamepad2,
    color: "purple",
  },
];

const supportItems = [
  { id: 1, title: "청년 월세 한시 지원", status: "신청 가능", desc: "월 최대 20만원, 12개월 지원", category: "주거", icon: Home, color: "mint" },
  { id: 2, title: "구직활동 응원 패키지", status: "맞춤 추천", desc: "면접 정장, 사진, 컨설팅 바우처", category: "취업", icon: ClipboardCheck, color: "blue" },
  { id: 3, title: "마음건강 상담권", status: "오늘 마감", desc: "전문 상담 1:1 연계", category: "마음", icon: HeartHandshake, color: "coral" },
  { id: 4, title: "청년 교육 클래스", status: "추천", desc: "디자인·영상·취업 역량 강화", category: "교육", icon: Sprout, color: "purple" },
];

const badges = [
  { label: "첫 댓글", icon: MessageCircle, color: "yellow" },
  { label: "첫 모임", icon: UsersRound, color: "mint" },
  { label: "첫 온라인 모임", icon: Gamepad2, color: "blue" },
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

  const state = {
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
      <div className="flex min-h-[100dvh] flex-col justify-between px-6 py-7 sm:min-h-[860px]">
        <img className="h-16 w-44 object-contain" src={LOGO_SRC} alt="나다움" />

        <section className="space-y-8">
          <div className="relative mx-auto h-[320px] overflow-hidden rounded-[36px] border border-white bg-gradient-to-b from-white via-[#FAFAF7] to-mint/10 shadow-soft">
            <PastelBlob className="left-6 top-8 h-24 w-24 bg-mint/20" />
            <PastelBlob className="right-8 top-20 h-20 w-20 bg-purple/20" />
            <PastelBlob className="bottom-10 left-8 h-24 w-24 bg-blue/20" />
            <PastelBlob className="bottom-14 right-9 h-20 w-20 bg-yellow/30" />
            <div className="absolute left-1/2 top-9 flex h-32 w-32 -translate-x-1/2 items-center justify-center rounded-[34px] bg-white p-5 shadow-lift">
              <img className="h-full w-full object-contain" src={LOGO_SRC} alt="나다움 로고" />
            </div>
            <div className="absolute bottom-24 left-0 right-0 flex items-end justify-center gap-5">
              <AvatarBubble icon={MessageCircle} color="mint" />
              <div className="flex h-28 w-16 flex-col items-center justify-center rounded-full bg-white shadow-card">
                <Sparkles className="text-purple" size={26} />
                <span className="mt-2 h-10 w-2 rounded-full bg-purple/30" />
              </div>
              <AvatarBubble icon={HeartHandshake} color="blue" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/90 px-5 py-4 text-center shadow-lift backdrop-blur">
              <p className="text-sm font-black text-ink">나답게, 함께 성장하는</p>
              <p className="mt-1 text-xs font-bold text-sub">청년 생활 커뮤니티 플랫폼</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-black text-mint">청년 생활 커뮤니티</p>
            <h1 className="mt-2 text-[34px] font-black leading-tight text-ink">
              나답게 사는
              <br />
              하루를 시작해요
            </h1>
            <p className="mt-4 text-[15px] font-semibold leading-7 text-sub">
              생활 정보, 모임, 지원 정책, 마음 체크를 한 곳에서 이어가요.
            </p>
          </div>

          <div className="space-y-3">
            <button className="primary-btn mint-btn" type="button" onClick={onLogin}>
              <LockKeyhole size={19} />
              휴대폰 번호로 시작
            </button>
            <button className="kakao-btn" type="button" onClick={onLogin}>
              <MessageCircle size={19} />
              카카오로 계속
            </button>
          </div>
        </section>

        <p className="pb-1 text-center text-xs font-bold text-slate-400">
          서울, 경기, 인천 청년 생활권 기반
        </p>
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
      <div className="flex min-h-[100dvh] flex-col px-6 py-7 sm:min-h-[860px]">
        <TopLogo />
        <div className="mt-9">
          <p className="text-sm font-black text-blue">청년 인증</p>
          <h1 className="mt-2 text-[28px] font-black leading-tight text-ink">
            내 지역과 나이에 맞는
            <br />
            혜택을 먼저 보여드릴게요
          </h1>
        </div>

        <div className="mt-7 space-y-3">
          {rows.map((row) => (
            <VerifyRow key={row.title} done={verified} {...row} />
          ))}
        </div>

        <div className="mt-5 rounded-3xl border border-yellow/30 bg-[#FFF8E6] p-5 shadow-card">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-yellow shadow-sm">
              <Award size={23} />
            </div>
            <div>
              <p className="font-black text-ink">나다움 청년패스</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-sub">
                인증하면 맞춤 지원, 모임 참여, 커뮤니티 배지가 열려요.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-3 pb-2">
          <button className={verified ? "primary-btn mint-btn" : "primary-btn"} type="button" onClick={verified ? onStart : onVerify}>
            {verified ? <Check size={19} /> : <ClipboardCheck size={19} />}
            {verified ? "나다움 시작하기" : "청년 인증하기"}
          </button>
          <button className="secondary-btn" type="button" onClick={onStart}>
            나중에 할게요
          </button>
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
  }[props.activeTab];

  return (
    <ScreenFrame>
      <div className="flex min-h-[100dvh] flex-col bg-bg sm:min-h-[860px]">
        <main className="app-scroll flex-1 overflow-y-auto pb-28">
          <CurrentScreen {...props} />
        </main>
        <BottomTabs activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
      </div>
    </ScreenFrame>
  );
}

function HomeScreen({ user, setMoodResult, moodResult, joinedMeetups, setActiveTab }) {
  const moods = [
    { id: "calm", label: "차분한 회복형", icon: Moon, color: "mint" },
    { id: "spark", label: "도전 에너지형", icon: Sparkles, color: "blue" },
    { id: "care", label: "연결 충전형", icon: Heart, color: "purple" },
  ];
  const recommendations = [
    { title: "월세 지원 신청 기간", desc: "서울시 청년 월세 지원 안내", icon: WalletCards, color: "mint", tab: "support" },
    { title: "낯가림 적은 커피챗", desc: "6.29 월 14:00 · 홍대입구역", icon: Coffee, color: "coral", tab: "meetups" },
    { title: "온라인 포트폴리오 리뷰", desc: "6.27 토 16:00 · 4명 참여중", icon: BookOpenCheck, color: "blue", tab: "meetups" },
  ];

  return (
    <PagePadding>
      <TopBar title="나다움" subtitle={`${user.name}님의 오늘`} />
      <section className="mt-5 rounded-3xl bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-black text-mint">오늘의 체크인</p>
            <h2 className="mt-2 text-[24px] font-black leading-tight text-ink">
              지금 필요한 것을
              <br />
              빠르게 찾아볼까요?
            </h2>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-mint/10 text-mint">
            <Sparkles size={32} />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const active = moodResult === mood.label;
            return (
              <button
                key={mood.id}
                className={`min-h-[86px] rounded-2xl border px-2 text-center transition ${
                  active ? `${colorClass[mood.color].bg} border-transparent text-white shadow-lift` : "border-slate-100 bg-slate-50 text-sub"
                }`}
                type="button"
                onClick={() => setMoodResult(mood.label)}
              >
                <Icon className="mx-auto mb-2" size={22} />
                <span className="block text-xs font-black leading-5">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <NadaumMapCard />

      <section className="mt-4 rounded-3xl bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-black text-sub">걸음수 챌린지</p>
            <h2 className="mt-1 text-[26px] font-black text-ink">오늘 5,300보</h2>
            <p className="mt-1 text-sm font-bold text-sub">목표 10,000보</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-mint/10 text-mint">
            <Dumbbell size={31} />
          </div>
        </div>
        <ProgressBar value={53} color="mint" />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-black text-mint">완료 시 50P 지급</p>
          <p className="text-sm font-black text-sub">53%</p>
        </div>
      </section>

      <SectionHeader title="오늘 추천" action="더보기" onClick={() => setActiveTab("support")} />
      <div className="space-y-3">
        {recommendations.map((item) => (
          <ActionPanel key={item.title} {...item} onClick={() => setActiveTab(item.tab)} />
        ))}
      </div>

      <section className="mt-4 rounded-3xl bg-gradient-to-r from-mint/15 to-blue/10 p-5">
        <p className="text-sm font-black text-mint">내 활동 요약</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <MiniStat label="참여 모임" value={`${joinedMeetups.length}개`} />
          <MiniStat label="마음 결과" value={moodResult ? "완료" : "대기"} />
          <MiniStat label="레벨" value={user.level} />
        </div>
      </section>
    </PagePadding>
  );
}

function CommunityScreen({ likedPosts, setLikedPosts }) {
  const [category, setCategory] = useState("전체");
  const categories = ["전체", "질문", "정보공유", "고민상담", "자유"];
  const posts = category === "전체" ? communityPosts : communityPosts.filter((post) => post.category === category);
  const toggleLike = (id) => {
    setLikedPosts((prev) => (prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]));
  };

  return (
    <PagePadding>
      <TopBar title="커뮤니티" subtitle="동네 청년들과 가볍게 소통해요" />
      <SegmentedTabs items={categories} active={category} onChange={setCategory} />
      <div className="mt-5 space-y-3">
        {posts.map((post) => {
          const liked = likedPosts.includes(post.id);
          return (
            <article key={post.id} className="rounded-3xl bg-white p-5 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${colorClass[post.color].soft} ${colorClass[post.color].text}`}>
                    <CircleUserRound size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-ink">{post.author}</p>
                    <p className="mt-0.5 text-xs font-bold text-sub">{post.time}</p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${colorClass[post.color].soft} ${colorClass[post.color].text}`}>
                  {post.category}
                </span>
              </div>
              <h2 className="mt-4 text-[17px] font-black leading-7 text-ink">{post.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-sub">{post.body}</p>
              <div className="mt-4 flex items-center gap-4">
                <button className={`flex items-center gap-1 text-sm font-black ${liked ? "text-coral" : "text-sub"}`} type="button" onClick={() => toggleLike(post.id)}>
                  <Heart size={17} fill={liked ? "currentColor" : "none"} />
                  {post.likes + (liked ? 1 : 0)}
                </button>
                <span className="flex items-center gap-1 text-sm font-black text-sub">
                  <MessageCircle size={17} />
                  {post.comments}
                </span>
              </div>
            </article>
          );
        })}
      </div>
      <button className="floating-action" type="button" aria-label="글쓰기">
        <PenLine size={22} />
      </button>
    </PagePadding>
  );
}

function MeetupsScreen({ joinedMeetups, setJoinedMeetups }) {
  const [filter, setFilter] = useState("전체");
  const filters = ["전체", "온라인", "오프라인", "스터디", "운동", "게임"];
  const visibleMeetups = filter === "전체" ? meetupItems : meetupItems.filter((item) => item.type === filter || item.tags.includes(filter));
  const toggleJoin = (id) => {
    setJoinedMeetups((prev) => (prev.includes(id) ? prev.filter((meetupId) => meetupId !== id) : [...prev, id]));
  };

  return (
    <PagePadding>
      <TopBar title="모임" subtitle="편하게 들어갈 수 있는 자리" />
      <section className="mt-5 rounded-3xl bg-white p-5 shadow-card">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue/10 text-blue">
            <CalendarDays size={27} />
          </div>
          <div>
            <p className="text-sm font-black text-sub">이번 주 참여 예정</p>
            <p className="mt-1 text-xl font-black text-ink">{joinedMeetups.length}개 모임</p>
          </div>
        </div>
      </section>
      <SegmentedTabs items={filters} active={filter} onChange={setFilter} />
      <div className="mt-5 space-y-3">
        {visibleMeetups.map((meetup) => {
          const joined = joinedMeetups.includes(meetup.id);
          const Icon = meetup.icon;
          const count = meetup.count + (joined ? 1 : 0);
          return (
            <article key={meetup.id} className="rounded-3xl bg-white p-5 shadow-card">
              <div className="flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${colorClass[meetup.color].soft} ${colorClass[meetup.color].text}`}>
                  <Icon size={25} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${meetup.type === "온라인" ? "bg-purple/10 text-purple" : "bg-mint/10 text-mint"}`}>
                      {meetup.type}
                    </span>
                    <span className="text-xs font-bold text-sub">{meetup.date}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-black text-ink">{meetup.title}</h2>
                  <p className="mt-1 flex items-center gap-1 text-sm font-bold text-sub">
                    <MapPin size={15} />
                    {meetup.place}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {meetup.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-sub">
                    {tag}
                  </span>
                ))}
              </div>
              <ProgressBar value={(count / meetup.max) * 100} color={meetup.color} />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-black text-sub">
                  {count}명 / {meetup.max}명
                </p>
                <button className={`h-11 rounded-full px-5 text-sm font-black ${joined ? "bg-ink text-white" : "bg-mint/10 text-mint"}`} type="button" onClick={() => toggleJoin(meetup.id)}>
                  {joined ? "참여중" : "참여하기"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </PagePadding>
  );
}

function SupportScreen({ savedSupports, setSavedSupports }) {
  const [category, setCategory] = useState("주거");
  const categories = ["주거", "취업", "마음", "교육"];
  const ordered = supportItems.filter((item) => item.category === category).concat(supportItems.filter((item) => item.category !== category));
  const toggleSave = (id) => {
    setSavedSupports((prev) => (prev.includes(id) ? prev.filter((supportId) => supportId !== id) : [...prev, id]));
  };

  return (
    <PagePadding>
      <TopBar title="청년지원" subtitle="내 상황에 맞춘 정책과 혜택" />
      <div className="mt-5 flex h-[52px] items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sub shadow-card">
        <Search size={18} />
        <span className="text-sm font-bold">주거, 취업, 상담 검색</span>
      </div>
      <SegmentedTabs items={categories} active={category} onChange={setCategory} />
      <div className="mt-5 space-y-3">
        {ordered.map((item) => {
          const saved = savedSupports.includes(item.id);
          const Icon = item.icon;
          return (
            <article key={item.id} className={`relative overflow-hidden rounded-3xl border bg-white p-5 shadow-card ${colorClass[item.color].border}`}>
              <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${colorClass[item.color].soft}`} />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${colorClass[item.color].soft} ${colorClass[item.color].text}`}>
                    <Icon size={25} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-black ${colorClass[item.color].soft} ${colorClass[item.color].text}`}>
                        {item.status}
                      </span>
                      <span className="text-xs font-bold text-sub">{item.category}</span>
                    </div>
                    <h2 className="mt-3 text-lg font-black leading-snug text-ink">{item.title}</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-sub">{item.desc}</p>
                  </div>
                </div>
                <button className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${saved ? "bg-yellow text-white" : "bg-slate-100 text-sub"}`} type="button" aria-label="저장" onClick={() => toggleSave(item.id)}>
                  {saved ? <Check size={19} /> : <Plus size={19} />}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </PagePadding>
  );
}

function MyPageScreen({ user, verified, setStage, setActiveTab, setMoodResult }) {
  const records = [
    { label: "모임 참여", value: 12, color: "mint" },
    { label: "온라인 모임", value: 18, color: "blue" },
    { label: "오프라인 모임", value: 5, color: "yellow" },
    { label: "댓글/게시글", value: 36, color: "purple" },
  ];

  return (
    <PagePadding>
      <TopBar title="마이페이지" subtitle="내 활동과 인증" />
      <section className="mt-5 rounded-3xl bg-white p-5 shadow-card">
        <div className="flex items-center gap-4">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-white p-3 shadow-lift ring-4 ring-mint/10">
            <img className="h-full w-full object-contain" src={LOGO_SRC} alt="나다움" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-ink">이나담</h2>
              <span className="rounded-full bg-mint/10 px-2.5 py-1 text-xs font-black text-mint">{user.level}</span>
            </div>
            <p className="mt-1 text-sm font-bold text-sub">{verified ? "청년 인증 완료" : user.badge}</p>
            <p className="mt-1 text-xs font-bold text-mint">나다움을 찾아가는 중</p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-5 shadow-card">
        <SectionTitle title="나다움 지도" />
        <TagCloud />
      </section>

      <section className="mt-4 rounded-3xl bg-white p-5 shadow-card">
        <SectionTitle title="활동 기록" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          {records.map((record) => (
            <div key={record.label} className={`rounded-2xl p-4 ${colorClass[record.color].soft}`}>
              <p className="text-2xl font-black text-ink">{record.value}</p>
              <p className="mt-1 text-xs font-black text-sub">{record.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-3xl bg-white p-5 shadow-card">
        <SectionTitle title="성장 배지" action="14개" />
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="w-20 shrink-0 text-center">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${colorClass[badge.color].soft} ${colorClass[badge.color].text} ring-4 ${colorClass[badge.color].ring}`}>
                  <Icon size={25} />
                </div>
                <p className="mt-2 text-xs font-black text-slate-600">{badge.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-4 space-y-3">
        <MenuRow
          icon={BookOpenCheck}
          label={user.moodResult ? `심리테스트 결과: ${user.moodResult}` : "심리테스트 하기"}
          color="purple"
          onClick={() => {
            setMoodResult("차분한 회복형");
            setActiveTab("home");
          }}
        />
        <MenuRow icon={UsersRound} label="내가 참여한 모임" color="blue" onClick={() => setActiveTab("meetups")} />
        <MenuRow icon={WalletCards} label="저장한 청년지원" color="mint" onClick={() => setActiveTab("support")} />
        <MenuRow icon={ShieldCheck} label="청년 인증 다시 보기" color="yellow" onClick={() => setStage("onboarding")} />
      </div>
    </PagePadding>
  );
}

function NadaumMapCard() {
  return (
    <section className="mt-4 overflow-hidden rounded-3xl bg-white shadow-card">
      <div className="flex items-center justify-between px-5 pt-5">
        <div>
          <p className="text-sm font-black text-blue">나다움 지도</p>
          <h2 className="mt-1 text-xl font-black text-ink">지금의 나를 태그로 기록해요</h2>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue">
          <Map size={24} />
        </div>
      </div>
      <div className="relative mx-5 mt-4 h-36 rounded-3xl bg-[#F3F7FA]">
        <div className="absolute inset-0 opacity-60 map-grid" />
        <MapPinBubble className="left-5 top-7" label="재학생" color="mint" />
        <MapPinBubble className="right-8 top-5" label="자취중" color="purple" />
        <MapPinBubble className="left-24 bottom-7" label="취업준비" color="blue" />
        <MapPinBubble className="right-14 bottom-8" label="영상편집" color="yellow" />
        <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-mint/15">
          <div className="h-5 w-5 rounded-full bg-mint shadow-lift" />
        </div>
      </div>
      <TagCloud className="px-5 py-5" />
    </section>
  );
}

function BottomTabs({ activeTab, setActiveTab }) {
  return (
    <nav className="absolute bottom-3 left-4 right-4 z-20 rounded-[28px] border border-slate-100 bg-white/95 px-2 py-2 shadow-card backdrop-blur">
      <div className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-black transition ${active ? "bg-mint/10 text-mint" : "text-sub"}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={20} strokeWidth={active ? 2.8 : 2.2} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function ScreenFrame({ children }) {
  return (
    <div className="min-h-screen bg-[#EEF3F7] font-sans text-ink">
      <div className="mx-auto min-h-[100dvh] w-full max-w-[430px] overflow-hidden bg-bg shadow-2xl sm:my-6 sm:min-h-[860px] sm:rounded-[34px]">
        <div className="relative min-h-[100dvh] sm:min-h-[860px]">{children}</div>
      </div>
    </div>
  );
}

function PagePadding({ children }) {
  return <div className="px-5 pb-6 pt-6">{children}</div>;
}

function TopLogo() {
  return <img className="h-11 w-32 object-contain" src={LOGO_SRC} alt="나다움" />;
}

function TopBar({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <img className="h-7 w-20 object-contain" src={LOGO_SRC} alt="나다움" />
        </div>
        <h1 className="text-[25px] font-black text-ink">{title}</h1>
        <p className="mt-1 text-sm font-bold text-sub">{subtitle}</p>
      </div>
      <button className="icon-btn" type="button" aria-label="알림">
        <Bell size={19} />
      </button>
    </header>
  );
}

function VerifyRow({ icon: Icon, title, desc, done, color }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-card">
      <div className={`flex h-[52px] w-[52px] items-center justify-center rounded-2xl ${done ? "bg-mint text-white" : `${colorClass[color].soft} ${colorClass[color].text}`}`}>
        {done ? <Check size={23} /> : <Icon size={23} />}
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
    <div className="scrollbar-hide mt-5 flex gap-2 overflow-x-auto pb-1">
      {items.map((item) => (
        <button
          key={item}
          className={`h-10 shrink-0 rounded-full px-4 text-sm font-black transition ${active === item ? "bg-mint text-white shadow-lift" : "bg-white text-sub shadow-sm"}`}
          type="button"
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function SectionHeader({ title, action, onClick }) {
  return (
    <div className="mb-3 mt-7 flex items-center justify-between">
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
      <h2 className="text-lg font-black text-ink">{title}</h2>
      {action && <span className="text-sm font-black text-sub">{action}</span>}
    </div>
  );
}

function ActionPanel({ icon: Icon, title, desc, color, onClick }) {
  return (
    <button className="flex w-full items-center gap-4 rounded-3xl bg-white p-4 text-left shadow-card" type="button" onClick={onClick}>
      <div className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl ${colorClass[color].soft} ${colorClass[color].text}`}>
        <Icon size={24} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-black text-ink">{title}</p>
        <p className="mt-1 text-sm font-semibold leading-5 text-sub">{desc}</p>
      </div>
      <ChevronRight className="text-slate-300" size={18} />
    </button>
  );
}

function ProgressBar({ value, color = "mint" }) {
  return (
    <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${colorClass[color].bg}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/80 p-3 text-center shadow-sm">
      <p className="text-base font-black text-ink">{value}</p>
      <p className="mt-1 text-[11px] font-black text-sub">{label}</p>
    </div>
  );
}

function MenuRow({ icon: Icon, label, color, onClick }) {
  return (
    <button className="flex w-full items-center gap-4 rounded-3xl bg-white p-4 text-left shadow-card" type="button" onClick={onClick}>
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colorClass[color].soft} ${colorClass[color].text}`}>
        <Icon size={22} />
      </div>
      <span className="min-w-0 flex-1 text-sm font-black text-ink">{label}</span>
      <ChevronRight className="text-slate-300" size={18} />
    </button>
  );
}

function TagCloud({ className = "mt-4" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {profileTags.map((tag, index) => {
        const color = ["mint", "blue", "purple", "yellow", "coral"][index];
        return (
          <span key={tag} className={`rounded-full px-3 py-2 text-xs font-black ${colorClass[color].soft} ${colorClass[color].text}`}>
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function AvatarBubble({ icon: Icon, color }) {
  return (
    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${colorClass[color].soft} ${colorClass[color].text} shadow-card`}>
      <Icon size={25} />
    </div>
  );
}

function MapPinBubble({ label, color, className }) {
  return (
    <div className={`absolute ${className}`}>
      <div className={`rounded-2xl px-3 py-2 text-xs font-black shadow-sm ${colorClass[color].soft} ${colorClass[color].text}`}>
        {label}
      </div>
    </div>
  );
}

function PastelBlob({ className }) {
  return <div className={`absolute rounded-full blur-[1px] ${className}`} />;
}

createRoot(document.getElementById("root")).render(<App />);
