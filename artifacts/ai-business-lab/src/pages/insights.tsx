import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ArrowRight } from "lucide-react"

const articles = [
  {
    category: "Architecture",
    date: "OCT 12, 2023",
    title: "Why Vector Databases Are the New Operational Imperative",
    summary: "Relational databases cannot capture semantic meaning. Understanding why unstructured data requires new infrastructure.",
    readTime: "6 min read"
  },
  {
    category: "Strategy",
    date: "OCT 05, 2023",
    title: "The Hallucination Problem: Mitigation Strategies for the Enterprise",
    summary: "LLMs are probabilistic engines, not truth machines. How to build deterministic guardrails around probabilistic models.",
    readTime: "8 min read"
  },
  {
    category: "Governance",
    date: "SEP 28, 2023",
    title: "Building the AI Steering Committee",
    summary: "Who needs to be in the room when deploying generative AI? A breakdown of the cross-functional roles required for safe deployment.",
    readTime: "5 min read"
  },
  {
    category: "Case Study",
    date: "SEP 15, 2023",
    title: "RAG in Financial Services: Automating Compliance Audits",
    summary: "How we implemented a bespoke retrieval system capable of parsing 10,000+ pages of regulatory text with 99.8% precision.",
    readTime: "12 min read"
  },
  {
    category: "Architecture",
    date: "SEP 02, 2023",
    title: "Local vs API: Cost-Benefit Analysis for Enterprise Models",
    summary: "When to use OpenAI/Anthropic APIs, and when the latency, cost, and security demands dictate a locally-hosted open-source model.",
    readTime: "9 min read"
  },
  {
    category: "Opinion",
    date: "AUG 20, 2023",
    title: "The Disappearance of the Junior Developer",
    summary: "How code-generation tools are fundamentally restructuring engineering teams and the new baseline for technical competence.",
    readTime: "7 min read"
  }
]

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
              Unvarnished analysis, technical breakdowns, and strategic opinions. High signal, zero noise.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section className="bg-card/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group border border-border bg-background flex flex-col cursor-pointer hover:border-primary/50 transition-colors"
              >
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-semibold tracking-wider uppercase text-primary">{article.category}</span>
                    <span className="text-xs text-muted-foreground font-mono">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-medium tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                    {article.summary}
                  </p>
                  <div className="flex justify-between items-center text-xs border-t border-border pt-6 mt-auto">
                    <span className="text-muted-foreground">{article.readTime}</span>
                    <div className="flex items-center text-foreground group-hover:text-primary transition-colors">
                      <span className="font-medium mr-2">Read</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
