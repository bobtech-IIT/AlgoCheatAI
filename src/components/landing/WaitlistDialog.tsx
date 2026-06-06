import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Sparkles, Check } from "lucide-react";

export function WaitlistDialog({
  open, onOpenChange, plan,
}: { open: boolean; onOpenChange: (o: boolean) => void; plan: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Enter a valid email");
    setLoading(true);
    const list = JSON.parse(localStorage.getItem("waitlist") ?? "[]");
    list.push({ email, plan, at: new Date().toISOString() });
    localStorage.setItem("waitlist", JSON.stringify(list));
    setTimeout(() => {
      setLoading(false);
      toast.success("You're on the list! We've locked in your $9/mo founder pricing.");
      onOpenChange(false);
      setEmail("");
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/60 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Lock in Founder Pricing
          </DialogTitle>
          <DialogDescription>
            Join the waitlist to secure **$9/mo early-adopter access** (normal price $29/mo) and be first to get our upcoming Phase 2 power features:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2 border-y border-border/40 text-xs leading-relaxed text-muted-foreground">
          <div className="flex gap-2">
            <Check className="w-4 h-4 text-primary shrink-0" />
            <span><strong>AI Brand Voice Cloner:</strong> Mimic your exact writing style to keep content sounding authentic.</span>
          </div>
          <div className="flex gap-2">
            <Check className="w-4 h-4 text-primary shrink-0" />
            <span><strong>Competitor Dissector:</strong> Dissect viral posts to auto-extract their high-reach hook patterns.</span>
          </div>
          <div className="flex gap-2">
            <Check className="w-4 h-4 text-primary shrink-0" />
            <span><strong>Aesthetic Carousel Generator:</strong> Export high-dwell-time PDF carousels in seconds.</span>
          </div>
          <div className="flex gap-2">
            <Check className="w-4 h-4 text-primary shrink-0" />
            <span><strong>Direct Post Scheduler:</strong> Pre-schedule posts at optimized peak algorithm hours.</span>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3 pt-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoFocus
          />
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-mint">
            {loading ? "Securing slot..." : "Secure $9/mo Lifetime Spot"}
          </Button>
          <p className="text-[10px] text-muted-foreground text-center">No upfront payment required · Cancel anytime.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
