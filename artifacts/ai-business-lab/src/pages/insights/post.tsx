import { motion } from "framer-motion"
import { Link, useRoute } from "wouter"
import { ArrowLeft, Check } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { getPost, AUTHOR, AUTHOR_ROLE } from "@/content/posts"
import NotFound from "@/pages/not-found"

/**
 * Renders any post from src/content/posts.ts. One dynamic route serves all of
 * them; the prerenderer walks the SEO registry and emits a static file per
 * slug, so each still ships as its own crawlable HTML document.
 */
export default function InsightsPost() {
  const [, params] = useRoute("/insights/:slug")
  const post = params?.slug ? getPost(params.slug) : undefined

  if (!post) return <NotFound />

  const reviewed = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-16 border-b border-border bg-card/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              href="/insights"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              AI School
            </Link>
            <div className="flex items-center gap-3 mb-6 text-xs font-semibold uppercase tracking-wider">
              <span className="text-primary">{post.category}</span>
              <span className="text-muted-foreground font-normal normal-case">{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8">{post.heading}</h1>

            {/* Direct answer first — before any narrative build-up. */}
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">{post.lead}</p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-10 pt-6 border-t border-border text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{AUTHOR}</span>
              <span>·</span>
              <span>{AUTHOR_ROLE}</span>
              <span>·</span>
              <span>
                Last reviewed <time dateTime={post.date}>{reviewed}</time>
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-3xl space-y-12">
            {post.sections.map((s) => (
              <motion.div
                key={s.h}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-5">{s.h}</h2>
                {s.p?.map((para, i) => (
                  <p key={i} className="text-lg text-muted-foreground leading-relaxed mb-5">
                    {para}
                  </p>
                ))}
                {s.list && (
                  <ul className="space-y-4 mt-2">
                    {s.list.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-3 shrink-0 mt-1" />
                        <span className="text-foreground text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40 border-y border-border">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5">Related</h2>
            <div className="flex flex-wrap gap-3">
              {post.related.map((r) => (
                <Button key={r.href} asChild variant="outline" className="h-12 px-6 rounded-xl border-border">
                  <Link href={r.href}>{r.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-card/10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Want this mapped to your business?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Book a free 30-minute AI Readiness Snapshot. We'll look at how work actually moves through your
              business and tell you what's worth automating — and what isn't.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl">
              <Link href="/contact?subject=AI%20Readiness%20Snapshot">Book a Free AI Readiness Snapshot</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
