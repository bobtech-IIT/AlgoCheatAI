import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#roi", label: "ROI" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container px-3 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-3 sm:px-4 py-2.5 transition-all ${
            scrolled ? "glass shadow-card" : ""
          }`}
        >
          {/* Logo — whitespace-nowrap prevents 2-line wrap on mobile */}
          <a
            href="#top"
            className="flex items-center gap-2 font-display font-bold text-base sm:text-lg whitespace-nowrap shrink-0 min-w-0"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-primary-foreground shadow-mint shrink-0">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
            <span className="hidden xs:inline sm:inline">AlgoCheat AI</span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA buttons — shrink-0 prevents squishing */}
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <a href="#content-lab">Sign in</a>
            </Button>
            <Button
              size="sm"
              asChild
              className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 shadow-mint text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-9"
            >
              <a href="#content-lab">Launch Free Lab →</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
