import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ArrowRight, Check, X, ChevronDown, Brain, Users, TrendingUp, Clock } from "lucide-react"
import { Link } from "wouter"
import { useState } from "react"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" }
}

const faqs = [
  {
    q: "What is the AI Transformation System and how does it work?",
    a: "The AI Transformation System is a productized operating system that AI Business Lab installs inside your company. It includes a structured monthly cadence, a 90-day roadmap, transformation tracking, team training, and hands-on implementation — all designed to make your organization AI-native. The system runs every month with a clear cadence: Executive Alignment, Department Activation, Implementation Sprint, and Training & Reporting."
  },
  {
    q: "How do your live corporate training programs work?",
    a: "Our live training programs are hands-on sessions where teams build real AI tools during the training itself — because capability comes from creation, not consumption. We customize content by department — Sales, HR, Marketing, Operations, Leadership — ensuring immediate workplace application. Participants leave with solutions they've created and the skills to keep building."
  },
  {
    q: "What does an AI assessment and readiness audit include?",
    a: "Our enterprise assessment identifies who is prepared — and who is not — across your entire workforce, mapping AI readiness by department and role. The program includes enterprise-grade analysis, findings reports, and a prioritized action plan. You get a clear picture of where your organization stands with actionable insights to build capability."
  },
  {
    q: "How quickly can we see results from your enterprise AI programs?",
    a: "Most companies see transformation within weeks, not months. Our live training sessions produce immediate results — teams build real tools during training and implement them the same day. The AI Transformation System delivers a structured 90-day roadmap from day one, with the first workflow transformations and measurable efficiency gains within 30–60 days."
  }
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="flex flex-col w-full">

      {/* ── Hero ── */}
      {/* -mt-20 pulls the dark hero up under the fixed navbar to eliminate
          the white gap that Layout's main pt-20 would otherwise create. */}
      <section
        className="relative overflow-hidden bg-[#070E1C] -mt-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-bg.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        {/* Deep blue radial glow — mirrors genaipi's center glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#1E3A8A]/30 blur-[120px]" />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/3 w-[600px] h-[400px] rounded-full bg-[#3B82F6]/10 blur-[100px]" />
        </div>

        <Container className="relative z-10 pt-28 pb-12 md:pt-36 md:pb-20">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
            >
              Add an Autonomous AI{" "}
              <span className="text-[#3B82F6]">Workforce to Your Team in 48 Hours</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-lg leading-relaxed max-w-2xl mb-10"
            >
              No-risk assessment. If we can't find a 20%+ efficiency gain, we won't take you on as a client.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="h-[54px] px-9 text-[17px] font-semibold bg-[#3B82F6] hover:bg-[#2563EB] text-white border-0"
              >
                <Link href="/contact">
                  Get Your Transformation Plan
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Tools We Automate */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Tools We Automate</p>
              <div className="flex items-center gap-6">
                <img
                  src="/openai.svg"
                  alt="OpenAI"
                  className="h-8 object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  title="OpenAI"
                />
                <img
                  src="/anthropic.svg"
                  alt="Anthropic"
                  className="h-8 object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  title="Anthropic"
                />
                <img
                  src="/zapier.svg"
                  alt="Zapier"
                  className="h-8 object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  title="Zapier"
                />
                <img
                  src="/make.svg"
                  alt="Make"
                  className="h-8 object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  title="Make"
                />
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* ── Founder Intro ── */}
      <section className="border-b border-border bg-white py-16 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
            <img
              src="/james.png"
              alt="James Greulich, founder of AI Business Lab"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover flex-shrink-0 border border-border shadow-md"
            />
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Founder
              </p>
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                Hi, I'm <span className="font-semibold">James Greulich</span>. I spent years in operations — opening and scaling my own businesses — and the past four years getting deep on AI. I started AI Business Lab because most companies are paying for AI tools their employees never actually use. We fix that.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Impact Metrics ── */}
      <Section className="border-b border-border">
        <Container>
          <motion.div {...fadeUp}>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Impact Metrics</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-14">
              The AI Proficiency Gap: Research-Backed Impact Metrics
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { stat: "92%", label: "Unprepared for AI", icon: Brain },
              { stat: "68%", label: "Productivity Gain with AI", icon: TrendingUp },
              { stat: "62%", label: "Skills Gap Reduction", icon: Users },
              { stat: "2 Days", label: "Average Time to Value", icon: Clock },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-start p-6 border border-border rounded-lg bg-white hover:shadow-md transition-shadow"
              >
                <item.icon className="w-6 h-6 text-primary mb-4" />
                <span className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">{item.stat}</span>
                <span className="text-sm text-muted-foreground font-medium leading-snug">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Transformation Before/After ── */}
      <Section className="border-b border-border bg-muted/30">
        <Container>
          <motion.div {...fadeUp} className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Transformation Outcomes</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              What AI Transformation Actually Looks Like
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              The AI Transformation System doesn't just add tools — it fundamentally changes how your organization operates.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-border rounded-lg p-8"
            >
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </span>
                Before: The Busy Work Trap
              </h3>
              <ul className="space-y-4">
                {[
                  "Teams buried in repetitive, robotic tasks",
                  "Hours lost to manual data entry, reporting, and admin",
                  "Talented people doing work a machine should handle",
                  "No clear AI strategy — scattered tool adoption",
                  "Rising costs with flat productivity",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-primary text-primary-foreground rounded-lg p-8"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </span>
                After: Humans Elevated
              </h3>
              <ul className="space-y-4">
                {[
                  "Automation handles the repetitive, robotic tasks",
                  "Hours reclaimed for strategy, creation, and judgment",
                  "People doing the work only humans can do",
                  "Structured AI infrastructure running every month",
                  "Revenue increases, costs decrease, teams thrive",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-primary-foreground/90">
                    <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ── Testimonial ── */}
      <Section className="border-b border-border">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-8">CEO Testimonial</p>
            <blockquote className="text-xl md:text-2xl font-light text-foreground leading-relaxed mb-8 italic">
              "I invested in an engagement with AI Business Lab for our executive team. Best decision in a long time. This is the first time I was genuinely excited about what we can do for our business. Having implemented many changes, we are a completely different company."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                B
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Brad Parker</p>
                <p className="text-sm text-muted-foreground">CEO, Enterprise Corp</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ── AI Transformation System ── */}
      <Section className="border-b border-border bg-muted/30">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">AI Transformation System</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              We Install and Run Your<br className="hidden md:block" /> AI Transformation System
            </h2>
            <p className="text-muted-foreground text-lg">
              Your company either builds internal AI capability or gets left behind. We install a structured operating system with a monthly cadence, 90-day roadmap, and ongoing transformation tracking.
            </p>
          </motion.div>

          {/* 4-Week Cadence */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            {[
              { week: "Week 1", title: "Executive Alignment", desc: "C-suite briefing, priority mapping, and 90-day roadmap kickoff." },
              { week: "Week 2", title: "Department Activation", desc: "Department-by-department AI workflow identification and scoping." },
              { week: "Week 3", title: "Implementation Sprint", desc: "Hands-on building — real AI tools deployed across priority teams." },
              { week: "Week 4", title: "Training & Reporting", desc: "Team training, adoption tracking, and next-cycle planning." },
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white border border-border rounded-lg p-6 flex flex-col"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3">{phase.week}</span>
                <h4 className="text-base font-bold text-foreground mb-2">{phase.title}</h4>
                <p className="text-sm text-muted-foreground flex-1">{phase.desc}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground italic mb-6">
            Your permanent AI infrastructure — evolving with you as AI advances
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
              <Link href="/system">See If It's Right For You <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Training ── */}
      <Section className="border-b border-border">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Individual Professional Development</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Live AI Courses for Career Advancement
            </h2>
            <p className="text-muted-foreground text-lg">
              Start your AI journey with live, instructor-led courses. Perfect for professionals who want to build practical AI skills and advance their careers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Live Interactive Learning", desc: "Join live sessions where you build real AI tools alongside expert instructors and fellow professionals." },
              { title: "Role-Specific Training", desc: "Courses tailored for Sales, HR, Marketing, Operations, and Leadership roles with practical workplace applications." },
              { title: "Industry-Recognized Certification", desc: "Earn credentials that prove your AI proficiency to current and potential employers." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border border-border rounded-lg p-7 bg-white hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-start">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/training">Explore Live Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border">
              <Link href="/contact">Book a Free Assessment</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── CTA Banner ── */}
      <section className="bg-foreground text-background py-20 md:py-28">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">The Time to Act Is Now</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Build the Capability Your Organization Needs
            </h2>
            <p className="text-lg text-background/70 mb-10 max-w-2xl mx-auto font-light">
              AI will handle the drudgery and repetitive work. The question is whether your people are prepared to move upward — toward greater critical thinking, purposeful creation, and higher-order contribution.
            </p>
            <Button asChild size="lg" className="h-12 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">Schedule a Strategy Call</Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <Section className="border-t border-border">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">FAQ</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="max-w-3xl space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-muted/40 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed text-sm border-t border-border bg-muted/20">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

    </div>
  )
}
