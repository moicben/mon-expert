import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import annuaire from '../../../annuaire.json';

export default function Expert({ cityData, expertData, profiles }) {
  const router = useRouter();
  const { ville, expert } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Head>
        <title>Profils pour {expert} à {ville}</title>
        <meta name="description" content={`Découvrez les profils disponibles pour ${expert} à ${ville}.`} />
        <meta name="keywords" content={`annuaire, ${ville}, ${expert}, experts, SEO`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className='category'>
        <h1>{expert} à {ville}</h1>
        <p className="description">
          Découvrez les profils disponibles pour {expert} à {ville}.
        </p>
        <div className='sub-categories'>
          {profiles.map(profile => (
            <a className='sub-category' key={profile.id} href={`${profile.site}`} target='_blank' rel='noreferrer nofollow'>
              <h3>{profile.name}</h3>
              <p>{(profile.site).replace(/https:/, '').replace(/\//g,'')}</p>
              <p>{profile.phone}</p>
              <span>Découvrir le profil</span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = annuaire.flatMap(city =>
    city.experts
      .filter(expert => city.slug && expert.slug) // Vérifiez que city.slug et expert.slug existent
      .map(expert => ({
        params: { ville: city.slug, expert: expert.slug }
      }))
  );

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const cityData = annuaire.find(city => city.slug === params.ville);
  const expertData = cityData ? cityData.experts.find(exp => exp.slug === params.expert) : null;
  const profiles = expertData && expertData.profiles ? expertData.profiles : [];

  return {
    props: {
      cityData,
      expertData,
      profiles
    }
  };
}