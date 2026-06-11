import type { MouseEvent } from 'react'
import type { LandingPageContent } from './types'

type LandingPageProps = {
  content: LandingPageContent
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#')) return
  event.preventDefault()
  scrollToSection(href.slice(1))
}

const featureIcons = [
  (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  ),
  (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  ),
]

export function LandingPage({ content }: LandingPageProps) {
  const { brand, navLinks, hero, features, testimonials, callToAction, footer } = content

  return (
    <div className="min-h-full">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/5">
        <nav className="container-page flex items-center justify-between py-5">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold text-white">
              N
            </span>
            {brand}
          </a>
          <ul className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            {navLinks.map((navLink) => (
              <li key={navLink.href}>
                <a
                  href={navLink.href}
                  onClick={event => handleNavClick(event, navLink.href)}
                  className="transition hover:text-white"
                >
                  {navLink.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="btn-header" onClick={() => scrollToSection('cta')}>
            {hero.primaryCta}
          </button>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="container-page pb-24 pt-20 text-center md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {hero.badge}
          </span>
          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.1]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" className="btn-primary">
              {hero.primaryCta}
            </button>
            <button type="button" className="btn-secondary">
              {hero.secondaryCta}
            </button>
          </div>

          <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-2 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-slate-500">preview — nimbus.app</span>
            </div>
            <div className="grid gap-3 p-6 text-left sm:grid-cols-3">
              {features.items.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-white/5 bg-slate-800/50 p-4"
                >
                  <p className="text-sm font-medium text-white">{feature.title}</p>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-20 border-t border-white/5 bg-slate-900/30 py-24">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="heading-section">
                {features.heading}
              </h2>
              <p className="mt-4 text-lg text-slate-400">{features.subheading}</p>
            </div>
            <ul className="mt-16 grid gap-8 md:grid-cols-3">
              {features.items.map((feature, index) => (
                <li
                  key={feature.title}
                  className="card-surface transition hover:border-violet-500/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    {featureIcons[index]}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-400">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="testimonials" className="scroll-mt-20 py-24">
          <div className="container-page">
            <h2 className="heading-section text-center">
              {testimonials.heading}
            </h2>
            <ul className="mt-16 grid gap-8 md:grid-cols-2">
              {testimonials.items.map((testimonial) => (
                <li
                  key={testimonial.author}
                  className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900 to-slate-950 p-8"
                >
                  <p className="text-lg leading-relaxed text-slate-300">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-6 border-t border-white/5 pt-6">
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </footer>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="cta" className="scroll-mt-20 border-t border-white/5 py-24">
          <div className="container-page-narrow text-center">
            <h2 className="heading-section">
              {callToAction.title}
            </h2>
            <p className="mt-4 text-lg text-slate-400">{callToAction.subtitle}</p>
            <button type="button" className="btn-cta mt-10">
              {callToAction.button}
            </button>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="container-page flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-500 md:flex-row md:text-left">
          <p>{footer.tagline}</p>
          <p>{footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
