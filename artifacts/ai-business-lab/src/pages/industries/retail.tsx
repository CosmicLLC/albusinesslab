import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { Check, PackageSearch, MessagesSquare, Megaphone, RotateCcw } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const painPoints = [
  {
    icon: PackageSearch,
    title: "Reordering is a gut call",
    description:
      "Without time to dig through sales history, restocking often comes down to a guess — and guesses tie up cash in the wrong inventory.",
  },
  {
    icon: MessagesSquare,
    title: "Customer messages pile up",
    description:
      "DMs, emails, and chat questions about hours, sizing, or order status compete with everything else on a small team's plate.",
  },
  {
    icon: Megaphone,
    title: "Marketing is always behind",
    description:
      "Social posts, email promos, and product descriptions are the first thing to slip when the store gets busy.",
  },
  {
    icon: RotateCcw,
    title: "Returns and support eat staff time",
    description:
      "Every return, exchange, or order question pulls someone away from customers actually in the store.",
  },
]

const workflows = [
  "Flagging which SKUs are trending toward a stockout before you're actually out, based on recent sell-through.",
  "Drafting product descriptions, social captions, and email promos in your brand voice, ready for a quick review.",
  "An AI-assisted first response for common customer questions (hours, order status, sizing), with a human for anything nuanced.",
  "Turning a week's worth of sales and return data into a plain-English summary instead of a spreadsheet nobody has time to read.",
]

export default function Retail() {
  return (
    <div className="flex flex-col w-full">

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 border-b border-border bg-card/20">
        <Container>
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">
              Retail
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">
              AI for Retail Small Businesses
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-10">
              Independent shops and small retail chains don't have a merchandising team or a marketing department —
              they have an owner and a few employees juggling both. AI Business Lab helps Massachusetts retailers
              claw back that time.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=Retail%20AI%20Snapshot">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* ── Pain points ── */}
      <Section>
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">The daily juggle</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-border rounded-xl p-8"
              >
                <p.icon className="w-7 h-7 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="text-xl font-medium tracking-tight mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Workflows ── */}
      <Section className="bg-muted/40 border-y border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div {...fadeUp} className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                What a Workflow Automation Sprint might cover
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This is illustrative, not a fixed package — your Snapshot call tells us which workflows actually fit
                how your store runs.
              </p>
            </motion.div>
            <motion.div {...fadeUp} className="lg:col-span-2">
              <ul className="space-y-5">
                {workflows.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 shrink-0 mt-1" />
                    <span className="text-foreground text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── WTFP link ── */}
      <Section>
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-4">
              Get your team comfortable with AI first — reimbursed
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              An AI Fundamentals Workshop for your Marketing/Content or Customer-Facing staff is structured to
              qualify for reimbursement under the Massachusetts Workforce Training Fund Program.
            </p>
            <Button asChild variant="outline" className="h-12 px-6 rounded-xl border-border">
              <Link href="/workforce-training-fund-ai-training">See how WTFP reimbursement works →</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section className="border-t border-border bg-card/10">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Find out where AI actually saves you time.
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Book a free 30-minute AI Readiness Snapshot. We'll look at your busiest, most repetitive tasks and tell
              you honestly what's worth automating.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=Retail%20AI%20Snapshot">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
