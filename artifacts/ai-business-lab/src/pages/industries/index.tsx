import { HubPage } from "@/components/HubPage"

export default function IndustriesIndex() {
  return (
    <HubPage
      eyebrow="Industries"
      title="AI by Industry"
      lead="AI helps different Massachusetts industries in different ways. Trades businesses lose jobs to slow quoting; retailers lose hours to reordering and customer messages; professional services firms lose billable time to admin. These guides cover what to automate first in each."
      items={[
        {
          title: "Trades & Home Services",
          description:
            "Plumbers, electricians, HVAC, landscapers and contractors — faster quotes, after-hours intake, automated service reports and review requests.",
          href: "/industries/trades-home-services",
        },
        {
          title: "Retail",
          description:
            "Independent shops and small chains — stock-out signals, product and campaign copy, and triage for the customer messages that pile up.",
          href: "/industries/retail",
        },
        {
          title: "Professional Services",
          description:
            "Law, accounting, financial advisory and insurance firms — document summarisation, client intake, routine updates and meeting notes.",
          href: "/industries/professional-services",
        },
      ]}
    />
  )
}
