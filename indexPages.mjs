import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import xml2js from 'xml2js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'mon-expert.online';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN_WEBMASTER } = process.env;

console.log('Initializing OAuth2 client...');
const oauth2ClientWebmaster = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

oauth2ClientWebmaster.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN_WEBMASTER });

const webmasters = google.webmasters({
  version: 'v3',
  auth: oauth2ClientWebmaster
});

async function submitUrls(urls) {
  for (const url of urls) {
    try {
      console.log(`Submitting URL: ${url}`);
      const response = await webmasters.sitemaps.submit({
        siteUrl: DOMAIN,
        feedpath: url
      });
      console.log(`URL submitted: ${url}`);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error submitting URL:', error.message);
      console.error('Error details:', error);
    }
  }
}

async function getUrlsFromSitemap(sitemapPath) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const result = await xml2js.parseStringPromise(xml);
  const urls = result.urlset.url.map(entry => entry.loc[0]);
  return urls.slice(0, 100); // Get the first 100 URLs
}

const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
const urls = await getUrlsFromSitemap(sitemapPath);

// Submit the URLs
await submitUrls(urls);