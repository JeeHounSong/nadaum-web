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
  Compass,
  HeartHandshake,
  Home,
  LockKeyhole,
  MapPin,
  MessageCircle,
  MessagesSquare,
  PenLine,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";
import "./styles.css";

const tabs = [
  { id: "home", label: "홈", icon: Home },
  { id: "community", label: "커뮤니티", icon: MessagesSquare },
  { id: "meetups", label: "모임", icon: UsersRound },
  { id: "support", label: "지원", icon: WalletCards },
  { id: "my", label: "마이", icon: CircleUserRound },
];

const communityPosts = [
  {
    id: 1,
    tag: "일상",
    title: "첫 자취, 냉장고에 꼭 있어야 하는 것",
    body: "밀키트보다 오래 가는 기본템 추천 받아요.",
    replies: 18,
    likes: 42,
    color: "bg-mint/20 text-mint",
  },
  {
    id: 2,
    tag: "진로",
    title: "면접 전날 불안할 때 루틴 공유",
    body: "말을 또박또박 하려면 전날 뭘 하면 좋을까요?",
    replies: 9,
    likes: 21,
    color: "bg-blue/20 text-blue",
  },
  {
    id: 3,
    tag: "마음",
    title: "오늘의 작은 성공 기록하기",
    body: "일찍 일어난 것만으로도 꽤 괜찮은 하루.",
    replies: 24,
    likes: 58,
    color: "bg-purple/20 text-purple",
  },
];

const meetups = [
  {
    id: "walk",
    title: "한강 저녁 산책",
    place: "여의나루역",
    date: "6.24 수",
    count: 8,
    max: 12,
    accent: "mint",
  },
  {
    id: "career",
    title: "취업 포트폴리오 리뷰",
    place: "성수 공유라운지",
    date: "6.27 토",
    count: 5,
    max: 8,
    accent: "blue",
  },
  {
    id: "coffee",
    title: "낯가림 적은 커피챗",
    place: "홍대입구",
    date: "6.29 월",
    count: 3,
    max: 6,
    accent: "coral",
  },
];

const supportItems = [
  {
    id: 1,
    title: "청년 월세 한시 지원",
    status: "신청 가능",
    desc: "월 최대 20만원, 12개월 지원",
    color: "border-mint/40 bg-mint/10",
  },
  {
    id: 2,
    title: "구직활동 응원 패키지",
    status: "맞춤 추천",
    desc: "면접 정장, 사진, 컨설팅 바우처",
    color: "border-blue/40 bg-blue/10",
  },
  {
    id: 3,
    title: "마음건강 상담권",
    status: "오늘 마감",
    desc: "전문 상담 1:1 연계",
    color: "border-coral/40 bg-coral/10",
  },
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
      joinedCount: joinedMeetups.length,
      savedCount: savedSupports.length,
      moodResult,
    }),
    [joinedMeetups.length, moodResult, savedSupports.length, verified],
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
    user,
  };

  if (stage === "login") {
    return <LoginScreen onLogin={() => setStage("onboarding")} />;
  }

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
      <div className="flex min-h-[100dvh] flex-col justify-between px-6 py-8">
        <div className="flex items-center justify-between">
          <BrandMark />
          <button className="icon-btn" type="button" aria-label="알림">
            <Bell size={19} />
          </button>
        </div>

        <div className="space-y-8">
          <div className="relative mx-auto h-52 w-full overflow-hidden rounded-lg bg-white shadow-soft">
            <div className="absolute left-5 top-5 h-24 w-24 rounded-full bg-mint/20" />
            <div className="absolute right-4 top-8 h-20 w-20 rounded-[24px] bg-blue/20" />
            <div className="absolute bottom-4 left-8 h-24 w-32 rounded-[28px] bg-yellow/25" />
            <div className="absolute bottom-8 right-8 flex h-24 w-24 items-center justify-center rounded-full bg-purple/20">
              <Sparkles className="text-purple" size={42} />
            </div>
            <div className="absolute left-8 top-20 w-44 rounded-lg bg-white/90 p-4 shadow-lift backdrop-blur">
              <p className="text-xs font-bold text-blue">오늘의 나다움</p>
              <p className="mt-1 text-lg font-black leading-tight text-ink">
                내 생활을 같이 챙기는 청년 커뮤니티
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-mint">청년 생활 커뮤니티</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-ink">
              나답게 사는
              <br />
              하루를 시작해요
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-slate-500">
              생활 정보, 모임, 지원 정책, 마음 체크를 한 곳에서 이어가요.
            </p>
          </div>

          <div className="space-y-3">
            <button className="primary-btn" type="button" onClick={onLogin}>
              <LockKeyhole size={19} />
              휴대폰 번호로 시작
            </button>
            <button className="secondary-btn" type="button" onClick={onLogin}>
              <MessageCircle size={19} />
              카카오로 계속
            </button>
          </div>
        </div>

        <p className="text-center text-xs font-medium text-slate-400">
          서울, 경기, 인천 청년 생활권 기반
        </p>
      </div>
    </ScreenFrame>
  );
}

function OnboardingScreen({ verified, onVerify, onStart }) {
  return (
    <ScreenFrame>
      <div className="flex min-h-[100dvh] flex-col px-6 py-7">
        <BrandMark />

        <div className="mt-8">
          <p className="text-sm font-bold text-blue">청년 인증</p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-ink">
            내 지역과 나이에 맞는
            <br />
            혜택을 먼저 보여드릴게요
          </h1>
        </div>

        <div className="mt-8 space-y-4">
          <VerifyRow
            icon={ShieldCheck}
            title="만 19-39세"
            desc="청년 지원 기준에 맞는지 확인"
            done={verified}
          />
          <VerifyRow
            icon={MapPin}
            title="생활권 선택"
            desc="서울 서북권, 경기 남부 등 관심 지역"
            done={verified}
          />
          <VerifyRow
            icon={HeartHandshake}
            title="관심사"
            desc="주거, 취업, 마음건강, 모임"
            done={verified}
          />
        </div>

        <div className="mt-7 rounded-lg border border-yellow/40 bg-yellow/15 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-yellow shadow-sm">
              <Award size={22} />
            </div>
            <div>
              <p className="font-black text-ink">나다움 청년패스</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                인증하면 맞춤 지원, 모임 참여, 커뮤니티 배지가 열려요.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-3 pb-2">
          <button
            className={verified ? "primary-btn bg-mint" : "primary-btn"}
            type="button"
            onClick={verified ? onStart : onVerify}
          >
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
      <div className="flex min-h-[100dvh] flex-col bg-white">
        <main className="flex-1 overflow-y-auto pb-24">
          <CurrentScreen {...props} />
        </main>
        <BottomTabs activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
      </div>
    </ScreenFrame>
  );
}

function HomeScreen({
  user,
  setMoodResult,
  moodResult,
  joinedMeetups,
  setActiveTab,
}) {
  const testOptions = [
    { id: "calm", label: "차분한 회복형", color: "bg-mint text-white" },
    { id: "spark", label: "도전 에너지형", color: "bg-blue text-white" },
    { id: "care", label: "연결 충전형", color: "bg-purple text-white" },
  ];

  return (
    <PagePadding>
      <TopBar title="나다움" subtitle={`${user.name}님의 오늘`} />

      <section className="mt-5 rounded-lg bg-ink p-5 text-white shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-mint">오늘의 체크인</p>
            <h2 className="mt-2 text-2xl font-black leading-tight">
              지금 필요한 것을
              <br />
              빠르게 찾아볼까요?
            </h2>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
            <Compass size={32} />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {testOptions.map((option) => (
            <button
              key={option.id}
              className={`min-h-16 rounded-2xl px-2 text-xs font-black leading-5 ${
                moodResult === option.label ? option.color : "bg-white/10 text-white"
              }`}
              type="button"
              onClick={() => setMoodResult(option.label)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <MetricCard label="참여 모임" value={`${joinedMeetups.length}개`} color="mint" />
        <MetricCard label="마음 결과" value={moodResult ? "완료" : "대기"} color="purple" />
      </div>

      <SectionHeader title="오늘 추천" action="전체" onClick={() => setActiveTab("support")} />
      <div className="space-y-3">
        <ActionPanel
          icon={WalletCards}
          title="월세 지원 신청 기간"
          desc="주거 관심 청년에게 가장 먼저 추천돼요."
          color="mint"
          onClick={() => setActiveTab("support")}
        />
        <ActionPanel
          icon={Coffee}
          title="낯가림 적은 커피챗"
          desc="새로운 사람과 가볍게 이야기해요."
          color="coral"
          onClick={() => setActiveTab("meetups")}
        />
      </div>
    </PagePadding>
  );
}

function CommunityScreen({ likedPosts, setLikedPosts }) {
  const toggleLike = (id) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id],
    );
  };

  return (
    <PagePadding>
      <TopBar title="커뮤니티" subtitle="비슷한 하루를 사는 사람들" />
      <div className="mt-5 flex gap-2">
        {["전체", "일상", "진로", "마음"].map((chip, index) => (
          <button
            key={chip}
            className={`rounded-full px-4 py-2 text-sm font-black ${
              index === 0 ? "bg-ink text-white" : "bg-slate-100 text-slate-500"
            }`}
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {communityPosts.map((post) => {
          const liked = likedPosts.includes(post.id);
          return (
            <article key={post.id} className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-black ${post.color}`}>
                  {post.tag}
                </span>
                <button
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    liked ? "bg-coral text-white" : "bg-slate-100 text-slate-400"
                  }`}
                  type="button"
                  aria-label="좋아요"
                  onClick={() => toggleLike(post.id)}
                >
                  <Sparkles size={17} />
                </button>
              </div>
              <h2 className="mt-4 text-lg font-black leading-snug text-ink">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{post.body}</p>
              <div className="mt-4 flex items-center gap-4 text-xs font-bold text-slate-400">
                <span>댓글 {post.replies}</span>
                <span>공감 {post.likes + (liked ? 1 : 0)}</span>
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
  const toggleJoin = (id) => {
    setJoinedMeetups((prev) =>
      prev.includes(id) ? prev.filter((meetupId) => meetupId !== id) : [...prev, id],
    );
  };

  return (
    <PagePadding>
      <TopBar title="모임" subtitle="편하게 들어갈 수 있는 자리" />
      <div className="mt-5 rounded-lg bg-blue/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue text-white">
            <CalendarDays size={23} />
          </div>
          <div>
            <p className="text-sm font-black text-ink">이번 주 참여 예정</p>
            <p className="text-sm font-bold text-blue">{joinedMeetups.length}개 모임</p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {meetups.map((meetup) => {
          const joined = joinedMeetups.includes(meetup.id);
          return (
            <article key={meetup.id} className="rounded-lg border border-slate-100 bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={`text-sm font-black text-${meetup.accent}`}>{meetup.date}</p>
                  <h2 className="mt-1 text-xl font-black text-ink">{meetup.title}</h2>
                  <p className="mt-2 flex items-center gap-1 text-sm font-medium text-slate-500">
                    <MapPin size={15} />
                    {meetup.place}
                  </p>
                </div>
                <button
                  className={`h-11 rounded-2xl px-4 text-sm font-black ${
                    joined ? "bg-ink text-white" : "bg-slate-100 text-slate-500"
                  }`}
                  type="button"
                  onClick={() => toggleJoin(meetup.id)}
                >
                  {joined ? "참여중" : "참여"}
                </button>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full bg-${meetup.accent}`}
                  style={{ width: `${((meetup.count + (joined ? 1 : 0)) / meetup.max) * 100}%` }}
                />
              </div>
              <p className="mt-3 text-xs font-bold text-slate-400">
                {meetup.count + (joined ? 1 : 0)} / {meetup.max}명
              </p>
            </article>
          );
        })}
      </div>
    </PagePadding>
  );
}

function SupportScreen({ savedSupports, setSavedSupports }) {
  const toggleSave = (id) => {
    setSavedSupports((prev) =>
      prev.includes(id) ? prev.filter((supportId) => supportId !== id) : [...prev, id],
    );
  };

  return (
    <PagePadding>
      <TopBar title="청년지원" subtitle="내 상황에 맞춘 정책과 혜택" />
      <div className="mt-5 flex h-12 items-center gap-2 rounded-2xl bg-slate-100 px-4 text-slate-400">
        <Search size={18} />
        <span className="text-sm font-bold">주거, 취업, 상담 검색</span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {["주거", "취업", "마음"].map((label, index) => (
          <button
            key={label}
            className={`rounded-2xl py-3 text-sm font-black ${
              index === 0 ? "bg-mint text-white" : "bg-slate-100 text-slate-500"
            }`}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {supportItems.map((item) => {
          const saved = savedSupports.includes(item.id);
          return (
            <article key={item.id} className={`rounded-lg border p-5 ${item.color}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-ink shadow-sm">
                    {item.status}
                  </span>
                  <h2 className="mt-4 text-lg font-black text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
                </div>
                <button
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    saved ? "bg-yellow text-white" : "bg-white text-slate-400"
                  }`}
                  type="button"
                  aria-label="저장"
                  onClick={() => toggleSave(item.id)}
                >
                  <Plus size={19} className={saved ? "rotate-45" : ""} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </PagePadding>
  );
}

function MyPageScreen({ user, verified, setStage, setActiveTab }) {
  return (
    <PagePadding>
      <TopBar title="마이페이지" subtitle="내 활동과 인증" />
      <section className="mt-5 rounded-lg bg-ink p-5 text-white shadow-soft">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-mint text-white">
            <CircleUserRound size={34} />
          </div>
          <div>
            <h2 className="text-2xl font-black">{user.name}</h2>
            <p className="mt-1 text-sm font-bold text-white/70">{user.badge}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <ProfileStat label="모임" value={user.joinedCount} />
          <ProfileStat label="저장" value={user.savedCount} />
          <ProfileStat label="인증" value={verified ? "완료" : "대기"} />
        </div>
      </section>

      <div className="mt-5 space-y-3">
        <MenuRow
          icon={BookOpenCheck}
          label={user.moodResult || "심리테스트 하기"}
          color="purple"
          onClick={() => setActiveTab("home")}
        />
        <MenuRow icon={UsersRound} label="내가 참여한 모임" color="blue" onClick={() => setActiveTab("meetups")} />
        <MenuRow icon={WalletCards} label="저장한 청년지원" color="mint" onClick={() => setActiveTab("support")} />
        <MenuRow icon={ShieldCheck} label="청년 인증 다시 보기" color="yellow" onClick={() => setStage("onboarding")} />
      </div>
    </PagePadding>
  );
}

function BottomTabs({ activeTab, setActiveTab }) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 border-t border-slate-100 bg-white/95 px-3 pb-4 pt-2 backdrop-blur">
      <div className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-black ${
                active ? "bg-mint/20 text-mint" : "text-slate-400"
              }`}
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
    <div className="min-h-screen bg-slate-100 font-sans text-ink">
      <div className="mx-auto min-h-[100dvh] w-full max-w-[390px] overflow-hidden bg-white shadow-2xl sm:my-6 sm:min-h-[844px] sm:rounded-[32px]">
        <div className="relative min-h-[100dvh] sm:min-h-[844px]">{children}</div>
      </div>
    </div>
  );
}

function PagePadding({ children }) {
  return <div className="px-5 pb-6 pt-6">{children}</div>;
}

function BrandMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mint text-white shadow-lift">
        <Sparkles size={21} />
      </div>
      <span className="text-xl font-black tracking-normal text-ink">나다움</span>
    </div>
  );
}

function TopBar({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-black text-ink">{title}</h1>
        <p className="mt-1 text-sm font-bold text-slate-400">{subtitle}</p>
      </div>
      <button className="icon-btn" type="button" aria-label="알림">
        <Bell size={19} />
      </button>
    </header>
  );
}

function VerifyRow({ icon: Icon, title, desc, done }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-4 shadow-soft">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${done ? "bg-mint text-white" : "bg-slate-100 text-slate-400"}`}>
        {done ? <Check size={22} /> : <Icon size={22} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-black text-ink">{title}</p>
        <p className="mt-1 text-sm font-medium text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function SectionHeader({ title, action, onClick }) {
  return (
    <div className="mb-3 mt-7 flex items-center justify-between">
      <h2 className="text-lg font-black text-ink">{title}</h2>
      <button className="flex items-center text-sm font-black text-blue" type="button" onClick={onClick}>
        {action}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function MetricCard({ label, value, color }) {
  return (
      <div className={`rounded-lg bg-${color}/10 p-4`}>
      <p className={`text-xs font-black text-${color}`}>{label}</p>
      <p className="mt-2 text-2xl font-black text-ink">{value}</p>
    </div>
  );
}

function ActionPanel({ icon: Icon, title, desc, color, onClick }) {
  return (
    <button
      className="flex w-full items-center gap-4 rounded-lg border border-slate-100 bg-white p-4 text-left shadow-soft"
      type="button"
      onClick={onClick}
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-${color}/20 text-${color}`}>
        <Icon size={23} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-black text-ink">{title}</p>
        <p className="mt-1 text-sm leading-5 text-slate-500">{desc}</p>
      </div>
      <ChevronRight className="text-slate-300" size={18} />
    </button>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3 text-center">
      <p className="text-lg font-black">{value}</p>
      <p className="mt-1 text-[11px] font-bold text-white/60">{label}</p>
    </div>
  );
}

function MenuRow({ icon: Icon, label, color, onClick }) {
  return (
    <button
      className="flex w-full items-center gap-4 rounded-lg border border-slate-100 bg-white p-4 text-left shadow-soft"
      type="button"
      onClick={onClick}
    >
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-${color}/20 text-${color}`}>
        <Icon size={21} />
      </div>
      <span className="min-w-0 flex-1 text-sm font-black text-ink">{label}</span>
      <ChevronRight className="text-slate-300" size={18} />
    </button>
  );
}

createRoot(document.getElementById("root")).render(<App />);
