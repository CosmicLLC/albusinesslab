import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { Check } from "lucide-react"

export default function Training() {
  return (
    <div className="flex flex-col w-full">
      <section className="pt-32 pb-24 border-b border-border bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/20 via-background to-background">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">Corporate AI Training</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              Equip your leadership and technical teams with the mental models and tactical skills required to operate in an AI-first paradigm. No fluff, just signal.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Program 1 */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border border-border flex flex-col h-full bg-card/20"
            >
              <div className="p-10 border-b border-border bg-background">
                <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">Executive Program</div>
                <h2 className="text-3xl font-medium tracking-tight mb-4">Boardroom AI Fluency</h2>
                <p className="text-muted-foreground">
                  Designed for C-suite and VPs. We strip away the technical jargon and focus on capital allocation, risk management, and competitive strategy in the age of LLMs.
                </p>
              </div>
              <div className="p-10 flex-1 flex flex-col justify-between">
                <ul className="space-y-4 mb-10">
                  {["Identifying high-ROI AI use cases", "Vendor lock-in and open-source strategies", "Navigating data privacy & regulatory compliance", "Re-architecting organizational charts for AI capabilities"].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-border">
                  <div className="flex justify-between items-center text-sm mb-6">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">1-Day Intensive or 4-Week Series</span>
                  </div>
                  <Button asChild className="w-full h-12 ">
                    <Link href="/contact?subject=Executive%20Training">Inquire for Boardroom</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Program 2 */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border border-border flex flex-col h-full bg-card/20"
            >
              <div className="p-10 border-b border-border bg-background">
                <div className="inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">Technical Program</div>
                <h2 className="text-3xl font-medium tracking-tight mb-4">Applied Engineering</h2>
                <p className="text-muted-foreground">
                  For engineering and data teams. Hands-on tactical workshops building functional RAG pipelines, deploying local models, and writing deterministic system prompts.
                </p>
              </div>
              <div className="p-10 flex-1 flex flex-col justify-between">
                <ul className="space-y-4 mb-10">
                  {["Building robust Retrieval-Augmented Generation (RAG)", "Vector database implementation and chunking strategies", "Local vs Cloud API latency/cost optimization", "Agentic orchestration using LangChain/LlamaIndex"].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-border">
                  <div className="flex justify-between items-center text-sm mb-6">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">3-Day Bootcamp or Custom Engagement</span>
                  </div>
                  <Button asChild variant="outline" className="w-full h-12  border-border">
                    <Link href="/contact?subject=Technical%20Training">Inquire for Engineering</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        </Container>
      </Section>
    </div>
  )
}
