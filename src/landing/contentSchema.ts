import { z } from 'zod'

const navLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

const featureSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
})

export const landingPageContentSchema = z.object({
  brand: z.string(),
  navLinks: z.array(navLinkSchema),
  hero: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
  }),
  features: z.object({
    heading: z.string(),
    subheading: z.string(),
    items: z.array(featureSchema),
  }),
  testimonials: z.object({
    heading: z.string(),
    items: z.array(testimonialSchema),
  }),
  callToAction: z.object({
    title: z.string(),
    subtitle: z.string(),
    button: z.string(),
  }),
  footer: z.object({
    tagline: z.string(),
    copyright: z.string(),
  }),
})
