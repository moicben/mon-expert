import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import landingData from '../../../landing.json';



export default function LandingPage({ content, category, subcategory }) {
  return (
    <div className="container">
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet"/>
      </Head>
      <Header/>
      <main>
        <section className="hero">
          <div className='left' >
            <h1>{ content.title }</h1>
            <p>{ content.description }</p>
            <div dangerouslySetInnerHTML={{ __html: content.advantages }}/>
            <a className="cta" href="#commencer">Commencer gratuitement</a>
          </div>
          <div className='right'>
            <img src="/expert-francais.webp" alt="Hero" />
          </div>
        </section>

        <section className="proof">
          <div className="block">
            <img src="/google.svg" alt="Block 2" />
            <p>4,4/5 sur 11649 avis</p>
          </div>
          <div className="block">
            <img src="/legalstart.png" alt="Block 1" />
            <p>Plus de 750.000 clients aidés</p>
          </div>
          <div className="block">
            <img src="/avis-verifies.svg" alt="Block 3" />
            <p>4,8/5 sur 3599 avis</p>
          </div>
        </section>

        <section className="presentation">
          <div dangerouslySetInnerHTML={{ __html: content.servicePresentation }} />
        </section>

        <section className="faq">
          <h2><span className='colored'>Questions fréquentes :</span> {content.longtrain}</h2>
          <div dangerouslySetInnerHTML={{ __html: content.faq }} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = landingData.pages
    .filter(page => page.slug) // Filter out pages without a slug
    .map(page => {
      return {
        params: {
          category: page.category,
          subcategory: page.subCategory,
          landing: page.slug
        }
      };
    });

  console.log(paths); // Add this line to log the paths

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { landing } = params;
  const content = landingData.pages.find(page => page.slug === landing);

  if (!content) {
    return {
      notFound: true,
    };
  }

  return { props: { content } };
}