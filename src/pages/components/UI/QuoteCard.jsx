// import { faClock, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import style from '../../home/page.module.css'

// function QuoteCard(props) {

//     const {author, description} = props;

//     return(
//         <div className={style["quotes-card"]}>
//             <p className={style["quote-desc"]}>{description}</p>
//             <h3 className={style["quote-title"]}>{author}</h3>
//         </div>
//     )
// }
// export default QuoteCard;
import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import style from '../../home/page.module.css';

const QuoteCard = memo(function QuoteCard({ author, description }) {
  return (
    <article 
      className={style["quotes-card"]}
      role="article"
      aria-labelledby={`quote-author-${author}`}
    >
      <FontAwesomeIcon 
        icon={faQuoteLeft} 
        className={style["quote-icon"]}
        aria-hidden="true"
      />
      <blockquote className={style["quote-desc"]}>
        {description}
      </blockquote>
      <cite 
        id={`quote-author-${author}`}
        className={style["quote-title"]}
      >
        {author}
      </cite>
    </article>
  );
});

QuoteCard.propTypes = {
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

QuoteCard.displayName = 'QuoteCard';

export default QuoteCard;