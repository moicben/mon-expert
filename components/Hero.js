import React from 'react';

const Hero = ({ title, description, advantages, cta }) => {
return (
    <section className="hero">
        <div className='left'>
            <h1>{title}</h1>
            <h3>{description}</h3>
            {advantages && <div dangerouslySetInnerHTML={{ __html: advantages }} />}
            <a className="cta" href="#commencer">{cta}</a>
        </div>
        <div className='right'>
            <img src="/expert-francais.webp" alt="Hero" />
        </div>
    </section>
);
};

export default Hero;