import { Link } from "wouter";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">404</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6">Page not found</h1>
          <p className="text-lg text-muted-foreground mb-10">
            The page you are looking for doesn't exist or has moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg"><Link href="/">Go to the homepage</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/services">View our services</Link></Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
