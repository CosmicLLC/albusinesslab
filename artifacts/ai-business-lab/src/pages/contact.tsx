import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const id = "calendly-script"
    if (!document.getElementById(id)) {
      const script = document.createElement("script")
      script.id = id
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? "Server error")
      }

      toast({
        title: "Inquiry Received.",
        description: "A partner will review your message and contact you within 24 hours.",
      })
      form.reset()
    } catch (err) {
      console.error("Submission error:", err)
      toast({
        title: "Something went wrong.",
        description: "Please try again or email us directly.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col w-full">
      {/* Calendly scheduling section — first */}
      <Section className="pt-24 pb-24 bg-[#F9FAFB]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">Schedule a Call</p>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground mb-4">Book a 30-Minute Strategy Session</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Book a time directly with a partner to discuss your transformation goals.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-border shadow-sm bg-white"
          >
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/cosmic-company-llc/30min"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </motion.div>
        </Container>
      </Section>

      {/* Contact inquiry form — second */}
      <Section className="py-24 border-t border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">Initiate Contact.</h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                We strictly engage with organizations ready to commit to architectural transformation. Describe your current friction points, and a partner will review your inquiry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-border rounded-2xl p-8 md:p-12"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="bg-background/50 h-12 rounded-xl border-border focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider">Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Corp" className="bg-background/50 h-12 rounded-xl border-border focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider">Corporate Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jane@acmecorp.com" className="bg-background/50 h-12 rounded-xl border-border focus-visible:ring-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider">Operational Friction Points</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the specific challenges you are looking to address..."
                            className="resize-none min-h-[150px] bg-background/50 rounded-xl border-border focus-visible:ring-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full h-14 text-base rounded-xl" disabled={submitting}>
                    {submitting ? "Sending..." : "Submit Inquiry"}
                  </Button>
                </form>
              </Form>
            </motion.div>

          </div>
        </Container>
      </Section>

      {/* Contact details — bottom */}
      <Section className="py-16 bg-[#F9FAFB] border-t border-border">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-12 sm:gap-24"
          >
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Global Headquarters</h3>
              <p className="text-foreground">Walpole, MA<br/>Operating Worldwide</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Direct Inquiries</h3>
              <p className="text-foreground">partners@aibusinesslab.example.com</p>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
