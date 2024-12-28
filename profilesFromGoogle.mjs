import puppeteer from 'puppeteer';
import fs from 'fs';

// Function to scrape Google Maps results
const scrapeGoogleMaps = async (page, query) => {
    await page.setViewport({ width: 360, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(`https://www.google.com/maps/search/${query}`);

    await page.waitForTimeout(1000);

    // Scroll down 20 times
    for (let i = 0; i < 20; i++) {
        await page.evaluate(() => {
            const element = document.querySelector('#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div > div');
            if (element) {
                element.scrollBy(0, 10000);
            }
        });
        await page.waitForTimeout(100); // Wait for 2 seconds between scrolls
    }
    await page.waitForTimeout(1000)

    let results = [];
    try {
        // Wait for the results to load
        await page.waitForSelector('.bfdHYd.Ppzolf.OFBs3e');

        // Extract the results
        results = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('.bfdHYd.Ppzolf.OFBs3e'));
            return items.slice(0, 150).map(item => ({
                name: item.querySelector('.qBF1Pd.fontHeadlineSmall').innerText,
                address: item.querySelector('.W4Efsd span:nth-child(3) > span:nth-child(2)')?.innerText || 'N/A',
                phone: item.querySelector('.UsdlK')?.innerText || 'N/A',
                site: item.querySelector('div.lI9IFe > div.Rwjeuc > div:nth-child(1) > a')?.href || 'N/A',
                rating: item.querySelector('.e4rVHe span[role="img"]')?.getAttribute('aria-label')?.split(' ')[0] || 'N/A',
                reviews: item.querySelector('.e4rVHe span[role="img"] .UY7F9')?.innerText.replace(/[()]/g, '') || 'N/A'
            }));
        });
    } catch (error) {
        console.error('Error extracting results:', error);
    }

    return results;
};

// Read and parse the annuaire.json file
const annuaireData = fs.readFileSync('annuaire.json', 'utf-8');
const annuaire = JSON.parse(annuaireData);

// Function to scrape all experts with a dynamic number of browsers
const scrapeAllExperts = async (numBrowsers) => {
    const browsers  = await Promise.all(Array.from({ length: numBrowsers }, () => puppeteer.launch({ 
      headless: "new",
      defaultViewport: { width: 360, height: 800 },
      args: ['--no-sandbox', 
            '--disable-setuid-sandbox',
            '--screen-size=360x800',
          ]
    })));
    const pages = await Promise.all(browsers.map(browser => browser.newPage()));

    let totalExperts = 0;
    annuaire.forEach(city => totalExperts += city.experts.length);
    let currentIndex = 0;

    for (const city of annuaire) {
        for (const expert of city.experts) {
            currentIndex++;
            if (expert.nom) {
                if (expert.profiles) {
                    console.log(`Profiles already exist for ${expert.nom} in ${city.ville}, skipping...`);
                    continue;
                }
                const query = `${expert.nom} ${city.ville}`;
                try {
                    const page = pages[currentIndex % numBrowsers];
                    const profiles = await scrapeGoogleMaps(page, query);
                    expert.profiles = profiles;

                    // Update the profiles key for the expert
                    fs.writeFileSync('annuaire.json', JSON.stringify(annuaire, null, 2), 'utf-8');
                } catch (error) {
                    console.error(`Error scraping profiles for ${expert.nom} in ${city.ville}, skipping...`, error);
                    continue;
                }
            }
            console.log(`Progress: ${currentIndex}/${totalExperts} - ${expert.nom}/${city.ville}`);
        }
    }

    await Promise.all(browsers.map(browser => browser.close()));
};

// Call the function with the desired number of browsers
const numBrowsers = 10; // Change this number to the desired number of browsers
scrapeAllExperts(numBrowsers).then(() => {
    console.log('Scraping completed and annuaire.json updated.');
}).catch(err => {
    console.error('Error during scraping:', err);
});