import { memo } from 'react';
import style from '../home/page.module.css';

const ImageGallery = memo(function ImageGallery() {
  return (
    <section 
      className={style["image-gallery"]}
      aria-label="Historical image gallery"
      role="region"
    >
      <div 
        className={style["gallery-item"]}
        role="figure"
        aria-labelledby="caption1"
      >
        <img 
          src="https://www.echoroukonline.com/wp-content/uploads/2024/09/alge.jpg" 
          alt="Algerian encyclopedia visual archive"
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
        />
        <div id="caption1" className={style["caption"]} role="text">
          ENCYCLOPEDIA
        </div>
      </div>

      <div 
        className={style["gallery-item"]}
        role="figure"
        aria-labelledby="caption2"
      >
        <img 
          src="https://www.aps.dz/ar/media/k2/items/cache/ac3dda62a5e727438153e6342070c176_M.jpg"
          alt="Historical documentation of Algerian resistance"
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
        />
        <div id="caption2" className={style["caption"]} role="text">
          INTRODUCTION TO THE HOLOCAUST
        </div>
      </div>

      <div 
        className={style["gallery-item"]}
        role="figure"
        aria-labelledby="caption3"
      >
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_61gHjdi9bzC-XUs-s_djvojLayowacsM2Q&s"
          alt="Educational resources about Algerian history"
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
        />
        <div id="caption3" className={style["caption"]} role="text">
          RESOURCES FOR EDUCATORS
        </div>
      </div>
    </section>
  );
});

ImageGallery.displayName = 'ImageGallery';
export default ImageGallery;