import { Badge } from "@/components/ui/badge";
import { ThumbsUp, TrendingUp, AlertTriangle, Sparkles, MessageCircle, XCircle, CheckCircle } from "lucide-react";

interface OriginalDraft {
  id: string;
  title: string;
  snippet: string;
  likes: number;
  score: number;
  penalty: string;
}

interface RewrittenPost {
  id: string;
  title: string;
  snippet: string;
  score: number;
  benefit: string;
}

const ORIGINAL_DRAFTS: OriginalDraft[] = [
  { id: "od-1", title: "B2B SaaS Launch", snippet: "I'm excited to share that we just launched...", likes: 3, score: 34, penalty: "Fails scroll-stopping hook rules & lacks structured dwell layout" },
  { id: "od-2", title: "Tech Thought Leadership", snippet: "Leadership is about empathy. We need to leverage...", likes: 2, score: 28, penalty: "Generic opening, no specificity, AI-sounding platitudes" },
  { id: "od-3", title: "Founder Storytelling", snippet: "I wanted to share my journey of building...", likes: 5, score: 41, penalty: "No pattern interrupt, weak narrative arc, missing conversation trigger" },
  { id: "od-4", title: "Product Update", snippet: "We've been working hard on v2.0 with new features...", likes: 1, score: 22, penalty: "Self-promotional without value, zero dwell-time structure" },
  { id: "od-5", title: "Industry Hot Take", snippet: "The future of AI in business is...", likes: 4, score: 38, penalty: "Vague predictions without evidence, no personal stake" },
];

const REWRITTEN_POSTS: RewrittenPost[] = [
  { id: "rw-1", title: "B2B SaaS Rewrite", snippet: "I almost didn't build this feature. Here's why I'm glad I did.", score: 87, benefit: "Pattern-interrupt hook, personal tension, clear value density" },
  { id: "rw-2", title: "Leadership Rewrite", snippet: "I managed a team of 50 before I learned this one hard truth.", score: 94, benefit: "First-person authority, specific narrative, conversation trigger" },
  { id: "rw-3", title: "Founder Rewrite", snippet: "I lost $40K before I figured out what actually matters.", score: 92, benefit: "Vulnerability hook, data-driven story, high saveability" },
  { id: "rw-4", title: "Product Rewrite", snippet: "I spent 6 months building something my customers didn't want.", score: 89, benefit: "Anti-marketing hook, learning narrative, engagement loop" },
  { id: "rw-5", title: "Hot Take Rewrite", snippet: "Everyone is wrong about AI in business. Here's what 200 conversations taught me.", score: 96, benefit: "Contrarian data hook, evidence-backed, opinion CTA" },
];

const carouselStyle = `
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

function OriginalCard({ draft }: { draft: OriginalDraft }) {
  return (
    <div className="shrink-0 w-[290px] sm:w-[340px] p-4 border border-destructive/20 bg-background/45 backdrop-blur-sm rounded-xl space-y-3 shadow-xl select-none">
      <div className="flex items-center justify-between border-b border-destructive/10 pb-2">
        <span className="text-[11px] font-bold text-destructive uppercase tracking-wider flex items-center gap-1.5">
          <XCircle className="w-3 h-3" /> {draft.title}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <ThumbsUp className="w-3 h-3 text-destructive" /> {draft.likes}
          </span>
          <Badge variant="outline" className="border-destructive/30 bg-destructive/5 text-destructive text-xs font-mono font-bold">
            {draft.score}/100
          </Badge>
        </div>
      </div>
      <div className="text-xs font-mono leading-relaxed text-muted-foreground/80 italic">
        "{draft.snippet}"
      </div>
      <div className="text-[10px] text-destructive/80 font-medium flex items-start gap-1.5 bg-destructive/5 border border-destructive/10 p-2.5 rounded-lg">
        <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
        <span>{draft.penalty}</span>
      </div>
    </div>
  );
}

function RewrittenCard({ post }: { post: RewrittenPost }) {
  return (
    <div className="shrink-0 w-[290px] sm:w-[340px] p-4 border border-green-500/20 bg-background/55 backdrop-blur-md rounded-xl space-y-3 shadow-xl select-none">
      <div className="flex items-center justify-between border-b border-green-500/10 pb-2">
        <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle className="w-3 h-3" /> {post.title}
        </span>
        <Badge variant="outline" className="border-green-500/30 bg-green-500/5 text-green-400 text-xs font-mono font-bold">
          {post.score}/100
        </Badge>
      </div>
      <div className="text-xs font-mono leading-relaxed text-foreground/90 italic">
        "{post.snippet}"
      </div>
      <div className="text-[10px] text-green-400/90 font-medium flex items-start gap-1.5 bg-green-500/5 border border-green-500/10 p-2.5 rounded-lg">
        <Sparkles className="w-3 h-3 shrink-0 mt-0.5 text-green-400" />
        <span>{post.benefit}</span>
      </div>
    </div>
  );
}

export function CaseStudiesSection() {
  return (
    <section className="py-20 md:py-24 border-t border-border/40 bg-card/10 overflow-hidden">
      <style>{carouselStyle}</style>
      <div className="container space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-3 px-4">
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary backdrop-blur">
            Real-World Performance Validation
          </Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            From 4 Likes to <span className="text-gradient-mint">Viral Organic Reach</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            See the exact before-and-after audit transformations that turned dead drafts into high-dwell engagement engines.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 pl-4 md:pl-8">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Original Drafts (Dumb AI & Basic Copy)
            </span>
            <Badge variant="destructive" className="text-[10px] py-0.5 px-2">Low Algorithm Delivery</Badge>
          </div>
          <div className="hidden md:block relative">
            <div className="flex gap-6" style={{ animation: "scroll-left 35s linear infinite" }}>
              {[...ORIGINAL_DRAFTS, ...ORIGINAL_DRAFTS].map((draft, i) => (
                <OriginalCard key={`${draft.id}-${i}`} draft={draft} />
              ))}
            </div>
          </div>
          <div className="md:hidden grid grid-cols-1 gap-4">
            {ORIGINAL_DRAFTS.map((draft) => (
              <OriginalCard key={draft.id} draft={draft} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 pl-4 md:pl-8">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              After AlgoCheat Rewrite
            </span>
            <Badge className="bg-green-500 hover:bg-green-500 text-[10px] py-0.5 px-2">High Algorithm Delivery</Badge>
          </div>
          <div className="hidden md:block relative">
            <div className="flex gap-6" style={{ animation: "scroll-left 35s linear infinite" }}>
              {[...REWRITTEN_POSTS, ...REWRITTEN_POSTS].map((post, i) => (
                <RewrittenCard key={`${post.id}-${i}`} post={post} />
              ))}
            </div>
          </div>
          <div className="md:hidden grid grid-cols-1 gap-4">
            {REWRITTEN_POSTS.map((post) => (
              <RewrittenCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
