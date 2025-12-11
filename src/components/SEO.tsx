import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  structuredData?: object | object[];
  noIndex?: boolean; // New prop
  canonicalUrl?: string; // New prop to manually override if needed
  children?: ReactNode;
}

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = '/og-image.jpg',
  type = 'website',
  structuredData,
  noIndex = false, // Default to false
  canonicalUrl,
  children
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = 'https://slagerij-john.be';
  
  // Normalize URL: remove trailing slash for consistency
  const normalizedPath = location.pathname.endsWith('/') && location.pathname !== '/' 
    ? location.pathname.slice(0, -1) 
    : location.pathname;
    
  // Determine the canonical URL
  const calculatedUrl = `${baseUrl}${normalizedPath}`;
  const finalCanonicalUrl = canonicalUrl || calculatedUrl;

  const fullTitle = `${title} | Slagerij John`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Logic: Only render canonical if the page is indexable OR if a manual canonical is provided */}
      {!noIndex && (
        <link rel="canonical" href={finalCanonicalUrl} />
      )}

      {/* Logic: Handle Robots tag */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalCanonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />

      {/* Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
      
      {/* Additional custom head elements */}
      {children}
    </Helmet>
  );
};

export default SEO;
