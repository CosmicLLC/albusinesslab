import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from "wouter"
import { Check, AlertTriangle, Users, FileText, CalendarCheck, GraduationCap } from "lucide-react"
import { Seo } from "@/components/Seo"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const tracks = [
  {
    title: "Marketing & Content",
    audience: "Marketing, content, and social teams",
    description:
      "Drafting, editing, and campaign workflows built around generative AI tools — without losing brand voice or publishing something you'll regret.",
  },
  {
    title: "Customer-Facing",
    audience: "Sales, support, and front-of-house staff",
    description:
      "Using AI to draft responses, summarize calls, and speed up customer interactions while keeping a human in the loop for judgment calls.",
  },
  {
    title: "Ops & Admin",
    audience: "Operations, admin, and back-office teams",
    description:
      "Scheduling, data entry, reporting, and the paperwork-heavy tasks that eat a workweek — mapped to tools your team can actually adopt.",
  },
]

const applySteps = [
  {
    icon: Users,
    title: "Confirm eligibility",
    description:
      "Check your business is a Massachusetts employer in good standing with its Unemployment Insurance contributions — that's the baseline requirement for any Workforce Training Fund grant.",
  },
  {
    icon: FileText,
    title: "Scope the training with us",
    description:
      "We help you define the workshop track, headcount, and schedule so the application reflects a real, fundable training plan rather than a vague request.",
  },
  {
    icon: CalendarCheck,
    title: "Submit through Commonwealth Corporation",
    description:
      "The Express Program application is designed to be short and fast for smaller employers. We'll walk you through what's needed.",
  },
  {
    icon: GraduationCap,
    title: "Run the workshop, then file for reimbursement",
    description:
      "Training happens on your schedule. Once it's complete, we help you assemble the documentation the program requires to get reimbursed.",
  },
]

const faqs = [
  {
    q: "Is AI training really free for my Massachusetts business?",
    a: "Not free upfront — you pay for the workshop, then apply for reimbursement through the Massachusetts Workforce Training Fund Program (WTFP). For eligible small businesses, the Express Program is built to reimburse a meaningful share of that cost. The exact percentage and dollar caps are set by the state and do change, so we confirm current figures with you before you commit to a track.",
  },
  {
    q: "How many employees can my company have and still use the Express Program?",
    a: "The Express Program is aimed at smaller employers — historically businesses with roughly 100 or fewer Massachusetts employees have used this track, though the state periodically revisits eligibility rules. We check your specific situation against the current program rules before you apply, rather than assuming last year's thresholds still hold.",
  },
  {
    q: "What's the difference between the WTFP Express Program and the General Program?",
    a: "Express is the streamlined, faster-turnaround track built for smaller training requests and smaller employers. The General Program handles larger grant requests with a more involved application. Most of our workshop clients apply through Express because an 8-hour, role-specific AI workshop is exactly the kind of training it's designed for.",
  },
  {
    q: "Does the AI Workflow Automation Sprint qualify for WTFP reimbursement?",
    a: "No. WTFP funds instruction and skills training — that covers our Tier 1 AI Fundamentals Workshops. Our AI Workflow Automation Sprint is a hands-on implementation project (we build and configure the automations with you), which the program treats as consulting work rather than training, so it isn't WTFP-eligible. We're upfront about that distinction so you can budget correctly.",
  },
  {
    q: "How long does WTFP approval take?",
    a: "The Express Program is designed to move faster than the General Program, but processing times are set by Commonwealth Corporation and can shift with application volume. We recommend starting the application at least a few weeks before your target training date.",
  },
  {
    q: "What happens after the workshop?",
    a: "You leave with role-specific AI workflows your team actually used during the session, not just slides. If you want help going further — automating the workflows you identified, or ongoing optimization — that moves into our Workflow Automation Sprint or Fractional AI Ops Retainer, both separate from the WTFP-funded workshop itself.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
}

export default function WorkforceTrainingFundAiTraining() {
  return (
    <div className="flex flex-col w-full">
      <Seo
        title="AI Training Massachusetts | WTFP Reimbursement"
        description="Get AI training for your Massachusetts small business reimbursed through the WTFP Express track. See who qualifies and how it works."
        path="/workforce-training-fund-ai-training"
        jsonLd={faqJsonLd}
      />

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 border-b border-border bg-card/20">
        <Container>
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">
              Massachusetts Workforce Training Fund Program
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">
              Get AI Training for Your Team Reimbursed by the State
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-10">
              Massachusetts small businesses can apply for AI training reimbursement through the Workforce Training
              Fund Program (WTFP) Express track. We structure our AI Fundamentals Workshops to meet WTFP requirements
              and help you through the application.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=WTFP%20AI%20Workshop">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* ── What is WTFP ── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div {...fadeUp} className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                What is the Workforce Training Fund Program?
              </h2>
            </motion.div>
            <motion.div {...fadeUp} className="lg:col-span-2 space-y-6">
              <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg max-w-none">
                <p>
                  The Workforce Training Fund Program (WTFP) is a Massachusetts state grant program, administered by
                  Commonwealth Corporation, that helps employers pay for training their own employees. It's funded
                  through a small assessment on employer unemployment insurance contributions — money Massachusetts
                  businesses are already paying into — and it exists specifically to be claimed back as training
                  dollars.
                </p>
                <p>
                  Most business owners have never used it, and almost none have used it for AI training specifically.
                  That's the opportunity: AI skills training is exactly the kind of practical, job-relevant instruction
                  WTFP was built to fund, but very few Massachusetts AI consultants are set up to help you access it.
                </p>
                <p>
                  WTFP runs two tracks. The <strong>Express Program</strong> is the fast, simplified track built for
                  smaller employers and smaller training requests — this is the track our AI Fundamentals Workshops
                  are designed around. The <strong>General Program</strong> handles larger grant requests with a more
                  involved application process, and typically fits larger training initiatives rather than a single
                  team workshop.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── Who qualifies ── */}
      <Section className="bg-muted/40 border-y border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div {...fadeUp} className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Who qualifies</h2>
            </motion.div>
            <motion.div {...fadeUp} className="lg:col-span-2 space-y-6">
              <ul className="space-y-5">
                {[
                  "Your business operates in Massachusetts and is current on its Unemployment Insurance contributions.",
                  "You're a small-to-midsize employer — the Express Program is aimed at smaller headcounts, which covers the great majority of Massachusetts small businesses.",
                  "You're training your own current employees, not hiring or onboarding entirely new roles.",
                  "The training is instructional — this is what makes our AI Fundamentals Workshops eligible, and why our implementation-focused AI Workflow Automation Sprint is not.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 shrink-0 mt-1" />
                    <span className="text-foreground text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-3 bg-background border border-border rounded-xl p-5 mt-2">
                <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  {/* VERIFY current WTFP Express Program eligibility rules (employee count thresholds, industry
                      exclusions) at commcorp.org before publishing or quoting to a prospect. */}
                  Specific eligibility thresholds (like exact employee-count limits) are set by Commonwealth
                  Corporation and are revised periodically. We confirm current rules against{" "}
                  <a
                    href="https://commcorp.org"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline hover:text-primary"
                  >
                    commcorp.org
                  </a>{" "}
                  before every application — don't rely on figures you've seen elsewhere without checking.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── How reimbursement works ── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div {...fadeUp} className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">How reimbursement works</h2>
            </motion.div>
            <motion.div {...fadeUp} className="lg:col-span-2 space-y-6">
              <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg max-w-none">
                <p>
                  You pay for the workshop upfront, then submit for reimbursement once training is complete. WTFP
                  sets its own caps on how much of the cost is covered — both a per-person cap and, in some cases, a
                  different reimbursement percentage depending on the program track and the type of employer.
                </p>
                <p>
                  {/* VERIFY current WTFP reimbursement caps and percentages (e.g. per-year caps, per-person caps,
                      hourly rate caps, Express vs General percentage splits) at commcorp.org before publishing any
                      specific dollar figure in marketing copy. Figures below are illustrative only. */}
                  To give you a sense of scale rather than a quote: in recent years, WTFP grants have been structured
                  around figures in the range of low-five-figure annual caps per company, capped per-person amounts,
                  and reimbursement percentages that differ between the Express and General tracks. We don't publish
                  exact numbers here because they change — most recently as of an April 2026 program update — and
                  quoting a stale figure would do you more harm than good.
                </p>
              </div>
              <div className="flex items-start gap-3 bg-muted/40 border border-border rounded-xl p-5">
                <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  We'll walk through the current caps and reimbursement percentage that apply to your business on
                  your Snapshot call, sourced directly from Commonwealth Corporation at the time you apply.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── Workshop tracks ── */}
      <Section className="bg-muted/40 border-y border-border">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              AI Fundamentals Workshops built for WTFP
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each track is an 8-hour, role-specific group workshop — structured as instruction, not implementation,
              which is exactly what keeps it WTFP-eligible.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-border rounded-xl p-8 flex flex-col"
              >
                <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6 w-fit">
                  {track.audience}
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-4">{track.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{track.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── How to apply ── */}
      <Section>
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">How to apply</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applySteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 border border-border rounded-xl p-8 bg-card/20"
              >
                <step.icon className="w-7 h-7 text-primary shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium tracking-tight mb-2">
                    {i + 1}. {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Where this fits vs. our other tiers ── */}
      <Section className="bg-muted/40 border-y border-border">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Where WTFP funding fits — and where it doesn't
            </h2>
            <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg max-w-none">
              <p>
                We're upfront about this because it affects your budget: WTFP funds <strong>instruction</strong>. Our
                free AI Readiness Snapshot and AI Fundamentals Workshops are training, so they're the pieces that can
                be reimbursed. Our AI Workflow Automation Sprint — where we actually build and configure automations
                for your business — is implementation work, not instruction, so it falls outside the program. Most
                clients start with a WTFP-backed workshop to build baseline AI fluency, then use a Sprint to automate
                the specific workflows the workshop surfaced.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ── Explore by industry / location ── */}
      <Section className="bg-muted/40 border-y border-border">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-10">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Explore by industry or location</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              WTFP eligibility works the same regardless of industry or city — here's how it applies to a few we work
              with often.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Industries</h3>
              <ul className="space-y-2">
                <li><Link href="/industries/trades-home-services" className="text-foreground hover:text-primary transition-colors">Trades &amp; Home Services</Link></li>
                <li><Link href="/industries/retail" className="text-foreground hover:text-primary transition-colors">Retail</Link></li>
                <li><Link href="/industries/professional-services" className="text-foreground hover:text-primary transition-colors">Professional Services</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Locations</h3>
              <ul className="space-y-2">
                <li><Link href="/ai-consulting/boston-ma" className="text-foreground hover:text-primary transition-colors">Boston, MA</Link></li>
                <li><Link href="/ai-consulting/worcester-ma" className="text-foreground hover:text-primary transition-colors">Worcester, MA</Link></li>
                <li><Link href="/ai-consulting/quincy-ma" className="text-foreground hover:text-primary transition-colors">Quincy, MA</Link></li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── FAQ ── */}
      <Section>
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">Frequently asked questions</h2>
          </motion.div>
          <motion.div {...fadeUp} className="max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-lg py-6">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section className="border-t border-border bg-card/10">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              See if your team qualifies for reimbursed AI training.
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Book a free 30-minute AI Readiness Snapshot. We'll map your workflows, tell you which workshop track
              fits, and check your business against current WTFP requirements — no cost, no pressure.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=WTFP%20AI%20Workshop">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
