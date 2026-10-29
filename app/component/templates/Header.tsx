import Logo from "../organisms/Logo";
import GlobalNavigation from "../organisms/GlobalNavigation";

export default function Header(){
    return (
        <header className="container mx-auto flex flex-row justify-between items-center gap-10 px-4 px-8">
            <Logo />
            <GlobalNavigation />
        </header>
    );
}