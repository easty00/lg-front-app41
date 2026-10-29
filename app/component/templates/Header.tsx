import Logo from "../organisms/Logo";
import GlobalNavigation from "../organisms/GlobalNavigation";

export default function Header(){
    return (
        <header>
            <Logo />
            <GlobalNavigation />
        </header>
    );
}