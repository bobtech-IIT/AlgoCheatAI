import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const cols = [
  { name: "Zero CAC", price: "$9/mo", us: true },
  { name: "Taplio", price: "$65/mo" },
  { name: "AuthoredUp", price: "$25/mo" },
  { name: "Ghostwriter", price: "$4k/mo" },
  { name: "DIY", price: "Free" },
];

const rows: { feature: string; values: (boolean | string)[] }[] = [
  { feature: "2026 algorithm-aware audit", values: [true, false, "Partial", true, false] },
  { feature: "10/10 generator (any topic)", values: [true, true, false, true, false] },
  { feature: "Free unlimited AI calls", values: [true, false, false, false, false] },
  { feature: "Text / Image / Article rubrics", values: [true, false, false, true, false] },
  { feature: "Built for solo operators", values: [true, false, true, false, true] },
  { feature: "No login required to try", values: [true, false, false, false, true] },
];

function Cell({ v, us }: { v: boolean | string; us?: boolean }) {
  if (v === true) return <Check className={`w-5 h-5 mx-auto ${us ? "text-primary" : "text-muted-foreground"}`} />;
  if (v === false) return <X className="w-5 h-5 mx-auto text-muted-foreground/50" />;
  return <span className="text-xs text-muted-foreground">{v}</span>;
}

export function ComparisonTable() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Compare</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            One tool. <span className="text-gradient-mint">A fraction of the cost.</span>
          </h2>
        </div>

        <Card className="max-w-6xl mx-auto p-2 md:p-4 bg-card/40 border-border/60 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left p-4 font-medium text-muted-foreground">Feature</th>
                {cols.map((c) => (
                  <th
                    key={c.name}
                    className={`p-4 text-center ${c.us ? "bg-primary/10 rounded-t-lg" : ""}`}
                  >
                    <div className={`font-display font-semibold ${c.us ? "text-primary" : "text-foreground"}`}>{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{c.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature} className="border-b border-border/30 last:border-0">
                  <td className="p-4 text-foreground/90">{r.feature}</td>
                  {r.values.map((v, i) => (
                    <td key={i} className={`p-4 text-center ${cols[i].us ? "bg-primary/5" : ""}`}>
                      <Cell v={v} us={cols[i].us} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </section>
  );
}
