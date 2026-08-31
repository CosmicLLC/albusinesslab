/**
 * Blog content. Single source of truth for both the /insights listing and the
 * individual post pages, and read by the SEO registry to generate their
 * metadata and Article JSON-LD — so a post cannot exist without metadata, or
 * appear in the sitemap without existing.
 *
 * Content rules that apply to everything here:
 *   - no invented client results, statistics, or prices
 *   - anything about WTFP that could go stale is hedged and points at
 *     commcorp.org rather than asserting a current figure
 */

export interface PostSection {
  h: string
  p?: string[]
  list?: string[]
}

export interface Post {
  slug: string
  /** <= 60 chars, used as the page <title>. */
  title: string
  /** Page <h1>. May be longer than the title tag. */
  heading: string
  /** <= 155 chars. */
  description: string
  summary: string
  category: string
  /** ISO date. Surfaces as the visible "last reviewed" date. */
  date: string
  readTime: string
  /** Direct answer to the post's core question. Rendered first, ~40-60 words. */
  lead: string
  sections: PostSection[]
  /** Related internal links rendered at the foot of the post. */
  related: { href: string; label: string }[]
}

export const AUTHOR = "James Greulich"
export const AUTHOR_ROLE = "Founder, AI Business Lab"

export const POSTS: Post[] = [
  {
    slug: "how-to-get-ai-training-reimbursed-in-massachusetts",
    title: "How to Get AI Training Reimbursed in Massachusetts",
    heading: "How to Get AI Training Reimbursed in Massachusetts",
    description:
      "A step-by-step guide to claiming AI training costs back through the Massachusetts Workforce Training Fund Program Express track.",
    summary:
      "Step-by-step process for a Massachusetts employer to get AI training costs reimbursed through the WTFP Express track.",
    category: "Funding",
    date: "2026-08-30",
    readTime: "6 min read",
    lead:
      "Massachusetts employers can claim back a share of employee training costs through the Workforce Training Fund Program, administered by Commonwealth Corporation. AI skills training qualifies like any other job-relevant instruction. You pay for the training, then apply for reimbursement — and the Express track exists to make that straightforward for smaller employers.",
    sections: [
      {
        h: "Where the money actually comes from",
        p: [
          "The Workforce Training Fund is financed by a small assessment on employer unemployment insurance contributions. If you run a Massachusetts business with employees, you are almost certainly already paying into it. The program exists so that money can come back out as training.",
          "That framing matters, because most owners assume a state grant means a long competitive process aimed at somebody else. The Express track was specifically designed to be the opposite: a smaller, faster route for smaller employers with a defined training need.",
        ],
      },
      {
        h: "Check eligibility before anything else",
        list: [
          "Your business operates in Massachusetts and is current on its unemployment insurance contributions.",
          "You are training existing employees, not funding new hires or onboarding.",
          "The training is instruction — someone teaching your staff a skill — rather than consulting work delivered for them.",
          "Your headcount falls within the Express track's limits, which the state revises periodically.",
        ],
        p: [
          "That last point is the one people get wrong. Employee-count thresholds, reimbursement percentages and per-person caps are all set by Commonwealth Corporation and have changed more than once. Check the current rules at commcorp.org rather than relying on a figure quoted in a blog post — including this one.",
        ],
      },
      {
        h: "The instruction versus implementation line",
        p: [
          "This distinction decides what you can claim, so it is worth being precise. The program funds instruction. A workshop that teaches your marketing team to use AI tools is training, and is eligible.",
          "A project where someone builds and configures automations inside your business is implementation. It may be more valuable to you, but it is consulting, and it falls outside the program. Any provider vague about which of the two they are selling is a provider to be careful with.",
        ],
      },
      {
        h: "The sequence that works",
        list: [
          "Confirm eligibility against the current rules, including your headcount and UI standing.",
          "Define the actual training: which team, which roles, how many hours, what they will be able to do afterwards. A vague request is a rejected request.",
          "Submit the Express application through Commonwealth Corporation before the training happens — not after.",
          "Run the training, and keep the attendance and completion records the program asks for.",
          "File for reimbursement with that documentation.",
        ],
        p: [
          "Start several weeks before your target training date. Processing times are set by the state and move with application volume, and the one thing that reliably causes problems is applying after training has already taken place.",
        ],
      },
      {
        h: "What to ask a training provider",
        list: [
          "Is what you are selling instruction, or implementation? Which parts of it are eligible?",
          "Will you help scope the training so the application describes a fundable plan?",
          "What documentation will I need at reimbursement time, and will you provide it?",
          "What are the current caps and percentages — checked today, not last year?",
        ],
      },
    ],
    related: [
      { href: "/workforce-training-fund-ai-training", label: "Full WTFP guide" },
      { href: "/training", label: "Our AI Fundamentals Workshops" },
    ],
  },

  {
    slug: "ai-workflows-small-businesses-should-automate-first",
    title: "5 AI Workflows to Automate First",
    heading: "5 AI Workflows Every Small Business Should Automate First",
    description:
      "The five workflows where AI automation reliably pays back fastest for small businesses — and how to tell which one applies to you.",
    summary:
      "The five highest-payback AI automation candidates for small businesses: intake, quoting, follow-up, reporting and triage.",
    category: "Operations",
    date: "2026-08-30",
    readTime: "7 min read",
    lead:
      "The workflows worth automating first share three traits: they happen often, they follow a predictable shape, and a human currently retypes information that already exists somewhere else. Judged that way, five candidates come up again and again in small businesses — intake, quoting, follow-up, routine reporting, and message triage.",
    sections: [
      {
        h: "How to pick, before looking at any tool",
        p: [
          "Frequency times friction, minus the cost of getting it wrong. A task done fifty times a week that takes four minutes and tolerates a quick human check is a far better first project than a monthly task that must be perfect.",
          "Start with one workflow. The failure mode for small businesses is not picking the wrong tool, it is trying to automate everything at once and abandoning all of it.",
        ],
      },
      {
        h: "1. Intake",
        p: [
          "Anything where a customer gives you information and someone retypes it. Enquiry forms, phone messages taken on paper, job details relayed by text. Intake is usually the highest-value first automation because everything downstream depends on it, and because the information already exists in a structured form.",
        ],
      },
      {
        h: "2. Quoting and estimating",
        p: [
          "Speed wins work. A quote that goes out the same day beats a better-priced quote that arrives three days later, because by then the customer has often already booked someone. Drafting a quote from notes or photos, with you reviewing before it sends, converts a task that waits for a free evening into one that happens between jobs.",
        ],
      },
      {
        h: "3. Follow-up",
        p: [
          "The sequence nobody has time for. Checking in on an unanswered quote, asking for a review once a job closes, reminding a customer that an annual service is due. These reliably generate revenue and reliably get skipped, which makes them an unusually good fit for automation.",
        ],
      },
      {
        h: "4. Routine reporting",
        p: [
          "The weekly numbers somebody assembles by hand and, often, nobody reads. Turning existing data into a short plain-language summary costs almost nothing to automate and removes a recurring chore. If nobody reads the report afterwards, that tells you something useful too.",
        ],
      },
      {
        h: "5. Message triage",
        p: [
          "Sorting incoming messages by what they are and what they need, drafting replies for the routine ones, and escalating anything unusual to a person. Note the shape: triage and draft, not send unsupervised. Keeping a human on anything that reaches a customer unsupervised is what keeps this safe.",
        ],
      },
      {
        h: "What to be careful with",
        list: [
          "Anything that sends to a customer without review, early on.",
          "Anything touching money, contracts, or regulated advice.",
          "Anything where a confident wrong answer costs more than the time it saves.",
          "Automating a broken process — you will get the same mess, faster.",
        ],
      },
    ],
    related: [
      { href: "/vs/ai-automation-agency-vs-software-vendor", label: "Agency vs. software vendor" },
      { href: "/industries", label: "How this looks in your industry" },
    ],
  },

  {
    slug: "best-ai-tools-for-small-business-teams",
    title: "Best AI Tools for Small Business Teams",
    heading: "Best AI Tools for Small Business Teams in 2026",
    description:
      "A category-by-category guide to the AI tools small business teams actually use — and how to choose without collecting subscriptions.",
    summary:
      "Category guide to AI tooling for small businesses: assistants, automation platforms, meeting capture, and where custom work starts.",
    category: "Tools",
    date: "2026-08-30",
    readTime: "6 min read",
    lead:
      "Pick the category before the product. Most small businesses need four things at most: a general assistant, an automation platform to connect the software they already run, something to capture meetings and calls, and occasionally a purpose-built tool for their trade. Choosing by category avoids collecting subscriptions nobody opens.",
    sections: [
      {
        h: "General assistants",
        p: [
          "The broad chat assistants — ChatGPT, Claude, Gemini and the rest — cover drafting, summarising, rewriting and thinking through problems. For most teams one of these, on a paid plan, delivers more value than any other single tool.",
          "The differences that matter in practice are less about benchmark scores than about whether your team will actually use it: does it fit the tools they already have open, does it handle your documents, and does its data handling satisfy whatever obligations you have.",
        ],
      },
      {
        h: "Automation platforms",
        p: [
          "Zapier, Make and n8n connect the systems you already pay for and move information between them. This is where most measurable time savings come from, because it removes retyping rather than adding a new place to type.",
          "Rough guide: Zapier is the easiest starting point, Make handles branching logic more comfortably, and n8n suits teams who want to self-host or need more control. Any of the three will do the common jobs.",
        ],
      },
      {
        h: "Meeting and call capture",
        p: [
          "Transcription and summarisation tools remove note-taking and make what was said searchable later. For anyone whose work is mostly conversations — sales, advisory, professional services — this is often the fastest visible win, because the output is obvious on day one.",
          "Check your recording-consent obligations before rolling this out. In Massachusetts, all-party consent applies.",
        ],
      },
      {
        h: "Purpose-built tools",
        p: [
          "Most trades now have software with AI features attached — field service platforms, practice management, retail systems. When one of these fits your process, it will usually beat anything custom on both cost and time.",
          "The point at which it stops fitting is the point worth noticing: when your workflow has a branch or an exception the product cannot express, and you find yourself working around the tool rather than with it.",
        ],
      },
      {
        h: "How to choose without wasting money",
        list: [
          "Start from the workflow you want to fix, not from a tool you read about.",
          "One tool at a time, with a decision date to keep it or drop it.",
          "Prefer tools that connect to what you already run over ones that want to replace it.",
          "Count the real cost: subscription plus the hours spent configuring and maintaining it.",
          "Cancel what nobody opened after a month. Unused subscriptions are the main hidden cost here.",
        ],
      },
      {
        h: "A note on specifics",
        p: [
          "Pricing and feature sets in this category change constantly, so this guide stays at the category level on purpose. Verify current plans and terms directly with any vendor before committing — anything more specific written here would be out of date before you read it.",
        ],
      },
    ],
    related: [
      { href: "/vs/ai-consulting-vs-hiring-in-house", label: "Consulting vs. hiring in-house" },
      { href: "/insights/ai-workflows-small-businesses-should-automate-first", label: "What to automate first" },
    ],
  },

  {
    slug: "what-ai-consulting-costs-a-massachusetts-small-business",
    title: "What AI Consulting Costs a Small Business",
    heading: "What AI Consulting Costs a Massachusetts Small Business",
    description:
      "What actually drives the cost of AI consulting for a small business, which parts Massachusetts may reimburse, and what to ask before signing.",
    summary:
      "Explains the cost structure of AI consulting engagements, which parts are WTFP-reimbursable, and the questions to ask before signing.",
    category: "Buying",
    date: "2026-08-30",
    readTime: "6 min read",
    lead:
      "Cost is driven by four things: whether you are buying instruction or implementation, how many workflows are in scope, how much of your data needs untangling first, and whether you want ongoing support. Training may be partly reimbursable through the state. Implementation is not.",
    sections: [
      {
        h: "Why nobody publishes a single number",
        p: [
          "Because the same words describe very different work. A half-day workshop for six people and a project that rebuilds how quotes move through your business are both sold as \"AI consulting\", and the gap between them is enormous.",
          "Treat any firm quoting a price before understanding your workflows with caution. That number is either padded to cover uncertainty, or it is about to become a change order.",
        ],
      },
      {
        h: "The four cost drivers",
        list: [
          "Instruction or implementation. Teaching your team is priced by session and headcount. Building automations is priced by scope and integration complexity.",
          "Number of workflows. One well-defined process is a small project. \"Modernise our operations\" is not a project, it is a programme.",
          "State of your data and systems. If information lives in software with a decent API, integration is straightforward. If it lives in a spreadsheet, three inboxes and someone's memory, the first chunk of the work is untangling that.",
          "Ongoing support. A one-off build and an ongoing retainer are different commitments, and the second should be sized to work you actually have.",
        ],
      },
      {
        h: "The part Massachusetts may pay for",
        p: [
          "Training is potentially reimbursable through the Workforce Training Fund Program. Implementation is not — the program funds instruction, not consulting delivered for you.",
          "In practice that means the workshop portion of an engagement may come back to you in part, while the automation build will not. Any provider blurring that line is either careless or is hoping you will not check. Current caps and percentages are set by the state and change; confirm them at commcorp.org before budgeting.",
        ],
      },
      {
        h: "Questions to ask before signing",
        list: [
          "What exactly is in scope, and what would count as out of scope?",
          "Is this instruction or implementation, and which portion is WTFP-eligible?",
          "What do I own at the end — documented, working automations, or access to a platform I have to keep renting?",
          "What happens if it does not work? What does that look like commercially?",
          "Who maintains it when a tool changes, and what does that cost?",
        ],
      },
      {
        h: "How we price",
        p: [
          "We scope after a free AI Readiness Snapshot rather than before, because a fixed price quoted without seeing your workflows is guesswork with a margin attached. The Snapshot produces a one-page view of where AI would realistically help, and you are free to take that away and act on it however you like.",
          "From there, workshops are priced per session and per head, and automation sprints are fixed-scope for a defined set of workflows. We will tell you when an off-the-shelf tool would solve it more cheaply than we would.",
        ],
      },
    ],
    related: [
      { href: "/workforce-training-fund-ai-training", label: "What the state may reimburse" },
      { href: "/contact", label: "Book a free Snapshot" },
    ],
  },
]

export const getPost = (slug: string): Post | undefined => POSTS.find((p) => p.slug === slug)
