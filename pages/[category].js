import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import navigation from '../navigation.json';

export default function Category({ subcategories = [] }) {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="container">
      <Head>
        <title>{category} - Category</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title={`${category} - Category`} />
      <main className='category'>
        <h1>{category}</h1>
        <p className="description">
          Contenu pour la catégorie {category}.
        </p>
        <ul className='listing'>
          {subcategories.map(subcategory => (
            <li key={subcategory}>
              <a href={`/${category}/${subcategory.toLowerCase().replace(/ /g, '-')}`}>
                {subcategory}
              </a>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(navigation).map(category => ({
    params: { category: category.toLowerCase() }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { category } = params;
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const subcategories = navigation[formattedCategory] || [];

  return { props: { subcategories } };
}