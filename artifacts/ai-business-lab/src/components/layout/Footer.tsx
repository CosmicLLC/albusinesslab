import { Link } from "wouter"
import { Container } from "@/components/ui/container"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="AI Business Lab" className="h-8 w-8 object-contain" />
              <span className="font-bold text-lg tracking-tight text-foreground">AI Business Lab</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Strategic AI transformation for enterprise leaders. We turn complexity into competitive advantage.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-sm text-foreground">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">AI Strategy</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Implementation</Link></li>
              <li><Link href="/training" className="text-muted-foreground hover:text-primary transition-colors text-sm">Corporate Training</Link></li>
              <li><Link href="/system" className="text-muted-foreground hover:text-primary transition-colors text-sm">Transformation System</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-sm text-foreground">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/insights" className="text-muted-foreground hover:text-primary transition-colors text-sm">AI School</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Business Lab. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
