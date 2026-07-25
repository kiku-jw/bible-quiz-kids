# Security dependency remediation

Status: FROZEN

Date: 2026-07-25

Issue: https://github.com/kiku-jw/bible-quiz-kids/issues/3

## Goal

Remove the current high-severity npm advisories with the smallest compatible
dependency update while preserving the localized quiz and its GitHub Pages
deployment.

## Observed state

- The repository is a Next.js 16 static export deployed from `main`.
- The Pages base path is `/bible-quiz-kids`.
- `npm audit` reports high-severity advisories in the Next.js dependency chain.
- GitHub secret scanning and push protection are enabled.
- Dependabot alerts and security updates are disabled.

## Acceptance criteria

1. GitHub Dependabot vulnerability alerts are enabled.
2. GitHub automated security fixes are enabled.
3. `next` and the lockfile receive only the smallest compatible remediation
   needed for the current advisories.
4. `npm audit` reports zero high- or critical-severity vulnerabilities.
5. `npm ci`, `npx tsc --noEmit`, and `npm run build` pass from a clean install.
6. The static export keeps the expected canonical URL, scoped asset paths, app
   icon, and localized page heading.
7. GitHub Pages deploys the exact merge SHA successfully and the public page
   returns HTTP 200.
8. No application copy, quiz behavior, workflow, or unrelated file changes.

## Constraints

- Keep technical documentation in English.
- Preserve all localized UI and quiz content.
- Do not introduce a major dependency upgrade or a new package ecosystem.
- Do not modify the Pages workflow unless the dependency update proves it is
  required.

## Non-goals

- A broad application security audit.
- Adding response headers or CSP that GitHub Pages cannot enforce directly.
- UI, content, analytics, or product changes.
- Updating Node.js or GitHub Actions versions.

## Verification

- `npm audit --json`
- clean `npm ci`
- `npx tsc --noEmit`
- `npm run build`
- inspect `out/index.html` for canonical URL, base-path assets, icon, and H1
- read back repository security settings
- verify the Pages run and deployment for the exact merge SHA
- request the public Pages URL and confirm HTTP 200
