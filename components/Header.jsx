import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerIcon from "./HambergerIcon";
import { Plus, User2 } from "lucide-react";
import Tooltip from "./Tooltip";
import { useRef } from "react";
import CreateAndProfile from "./CreateAndProfile";

export default function Header({ user, open, setOpen, toggleRef }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Elements", href: "/elements" },
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" }
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="flex w-full fixed z-50 gap-1 px-1 pt-1 ">
      {/* Hamberger icon */}
      <div className="flex items-center" ref={toggleRef}>
        <HamburgerIcon open={open} setOpen={setOpen} />
      </div>

      {/* Navigation-bar */}
      <div className="  flex flex-grow items-center justify-between px-3 blurred-bg bg-[var(--secondary-bg)] text-[var(--secondary-fg)] rounded" >
        <Link href="/" className="flex items-center space-x-2">
          <span className="flex items-center gap-3 text-nowrap text-[var(--foreground)] font-bold text-lg tracking-wider">
            <img src="Stole-Ui.png" alt="logo" width={26} />
            Stole UI
          </span>
        </Link>


        <nav className=" hidden sm:flex items-center gap-2 text-nowrap">
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
        <CreateAndProfile user={user} />

      </div>
    </header>
  );
}