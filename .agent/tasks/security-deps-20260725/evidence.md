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

- Pull request: https://github.com/kiku-jw/bible-quiz-kids/pull/6
- Verified merge SHA: `fee5a9a29d876368e81741fde152896099a82431`
- Exact-SHA Pages run:
  https://github.com/kiku-jw/bible-quiz-kids/actions/runs/30174053387
- The build and deploy jobs completed successfully.
- https://kiku-jw.github.io/bible-quiz-kids/ returned HTTP 200 and preserved
  the canonical URL and localized heading.
- The workflow emitted a non-blocking deprecation warning for Node.js 20 used
  by existing GitHub Actions. Updating the workflow is outside this task.

## Raw evidence

- `raw/security-settings.json`
- `raw/dependency-tree.txt`
- `raw/local-verification.txt`
- `raw/remote-verification.json`
