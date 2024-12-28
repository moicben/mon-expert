import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import annuaire from '../../../annuaire.json';

export default function Expert() {
  const router = useRouter();
  const { ville, expert } = router.query;

  useEffect(() => {
    console.log('Ville:', ville);
    console.log('Expert:', expert);

    const cityData = annuaire.find(city => city.slug === ville);
    console.log('City Data:', cityData);

    const expertData = cityData ? cityData.experts.find(exp => exp.slug === expert) : null;
    console.log('Expert Data:', expertData);

    const profiles = expertData && expertData.profiles ? expertData.profiles : [];
    console.log('Profiles:', profiles);
  }, [ville, expert]);

  const cityData = annuaire.find(city => city.slug === ville);
  const expertData = cityData ? cityData.experts.find(exp => exp.slug === expert) : null;
  const profiles = expertData && expertData.profiles ? expertData.profiles : [];

  console.log('Ville:', ville);
  console.log('Expert:', expert);
  console.log('City Data:', cityData);
  console.log('Expert Data:', expertData);
  console.log('Profiles:', profiles);

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