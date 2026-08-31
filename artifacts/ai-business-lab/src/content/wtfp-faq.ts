/**
 * Single source of truth for the WTFP pillar page FAQ.
 *
 * Imported by BOTH the page (to render visible Q&A) and the SEO registry
 * (to build FAQPage JSON-LD). Keeping one copy is deliberate: structured
 * data that claims something the visible page doesn't say is "schema drift"
 * and counts against the page rather than being ignored.
 */
export interface Faq {
  q: string
  a: string
}

export const WTFP_FAQS: Faq[] = [
  {
    q: "Is AI training really free for my Massachusetts business?",
    a: "Not free upfront — you pay for the workshop, then apply for reimbursement through the Massachusetts Workforce Training Fund Program (WTFP). For eligible small businesses, the Express Program is built to reimburse a meaningful share of that cost. The exact percentage and dollar caps are set by the state and do change, so we confirm current figures with you before you commit to a track.",
  },
  {
    q: "How many employees can my company have and still use the Express Program?",
    a: "The Express Program is aimed at smaller employers — historically businesses with roughly 100 or fewer Massachusetts employees have used this track, though the state periodically revisits eligibility rules. We check your specific situation against the current program rules before you apply, rather than assuming last year's thresholds still hold.",
  },
  {
    q: "What's the difference between the WTFP Express Program and the General Program?",
    a: "Express is the streamlined, faster-turnaround track built for smaller training requests and smaller employers. The General Program handles larger grant requests with a more involved application. Most of our workshop clients apply through Express because an 8-hour, role-specific AI workshop is exactly the kind of training it's designed for.",
  },
  {
    q: "Does the AI Workflow Automation Sprint qualify for WTFP reimbursement?",
    a: "No. WTFP funds instruction and skills training — that covers our Tier 1 AI Fundamentals Workshops. Our AI Workflow Automation Sprint is a hands-on implementation project (we build and configure the automations with you), which the program treats as consulting work rather than training, so it isn't WTFP-eligible. We're upfront about that distinction so you can budget correctly.",
  },
  {
    q: "How long does WTFP approval take?",
    a: "The Express Program is designed to move faster than the General Program, but processing times are set by Commonwealth Corporation and can shift with application volume. We recommend starting the application at least a few weeks before your target training date.",
  },
  {
    q: "What happens after the workshop?",
    a: "You leave with role-specific AI workflows your team actually used during the session, not just slides. If you want help going further — automating the workflows you identified, or ongoing optimization — that moves into our Workflow Automation Sprint or Fractional AI Ops Retainer, both separate from the WTFP-funded workshop itself.",
  },
]
