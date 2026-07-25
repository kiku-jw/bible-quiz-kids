# Implementation notes

- Enable Dependabot vulnerability alerts and automated security fixes through
  the repository API, then read both settings back.
- Update only `next` to the first patched compatible release (`16.2.11`) and
  allow npm to refresh the existing lockfile.
- Reassess `npm audit` before changing any other dependency.
- The stable Next.js release still pins vulnerable transitive PostCSS and sharp
  releases. Use root npm overrides for those existing dependency edges:
  PostCSS `8.5.18` (first patched release) and sharp `0.35.3` (the advisory's
  recommended patched release).
- Preserve application code, localized content, static-export settings, and the
  existing Pages workflow.
