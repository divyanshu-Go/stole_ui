import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerIcon from "./HambergerIcon";
import { Plus, User2 } from "lucide-react";
import Tooltip from "./Tooltip";
import { useRef } from "react";

export default function Header({ user, open, setOpen , toggleRef}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Elements", href: "/elements" },
    { name: "Challenges", href: "/challenges" },
    { name: "About Us", href: "/about" }
  ];

  const isActive = (href) => pathname.startsWith(href);

  return (
    <header className="flex w-full fixed z-50 gap-1 px-1 pt-1 ">
      {/* Hamberger icon */}
      <div className="flex items-center" ref={toggleRef}>
        <HamburgerIcon open={open} setOpen={setOpen} />
      </div>

      {/* Navigation-bar */}
      <div className="  flex flex-grow items-center justify-between px-3 blurred-bg bg-[var(--secondary-bg)] text-[var(--secondary-fg)] rounded" >
        <Link href="/" className="flex items-center space-x-2">
          <span className="flex items-center gap-3 text-[var(--foreground)] font-bold text-lg tracking-wider">
            <img src="Stole-Ui.png" alt="logo" width={26} />
            Stole UI
          </span>
        </Link>


        <nav className=" hidden md:flex items-center gap-2 ">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`nav-menu-text transition-colors duration-200 ${isActive(link.href)
                ? "text-violet-400 shadow-sm"
                : "text-gray-300 hover:bg-gray-800 hover:text-violet-300"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="gap-4 flex">

          {/* ➕ Plus icon */}
          <div className="flex items-center nav-btn">
            <Tooltip text={!user ? "Login to contribute" : ""}>
              <Link href="/add-component">
                <Plus className="h-4" />
              </Link>
            </Tooltip>
          </div>

          {/* 👤 User2 icon */}
          <div className="flex items-center nav-btn">
            <Tooltip text={user ? "Profile" : "Login"}>
              <Link href={user ? (user.role === 'admin' ? '/admin-profile' : '/profile') : '/login'}>
                <User2 className="h-4" />
              </Link>
            </Tooltip>
          </div>
        </div>

      </div>
    </header>
  );
}