import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { Check, X } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const rows = [
  {
    factor: "Upfront cost",
    inHouse: "A full salary, benefits, and payroll overhead before any workflow is automated.",
    consulting: "Start with a free Snapshot, then pay only for the workshop or sprint you actually need.",
  },
  {
    factor: "Time to first result",
    inHouse: "Weeks to hire, then a ramp-up period learning your business before delivering anything.",
    consulting: "A Snapshot in 30 minutes; a Workflow Automation Sprint delivers in 2–4 weeks.",
  },
  {
    factor: "Breadth of expertise",
    inHouse: "One person's knowledge of tools, prompts, and platforms — as current as their last course.",
    consulting: "Exposure across many small businesses' workflows, tools, and what has actually worked.",
  },
  {
    factor: "Commitment if it's not a fit",
    inHouse: "A hiring mistake is expensive and slow to unwind.",
    consulting: "Engagements are scoped in tiers — Snapshot, Workshop, Sprint, Retainer — so you can stop or scale after each one.",
  },
  {
    factor: "Ongoing maintenance",
    inHouse: "Falls entirely on that one employee, alongside their other duties.",
    consulting: "Available as a Fractional AI Ops Retainer, sized to the amount of ongoing work you actually have.",
  },
]

export default function AiConsultingVsHiringInHouse() {
  return (
    <div className="flex flex-col w-full">

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 border-b border-border bg-card/20">
        <Container>
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">
              Decision Guide
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">
              AI Consulting vs. Hiring In-House
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              For most Massachusetts small businesses, the real choice isn't "AI or no AI" — it's whether to build
              that capability in-house or bring in outside help. Here's how the two actually compare.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Intro ── */}
      <Section>
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl">
            <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg max-w-none">
              <p>
                A 15-person landscaping company or a 30-person insurance agency doesn't have the headcount to
                dedicate a full role to "AI." But they also can't ignore the efficiency gains their competitors are
                already finding. That leaves two realistic paths: hire someone (even part-time or as a new
                responsibility bolted onto an existing role) to own AI internally, or bring in an outside consultant
                for the specific workflows that need it.
              </p>
              <p>
                Neither path is universally right. The comparison below is meant to help you figure out which one
                fits your business, not to talk you out of hiring.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ── Comparison ── */}
      <Section className="bg-muted/40 border-y border-border">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Side by side</h2>
          </motion.div>
          <div className="space-y-4">
            {rows.map((row, i) => (
              <motion.div
                key={row.factor}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="border border-border rounded-xl bg-white overflow-hidden"
              >
                <div className="px-6 md:px-8 py-4 border-b border-border bg-background">
                  <h3 className="font-medium tracking-tight">{row.factor}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 md:p-8 flex gap-3 border-b md:border-b-0 md:border-r border-border">
                    <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Hiring In-House
                      </div>
                      <p className="text-muted-foreground">{row.inHouse}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                        Working With AI Business Lab
                      </div>
                      <p className="text-foreground">{row.consulting}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── When each makes sense ── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeUp} className="border border-border rounded-xl p-8 md:p-10 bg-card/20">
              <h3 className="text-2xl font-medium tracking-tight mb-4">When hiring in-house makes sense</h3>
              <p className="text-muted-foreground leading-relaxed">
                If AI-driven workflows are becoming a core, daily part of how your business operates — not a one-time
                efficiency project — and you have the budget for a full-time role, an in-house hire can build
                deeper, more specific institutional knowledge over time than any outside partner will.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="border border-border rounded-xl p-8 md:p-10 bg-card/20">
              <h3 className="text-2xl font-medium tracking-tight mb-4">When outside help makes more sense</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you need your team AI-capable now, want to test a handful of specific workflows before committing
                to a full role, or simply don't have the budget or need for a dedicated hire, a tiered engagement —
                Snapshot, Workshop, Sprint, or Retainer — gets you there without the fixed overhead.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── Internal link: WTFP ── */}
      <Section className="bg-muted/40 border-y border-border">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-4">
              Massachusetts businesses: your workshop may be reimbursable
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our AI Fundamentals Workshops are structured to qualify for reimbursement under the Massachusetts
              Workforce Training Fund Program — a detail that doesn't apply to hiring in-house at all.
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
              Not sure which path fits your business?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Book a free 30-minute AI Readiness Snapshot. We'll give you a straight answer on whether you need a
              hire, a workshop, a sprint, or nothing at all yet.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=AI%20Readiness%20Snapshot">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
