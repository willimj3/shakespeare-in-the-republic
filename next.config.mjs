/** @type {import('next').NextConfig} */

// GitHub Pages serves this site under
//   https://willimj3.github.io/shakespeare-in-the-republic/
// so every link and image needs the repo name as a prefix. We set that
// via NEXT_PUBLIC_BASE_PATH in the GitHub Actions workflow; locally it's
// empty so `npm run dev` and `localhost:3000/` continue to work without
// a path prefix.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Pure static export → out/ directory, suitable for GitHub Pages /
  // any plain static host.
  output: "export",
  trailingSlash: true,                  // GitHub Pages serves /path/index.html
  images: {
    // GitHub Pages has no runtime image optimisation, so all <Image>
    // components serve their source files unchanged.
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
