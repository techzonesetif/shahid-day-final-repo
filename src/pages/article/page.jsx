import { useEffect, useState,  } from 'react'
import style from './page.module.css'
import { useParams } from 'react-router-dom'
import Styledmarkdown from '../../components/markdown/Styledmarkdown'
import { Helmet } from 'react-helmet'
import { data } from '../data/articles'

export default function Article() {
  const  link = useParams().link;
  // const loadedRef = useRef(false);
  const [article,setArticle]=useState(data.find(acrticle => acrticle.title?.replace(/\s+/g, '_') === link))

  useEffect(()=>{
    setArticle(data.find(acrticle => acrticle.title?.replace(/\s+/g, '_') === link))
    document.querySelector('body').scrollTo({top: 0})     

  },[link])

  return (
    <div className={style.page}>
 <Helmet>
        <title>{article.title} </title>
        <meta name="description" content={article.description} />
        <meta name="author" content={article.author} />
        <meta name="keywords" content={article?.tags?.join(",")} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={article.image} />
      </Helmet>
       <article className={style.article_container}>
        
        <header className={style.article_header}>
            <img src={article?.image} alt="Sustainable energy" className={style.article_image}/>
            <h1 className={style.article_title}>{article?.title}</h1>
            <div className={style.article_tags}>
              {article?.tags?.map(t=><span key={t}>{t}</span>)}
            </div>
        </header>
        <Styledmarkdown >
            {article?.text}
           
        </Styledmarkdown>
        <div className={style.article_meta}>
            <div>By <span>{article?.author}</span></div> 
            <span>{article?.date}</span> 
        </div>
       </article>
       
    </div>
  
  )
}



