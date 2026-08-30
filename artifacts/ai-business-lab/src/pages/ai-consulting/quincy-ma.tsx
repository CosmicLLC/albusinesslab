import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { Check } from "lucide-react"
import { Seo, SITE_URL } from "@/components/Seo"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const localFit = [
  "Healthcare practices and medical offices supporting the South Shore's hospital and specialty care network.",
  "A dense, diverse small retail and restaurant scene around Quincy Center and Hancock Street.",
  "Trades and home service businesses serving Quincy and the surrounding South Shore towns.",
  "Redevelopment-era businesses along the waterfront and downtown, many still running on manual, paper-based processes.",
]

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Consulting and Training",
  areaServed: {
    "@type": "City",
    name: "Quincy",
    address: { "@type": "PostalAddress", addressRegion: "MA", addressCountry: "US" },
  },
  provider: {
    "@type": "Organization",
    name: "AI Business Lab",
    url: SITE_URL,
  },
}

export default function QuincyMa() {
  return (
    <div className="flex flex-col w-full">
      <Seo
        title="AI Consulting for Small Businesses in Quincy, MA"
        description="AI training and workflow automation for small businesses in Quincy, MA — free readiness Snapshot, WTFP-eligible workshops, and automation sprints."
        path="/ai-consulting/quincy-ma"
        jsonLd={localBusinessJsonLd}
      />

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 border-b border-border bg-card/20">
        <Container>
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">
              Quincy, MA
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">
              AI Consulting for Quincy Small Businesses
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-10">
              Quincy's South Shore business community — healthcare, retail, restaurants, and trades — is close to our
              Massachusetts home base, and it's exactly the kind of small-business mix where a well-scoped AI
              workflow pays for itself fast.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=Quincy%20AI%20Snapshot">Book a Free AI Readiness Snapshot</Link>
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
                Who we work with in Quincy
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
                and a one-page report on where AI would realistically help. From there, some Quincy clients start
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
              Quincy-based employers are eligible for the same Workforce Training Fund Program as any Massachusetts
              small business.
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
              <Link href="/contact?subject=Quincy%20AI%20Snapshot">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
