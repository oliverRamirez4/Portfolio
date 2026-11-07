"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row flex-wrap items-baseline gap-[25px] font-mono text-[13px] font-normal">
      <div className="font-medium">OLIVER RAMIREZ</div>
      {links.map((link) => {
        const current = isCurrent(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={current ? "text-current" : "text-ink"}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
