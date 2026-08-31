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
    factor: "What you're buying",
    vendor: "A pre-built tool your team has to learn and adapt its workflow around.",
    agency: "Automations built around the workflow you already have — Zapier, Make, n8n, or a custom GPT/Claude project mapped to your process.",
  },
  {
    factor: "Setup",
    vendor: "Self-serve onboarding, templates, and documentation you configure yourself.",
    agency: "A fixed-scope Workflow Automation Sprint — we map your highest-friction workflow and build the automation for it.",
  },
  {
    factor: "Fit to your process",
    vendor: "Generic, built for the widest possible customer base — you bend to fit it.",
    agency: "Specific to how your business actually operates, including the exceptions and edge cases a generic tool won't handle.",
  },
  {
    factor: "Ongoing cost",
    vendor: "Recurring per-seat subscription, regardless of how much you actually use it.",
    agency: "A defined sprint cost, with optional ongoing support through a Fractional AI Ops Retainer only if you want it.",
  },
  {
    factor: "Who maintains it",
    vendor: "You — when the tool changes its UI or pricing, that's your team's problem to solve.",
    agency: "Us, if you're on a Retainer; otherwise you own a documented, working automation with no vendor lock-in to a single SaaS platform.",
  },
]

export default function AiAutomationAgencyVsSoftwareVendor() {
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
              AI Automation Agency vs. Software Vendor
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              Another SaaS subscription promises to automate your workflow out of the box. An automation agency builds
              the automation around the workflow you already have. They solve different problems.
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
                It's easy to assume the fastest fix for a manual, repetitive workflow is to buy a tool built for
                exactly that job. Sometimes it is. But most small businesses have at least one workflow that's just
                specific enough — a quoting process, an intake form, a follow-up sequence with a few conditional
                branches — that no off-the-shelf tool fits cleanly without real configuration work.
              </p>
              <p>
                That's the gap an automation agency fills: instead of adapting your process to a tool, we build the
                automation around your process, using the same underlying platforms (Zapier, Make, n8n) plus custom
                GPT or Claude projects where a generic integration isn't enough.
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
                        Software Vendor
                      </div>
                      <p className="text-muted-foreground">{row.vendor}</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                        AI Business Lab (Workflow Automation Sprint)
                      </div>
                      <p className="text-foreground">{row.agency}</p>
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
              <h3 className="text-2xl font-medium tracking-tight mb-4">When a software vendor is the right call</h3>
              <p className="text-muted-foreground leading-relaxed">
                If your workflow is genuinely standard — invoicing, basic scheduling, generic email marketing — a
                mature SaaS tool built for exactly that job will almost always be cheaper and faster than a custom
                build. Don't pay an agency to reinvent a solved problem.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="border border-border rounded-xl p-8 md:p-10 bg-card/20">
              <h3 className="text-2xl font-medium tracking-tight mb-4">When an automation agency is the right call</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you've already tried a few tools and keep hitting the same wall — the workflow has a branch, an
                exception, or a data source the tool can't touch — that's the signal a fixed-scope Sprint mapped to
                your actual process will get you further than another subscription will.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section className="border-t border-border bg-card/10">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Not sure if your workflow needs a tool or a build?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Book a free 30-minute AI Readiness Snapshot. We'll tell you honestly whether an off-the-shelf tool
              solves it, or whether it's worth a Workflow Automation Sprint.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=Workflow%20Automation%20Sprint">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
