
import { lazy, Suspense, memo, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import style from './page.module.css';

// Lazy load heavy components
const HeroSection = lazy(() => import('../components/HeroSection'));
const EventSection = lazy(() => import('../components/EventSection'));
const QuotesSection = lazy(() => import('../components/QuotesSection'));
const MartyrsSection = lazy(() => import('../components/MartyrsSection'));

// Memoize static helmet content
// const MemoizedHelmet = memo((children ) => { return children});


function Home() {

  return (
    <div className={style.container}>
      {/* <MemoizedHelmet> */}
       <Seo/>
      {/* </MemoizedHelmet> */}

      <Suspense fallback={<div className={style.loading}>Loading Hero...</div>}>
        <HeroSection />
      </Suspense>
      <hr />

      <Suspense fallback={<div className={style.loading}>Loading Events...</div>}>
        <EventSection />
      </Suspense>
      <hr />

      <Suspense fallback={<div className={style.loading}>Loading Martyrs...</div>}>
        <MartyrsSection />
      </Suspense>
      
      <hr />

      <Suspense fallback={<div className={style.loading}>Loading Quotes...</div>}>
        <QuotesSection />
      </Suspense>
    </div>
  );
}
function Seo() {
  const structuredData = useMemo(() => JSON.stringify({
    "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Shahid Day",
      "url": "https://shahid-day.netlify.app",
      "description": "Premier digital archive of Algerian historical documentation",
      "publisher": {
        "@type": "Organization",
        "name": "Algerian Historical Society",
        "logo": {
          "@type": "ImageObject",
          "url": "https://shahid-day.netlify.app/logo.png",
          "width": 600,
          "height": 60
        }
      },
      "foundingDate": "2015",
      "founder": {
        "@type": "Person",
        "name": "Ali Benmoussa"
      }
    


  }), []);
  return(
  <Helmet>
  <title>Algerian History: 10,000 Years of Resistance & Cultural Heritage | Shahid Day</title>
  <meta name="description" content="Dive into Algeria's epic journey from ancient Numidian kingdoms to revolutionary independence. Explore rare archives, expert analyses, and interactive timelines of North Africa's largest nation." />
 <meta name="keywords" content="Algerian Revolution, FLN history, French colonialism in Algeria, Berber civilization, Algerian War of Independence 1954-1962, National Liberation Front, Battle of Algiers" />
 <meta name="author" content="Algerian Historical Society" />
 <meta name="robots" content="index, follow, max-image-preview:large" />
 <meta name="revisit-after" content="7 days" />

 {/* Open Graph / Facebook */}
<meta property="og:type" content="website" />
 <meta property="og:title" content="🇩🇿 Algerian History: From Ancient Berbers to Independence Heroes | Shahid Day" />
 <meta property="og:description" content="Interactive timeline of Algeria's struggle for freedom | 500+ historical documents & 4K archival footage | Expert-curated research since 2015" />
  <meta property="og:image" content="https://shahid-day.netlify.app/assets/hero-image.jpg" />
 <meta property="og:image:width" content="1200" />
 <meta property="og:image:height" content="630" />
 <meta property="og:url" content="https://shahid-day.netlify.app" />
 <meta property="og:site_name" content="Shahid Day" />
 <meta property="og:locale" content="en_US" />

 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:site" content="@ShahidDayHist" />
 <meta name="twitter:creator" content="@AlgerianHistTeam" />
 <meta name="twitter:image:alt" content="Algerian revolutionaries planting the national flag" />


         <script type="application/ld+json">
           {structuredData}
         </script>
       </Helmet>)
}
// Memoize the entire page component
export default memo(Home);