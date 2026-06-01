import type { LandingPageContent } from './types'

export const defaultLandingContent: LandingPageContent = {
  brand: 'Nimbus',
  navLinks: [
    { label: 'Features', href: '#features' },
    { label: 'Stories', href: '#testimonials' },
    { label: 'Pricing', href: '#cta' },
  ],
  hero: {
    badge: 'Now in public beta',
    title: 'Ship landing pages in minutes, not weeks',
    subtitle:
      'Nimbus helps teams launch polished marketing sites with AI-assisted copy, layout, and design — so you can focus on what matters.',
    primaryCta: 'Start free trial',
    secondaryCta: 'Watch demo',
  },
  features: {
    heading: 'Everything you need to launch',
    subheading:
      'From first draft to live URL — one workflow, no design handoffs.',
    items: [
      {
        title: 'Conversational editing',
        description:
          'Describe changes in plain English. Your page updates instantly in the live preview.',
      },
      {
        title: 'On-brand by default',
        description:
          'Consistent typography, spacing, and color tokens keep every section looking professional.',
      },
      {
        title: 'One-click publish',
        description:
          'Deploy to a global CDN in seconds. Custom domains and SSL included.',
      },
    ],
  },
  testimonials: {
    heading: 'Loved by fast-moving teams',
    items: [
      {
        quote:
          'We replaced a two-week agency cycle with an afternoon. The page looked better than what we had before.',
        author: 'Maya Chen',
        role: 'Head of Marketing, Lattice',
      },
      {
        quote:
          'Our founders edit copy themselves now. No more Slack threads asking for “one small text change.”',
        author: 'James Okonkwo',
        role: 'CEO, Harbor Labs',
      },
    ],
  },
  callToAction: {
    title: 'Ready to launch your next page?',
    subtitle: 'Join hundreds of teams shipping faster with Nimbus.',
    button: 'Get started — it’s free',
  },
  footer: {
    tagline: 'Built for teams who move fast.',
    copyright: '© 2026 Nimbus, Inc. All rights reserved.',
  },
}
