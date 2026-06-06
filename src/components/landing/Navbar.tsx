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
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all ${
            scrolled ? "glass shadow-card" : ""
          }`}
        >
          <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-primary-foreground shadow-mint">
              <Zap className="w-4 h-4" />
            </span>
            AlgoCheat AI
          </a>
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <a href="#content-lab">Sign in</a>
            </Button>
            <Button size="sm" asChild className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 shadow-mint">
              <a href="#content-lab">Launch Free Lab →</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
