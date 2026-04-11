import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Check } from "lucide-react"

export default function About() {
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
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">About the Firm</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              We operate at the intersection of executive strategy and deep technical engineering. We exist to help serious organizations build formidable AI capabilities.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-medium tracking-tight border-b border-border pb-4">Our Philosophy</h2>
              <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg max-w-none">
                <p>
                  Most "AI Consulting" firms today are legacy management consultants hastily repurposing buzzwords, or academic researchers who have never carried a P&L responsibility.
                </p>
                <p>
                  AI Business Lab was founded on a different premise. We believe that artificial intelligence is a fundamentally disruptive operational lever, and it requires a new type of partner—one that understands board-level capital allocation just as well as vector database optimization.
                </p>
                <p>
                  We do not build toys. We do not write abstract strategy decks that sit in a drawer. We engineer robust, secure, and highly-leveraged intelligence systems that integrate directly into the arteries of enterprise organizations.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-medium tracking-tight border-b border-border pb-4">Our Core Tenets</h2>
              <ul className="space-y-6">
                {[
                  {
                    title: "Signal Over Noise",
                    desc: "The AI space is flooded with hype. We ruthlessly filter out the distractions to focus solely on what drives measurable business value."
                  },
                  {
                    title: "Security is Foundational",
                    desc: "We operate under zero-trust principles. Enterprise data must remain sovereign and isolated. Security is never an afterthought."
                  },
                  {
                    title: "Pragmatism Over Purity",
                    desc: "We favor robust, dependable architectures over experimental state-of-the-art models if the latter compromises stability."
                  },
                  {
                    title: "Radical Candor",
                    desc: "We will tell you if a use case is foolish. We decline engagements where AI provides no distinct advantage."
                  }
                ].map((tenet, i) => (
                  <li key={i} className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <Check className="w-4 h-4 text-primary mr-3" />
                      <h3 className="text-lg font-medium">{tenet.title}</h3>
                    </div>
                    <p className="text-muted-foreground pl-7">{tenet.desc}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </Section>
      
      <Section className="border-t border-border bg-card/10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">Headquartered in precision.</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Our team consists of former Big Tech machine learning engineers, enterprise software architects, and seasoned operators. We deploy globally for clients ready to move decisively.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  )
}
