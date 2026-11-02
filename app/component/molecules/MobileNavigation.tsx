"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";   // ☰ 아이콘, ✕ 아이콘

export default function MobileNavigation() {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
        <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
        {isOpen && (
            <div className="md:hidden">
                <ul>
                    <li><Link href="/">Home</Link></li>
                </ul>
            </div>
        )}
        </>
    );
}
