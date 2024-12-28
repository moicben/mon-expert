import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Hero from '@components/Hero';

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
      <Header title="Bienvenue sur Mon Expert!" />
      <main >

      <Hero
          title='Des services en ligne pour vous simplifier la vie'
          description='Découvrez nos solutions adaptées à vos besoins'
          cta='Commencer gratuitement'
        /> 


        <section className="categoryGrid">
          {Object.keys(navigation).map(category => (
            <div key={category} className="categoryCard">
              <a href={`/${category.toLowerCase()}`} className="categoryLink">{category}</a>
              <ul className="subcategoryList">
                {navigation[category].map(subcategory => (
                  <li key={subcategory.slug} className="subcategoryItem">
                    <a href={`/${category.toLowerCase()}/${subcategory.slug}`} className="subcategoryLink">
                      {subcategory.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="section">
          <h2 className="sectionTitle">À propos de nous</h2>
          <p className="sectionContent">
            Mon Expert est une plateforme dédiée à fournir des services en ligne pour les particuliers. Nous nous engageons à offrir des solutions adaptées à vos besoins spécifiques.
          </p>
        </section>

        <section className="section">
          <h2 className="sectionTitle">Nos Services</h2>
          <p className="sectionContent">
            Nous proposons une gamme variée de services pour vous aider dans différents domaines :
          </p>
          <ul className="serviceList">
            <li className="serviceItem">Consultation en ligne</li>
            <li className="serviceItem">Support technique</li>
            <li className="serviceItem">Assistance administrative</li>
            <li className="serviceItem">Et bien plus encore...</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}