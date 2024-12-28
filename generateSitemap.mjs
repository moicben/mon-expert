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
    return Object.entries(navigationData).map(([category, subcategories]) => ({
      category,
      subcategories
    }));
  } catch (error) {
    console.error('Error loading navigation data:', error);
    return [];
  }
}

// Function to get annuaire data
function getAnnuaireData() {
  try {
    const filePath = path.join(__dirname, 'annuaire.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const annuaireData = JSON.parse(fileContent);
    return annuaireData;
  } catch (error) {
    console.error('Error loading annuaire data:', error);
    return [];
  }
}

async function generateSitemap() {
  const hostname = 'https://mon-expert.online'; // Replace with your actual hostname
  const sitemap = new SitemapStream({ hostname });

  // Add static pages
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });

  // Read navigation URLs
  const navigationUrls = getNavigationUrls();

  // Add category and subcategory pages
  navigationUrls.forEach(({ category, subcategories }) => {
    sitemap.write({ url: `/${category.toLowerCase()}`, changefreq: 'weekly', priority: 0.8 });
    subcategories.forEach(subcategory => {
      if (subcategory.slug) {
        sitemap.write({ url: `/${category.toLowerCase()}/${subcategory.slug}`, changefreq: 'weekly', priority: 0.7 });
      } else {
        console.warn(`Skipping subcategory: ${JSON.stringify(subcategory)} as it does not have a slug.`);
      }
    });
  });

  // Read landings
  const landings = getLandings();

  // Add landing pages
  landings.forEach(page => {
    sitemap.write({ url: `/${page.category.toLowerCase()}/${page.subCategory.toLowerCase().replace(/ /g, '-')}/${page.slug}`, changefreq: 'weekly', priority: 0.6 });
  });

  // Read annuaire data
  const annuaireData = getAnnuaireData();

  // Add annuaire pages
  annuaireData.forEach(city => {
    city.experts.forEach(expert => {
      if (city.slug && expert.slug) {
        sitemap.write({ url: `/annuaire/${city.slug}/${expert.slug}`, changefreq: 'weekly', priority: 0.6 });
      }
    });
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