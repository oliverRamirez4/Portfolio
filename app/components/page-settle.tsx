"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageSettle({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-settle">
      {children}
    </div>
  );
}
