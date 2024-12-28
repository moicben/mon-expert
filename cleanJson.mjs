import fs from 'fs';

// Read and parse the landing.json file
const data = fs.readFileSync('landing.json', 'utf-8');
const landings = JSON.parse(data);

// Ensure landings.pages is an array before processing
if (Array.isArray(landings.pages)) {
  // Filter out pages with "Titre principal" in the title
  landings.pages = landings.pages.filter(landing => !landing.title.includes("Titre principal"));

  // Process each landing page
  landings.pages.forEach(landing => {
    if (landing.title) {
      // Remove all asterisks from the title
      landing.title = landing.title.replace(/\*/g, '');
    }
    if (landing.category) {
      // ...existing code...
    }
  });
}

// Write the updated data back to the landing.json file
fs.writeFileSync('landing.json', JSON.stringify(landings, null, 2), 'utf-8');