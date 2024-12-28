import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import landingData from '../../landing.json';

export default function SubCategory({ filteredLandingPages, categoryTitle, subCategoryTitle }) {
  const router = useRouter();
  const { category, subcategory } = router.query;

  return (
    <div className="container">
      <Head>
        <title>{categoryTitle} {subCategoryTitle} - Mon Expert</title>
        <meta name="description" content={`Découvrez des informations complètes et des ressources utiles sur ${subCategoryTitle} dans la catégorie ${categoryTitle}.`} />
        <meta name="keywords" content={`${subCategoryTitle}, ${categoryTitle}, démarches, juridique, conseils, informations`} />
        <meta property="og:title" content={`${categoryTitle} ${subCategoryTitle} - Mon Expert`} />
        <meta property="og:description" content={`Découvrez des informations complètes et des ressources utiles sur ${subCategoryTitle} dans la catégorie ${categoryTitle}.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.monexpert.com/${category}/${subcategory}`} />
        <meta property="og:image" content="/path/to/image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${categoryTitle} ${subCategoryTitle} - Mon Expert`} />
        <meta name="twitter:description" content={`Découvrez des informations complètes et des ressources utiles sur ${subCategoryTitle} dans la catégorie ${categoryTitle}.`} />
        <meta name="twitter:image" content="/path/to/image.jpg" />
      </Head>
      <Header />
      <main className='category'>
        <h1>{categoryTitle} {subCategoryTitle}</h1>
        <p className="description">
          Explorez notre contenu détaillé pour la sous-catégorie {subCategoryTitle} dans la catégorie {categoryTitle}. Trouvez des conseils, des démarches et des informations juridiques pour vous aider.
        </p>
        <div className="sub-categories">
          {filteredLandingPages.map(page => (
            <a key={page.slug} className="sub-category" href={`/${category}/${subcategory}/${page.slug}`}>
              <h2>{page.title}</h2>
              <p>{page.description}</p>
              <span>En savoir plus</span>
            </a>
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
  const categoryTitle = filteredLandingPages.length > 0 ? filteredLandingPages[0].categoryTitle : '';
  const subCategoryTitle = filteredLandingPages.length > 0 ? filteredLandingPages[0].subCategoryTitle : '';

  return { props: { filteredLandingPages, categoryTitle, subCategoryTitle } };
}