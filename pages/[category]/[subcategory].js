import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import landingData from '../../landing.json';

export default function SubCategory({ filteredLandingPages }) {
  const router = useRouter();
  const { category, subcategory } = router.query;

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

export async function getStaticPaths() {
  const paths = landingData.pages.map(page => ({
    params: { category: page.category.toLowerCase(), subcategory: page.subCategory.toLowerCase() }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { category, subcategory } = params;
  const filteredLandingPages = landingData.pages.filter(page => page.category.toLowerCase() === category && page.subCategory.toLowerCase() === subcategory);

  return { props: { filteredLandingPages } };
}