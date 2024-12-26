/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Utiliser l'exportation statique
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const landingData = require('./landing.json');
    const paths = {
      ...defaultPathMap,
      '/[category]/[subcategory]': { page: '/[category]/[subcategory]' },
      '/[category]/[subcategory]/[landing]': { page: '/[category]/[subcategory]/[landing]' },
    };

    // Add paths for each dynamic route
    landingData.pages.forEach(page => {
      paths[`/${page.category}/${page.subCategory}/${page.slug}`] = {
        page: '/[category]/[subcategory]/[landing]',
        query: { category: page.category, subcategory: page.subCategory, landing: page.slug },
      };
    });

    return paths;
  },
};

module.exports = nextConfig;