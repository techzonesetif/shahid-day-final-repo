import { memo } from 'react';
import style from '../home/page.module.css';

const HeroSection = memo(function HeroSection() {
  return (
    <section 
      id='hero' 
      className={style.hero}
      aria-labelledby="hero-heading"
      role="region"
    >
      <h2 id="hero-heading" className={style["hero-heading"]}>
        The History of Algeria: A Legacy of Resistance and Independence
      </h2>
      <p className={style["hero-subtext"]}>
        Explore Algeria’s rich history, from ancient civilizations to the heroic struggle for independence
      </p>
    </section>
  );
});

// Optional: Add display name for better React DevTools visibility
HeroSection.displayName = 'HeroSection';

export default HeroSection;