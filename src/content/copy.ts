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
    title: "My projects",
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
  viewCaseStudyLabel: "View case study",
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
  image: string;
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
        image: "images/assets/icons/nextjs_symbol.png",
        description:
          "Production-ready React framework for fast routing, rendering, and deployment.",
      },
      {
        name: "REACT",
        image: "images/assets/icons/React_Logo.png",
        description:
          "Component-driven UI library for building interactive, maintainable interfaces.",
      },
      {
        name: "TANSTACK",
        image: "images/assets/icons/tanstack_logo.png",
        description:
          "Powerful routing and data tools that keep complex React apps predictable.",
      },
      {
        name: "JAVASCRIPT",
        image: "images/assets/icons/JavaScript_logo.png",
        description:
          "Core language for dynamic client interactions and server-side logic.",
      },
      {
        name: "TYPESCRIPT",
        image: "images/assets/icons/ts-logo.png",
        description:
          "Static typing that catches bugs early and improves code readability.",
      },
      {
        name: "TAILWIND",
        image: "images/assets/icons/Tailwind_CSS_logo.png",
        description:
          "Utility-first CSS workflow for quickly crafting polished responsive layouts.",
      },
      {
        name: "ShadCN",
        image: "images/assets/icons/shadcn-ui-seeklogo.png",
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
        image: "images/assets/icons/node_symbol.png",
        description:
          "JavaScript runtime that powers APIs, tooling, and full-stack backends.",
      },
      {
        name: "PRISMA",
        image: "images/assets/icons/Prisma_Prisma-IndigoSymbol_1.png",
        description:
          "Type-safe ORM for modeling data and querying databases with confidence.",
      },
      {
        name: "POSTGRES",
        image: "images/assets/icons/PostgreSQL_logo.png",
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
        image: "images/assets/icons/hetzner-h.png",
        description:
          "Cloud provider offering powerful, cost-effective servers for hosting and deployment.",
      },
      {
        name: "Vite",
        image: "images/assets/icons/vite_logo.png",
        description:
          "Next-gen frontend tooling for lightning-fast development and optimized builds.",
      },
      {
        name: "GitHub",
        image: "images/assets/icons/GitHub_Invertocat_Black.png",
        description:
          "Code hosting platform for version control, collaboration, and CI/CD workflows.",
      },
      {
        name: "Docker",
        image: "images/assets/icons/docker-mark-ocean-blue.png",
        description:
          "Containerization platform that simplifies deployment and ensures consistency across environments.",
      },
      {
        name: "Figma",
        image: "images/assets/icons/figma-Icon.png",
        description:
          "Collaborative interface design tool for creating, prototyping, and sharing designs.",
      },
      {
        name: "Coolify",
        image: "images/assets/icons/coolify_logo.png",
        description:
          "One-click deployment platform that makes it easy to deploy and manage applications.",
      },
    ],
  },
  {
    title: "Honorable Mentions",
    honorableMention: true,
    tools: [
      { name: "Framer Motion", image: "", description: "" },
      { name: "Swiper", image: "", description: "" },
      { name: "Python", image: "", description: "" },
      { name: "C", image: "", description: "" },
      { name: "C++", image: "", description: "" },
      { name: "RestAPI", image: "", description: "" },
      { name: "JWT", image: "", description: "" },
      { name: "SEO", image: "", description: "" },
      { name: "WordPress", image: "", description: "" },
      { name: "Strapi", image: "", description: "" },
      { name: "Stripe", image: "", description: "" },
      { name: "Photoshop", image: "", description: "" },
      { name: "Illustrator", image: "", description: "" },
    ],
  },
];

export const TOOLS_COPY = {
  comingSoonLabel: "Coming soon.",
  honorableMentionsTitle: "Honorable Mentions",
  honorableMentionsDescription:
    "Here are some additional tools and technologies that I have experience with and want to give a shoutout to.",
} as const;
