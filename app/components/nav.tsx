"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

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
  const navRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(false);
  const [bar, setBar] = useState({ left: 0, top: 0, width: 0 });

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => {
      const current = nav.querySelector<HTMLElement>('[aria-current="page"]');
      if (!current) return;
      const navBox = nav.getBoundingClientRect();
      const box = current.getBoundingClientRect();
      setBar({
        left: box.left - navBox.left,
        top: box.bottom - navBox.top - 1,
        width: box.width,
      });
    };

    measure();
    const frame = requestAnimationFrame(() => setSlide(true));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className="relative flex flex-row flex-wrap items-baseline gap-[25px] font-mono text-[13px] font-normal"
    >
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
      <span
        aria-hidden="true"
        className={slide ? "nav-current-line is-set" : "nav-current-line"}
        style={{ left: bar.left, top: bar.top, width: bar.width }}
      />
    </nav>
  );
}
