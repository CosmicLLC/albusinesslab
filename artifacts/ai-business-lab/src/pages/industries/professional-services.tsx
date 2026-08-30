import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { Check, FileSearch, Mail, NotebookPen, Clock } from "lucide-react"
import { Seo, SITE_URL } from "@/components/Seo"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const painPoints = [
  {
    icon: Clock,
    title: "Billable time lost to admin",
    description:
      "Intake, scheduling, and status updates compete directly with the work that actually generates revenue.",
  },
  {
    icon: FileSearch,
    title: "Research and review take too long",
    description:
      "Summarizing a document, a case file, or a client's history eats hours that could go toward the actual advice.",
  },
  {
    icon: Mail,
    title: "Client communication never stops",
    description:
      "Routine status updates and follow-ups are necessary, but they shouldn't require a fresh email from scratch every time.",
  },
  {
    icon: NotebookPen,
    title: "First drafts start from a blank page",
    description:
      "Proposals, reports, and client letters often begin the same way each time, but nobody's built a shortcut for it.",
  },
]

const workflows = [
  "Drafting a first-pass summary of a long document or case file for a staff member to review and refine.",
  "An intake workflow that captures new client details and gets them onto the right person's calendar automatically.",
  "Generating a first draft of a routine client update or report from your notes, ready for a final human pass.",
  "Meeting and call summaries with action items pulled out automatically, instead of someone typing notes after the fact.",
]

const industryJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Workflow Automation for Professional Services Firms",
  areaServed: "Massachusetts",
  provider: {
    "@type": "Organization",
    name: "AI Business Lab",
    url: SITE_URL,
  },
}

export default function ProfessionalServices() {
  return (
    <div className="flex flex-col w-full">
      <Seo
        title="AI for Professional Services Firms in Massachusetts"
        description="AI workflow automation for Massachusetts professional services firms — reclaiming billable hours lost to admin work."
        path="/industries/professional-services"
        jsonLd={industryJsonLd}
      />

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 border-b border-border bg-card/20">
        <Container>
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">
              Professional Services
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">
              AI for Professional Services Firms
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-10">
              Law firms, accounting practices, financial advisors, and insurance agencies bill by the hour — and
              every hour spent on intake, drafting, or status updates is an hour not spent on the work clients
              actually pay for.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=Professional%20Services%20AI%20Snapshot">
                Book a Free AI Readiness Snapshot
              </Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* ── Pain points ── */}
      <Section>
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">Where billable hours leak out</h2>
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
                Illustrative, not a fixed package — every firm's workflow and compliance requirements differ, which is
                exactly what a Snapshot call is for.
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
              Build AI fluency across the firm — reimbursed
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              An AI Fundamentals Workshop for your client-facing or administrative staff is structured to qualify for
              reimbursement under the Massachusetts Workforce Training Fund Program.
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
              See where your firm could reclaim billable time.
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Book a free 30-minute AI Readiness Snapshot. We'll map where admin work is crowding out billable work
              and what's realistic to automate first.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=Professional%20Services%20AI%20Snapshot">
                Book a Free AI Readiness Snapshot
              </Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
