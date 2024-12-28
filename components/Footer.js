import navigation from '../navigation.json';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="column">
        <a href="/"><img src="/mon-expert.png" alt="Mon Expert Logo" className="logo" /></a>
        <p>Le service tout-en-un qui simplifie la gestion juridique, fiscale et comptable des entrepreneurs, TPE et freelances. Grâce à un accompagnement personnalisé par des experts qualifiés et des outils digitaux performants, "Mon Expert" vous aide à créer, gérer et optimiser votre entreprise en toute sérénité. Accessible, transparent et conçu pour libérer votre temps, il vous permet de vous concentrer sur l'essentiel : développer votre activité, sans les tracas administratifs.</p>
      </div>
      {Object.keys(navigation).map((category) => (
        <div className="column" key={category}>
          <h3>{category}</h3>
          <ul>
            {navigation[category].map((subcategory) => (
              <li key={subcategory.slug}>
                <a href={`/${category.toLowerCase()}/${subcategory.slug}`}>
                  {subcategory.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
}