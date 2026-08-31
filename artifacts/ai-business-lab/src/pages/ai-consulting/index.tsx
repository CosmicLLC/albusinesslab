import { HubPage } from "@/components/HubPage"

export default function LocationsIndex() {
  return (
    <HubPage
      eyebrow="Locations"
      title="AI Consulting Across Massachusetts"
      lead="AI Business Lab works with small businesses throughout Massachusetts from our base in Walpole. Every Massachusetts employer is eligible for the same Workforce Training Fund Program, wherever they operate. These pages cover the areas we work in most."
      items={[
        {
          title: "Boston, MA",
          description:
            "The state's densest small-business market — professional services, healthcare, hospitality and a large agency and startup scene.",
          href: "/ai-consulting/boston-ma",
        },
        {
          title: "Worcester, MA",
          description:
            "Central Massachusetts' healthcare, manufacturing and education economy, plus a growing downtown professional services base.",
          href: "/ai-consulting/worcester-ma",
        },
        {
          title: "Quincy, MA",
          description:
            "The South Shore's healthcare practices, independent retail and restaurants, and trades businesses — closest to our home base.",
          href: "/ai-consulting/quincy-ma",
        },
      ]}
    />
  )
}
