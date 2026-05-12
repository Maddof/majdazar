import type { AboutContent } from "~/utils/strapi/about";

export const HOME_DEFAULT_CONTENT = {
  hero: {
    typedName: "Majd Azar",
    title: "Full-stack Dev | Founder @ Smokify",
    location: "Stockholm, Sweden.",
    summary: "",
    backgroundImageUrl: "/images/hero/bg.webp",
    portraitImageUrl: "/images/hero/majd_transp.webp",
    portraitBlinkImageUrl: "/images/hero/majd_transp_blink.webp",
  },
  projects: {
    title: "Projects",
    description:
      "From founder-led products to client platforms, these projects show how I design, build, and ship web experiences that solve real business problems.",
  },
  tools: {
    title: "Tools of the trade",
    description:
      "The tools, platforms, and services I use to design, build, and ship products that solve real business problems.",
  },
  about: {
    title: "More about me",
    subtitle: "Beyond the stack",
    description:
      "I’m a developer who speaks the language of business. As a two-time founder, I understand the grit required to take an idea from 0 to 1. I work across the entire stack and across the boardroom to build tech that actually works for people.",
    imageUrl: "/images/homepage/majd_sketch.jpg",
    imageAlt: "pencil sketch of Majd Azar",
  },
} as const;

export const HOME_COPY = {
  triggerBlinkLabel: "Trigger blink effect",
  readMoreCta: "Read more",
  aboutImageFallbackAlt: "More about me",
} as const;

export const ABOUT_PAGE_DEFAULT_CONTENT: AboutContent = {
  title: "More about me",
  subtitle: "Beyond the stack",
  content: [
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          text: "I’m a developer who speaks the language of business. As a two-time founder, I understand the grit required to take an idea from 0 to 1. I work across the entire stack and across the boardroom to build tech that actually works for people.",
        },
      ],
    },
  ],
  returnHomeLinkText: "Return to homepage",
  featuredImageUrl: "/images/homepage/majd_sketch.jpg",
  featuredImageAlt: "pencil sketch of Majd Azar",
  featuredImageAnimatedUrl: "/images/about/majd_gif_fist_optimized.gif",
  featuredImageAnimatedAlt: "animated pencil sketch of Majd Azar fist bumping",
};

export const ABOUT_PAGE_COPY = {
  returningLabel: "Returning...",
  richTextEmptyLabel: "About content is coming soon.",
} as const;

export const PROJECT_CARDS_COPY = {
  visitSiteLabel: "Visit site",
  viewCaseStudyLabel: "View project",
  caseStudySuffix: "Case Study",
  richTextEmptyLabel: "No case study content available yet.",
  closeLabel: "Close",
  emptyProjectsLabel: "No projects published yet.",
} as const;

export const RICH_TEXT_COPY = {
  emptyContentLabel: "No content available yet.",
} as const;

export const FOOTER_COPY = {
  name: "Majd Azar",
  signatureAlt: "Majd Azar signature",
  builtWithLabel: "Built with React, TypeScript, Tanstack, Strapi and Vite",
} as const;

export type Tool = {
  name: string;
  imageAlt: string;
  imageUrl: string;
  description: string;
};

export type ToolCategory = {
  title: string;
  honorableMention?: boolean;
  tools: Tool[];
};

export const TOOLS_FALLBACK_CATEGORIES: ToolCategory[] = [
  {
    title: "Frontend",
    tools: [
      {
        name: "NEXT",
        imageUrl: "images/assets/icons/nextjs_symbol.png",
        imageAlt: "Next.js logo",
        description:
          "Production-ready React framework for fast routing, rendering, and deployment.",
      },
      {
        name: "REACT",
        imageUrl: "images/assets/icons/React_Logo.png",
        imageAlt: "React logo",
        description:
          "Component-driven UI library for building interactive, maintainable interfaces.",
      },
      {
        name: "TANSTACK",
        imageUrl: "images/assets/icons/tanstack_logo.png",
        imageAlt: "Tanstack logo",
        description:
          "Powerful routing and data tools that keep complex React apps predictable.",
      },
      {
        name: "JAVASCRIPT",
        imageUrl: "images/assets/icons/JavaScript_logo.png",
        imageAlt: "JavaScript logo",
        description:
          "Core language for dynamic client interactions and server-side logic.",
      },
      {
        name: "TYPESCRIPT",
        imageUrl: "images/assets/icons/ts-logo.png",
        imageAlt: "TypeScript logo",
        description:
          "Static typing that catches bugs early and improves code readability.",
      },
      {
        name: "TAILWIND",
        imageUrl: "images/assets/icons/Tailwind_CSS_logo.png",
        imageAlt: "Tailwind CSS logo",
        description:
          "Utility-first CSS workflow for quickly crafting polished responsive layouts.",
      },
      {
        name: "ShadCN",
        imageUrl: "images/assets/icons/shadcn-ui-seeklogo.png",
        imageAlt: "ShadCN logo",
        description:
          "Component library built on Radix UI, Base UI and Tailwind for beautiful, accessible UIs.",
      },
    ],
  },
  {
    title: "Backend",
    tools: [
      {
        name: "NODE",
        imageUrl: "images/assets/icons/node_symbol.png",
        imageAlt: "Node.js logo",
        description:
          "JavaScript runtime that powers APIs, tooling, and full-stack backends.",
      },
      {
        name: "PRISMA",
        imageUrl: "images/assets/icons/Prisma_Prisma-IndigoSymbol_1.png",
        imageAlt: "Prisma logo",
        description:
          "Type-safe ORM for modeling data and querying databases with confidence.",
      },
      {
        name: "POSTGRES",
        imageUrl: "images/assets/icons/PostgreSQL_logo.png",
        imageAlt: "PostgreSQL logo",
        description:
          "Reliable relational database built for robust and scalable applications.",
      },
    ],
  },
  {
    title: "DevOps/Tools",
    tools: [
      {
        name: "Hetzner",
        imageUrl: "images/assets/icons/hetzner-h.png",
        imageAlt: "Hetzner logo",
        description:
          "Cloud provider offering powerful, cost-effective servers for hosting and deployment.",
      },
      {
        name: "Vite",
        imageUrl: "images/assets/icons/vite_logo.png",
        imageAlt: "Vite logo",
        description:
          "Next-gen frontend tooling for lightning-fast development and optimized builds.",
      },
      {
        name: "GitHub",
        imageUrl: "images/assets/icons/GitHub_Invertocat_Black.png",
        imageAlt: "GitHub logo",
        description:
          "Code hosting platform for version control, collaboration, and CI/CD workflows.",
      },
      {
        name: "Docker",
        imageUrl: "images/assets/icons/docker-mark-ocean-blue.png",
        imageAlt: "Docker logo",
        description:
          "Containerization platform that simplifies deployment and ensures consistency across environments.",
      },
      {
        name: "Figma",
        imageUrl: "images/assets/icons/figma-Icon.png",
        imageAlt: "Figma logo",
        description:
          "Collaborative interface design tool for creating, prototyping, and sharing designs.",
      },
      {
        name: "Coolify",
        imageUrl: "images/assets/icons/coolify_logo.png",
        imageAlt: "Coolify logo",
        description:
          "One-click deployment platform that makes it easy to deploy and manage applications.",
      },
    ],
  },
  {
    title: "Honorable Mentions",
    honorableMention: true,
    tools: [
      {
        name: "Framer Motion",
        imageUrl: "",
        imageAlt: "Framer Motion logo",
        description:
          "Makes React animations feel smooth, natural, and fun instead of stiff.",
      },
      {
        name: "Swiper",
        imageUrl: "",
        imageAlt: "Swiper logo",
        description:
          "Great for touch-friendly sliders and carousels that just work on mobile.",
      },
      {
        name: "Python",
        imageUrl: "",
        imageAlt: "Python logo",
        description:
          "My go-to when I need quick scripts, automation, or fast backend tasks.",
      },
      {
        name: "C",
        imageUrl: "",
        imageAlt: "C logo",
        description:
          "Old-school and low-level, but amazing for learning how computers really work.",
      },
      {
        name: "C++",
        imageUrl: "",
        imageAlt: "C++ logo",
        description:
          "Powerful when performance matters and you want deeper control of the code.",
      },
      {
        name: "RestAPI",
        imageUrl: "",
        imageAlt: "REST API logo",
        description:
          "A clean, familiar way to connect apps and services over the web.",
      },
      {
        name: "JWT",
        imageUrl: "",
        imageAlt: "JWT logo",
        description:
          "A handy token standard for handling login sessions and protected routes.",
      },
      {
        name: "SEO",
        imageUrl: "",
        imageAlt: "SEO icon",
        description:
          "Helps great content actually get found on Google instead of staying hidden.",
      },
      {
        name: "WordPress",
        imageUrl: "",
        imageAlt: "WordPress logo",
        description:
          "A reliable CMS for launching content-heavy sites quickly without reinventing everything.",
      },
      {
        name: "Strapi",
        imageUrl: "",
        imageAlt: "Strapi logo",
        description:
          "A flexible headless CMS that keeps content management simple for dev teams.",
      },
      {
        name: "Stripe",
        imageUrl: "",
        imageAlt: "Stripe logo",
        description:
          "Makes online payments and subscriptions way easier to build and trust.",
      },
      {
        name: "Photoshop",
        imageUrl: "",
        imageAlt: "Photoshop logo",
        description:
          "Perfect for editing images, mockups, and quick visual polish.",
      },
      {
        name: "Illustrator",
        imageUrl: "",
        imageAlt: "Illustrator logo",
        description:
          "My pick for crisp logos, icons, and vector graphics that scale cleanly.",
      },
    ],
  },
];

export const TOOLS_COPY = {
  comingSoonLabel: "Coming soon.",
  honorableMentionsTitle: "Honorable Mentions",
  honorableMentionsDescription:
    "Tools and tech I’ve used across work, studies, and side projects. Not the full list, just a quick snapshot of the wider stack I’m comfortable with.",
} as const;
