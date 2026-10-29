import MobileNavigation from "../molecules/MobileNavigation";
import DesktopNavigation from "../molecules/DesktopNavigation";

export default function GlabalNavigation() {
    return(
        <nav>
            <MobileNavigation />
            <DesktopNavigation />
        </nav>
    );
}