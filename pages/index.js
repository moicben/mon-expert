import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import navigation from '../navigation.json';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Mon Expert | Services en ligne pour particuliers</title>
        <meta name="description" content="Découvrez nos services en ligne pour particuliers, conçus pour répondre à tous vos besoins." />
        <meta name="keywords" content="services en ligne, particuliers, assistance, support, expertise" />
        <meta name="author" content="Mon Expert" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Bienvenue sur Mon Expert!" />
        <p className="description">
          Commencez par explorer les catégories ci-dessous :
        </p>
        <ul>
          {Object.keys(navigation).map(category => (
            <li key={category}>
              <a href={`/${category.toLowerCase()}`}>{category}</a>
              <ul>
                {navigation[category].map(subcategory => (
                  <li key={subcategory}>
                    <a href={`/${category.toLowerCase()}/${subcategory.toLowerCase().replace(/ /g, '-')}`}>
                      {subcategory}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}