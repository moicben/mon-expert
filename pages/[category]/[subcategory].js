import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import landingData from '../../landing.json';

export default function SubCategory() {
  const landingPages = landingData.pages || [];
  const router = useRouter();
  const { category, subcategory } = router.query;

  // Debugging: Log the landingPages data
  console.log('landingPages:', landingPages);

  return (
    <div className="container">
      <Head>
        <title>{subcategory} - {category}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={`${subcategory} - ${category}`} />
        <p className="description">
          Contenu pour la sous-catégorie {subcategory} dans la catégorie {category}.
        </p>
        {landingPages.length > 0 ? (
          <ul>
            {landingPages.map(page => (
              <li key={page.title}>
                <a href={`/${category}/${subcategory}/${page.slug}`}>
                  {page.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Pas de données</p>
        )}
      </main>

      <Footer />
    </div>
  );
}