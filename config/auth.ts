const authRoutes = {
    home: "/",
    login: "/login",
    signup: "/signup",
};

const authBannerImage = {
    src: "/banner_beach.png",
    // 세로 높이에 맞춰 잘리므로 보이는 폭이 아니라 이미지 전체 폭을 기준으로 받는다
    sizes: "1671px",
    quality: 90,
};

// 0: 로그인, 1~4: 회원가입 단계. 숫자가 커지는 쪽이 앞으로 가는 방향이다
const authVisuals = {
    0: {
        headline: ["새로운 시작,", "더 넓은 가능성."],
        description: "오늘의 여정을 이곳에서 시작하세요.",
        imageClassName: "object-[66%_50%] card:object-[60%_50%]",
        dashCount: 3,
        activeDash: 0,
    },
    1: {
        headline: ["첫 항해를", "준비해볼까요?"],
        description: "아이디와 이메일이면 충분해요.",
        imageClassName: "object-[18%_50%] card:object-[10%_50%]",
        dashCount: 4,
        activeDash: 0,
    },
    2: {
        headline: ["소중한 여정을", "단단히 묶어두세요."],
        description: "다른 사람이 쉽게 짐작할 수 없는 비밀번호가 좋아요.",
        imageClassName: "object-[40%_50%] card:object-[38%_50%]",
        dashCount: 4,
        activeDash: 1,
    },
    3: {
        headline: ["어디로 떠나고", "싶으세요?"],
        description: "관심 있는 분야를 자유롭게 적어주세요.",
        imageClassName: "object-[66%_50%] card:object-[70%_50%]",
        dashCount: 4,
        activeDash: 2,
    },
    4: {
        headline: ["이제 출발할", "시간이에요."],
        description: "프로필 사진까지 더하면 준비가 끝나요.",
        imageClassName: "object-[90%_50%] card:object-[100%_50%]",
        dashCount: 4,
        activeDash: 3,
    },
} satisfies Record<number, AuthVisualContent>;

const authSlideClass = {
    forward: "animate-in fade-in slide-in-from-right-12 duration-500 ease-out motion-reduce:animate-none",
    back: "animate-in fade-in slide-in-from-left-12 duration-500 ease-out motion-reduce:animate-none",
};

function authOrderOf(pathname: string, stepParam: string | null): AuthOrder {
    if (pathname !== authRoutes.signup) return 0;
    const parsed = stepParam ? Number.parseInt(stepParam, 10) : 1;
    return parsed === 2 || parsed === 3 || parsed === 4 ? parsed : 1;
}

type AuthOrder = keyof typeof authVisuals;

type AuthSlideDirection = keyof typeof authSlideClass;

type AuthVisualContent = {
    headline: [string, string];
    description: string;
    imageClassName: string;
    dashCount: number;
    activeDash: number;
};

export type { AuthOrder, AuthSlideDirection, AuthVisualContent };
export { authBannerImage, authOrderOf, authRoutes, authSlideClass, authVisuals };
