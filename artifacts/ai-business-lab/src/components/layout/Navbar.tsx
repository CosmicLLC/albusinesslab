import { Link, useLocation } from "wouter"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/system", label: "AI System" },
  { href: "/training", label: "Training" },
  { href: "/insights", label: "AI School" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const [location] = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border transition-shadow duration-300 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="AI Business Lab" className="h-10 w-10 object-contain" />
            <span className="font-bold text-lg tracking-tight text-foreground">AI Business Lab</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="default">
              <Link href="/contact">Book a Call</Link>
            </Button>
          </nav>

          <button
            className="md:hidden text-foreground p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-background flex flex-col pt-20 px-6 md:hidden"
          >
            <button
              className="absolute top-6 right-6 text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col space-y-6 mt-8">
              <Link
                href="/"
                className={cn(
                  "text-2xl font-medium tracking-tight",
                  location === "/" ? "text-primary" : "text-muted-foreground"
                )}
              >
                Home
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-2xl font-medium tracking-tight",
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-8">
                <Button asChild size="lg" className="w-full">
                  <Link href="/contact">Book a Call</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
