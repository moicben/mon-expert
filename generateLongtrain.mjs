import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { OpenAI } from 'openai';

// Charger la clé API OpenAI à partir des variables d'environnement
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const navigationPath = path.join(__dirname, 'navigation.json');
const navigationData = JSON.parse(fs.readFileSync(navigationPath, 'utf-8'));

// Fonction pour générer des mots-clés de longue traîne
async function generateKeywords(categorie, sousCategorie) {
  const prompt = `
  Rédige 20 requêtes de recherche transactionnelles uniques Google qu'un utilisateur pourrait écrire.\n
  Réponds uniquement avec les mots clés de longue traîne.\n
  Chaque requête doit être spécifique et claire.\n
  Chaque requête doit cibler un besoin important de l'utilisateur.\n
  Chaque requête doit être en français.\n
  Chaque requête doit être pertinente pour la catégorie "${categorie}" "${sousCategorie}".\n
  Les requêtes ne doivent pas inclure de dates ou de lieux spécifiques.\n
  Chaque requête doit contenir entre 2 et 6 mots.\n
  N'utilise pas de ponctuation excessive.\n
  Liste les requêtes sur des lignes séparées sans chiffre ou tiret au début.\n
  N'inclus pas de chiffres ou de symboles.\n
  Voici les requêtes:\n
  `;
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
        { role: 'system', content: 'Tu es un assistant français specialisé en rédaction web et SEO' },
        { role: 'user', content: prompt }
    ],
    max_tokens: 3000,
  });
  return response.choices[0].message.content.trim().split('\n').filter(req => req);
}

// Fonction principale pour traiter chaque catégorie/sous-catégorie
async function main() {
    const resultats = { pages: [] };

    // Traiter toutes les catégories et sous-catégories
    for (const categorie in navigationData) {
        const sousCategories = navigationData[categorie];
        const totalSousCategories = sousCategories.length;

        for (let i = 0; i < totalSousCategories; i++) {
            const sousCategorie = sousCategories[i];
            console.log(`${i + 1}/${totalSousCategories} de ${categorie}: ${sousCategorie}`);
            const motsCles = await generateKeywords(categorie, sousCategorie);
            motsCles.forEach(motCle => {
                resultats.pages.push({
                    category: categorie,
                    subCategory: sousCategorie,
                    longtrain: motCle
                });
            });
        }
    }

    // Écrire les résultats dans le fichier landing.json
    const landingPath = path.join(__dirname, 'landing.json');
    fs.writeFileSync(landingPath, JSON.stringify(resultats, null, 2));
    console.log('Résultats écrits dans landing.json');
}

main();