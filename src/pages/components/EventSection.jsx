// import { cardsData } from '../data/EventsCardsData';
// import style from '../home/page.module.css'
// import EventCard from './UI/EventCard';

// function EventSection() {

//     return (
//       <section  id='events-section' style={{  scrollMarginTop: "40px"}} className={style["events"]}>
//         <h2>Famous Events</h2>
//         <div className={style["events-grid"]}>
//           <EventCard {...cardsData.card1} />
//           <EventCard {...cardsData.card2} />
//           <EventCard {...cardsData.card3} />
//           <EventCard {...cardsData.card4} />
//           <EventCard {...cardsData.card5} />
//           <EventCard {...cardsData.card6} />
//         </div>
//         <a href="/article" className={style["view-events"]} rel="noopener noreferrer">
//           For more event
//         </a>
//       </section>
//     )
// }
// export default EventSection;

import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cardsData } from '../data/EventsCardsData';
import style from '../home/page.module.css';
import EventCard from './UI/EventCard';

const EventSection = memo(function EventSection() {
  const eventCards = useMemo(() => [
    cardsData.card1,
    cardsData.card2,
    cardsData.card3,
    cardsData.card4,
    cardsData.card5,
    cardsData.card6
  ], []);

  return (
    <section 
      id='events-section' 
      style={{ scrollMarginTop: "40px" }}
      className={style.events}
      aria-labelledby="events-heading"
    >
      <h2 id="events-heading">Famous Events</h2>
      <div 
        className={style["events-grid"]}
        role="list"
        aria-label="List of historical events"
      >
        {eventCards.map((card, index) => (
          <EventCard 
            key={`event-card-${index}`}
            {...card}
            aria-label={`Event ${index + 1}: ${card.title}`}
          />
        ))}
      </div>
      <Link 
        to="/article" 
        className={style["view-events"]}
        aria-label="View more historical events"
      >
        For more events
      </Link>
    </section>
  );
});

export default EventSection;