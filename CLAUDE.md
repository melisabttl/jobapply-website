# JobApply Marketing Website — Claude Code Instructions

## Project purpose

This repository is the public marketing website for JobApply.

It is NOT the authenticated JobApply SaaS product repository.

The authenticated SaaS product is being developed separately. Do not redesign, restructure, or make backend architecture decisions for the SaaS from this repository.

The current product name "JobApply" is a working name and may change later. Do not create architecture that depends unnecessarily on the exact brand name.

---

## Product definition

JobApply is an evidence-grounded AI job-search operating system.

It is NOT primarily:
- an AI resume builder
- a cover-letter generator
- a generic ATS checker
- a browser extension that blindly auto-applies

The core product experience is:

1. User adds their professional background once.
2. JobApply builds a structured Career Profile from verified candidate information.
3. JobApply automatically discovers relevant jobs.
4. It filters jobs according to candidate preferences.
5. It evaluates work authorization / eligibility separately.
6. It compares job requirements with explicit candidate evidence.
7. It selects the strongest relevant experience.
8. It generates tailored application materials.
9. It answers application questions using verified information.
10. It validates claims.
11. It can auto-apply when safety conditions allow.
12. If information is genuinely missing, it asks only for that information.
13. It tracks applications and outcomes.
14. It provides job-search analytics.

The intended experience is that JobApply works in the background and interrupts the user less as it learns more.

---

## Core product principle

Candidate Truth
+
Job Truth
↓
Explainable Intelligence
↓
Safe Automation

AI may:
- interpret
- retrieve
- select
- prioritize
- shorten
- rewrite
- tailor
- organize
- research
- automate

AI must never:
- fabricate experience
- invent technologies
- invent metrics
- inflate ownership
- convert targets into achievements
- present projected metrics as actual results
- imply implementation ownership without evidence

Evidence controls truth.

---

## Important product distinctions

Never collapse these concepts into one generic AI score:

### Search Scope
Does this type of role match what the candidate wants?

### Eligibility
Can the candidate legally pursue the role?

### Evidence Match
How strongly does explicit candidate evidence overlap with the role?

### Application Quality
Are generated application materials accurate and strong?

### Auto Apply Safety
Can JobApply safely submit without user intervention?

For example:

Evidence Match: Strong
Eligibility: Needs Review

is valid and intentional.

---

## Primary website goal

The public website should turn a visitor into a qualified signup.

The visitor should quickly understand:

1. JobApply finds jobs for me.
2. It understands my real career background.
3. It determines which opportunities make sense.
4. It creates tailored applications.
5. It can apply automatically when safe.
6. It asks me only when information is missing.
7. It tracks everything.
8. I remain in control.

The website must NOT primarily position JobApply as a resume builder.

---

## Primary audience

Initially optimize for active professional job seekers, especially knowledge workers such as:

- product
- technology
- design
- operations
- business professionals

They apply to multiple roles, dislike repetitive application work, want automation, and care about factual accuracy.

---

# Radiant template rules

This project starts from the Tailwind Plus Radiant SaaS template.

Radiant is the approved visual foundation.

DO NOT redesign the website from scratch.

Preserve Radiant wherever possible, including:

- overall grid
- responsive structure
- typography scale
- generous whitespace
- hero composition
- gradient treatment
- border treatment
- card radius
- restrained shadows
- button hierarchy
- screenshot framing
- white feature sections
- dark feature sections
- bento-card structure
- footer structure
- pricing-card style
- authentication-page structure

Modify an existing Radiant component before creating a replacement when the existing component can reasonably serve the approved UX.

Do not introduce a new visual system simply because another generic SaaS pattern exists.

---

# UI/UX Pro Max rules

UI/UX Pro Max is installed as a design-quality assistance layer.

Use it for:

- accessibility
- responsive behavior
- spacing refinement
- typography refinement
- focus states
- interaction quality
- form usability
- component quality
- CTA hierarchy
- mobile behavior
- motion quality

UI/UX Pro Max is NOT authoritative over the approved JobApply product architecture or the Radiant visual foundation.

Do not redesign an approved section merely because a generic recommendation suggests another pattern.

---

# Approved homepage architecture

The current approved homepage direction is:

1. Navigation
2. Large Radiant-style gradient hero
3. Workflow strip
4. Large product overview screenshot
5. White Career Intelligence section
6. Career Profile + Evidence Match cards
7. Supporting cards:
   - Add Background
   - Eligibility
   - Candidate Truth
8. Dark Automation section
9. Needs You + Auto Apply cards
10. Answer Bank + tailored application materials
11. Applications / Analytics
12. Real testimonials only when available
13. Final gradient CTA
14. Footer

Do not create unnecessary standalone feature sections if the information can be grouped within this structure.

---

# Key website narratives

## Career intelligence

JobApply should feel like a system that understands what the candidate has actually done.

Career Profile and Career Evidence are foundational.

## Automatic job discovery

The primary model is:

JobApply finds jobs for me.

Manual job URL / job-description input is a fallback and must not become the main marketing story.

## Explainable matching

Visitors should be able to understand why a role matched.

Prefer showing explicit matching evidence over meaningless universal percentage scores.

## Needs You

"One question needs you." is a major product differentiator.

The product should not send the user through an entire application review when only one piece of information is missing.

After the user answers, JobApply should continue where appropriate.

## Safe Auto Apply

Never portray Auto Apply as reckless mass submission.

Automation is:
- user-controlled
- opt-in where applicable
- evidence-grounded
- subject to required checks
- interrupted when important information is missing

## Answer Bank

Recurring factual answers, preferences, and reusable career stories may be stored.

Company-specific answers should generally be generated fresh rather than blindly reused.

---

# Website copy rules

Copy should be:

- short
- clear
- confident
- concrete
- human
- easy to understand

Prefer active language such as:

- Find
- Check
- Match
- Build
- Apply
- Ask
- Track

Avoid generic AI marketing language such as:

- Revolutionize your career journey
- Unlock the power of AI
- Supercharge your potential
- AI-powered excellence
- Transform your job search forever

Do not unnecessarily repeat "AI-powered" or "AI-driven."

Show intelligence through product behavior.

Useful product language includes:

- One question needs you.
- Answer once.
- See why it matched.
- Evidence Match
- Eligibility
- Ready to submit
- Everything else is moving.

Do not treat these phrases as immutable final brand copy unless explicitly approved.

---

# Trust rules

Never invent:

- testimonials
- customers
- logos
- integrations
- metrics
- hiring outcomes
- job-source coverage
- security certifications
- product functionality

Do not claim:

- guaranteed interviews
- guaranteed hiring
- 100% ATS success
- 10x faster hiring
- automatic application everywhere
- unsupported security/privacy guarantees

If functionality is not confirmed, leave it out or mark it appropriately only when explicitly instructed.

---

# Product imagery rules

Prefer realistic JobApply product UI over generic AI illustrations.

Primary product screens for marketing may include:

- Home
- Jobs
- Job Detail
- Career Profile
- Add Background
- Needs You
- Answer Bank
- Pipeline
- Applications
- Analytics
- Resume
- Cover Letter

Visual hierarchy:

1. Real product screenshots
2. Cropped product UI
3. Small animations derived from real product behavior

Avoid:

- cartoon robots
- generic HR illustrations
- stock photography
- excessive sparkles
- stereotypical purple AI gradients
- excessive glassmorphism
- neon AI visuals
- decorative dashboards with meaningless metrics

Do not invent final product UI states without clearly treating them as marketing mockups.

---

# Current homepage mapping to Radiant

Radiant header
→ JobApply navigation

Radiant hero
→ autonomous job-search positioning

Radiant logo strip
→ JobApply workflow strip unless legitimate customer proof exists

Radiant large product screenshot
→ JobApply Home / overall job-search view

Radiant white Sales feature section
→ Career Intelligence

Radiant white bento cards
→ Career Profile, Evidence Match, Add Background, Eligibility, Candidate Truth

Radiant dark Outreach section
→ Automation

Radiant dark bento cards
→ Needs You, Auto Apply, Answer Bank, tailored application materials

Radiant testimonials
→ remove until real testimonials exist

Radiant final CTA
→ JobApply signup CTA

Radiant footer
→ simplified JobApply product/legal/account navigation

---

# Authentication website rules

Public website routes may include:

/
pricing
login
signup
forgot-password
privacy
terms

Do not make final authentication-provider or backend decisions in this repository.

Login/signup can initially be visual frontend states.

When integration occurs later, the intended journey is:

Public website
→ Get started
→ Signup
→ Career Profile onboarding
→ Authenticated JobApply product

Do not drop a new user onto an empty dashboard after signup.

---

# Development rules

Work section by section.

Before modifying a major section:

1. Inspect the existing Radiant implementation.
2. Identify whether it can be reused.
3. Preserve existing structure where practical.
4. Implement only the approved website specification.
5. Check desktop and mobile.
6. Check accessibility.
7. Check visual consistency with Radiant.
8. Avoid touching unrelated sections.
9. Do not make backend/product-engineering changes.
10. Do not implement speculative functionality.

Do not rewrite the whole homepage in one pass unless explicitly instructed.

Do not delete useful Radiant components simply because they are not yet used.

Keep implementation clean and production-quality.

---

# Git workflow

main:
Untouched / stable Radiant baseline.

website-v1:
Active JobApply website customization.

Make logical, scoped changes.

Do not commit secrets or local environment files.

Before large structural changes, explain the proposed change and affected files.

---

# Current implementation state

The website is currently the original Radiant TypeScript template.

UI/UX Pro Max has been installed under `.claude/skills/`.

No JobApply visual customization should begin until the requested section specification is provided.
