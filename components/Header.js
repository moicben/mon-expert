import { useState } from 'react';
import navigation from '../navigation.json';
import annuaire from '../annuaire.json';

export default function Header({ title }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <a className="logo" href='/'>
        <img src="/mon-expert.png" alt="Logo" />
      </a>
      <button className="burger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={isOpen ? 'open' : ''}>
        <ul>
          {Object.keys(navigation).map((category) => (
            <li key={category}>
              <a href={`/${category.toLowerCase()}`}>{category}</a>
              <ul className='sub-menu'>
                {navigation[category].map((subcategory) => (
                  <li key={subcategory.slug}>
                    <a href={`/${category.toLowerCase()}/${subcategory.slug}`}>
                      {subcategory.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li>
            <a href='/annuaire'>Annuaire</a>
            <ul className='sub-menu'>
              {annuaire.map((city) => (
                <li key={city.slug}>
                  <a href={`/annuaire/${city.slug}`}>
                    {city.ville}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}