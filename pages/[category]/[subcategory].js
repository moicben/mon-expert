import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import landingData from '../../landing.json';

export default function SubCategory() {
  const router = useRouter();
  const { category, subcategory } = router.query;

  // Debugging: Log the landingPages data
  console.log('category:', category);
  console.log('subcategory:', subcategory);

  // Filter landing pages by category and subcategory
  const filteredLandingPages = landingData.pages.filter(page => page.category === category && page.subCategory === subcategory);
  console.log('filteredLandingPages:', filteredLandingPages);

  return (
    <div className="container">
      <Head>
        <title>{subcategory} - {category} | Mon Expert</title>
        <meta name="description" content={`Découvrez des informations et des ressources sur ${subcategory} dans la catégorie ${category}.`} />
        <meta name="keywords" content={`${subcategory}, ${category}, démarches, juridique`} />
      </Head>
      <Header/>
      <main className='category'>
        <h1>{subcategory} - {category}</h1>
        <p className="description">
          Contenu pour la sous-catégorie {subcategory} dans la catégorie {category}.
        </p>
        <div className="landing-pages">
          {filteredLandingPages.map(page => (
            <div key={page.slug} className="landing-page">
              <h2>{page.title}</h2>
              <p>{page.description}</p>
              <a href={`/${category}/${subcategory}/${page.slug}`}>En savoir plus</a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}