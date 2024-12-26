import { useState } from 'react';
import navigation from '../navigation.json';

export default function Header({ title }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="logo">
        <img src="/mon-expert.png" alt="Logo" />
      </div>
      <button className="burger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={isOpen ? 'open' : ''}>
        <ul>
          {Object.keys(navigation).map((category) => (
            <li key={category}>
              <a href={`/${category.toLowerCase()}`}>{category}</a>
              <ul className='sub-menu'>
                {navigation[category].map((item) => (
                  <li key={item}>
                    <a href={`/${category.toLowerCase()}/${item.toLowerCase().replace(/ /g, '-')}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}