import { NetlifyAPI } from 'netlify';
import { execSync } from 'child_process';
import path from 'path';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'mon-expert.online';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN_WEBMASTER, GOOGLE_REFRESH_TOKEN_VERIFICATION, GOOGLE_SCOPE } = process.env;

console.log('Initializing OAuth2 client...');
const oauth2ClientWebmaster = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

oauth2ClientWebmaster.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN_WEBMASTER });

const oauth2ClientVerification = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

oauth2ClientVerification.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN_VERIFICATION });

const webmasters = google.webmasters({
  version: 'v3',
  auth: oauth2ClientWebmaster
});

async function submitSitemap(siteUrl, sitemapUrl) {
  try {
    console.log(`Submitting sitemap: ${sitemapUrl}`);
    // Envoyer le sitemap à Google Search Console
    const response = await webmasters.sitemaps.submit({
      siteUrl,
      feedpath: sitemapUrl
    });
    console.log(`Sitemap submitted: ${sitemapUrl}`);
    console.log('Response:', response);
  } catch (error) {
    console.error('Error submitting sitemap:', error.message);
    console.error('Error details:', error);
  }
}

const siteUrl = "https://mon-expert.online/";
const sitemapUrl = "https://mon-expert.online/sitemap.xml";

// Envoyer le sitemap à Google Search Console
await submitSitemap(siteUrl, sitemapUrl);