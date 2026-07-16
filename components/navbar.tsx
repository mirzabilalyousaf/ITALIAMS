"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { cartCount, readCart } from "@/lib/cart-storage";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" }
];

export function Navbar() {
  const pathname = usePathname();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(cartCount(readCart()));
    sync();
    window.addEventListener("italiams-cart-updated", sync);
    return () => window.removeEventListener("italiams-cart-updated", sync);
  }, []);

  const activePath = useMemo(() => pathname ?? "/", [pathname]);

  return (
    <header className="nav-shell">
      <div className="container nav-row">
        <Link href="/" className="brand">
          {siteConfig.brandName}
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? activePath === "/" : activePath.startsWith(item.href);
            const isCart = item.href === "/cart";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "nav-link active" : "nav-link"}
              >
                {item.label}
                {isCart && count > 0 ? <span className="cart-pill">{count}</span> : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
