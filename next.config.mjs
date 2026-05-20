/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployed on Vercel as a standard Next.js project — image optimisation
  // is enabled, so source images in /public/images/historical/ are resized
  // and re-encoded on demand. If you ever want to deploy as a pure static
  // export to GitHub Pages or similar, add:
  //   output: 'export',
  //   images: { unoptimized: true },
  // and run `next build` — output lands in out/.
};

export default nextConfig;
