import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = ({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(configuration);

export async function generateContent(prompt) {
  try {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'Tu es un rédacteur français expert en rédaction web et SEO, travaillant exclusivement pour "Mon Expert", une plateforme spécialisée dans l’assistance en ligne et les services numériques. Ta mission est de produire du contenu à haut niveau de conversion pour nos landings pages optimisées pour le référencement naturel (SEO). Tes textes doivent être structurés et engageants !' },
            { role: 'user', content: prompt }
        ],
        max_tokens: 2000
    });
    let result = response.choices[0].message.content.trim();
    result = result.replace(/[`"'']/g, '');
    return result;

  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}