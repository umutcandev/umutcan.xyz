"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[650px] w-full px-4">
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center gap-6 pl-0">
            <Link 
              href="/" 
              className={`text-foreground hover:text-foreground/80 transition-colors ${pathname === '/' ? 'font-sm' : ''}`}
            >
              home
            </Link>
            <Link 
              href="/contact" 
              className={`text-foreground hover:text-foreground/80 transition-colors ${pathname === '/contact' ? 'font-sm' : ''}`}
            >
              contact
            </Link>
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </div>
  );
};

export default Navbar; 