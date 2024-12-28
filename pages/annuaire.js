import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import annuaire from '../annuaire.json';

export default function Annuaire() {
  const router = useRouter();

  return (
    <div className="container">
      <Head>
        <title>Annuaire des Villes</title>
        <meta name="description" content="Découvrez les villes disponibles dans notre annuaire." />
        <meta name="keywords" content="annuaire, villes, experts, SEO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Annuaire des Villes" />
      <main className='villes'>
        <h1>Villes Disponibles</h1>
        <p className="description">
          Découvrez les villes disponibles dans notre annuaire.
        </p>
        <ul className='listing'>
          {annuaire.map(city => (
            <li key={city.slug}>
              <a href={`/annuaire/${city.slug}`}>
                {city.ville }
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}