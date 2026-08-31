import { motion } from "framer-motion"
import { Link } from "wouter"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { POSTS } from "@/content/posts"

/**
 * Article index.
 *
 * Previously rendered six placeholder cards that linked nowhere, one of which
 * described a client "Case Study" with a specific invented result. Now driven
 * by src/content/posts.ts, so every card corresponds to a real post that
 * actually exists at the URL it points to.
 */
export default function Insights() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-24 border-b border-border">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">AI School</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              Practical guides for Massachusetts small businesses working out where AI fits — how to get training
              reimbursed by the state, what to automate first, which tools are worth paying for, and what any of it
              should cost.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section className="bg-card/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/insights/${post.slug}`}
                  className="group border border-border bg-background flex flex-col h-full hover:border-primary/50 transition-colors"
                >
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                        {post.category}
                      </span>
                      <time dateTime={post.date} className="text-xs text-muted-foreground font-mono">
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </time>
                    </div>
                    <h2 className="text-xl font-medium tracking-tight mb-4 group-hover:text-primary transition-colors">
                      {post.heading}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">{post.description}</p>
                    <div className="flex justify-between items-center text-xs border-t border-border pt-6 mt-auto">
                      <span className="text-muted-foreground">{post.readTime}</span>
                      <span className="flex items-center text-foreground group-hover:text-primary transition-colors">
                        <span className="font-medium mr-2">Read</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
