import style from '../home/page.module.css'
import QuoteCard from './UI/QuoteCard';
import { quotesData } from '../data/quotesCardsData';

function QuotesSection() {

  return (
    <section style={{scrollMarginTop: "40px"}} id='quote-section' className={style["quotes"]}>
      <h2>Quotes</h2>
      <div className={style["scroll-container"]}>
        <ul aria-hidden="true" className={style["quote-container"]}>
          <QuoteCard {...quotesData.card1} />
          <QuoteCard {...quotesData.card2} />
          <QuoteCard {...quotesData.card3} />
          <QuoteCard {...quotesData.card4} />
          <QuoteCard {...quotesData.card5} />
          <QuoteCard {...quotesData.card6} />
        </ul>
        <ul aria-hidden="true" className={style["quote-container"]}>
          <QuoteCard {...quotesData.card1} />
          <QuoteCard {...quotesData.card2} />
          <QuoteCard {...quotesData.card3} />
          <QuoteCard {...quotesData.card4} />
          <QuoteCard {...quotesData.card5} />
          <QuoteCard {...quotesData.card6} />

        </ul>
      </div>
    </section>
  )
}

export default QuotesSection;