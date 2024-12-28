import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import annuaire from '../../annuaire.json';

export default function Ville({ city, experts }) {
  const router = useRouter();
  const { ville } = router.query;

return (
    <div className="container">
        <Head>
            <title>{city.ville} - Experts</title>
            <meta name="description" content={`Découvrez les experts disponibles à ${city.ville}.`} />
            <meta name="keywords" content={`annuaire, ${city.ville}, experts, SEO`} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header title={`Liste des experts à ${city.ville}`} />
        <main className='category'>
            <h1>Experts à {city.ville}</h1>
            <p className="description">
                Découvrez les experts disponibles à {city.ville}.
            </p>
            <div className="sub-categories">
                {experts.map(expert => (
                    <a key={expert.slug} className="sub-category" href={`/annuaire/${ville}/${expert.slug}`}>
                        <h2>{expert.nom}</h2>
                        <p>{expert.categorie}</p>
                        <span>Voir les profils</span>
                    </a>
                ))}
            </div>
        </main>
        <Footer />
    </div>
);
}

export async function getStaticPaths() {
  const paths = annuaire
    .filter(city => city.slug) // Filter out entries without a slug
    .map(city => ({
      params: { ville: city.slug.toString() }
    }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const city = annuaire.find(city => city.slug === params.ville);
  const experts = city ? city.experts : [];

  return { props: { city, experts } };
}