import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

const phases = [
  {
    num: "01",
    title: "The Reconnaissance",
    duration: "Weeks 1-2",
    description: "We embed with your leadership to map operational realities, bypassing theoretical nonsense to find the exact friction points costing you margin. We audit data readiness, security posture, and organizational appetite for disruption.",
    points: ["Executive interviews", "Data topography assessment", "Feasibility scoring"]
  },
  {
    num: "02",
    title: "The Architecture Blueprint",
    duration: "Weeks 3-4",
    description: "We deliver a comprehensive, heavily-vetted technical blueprint. This isn't a slide deck; it's a structural schematic detailing model selection, vector infrastructure, API orchestration, and strict security guardrails.",
    points: ["Technology stack selection", "Cost-to-serve modeling", "Compliance mapping"]
  },
  {
    num: "03",
    title: "The Prototype Crucible",
    duration: "Weeks 5-8",
    description: "We build a functional, isolated pilot addressing your highest-ROI use case. We stress-test it against your proprietary data, actively trying to break it to expose flaws before production.",
    points: ["RAG pipeline construction", "Model fine-tuning", "Red-team security testing"]
  },
  {
    num: "04",
    title: "Enterprise Deployment",
    duration: "Weeks 9-12+",
    description: "The prototype graduates to production. We integrate the AI system securely into your core infrastructure, establishing monitoring dashboards for latency, cost, and hallucination rates.",
    points: ["CI/CD pipeline setup", "Load balancing", "Performance telemetry"]
  }
]

export default function System() {
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
            <div className="inline-flex items-center space-x-2 border border-border px-3 py-1 mb-8 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Methodology
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">The AI Transformation System</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              A proprietary, four-phase framework designed to rapidly turn institutional chaos into deployed, governable machine intelligence. Predictable. Uncompromising. Effective.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section className="bg-card/10">
        <Container>
          <div className="max-w-5xl mx-auto space-y-24">
            {phases.map((phase, i) => (
              <motion.div 
                key={phase.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative"
              >
                {/* Connecting Line */}
                {i !== phases.length - 1 && (
                  <div className="hidden md:block absolute left-[4.5rem] top-24 bottom-[-6rem] w-px bg-border"></div>
                )}
                
                <div className="md:col-span-3 flex flex-col items-start z-10">
                  <span className="text-7xl font-bold tracking-tighter text-muted/30 mb-4">{phase.num}</span>
                  <div className="border border-border px-3 py-1 text-xs uppercase tracking-widest bg-background">
                    {phase.duration}
                  </div>
                </div>
                
                <div className="md:col-span-9 pt-4">
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">{phase.title}</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    {phase.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {phase.points.map((point, j) => (
                      <div key={j} className="border-l border-primary/50 pl-4">
                        <span className="text-sm font-medium">{point}</span>
                      </div>
                    ))}
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
