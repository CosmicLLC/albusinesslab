import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { Check } from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const localFit = [
  "Healthcare and life sciences practices supporting Worcester's hospital systems and research institutions.",
  "Manufacturers and trades businesses carrying on Central Massachusetts' industrial heritage, now looking to modernize.",
  "Retail and hospitality businesses serving Worcester's large student population across its many colleges.",
  "Professional services firms — accounting, law, insurance — supporting a growing downtown business district.",
]

export default function WorcesterMa() {
  return (
    <div className="flex flex-col w-full">

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 border-b border-border bg-card/20">
        <Container>
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">
              Worcester, MA
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">
              AI Consulting for Worcester Small Businesses
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-10">
              New England's second-largest city has a small business base built on healthcare, manufacturing, and
              education — three sectors where a specific, well-scoped AI workflow can save real hours. AI Business
              Lab works with Worcester-area small businesses from our Massachusetts base.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=Worcester%20AI%20Snapshot">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* ── Who we work with ── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div {...fadeUp} className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Who we work with in Worcester
              </h2>
            </motion.div>
            <motion.div {...fadeUp} className="lg:col-span-2">
              <ul className="space-y-5">
                {localFit.map((item, i) => (
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

      {/* ── Offer summary ── */}
      <Section className="bg-muted/40 border-y border-border">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">How we typically start</h2>
            <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg max-w-none">
              <p>
                Most engagements begin with a free 30-minute AI Readiness Snapshot — a quick look at your workflows
                and a one-page report on where AI would realistically help. From there, some Worcester clients start
                with an AI Fundamentals Workshop for their team (structured to qualify for reimbursement under the
                Massachusetts Workforce Training Fund Program), others move straight to a Workflow Automation Sprint
                to automate a specific, high-friction process.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ── WTFP link ── */}
      <Section>
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-4">
              Massachusetts businesses: your workshop may be reimbursed
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Worcester-based employers are eligible for the same Workforce Training Fund Program as any
              Massachusetts small business.
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
              Let's map your business's AI opportunity.
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Book a free 30-minute AI Readiness Snapshot — no cost, no pressure, just a clear read on where AI would
              actually help.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=Worcester%20AI%20Snapshot">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
