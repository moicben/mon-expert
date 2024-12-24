import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import navigation from '../navigation.json';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by exploring the categories below:
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