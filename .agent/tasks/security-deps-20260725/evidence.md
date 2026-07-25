# Evidence

## Local build evidence

- A clean `npm ci` completed with zero vulnerabilities.
- `npm audit --json` reported zero vulnerabilities at every severity.
- `npx tsc --noEmit` passed.
- `npm run build` produced the expected static routes with Next.js `16.2.11`.
- `out/index.html` preserved the canonical URL, `/bible-quiz-kids/` asset
  scope, app icon, and localized heading.
- GitHub API readback confirms Dependabot alerts and automated security fixes
  are enabled.

## External evidence

Pending merge-SHA GitHub Pages deployment and public URL verification.

## Raw evidence

- `raw/security-settings.json`
- `raw/dependency-tree.txt`
- `raw/local-verification.txt`
