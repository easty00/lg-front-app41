import Link from "next/link";

export default function DesktopNavigation() {
    return(
        <ul className="items-center gap-4 hidden md:flex">
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/about">About</Link>
            </li>
            <li>
                <Link href="/contact">Contact</Link>
            </li>
        </ul>
    );
}