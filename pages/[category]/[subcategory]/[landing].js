import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import landingData from '../../../landing.json';

export default function LandingPage({ content }) {
  const router = useRouter();
  const { category, subcategory, landing } = router.query;

  return (
    <div className="container">
      <Head>
        <title>{content.title} - {subcategory} - {category}</title>
        <meta name="description" content={content.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={content.title} />
        <p className="description">
          {content.body}
        </p>
        <section>
          <h2>Avantages</h2>
          <ul dangerouslySetInnerHTML={{ __html: content.advantages }} />
        </section>
        <section>
          <h2>Appel à l'action</h2>
          <p>{content.cta}</p>
        </section>
        <section>
          <h2>Preuve sociale</h2>
          <p>{content.socialProof}</p>
        </section>
        <section>
          <h2>Présentation du service</h2>
          <div dangerouslySetInnerHTML={{ __html: content.servicePresentation }} />
        </section>
        <section>
          <h2>FAQ</h2>
          <dl dangerouslySetInnerHTML={{ __html: content.faq }} />
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