import fs from 'fs';

// Read and parse the landing.json file
const data = fs.readFileSync('landing.json', 'utf-8');
const landings = JSON.parse(data);

// Debugging: Check the structure of landings
console.log('Landings structure:', landings);

// Ensure landings.pages is an array before filtering
if (Array.isArray(landings.pages)) {
  // Filter out the landings with title "Titre principal"
  const filteredLandings = landings.pages.filter(landing => landing.slug !== "--");

  // Update the original object with the filtered array
  landings.pages = filteredLandings;

  // Write the updated landings back to the landing.json file
  fs.writeFileSync('landing.json', JSON.stringify(landings, null, 2), 'utf-8');

  console.log('Landings with title "Titre principal" have been removed.');
} else {
  console.error('Error: Expected an array of landings in landings.pages.');
}