import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import landingData from '../../landing.json';
import navigation from '../../navigation.json'; // Assuming navigation data is in this file

export default function SubCategory() {
  const landingPages = landingData.pages || [];
  const router = useRouter();
  const { category, subcategory } = router.query;

  // Debugging: Log the landingPages data
  console.log('category:', category);
  console.log('subcategory:', subcategory);
  console.log('landingPages:', landingPages);
  
  // Filter landing pages by category "démarches"
  const filteredLandingPages = landingPages.filter(page => page.category === 'démarches' && page.subcategory === 'juridique');
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
        {filteredLandingPages.length > 0 ? (
          <ul className='listing'>
            {filteredLandingPages.map(page => (
              <li key={page.slug}>
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
      <Footer/>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = [];

  Object.keys(navigation).forEach(category => {
    const subcategories = navigation[category];
    subcategories.forEach(subcategory => {
      paths.push({
        params: { category: category.toLowerCase(), subcategory: subcategory.toLowerCase() }
      });
    });
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { category, subcategory } = params;
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const formattedSubcategory = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
  const subcategories = navigation[formattedCategory] || [];

  return { props: { subcategories } };
}