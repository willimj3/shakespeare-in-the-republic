/**
 * Build-time basePath that the site is served under. Set in
 * .github/workflows/deploy.yml as NEXT_PUBLIC_BASE_PATH. Empty in local
 * development, so `npm run dev` continues to work from localhost:3000/.
 *
 * Why this helper exists: next.config.mjs has `basePath` set, which makes
 * `<Link>` href values get prefixed automatically. But `<Image>` with
 * `unoptimized: true` (required for static export to GitHub Pages, since
 * GH Pages has no runtime image optimisation) passes the `src` through
 * verbatim — basePath is NOT applied. Same goes for any raw `<img>` src
 * or anchor href computed at runtime from a JSON value. So every image
 * URL or asset URL in our code needs to flow through asset().
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix an absolute-from-root path with the current basePath.
 *
 *   asset("/images/historical/x.jpg")
 *     → "/images/historical/x.jpg"                       in dev
 *     → "/shakespeare-in-the-republic/images/historical/x.jpg"  in production
 *
 * If the input is already an absolute URL (http://, https://) or a
 * protocol-relative URL (//cdn), it's returned unchanged.
 */
export function asset(path: string): string {
  if (!path) return path;
  if (/^(?:[a-z]+:)?\/\//i.test(path)) return path;
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
