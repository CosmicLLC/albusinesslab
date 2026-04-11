import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ServerCog, Workflow, Lightbulb, Network, Database, ShieldCheck } from "lucide-react"

const services = [
  {
    icon: Lightbulb,
    title: "AI Strategy Formulation",
    id: "strategy",
    description: "We don't do theoretical research. We perform rapid, pragmatic assessments of your operational landscape to identify where AI drives immediate, measurable P&L impact.",
    deliverables: ["Opportunity Mapping", "Risk Assessment Framework", "Vendor/Model Selection Matrix", "ROI Projections"]
  },
  {
    icon: Workflow,
    title: "Custom LLM & RAG Architectures",
    id: "implementation",
    description: "Off-the-shelf models hallucinate. We build highly precise Retrieval-Augmented Generation (RAG) systems that ground powerful AI models strictly in your proprietary institutional knowledge.",
    deliverables: ["Private LLM Deployment", "Knowledge Graph Construction", "Semantic Search Infrastructure", "Guardrail Engineering"]
  },
  {
    icon: Database,
    title: "Data Readiness Infrastructure",
    id: "data",
    description: "AI is only as intelligent as the data feeding it. We overhaul legacy data silos into modern, vector-ready architectures designed specifically for machine learning consumption.",
    deliverables: ["Data Pipeline Modernization", "Vector Database Implementation", "Unstructured Data Processing", "Continuous ETL"]
  },
  {
    icon: Network,
    title: "Autonomous Agent Development",
    id: "agents",
    description: "Move beyond simple chat interfaces. We engineer autonomous agents capable of executing complex, multi-step business workflows—from supply chain optimization to customer resolution.",
    deliverables: ["Agentic Framework Design", "Tool/API Integration", "Human-in-the-loop Workflows", "Agent Monitoring Dashboards"]
  },
  {
    icon: ServerCog,
    title: "Legacy Systems Integration",
    id: "integration",
    description: "AI cannot exist in a vacuum. We seamlessly weave intelligent capabilities directly into your existing ERP, CRM, and bespoke internal tooling without disrupting core operations.",
    deliverables: ["API Layer Development", "Middleware Construction", "Performance Load Testing", "System Redundancy"]
  },
  {
    icon: ShieldCheck,
    title: "AI Governance & Security",
    id: "security",
    description: "Enterprise AI requires enterprise security. We implement robust, compliant guardrails to prevent data leakage, model drift, and security vulnerabilities.",
    deliverables: ["Red Teaming", "Bias Auditing", "Compliance Mapping", "Zero-Trust Architecture"]
  }
]

export default function Services() {
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
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">Consulting Services</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              End-to-end capabilities spanning strategic discovery, custom engineering, and secure deployment. We build intelligence infrastructure for the modern enterprise.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section className="bg-muted/40">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div 
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-border rounded-xl p-8 md:p-10"
              >
                <service.icon className="w-8 h-8 text-primary mb-8" strokeWidth={1.5} />
                <h2 className="text-3xl font-medium tracking-tight mb-6">{service.title}</h2>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                  {service.description}
                </p>
                
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4 border-b border-border pb-2">Key Deliverables</h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((item, j) => (
                      <li key={j} className="flex items-center text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary mr-3 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
