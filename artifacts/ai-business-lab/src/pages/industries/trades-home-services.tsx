import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { Check, PhoneMissed, FileClock, ClipboardList, Star } from "lucide-react"
import { Seo, SITE_URL } from "@/components/Seo"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const painPoints = [
  {
    icon: PhoneMissed,
    title: "Missed calls, missed jobs",
    description:
      "Every call that goes to voicemail while you're mid-job is a lead that's probably calling the next name on the list.",
  },
  {
    icon: FileClock,
    title: "Quotes take too long to go out",
    description:
      "The longer an estimate sits half-written, the more likely the customer's already booked someone else.",
  },
  {
    icon: ClipboardList,
    title: "Paperwork eats the evening",
    description:
      "Invoices, service reports, and follow-ups pile up after the truck's already back in the driveway.",
  },
  {
    icon: Star,
    title: "Reviews only happen by accident",
    description:
      "Happy customers rarely leave a review unless someone asks them at exactly the right moment.",
  },
]

const workflows = [
  "Drafting a same-day quote from a photo and a few notes, so it goes out before the customer calls the next contractor.",
  "An AI-assisted intake flow that captures job details after-hours and gets them onto tomorrow's schedule automatically.",
  "Auto-generating service reports and invoices from a technician's voice notes instead of a clipboard.",
  "A review-request sequence that fires right after a job is marked complete, while the experience is still fresh.",
]

const industryJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Workflow Automation for Trades & Home Services",
  areaServed: "Massachusetts",
  provider: {
    "@type": "Organization",
    name: "AI Business Lab",
    url: SITE_URL,
  },
}

export default function TradesHomeServices() {
  return (
    <div className="flex flex-col w-full">
      <Seo
        title="AI for Trades & Home Service Businesses in MA"
        description="AI workflow automation for Massachusetts trades and home service businesses — faster quotes, fewer missed calls, less paperwork after hours."
        path="/industries/trades-home-services"
        jsonLd={industryJsonLd}
      />

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 border-b border-border bg-card/20">
        <Container>
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">
              Trades &amp; Home Services
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">
              AI for Trades &amp; Home Service Businesses
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-10">
              Plumbers, electricians, HVAC techs, landscapers, and contractors lose more jobs to slow follow-up than
              to the competition down the street. AI Business Lab helps Massachusetts trades businesses close that
              gap.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=Trades%20AI%20Snapshot">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* ── Pain points ── */}
      <Section>
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">Where the hours actually go</h2>
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
                Every business is different, so this is illustrative — your Snapshot call tells us which of these,
                if any, actually applies to how you work today.
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
              Train your crew, and let Massachusetts help pay for it
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Before automating anything, an AI Fundamentals Workshop gets your office staff and field team
              comfortable with the tools — and it's structured to qualify for reimbursement under the Massachusetts
              Workforce Training Fund Program.
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
              See what's actually worth automating first.
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Book a free 30-minute AI Readiness Snapshot. We'll look at how jobs move through your business today
              and tell you where AI would save the most time.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=Trades%20AI%20Snapshot">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
