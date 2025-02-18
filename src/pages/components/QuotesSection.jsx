import { memo, useMemo } from 'react';
import style from '../home/page.module.css';
import QuoteCard from './UI/QuoteCard';

const QuotesSection = memo(function QuotesSection() {
  const quotesData = useMemo(() => [
    {
      author: "Featured",
      description: "United states holocaust memorial museum condemns misuse of holocaust in public discourse"
    },
    {
      author: "Featured",
      description: "Museum strongly condemns antisemitic attacks in amsterdam"
    },
    {
      author: "Featured",
      description: "Museum calls on colleges and universities to address rising antisemitism on campuses"
    }
  ], []);

  // Create duplicated arrays for seamless animation
  const duplicatedQuotes = useMemo(() => 
    [...quotesData, ...quotesData, ...quotesData], [quotesData]
  );

  return (
    <section 
      style={{ scrollMarginTop: "40px" }} 
      id='quote-section' 
      className={style.quotes}
      aria-labelledby="quotes-heading"
    >
      <h2 id="quotes-heading">Quotes</h2>
      <div 
        className={style["scroll-container"]}
        aria-hidden="true"  // Hide from screen readers as decorative
      >
        {/* First scroll track */}
        <ul className={style["quote-container"]}>
          {duplicatedQuotes.map((quote, index) => (
            <QuoteCard 
              key={`quote-1-${index}`} 
              {...quote} 
            />
          ))}
        </ul>
        
        {/* Second scroll track for seamless loop */}
        <ul className={style["quote-container"]}>
          {duplicatedQuotes.map((quote, index) => (
            <QuoteCard 
              key={`quote-2-${index}`} 
              {...quote} 
            />
          ))}
        </ul>
      </div>
      
      {/* Accessible version for screen readers */}
      <div className="sr-only" aria-live="polite">
        {quotesData.map((quote, index) => (
          <div key={`sr-quote-${index}`}>
            <h3>{quote.author}</h3>
            <p>{quote.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

QuotesSection.displayName = 'QuotesSection';
export default QuotesSection;