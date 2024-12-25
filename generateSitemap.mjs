import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to get landing pages
function getLandings() {
  try {
    const filePath = path.join(__dirname, 'landing.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (!fileContent) {
      console.warn(`File ${filePath} is empty. Skipping.`);
      return [];
    }
    const landingsData = JSON.parse(fileContent);
    return landingsData.pages;
  } catch (error) {
    console.error(`Error loading landings:`, error);
    return [];
  }
}

// Function to get navigation URLs
function getNavigationUrls() {
  try {
    const filePath = path.join(__dirname, 'navigation.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const navigationData = JSON.parse(fileContent);
    return Object.values(navigationData).flat();
  } catch (error) {
    console.error('Error loading navigation data:', error);
    return [];
  }
}

// Function to get landing URLs
function getLandingUrls() {
  try {
    const filePath = path.join(__dirname, 'landing.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const landingData = JSON.parse(fileContent);
    return landingData.urls || [];
  } catch (error) {
    console.error('Error loading landing data:', error);
    return [];
  }
}

async function generateSitemap() {
  const hostname = 'https://mon-expert.online'; // Replace with your actual hostname
  const sitemap = new SitemapStream({ hostname });

  // Add static pages
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  // sitemap.write({ url: '/boutique', changefreq: 'weekly', priority: 0.8 });
  // sitemap.write({ url: '/mentions-legales', changefreq: 'monthly', priority: 0.5 });
  // sitemap.write({ url: '/politique-de-confidentialite', changefreq: 'monthly', priority: 0.5 });
  // sitemap.write({ url: '/conditions-generales', changefreq: 'monthly', priority: 0.5 });

  // Read landings
  const landings = getLandings();

  // Add dynamic product pages
  landings.forEach(product => {
    sitemap.write({ url: `/produits/${product.slug}`, changefreq: 'weekly', priority: 0.7 });
  });

  // Add navigation URLs
  const navigationUrls = getNavigationUrls();
  navigationUrls.forEach(url => {
    sitemap.write({ url: `/${url}`, changefreq: 'monthly', priority: 0.5 });
  });

  // Add landing URLs
  const landingUrls = getLandingUrls();
  landingUrls.forEach(url => {
    sitemap.write({ url: `/${url}`, changefreq: 'monthly', priority: 0.5 });
  });

  sitemap.end();

  const sitemapPath = resolve('public/sitemap.xml');
  const writeStream = createWriteStream(sitemapPath);

  sitemap.pipe(writeStream).on('finish', () => {
    console.log('Sitemap generated at', sitemapPath);
  }).on('error', (err) => {
    console.error('Error generating sitemap:', err);
  });
}

await generateSitemap();