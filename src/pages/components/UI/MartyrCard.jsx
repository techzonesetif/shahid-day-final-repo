import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../home/page.module.css'
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


function MartyrCard(props) {

    const {title, descreption, date, img} = props;

    return (
        <section className={style["martyr-card"]}>
            <img src={img} alt='martyr-img' />
            <div className={style["content-section"]}>
                <h3 className={style['title']}>{title}</h3>
                <p className={style['desc']}>{descreption}</p>
                <div className={style["date-section"]}>
                    <FontAwesomeIcon icon={faCalendar} /> {date}
                </div>
            </div>
        </section>
    )
}

export default MartyrCard;