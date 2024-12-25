import fs from 'fs';
import path from 'path';

// Function to generate URL entries for the sitemap
const generateUrlEntries = (urls) => {
  return urls.map(url => `
    <url>
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');
};

// Function to generate the sitemap XML
const generateSitemap = (navigation, landing) => {
  const baseUrl = 'https://www.mon-expert.com';

  // Extract URLs from navigation.json
  const navigationUrls = [
    ...navigation.Services,
    ...navigation.Démarches,
    ...navigation.Assistance
  ].map(service => `${baseUrl}/${service.replace(/\s+/g, '-').toLowerCase()}`);

  // Extract URLs from landing.json
  const landingUrls = landing.pages.map((page, index) => `${baseUrl}/page-${index + 1}`);

  // Combine all URLs
  const allUrls = [...navigationUrls, ...landingUrls];

  // Generate sitemap content
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${generateUrlEntries(allUrls)}
  </urlset>`;

  return sitemapContent;
};

// Main function to read JSON files and generate sitemap
const main = async () => {
  try {
    const navigationPath = path.resolve('c:/Users/bendo/Desktop/Documents/Programtic SEO/mon-expert/navigation.json');
    const landingPath = path.resolve('c:/Users/bendo/Desktop/Documents/Programtic SEO/mon-expert/landing.json');

    const navigationData = JSON.parse(fs.readFileSync(navigationPath, 'utf-8'));
    const landingData = JSON.parse(fs.readFileSync(landingPath, 'utf-8'));

    const sitemapContent = generateSitemap(navigationData, landingData);

    const sitemapPath = path.resolve('c:/Users/bendo/Desktop/Documents/Programtic SEO/mon-expert/sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');

    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

main();