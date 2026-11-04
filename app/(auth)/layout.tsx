import AuthRouteVisual from "@/app/component/organisms/AuthRouteVisual";
import { AuthSlideProvider } from "@/app/component/providers/AuthSlideProvider";

export default function AuthLayout({children}:{children: React.ReactNode}) {
    return (
        <div className="auth-stage relative flex min-h-screen w-full overflow-hidden card:items-center card:justify-center card:p-8 full:p-10">
            <main className="flex w-full flex-col card:relative card:min-h-160 card:max-w-280 card:flex-row card:overflow-hidden card:rounded-[28px] card:bg-white card:shadow-[0_24px_60px_rgba(16,58,104,0.34)] full:min-h-215 full:max-w-370 full:rounded-[36px]">
                <AuthSlideProvider>
                    <AuthRouteVisual />
                    {children}
                </AuthSlideProvider>
            </main>
        </div>
    );
}
