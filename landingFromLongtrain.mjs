import fs from 'fs';
import { generateContent } from './contentGenerator.mjs';

const landingPath = './landing.json';
const landingData = JSON.parse(fs.readFileSync(landingPath, 'utf-8'));
const pages = landingData.pages;

const prompts = {
  title: `un titre principal de la page pour attirer l'attention de l'utilisateur de maximum 65 caractères.`,
  description: `une phrase d'accroche pour inciter l'utilisateur à en savoir plus sur le service de maximum 165 caractères.`,
  advantages: `une liste des avantages principaux du service avec les balises <li> (n'inclus aucunes autres balises).`,
  socialProof: `une statistiaques sociales impressionnantes en quelques mots pour renforcer notre crédibilité.`,
  servicePresentation: `une présentation en 5 étapes de notre service avec les balises <h2>, <h3>, <li> et <p>.`,
  faq: `une liste de questions/réponses fréquentes sur le sujet avec les balises <dl>.`
};
const promptEnd =
  `\n\n Assure-toi que le contenu est optimisé pour le référencement naturel (SEO) et qu'il incite à l'action. Sois créatif et original ! \n
  Réponds à chaque demande en utilisant un style d'écriture professionnel et engageant. \n
  Réponds uniquement avec le contenu demandé, sans informations supplémentaires. \n
  Voici le contenu que tu as rédigé : \n`;

  async function generateLandingPages() {
    const chunkSize = 10;
    for (let i = 0; i < pages.length; i += chunkSize) {
      const chunk = pages.slice(i, i + chunkSize);
      for (const page of chunk) {
        if (page.title) {
          console.log(`Already exists: ${page.title}`);
          continue; // Skip pages with an existing title
        }
        const longtrain = page.longtrain || "Nom du service"; // Utiliser la valeur de longtrain ou une valeur par défaut
        const promptStart = `Pour le nouveau service gratuit de notre plateforme : "${longtrain}", nous avons besoin que tu rédiges : \n`;
  
        const [generatedTitle, generatedDesc, generatedAdvantages, generatedSocialProof, generatedServicePresentation, generatedFAQ] = await Promise.all([
          generateContent(`${promptStart} ${prompts.title} ${promptEnd}`),
          generateContent(`${promptStart} ${prompts.description} ${promptEnd}`),
          generateContent(`${promptStart} ${prompts.advantages} ${promptEnd}`),
          generateContent(`${promptStart} ${prompts.socialProof} ${promptEnd}`),
          generateContent(`${promptStart} ${prompts.servicePresentation} ${promptEnd}`),
          generateContent(`${promptStart} ${prompts.faq} ${promptEnd}`)
        ]);
  
        // Mettre à jour la page avec les nouvelles données
        page.category = page.category.toLowerCase();
        page.subCategory = page.subCategory.toLowerCase();
        page.slug = longtrain.toLowerCase()
          .replace(/ /g, '-')
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        page.title = generatedTitle;
        page.description = generatedDesc;
        page.advantages = generatedAdvantages;
        page.socialProof = generatedSocialProof;
        page.servicePresentation = generatedServicePresentation;
        page.faq = generatedFAQ;
  
        // Écrire les résultats mis à jour dans le fichier landing.json après chaque page
        fs.writeFileSync(landingPath, JSON.stringify(landingData, null, 2));
        console.log(`(${i + chunk.indexOf(page) + 1}/${pages.length})`);
      }
    }
  }

// Exécuter la fonction
generateLandingPages();