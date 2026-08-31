import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Seo } from "@/components/Seo"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground">
      {/* Mounted once and driven by the router, so no page can ship without
          metadata — it all comes from the registry in src/seo/pages.ts. */}
      <Seo />
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}
