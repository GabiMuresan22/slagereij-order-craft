import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  structuredData?: object;
  children?: ReactNode;
}

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = '/og-image.jpg',
  type = 'website',
  structuredData,
  children
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = 'https://slagerijjohn.be';
  // Normalize URL: remove trailing slash for consistency
  const normalizedPath = location.pathname.endsWith('/') && location.pathname !== '/' 
    ? location.pathname.slice(0, -1) 
    : location.pathname;
  const currentUrl = `${baseUrl}${normalizedPath}`;
  const fullTitle = `${title} | Slagerij John`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional custom head elements */}
      {children}
    </Helmet>
  );
};

export default SEO;
