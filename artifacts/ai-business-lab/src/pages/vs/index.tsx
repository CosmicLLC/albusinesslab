import { HubPage } from "@/components/HubPage"

export default function ComparisonsIndex() {
  return (
    <HubPage
      eyebrow="Decision Guides"
      title="AI Buying Decisions, Compared"
      lead="Most small businesses adopting AI face two questions: whether to hire someone internally or bring in outside help, and whether to buy another software subscription or have automation built around the process they already have. These guides compare both honestly, including when not to hire us."
      items={[
        {
          title: "AI Consulting vs. Hiring In-House",
          description:
            "Cost, speed to first result, breadth of expertise and what happens if it isn't a fit — plus when hiring genuinely is the better call.",
          href: "/vs/ai-consulting-vs-hiring-in-house",
        },
        {
          title: "Automation Agency vs. Software Vendor",
          description:
            "When an off-the-shelf SaaS tool is the cheaper, faster answer, and when a workflow is specific enough to justify a custom build.",
          href: "/vs/ai-automation-agency-vs-software-vendor",
        },
        {
          title: "Get AI Training Reimbursed",
          description:
            "Massachusetts employers can claim back a share of AI training costs through the Workforce Training Fund Program. How it works and who qualifies.",
          href: "/workforce-training-fund-ai-training",
        },
      ]}
    />
  )
}
