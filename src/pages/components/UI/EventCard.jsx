import PropTypes from 'prop-types';
import { memo, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCalendar } from "@fortawesome/free-solid-svg-icons";
import style from '../../home/page.module.css'

const EventCard = memo(function EventCard({ title, description, date, link, img }) {
  // Format date once on render
  const formattedDate = useMemo(() => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [date]);

  // Preload hover state assets
  useEffect(() => {
    const img = new Image();
    img.src = link; // Preload linked page assets
  }, [link]);

  return (
    <article className={style["event-card"]} role="article" aria-labelledby="event-title">
      <figure className={style["event-image-wrapper"]}>
        <img 
          src={img} 
          alt={`Visual representation of ${title}`}
          loading="lazy"
          decoding="async"
          width="400"
          height="225"
          className={style["event-image"]}
        />
      </figure>
      
      <div className={style["event-content"]}>
        <h3 id="event-title" className={style["event-title"]}>{title}</h3>
        <p className={style["event-description"]}>{description}</p>
        
        <time 
          dateTime={date} 
          className={style["event-date"]}
          aria-label={`Event date: ${formattedDate}`}
        >
          <FontAwesomeIcon icon={faCalendar} aria-hidden="true" />
          <span>{formattedDate}</span>
        </time>

        <Link 
          to={link} 
          className={style["card-link"]}
          aria-label={`Read more about ${title}`}
          prefetch="intent" // If using Remix or React Router 6.4+
        >
          <span>Read more</span>
          <FontAwesomeIcon 
            className={style["link-icon"]} 
            icon={faAngleRight} 
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
});

EventCard.displayName = 'OptimizedEventCard';

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]).isRequired,
  link: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};

export default EventCard;