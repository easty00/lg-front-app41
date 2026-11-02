import MobileNavigation from "../molecules/MobileNavigation";
import DesktopNavigation from "../molecules/DesktopNavigation";

export default function GlobalNavigation() {
    return(
        <nav>
            <MobileNavigation />
            <DesktopNavigation />
        </nav>
    );
}