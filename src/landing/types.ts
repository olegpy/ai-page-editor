export type NavLink = {
  label: string
  href: string
}

export type Feature = {
  title: string
  description: string
}

export type Testimonial = {
  quote: string
  author: string
  role: string
}

export type LandingPageContent = {
  brand: string
  navLinks: NavLink[]
  hero: {
    badge: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
  }
  features: {
    heading: string
    subheading: string
    items: Feature[]
  }
  testimonials: {
    heading: string
    items: Testimonial[]
  }
  callToAction: {
    title: string
    subtitle: string
    button: string
  }
  footer: {
    tagline: string
    copyright: string
  }
}
