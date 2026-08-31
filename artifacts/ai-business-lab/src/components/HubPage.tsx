import { motion } from "framer-motion"
import { Link } from "wouter"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

/**
 * Shared layout for the three index/hub pages (/industries, /ai-consulting, /vs).
 *
 * These exist to give the deeper pages a real parent: without them the vertical
 * and city pages were reachable only from the footer, and BreadcrumbList markup
 * would have pointed at URLs that don't resolve.
 */

export interface HubItem {
  title: string
  description: string
  href: string
}

export function HubPage({
  eyebrow,
  title,
  lead,
  items,
  ctaHref = "/contact?subject=AI%20Readiness%20Snapshot",
}: {
  eyebrow: string
  title: string
  /** Direct answer to the page's core question. Kept short and factual. */
  lead: string
  items: HubItem[]
  ctaHref?: string
}) {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-24 border-b border-border bg-card/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">
              {eyebrow}
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">{title}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">{lead}</p>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group block h-full bg-white border border-border rounded-xl p-8 hover:border-primary/50 transition-colors"
                >
                  <h2 className="text-2xl font-medium tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-card/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Not sure where your business fits?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Book a free 30-minute AI Readiness Snapshot. We'll map your workflows and tell you honestly what's
              worth automating — and what isn't.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href={ctaHref}>Book a Free AI Readiness Snapshot</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
