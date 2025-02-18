




import { useEffect, useState,  useMemo, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import style from './page.module.css';
import PropTypes from 'prop-types';
import { data } from '../data/articles';


const MemoizedHelmet = memo(() => (
  <Helmet>
    <title>Historical Articles & Archives | Algerian History Resource Center</title>
    <meta name="description" content="Access 500+ scholarly articles, rare documents, and multimedia archives chronicling Algeria's journey from antiquity to modernity." />
    <meta name="keywords" content="Algerian archives, historical documents, research papers, FLN archives, Algerian revolution documents, Berber history" />
    
    <meta property="og:title" content="Historical Articles & Archives | Algerian History Resource Center" />
    <meta property="og:description" content="Explore our extensive collection of primary sources and academic analyses of Algerian history." />
    <meta property="og:image" content="https://shahid-day.netlify.app/assets/gallery-preview.jpg" />
    <meta property="og:url" content="https://shahid-day.netlify.app/articles" />
    <meta property="og:type" content="article" />
    
    <meta name="twitter:title" content="Historical Articles & Archives" />
    <meta name="twitter:description" content="Dive into Algeria's past through curated collections of historical documents and expert analyses" />
    
    <link rel="canonical" href="https://shahid-day.netlify.app/articles" />
    <link rel="alternate" type="application/rss+xml" href="https://shahid-day.netlify.app/rss/articles" />
  </Helmet>
));
MemoizedHelmet.displayName = 'MemoizedHelmet';


const ArticlePreview = memo(() => {
  const { link } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const predata = useMemo(
    () => data.find(article => article.title?.replace(/\s+/g, '_') === link),
    [link]
  );

  return (
    <main className={style.article_preview}>
      {link && (
        <>
          <img
            src={predata?.image}
            className={`${style.preview_img} ${isLoaded ? style.loaded : ''}`}
            onLoad={() => setIsLoaded(true)}
            alt={predata?.title}
          />
          <h1>{predata?.title}</h1>
          <div className={style.preview_body}>
            <div className={style.listag}>
              {predata?.tags?.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className={style.preview_text}>{predata?.description}</p>
          </div>
          <div className={style.preview_footer}>
            <div className={style.article__author}>
              <h4>by: {predata?.author}</h4>
              <span>{predata?.date}</span>
            </div>
            <Link 
              to={`/article/${predata?.title?.replace(/\s+/g, '_')}`} 
              className={style.button}
            >
              Read more
            </Link>
          </div>
        </>
      )}
    </main>
  );
});
ArticlePreview.displayName = 'ArticlePreview';
 
export default function ArticlesPage() {
const [datas,setData]=useState([])  
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setData(data)
  },[]);

  const structuredData = useMemo(() => JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": data.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "headline": article.title,
        "description": article.description,
        "author": { "@type": "Person", "name": article.author },
        "datePublished": article.date,
        "image": article.image,
        "keywords": article.tags.join(', '),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://shahid-day.netlify.app/articles/${encodeURIComponent(article.title.toLowerCase().replace(/ /g, '-'))}`
        }
      }
    }))
  }), []);

  return (
    <div className={style.page}>
      <MemoizedHelmet>
        <script type="application/ld+json">
          {structuredData}
        </script>
      </MemoizedHelmet>

      <aside className={style.side_bar}>
        <h1>Must Reads</h1>
        <main className={style.article_list}>
          {datas.map(article => (
            <Card key={article.title} data={article} />
          ))}
        </main>
      </aside>
      <ArticlePreview />
    </div>
  );
}





// const useViewport = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    
//     // Initial check
//     checkMobile();
    
//     // Debounce resize handler
//     const debounce = (fn, ms) => {
//       let timeout;
//       return () => {
//         clearTimeout(timeout);
//         timeout = setTimeout(fn, ms);
//       };
//     };

//     const handleResize = debounce(checkMobile, 100);
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return { isMobile };
// };

const Card = memo(({ data }) => {
  const [isMobile,setisMobile] = useState();
  const articleUrl = useMemo(
    () => data?.title?.replace(/\s+/g, '_'),
    [data?.title]
  );

  // Single dynamic link based on viewport
  const targetPath = useMemo(
    () => isMobile? `/article/${articleUrl}` : `/articles/${articleUrl}`,
    [isMobile, articleUrl]
  );

  useEffect(()=>{setisMobile(window.innerWidth <= 900)},[])
  return (
    <Link 
      to={targetPath} 
      className={`${style.card} ${isMobile ? style.card_phone : style.card_des}`}
    >
      <img 
        loading="lazy" 
        src={data?.image} 
        className={style.card_image} 
        alt={data?.title}
      />
      <div className={style.card_body}>
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
      </div>
    </Link>
  );
});

Card.displayName = 'AdaptiveCard';
Card.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};