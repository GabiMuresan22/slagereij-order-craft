// Structured data schemas for SEO

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ButcherShop",
  "name": "Slagerij John",
  "@id": "https://slagerij-john.be",
  "image": "https://slagerij-john.be/og-image.jpg",
  "url": "https://slagerij-john.be",
  "telephone": "+32466186457",
  "email": "contact@slagerij-john.be",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bruggestraat 146A",
    "addressLocality": "Zwevezele",
    "postalCode": "8750",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "51.0647",
    "longitude": "3.2659"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday",
      "opens": "13:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Wednesday", "Sunday"],
      "opens": "08:00",
      "closes": "13:00"
    }
  ],
  "priceRange": "$$",
  "servesCuisine": ["Belgian", "Romanian"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "11",
    "bestRating": "5",
    "worstRating": "1"
  }
});

export const getReviewsSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Mariana Micu"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Fresh meat, delicious traditional dishes, and friendly owners. We'll definitely be back. Until next time!",
      "itemReviewed": {
        "@type": "Butcher",
        "name": "Slagerij John"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Nicolescu Daniel"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "A great experience at Butcher John! We bought mici, chicken skewers with vegetables, beef burgers and chicken burgers - every product was fresh, tasty and top quality. The service was professional, friendly and efficient.",
      "itemReviewed": {
        "@type": "Butcher",
        "name": "Slagerij John"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "CezarCDA"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Good food and always fresh!",
      "itemReviewed": {
        "@type": "Butcher",
        "name": "Slagerij John"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Marius - Silviu Plesa"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Good prices, the products are always fresh and of quality. Even though the store seems small and you don't see a pile of products in the window, it's because they always keep the products fresh together with their wife.",
      "itemReviewed": {
        "@type": "Butcher",
        "name": "Slagerij John"
      }
    }
  ]
});

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://slagerij-john.be${item.url}`
  }))
});

export const getProductSchema = (name: string, description: string, price?: string) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": name,
  "description": description,
  "image": "https://slagerij-john.be/og-image.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Slagerij John"
  },
  ...(price && {
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Slagerij John"
      }
    }
  })
});

export const getProductListSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Slagerij John Product Range",
  "description": "Premium quality meat products including beef, pork, poultry, and BBQ specialties",
  "itemListElement": [
    {
      "@type": "Product",
      "position": 1,
      "name": "Rundvlees - Premium Beef",
      "description": "Premium quality beef cuts including steaks, minced beef, and specialty cuts",
      "brand": {
        "@type": "Brand",
        "name": "Slagerij John"
      },
      "image": "https://slagerij-john.be/og-image.jpg",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Product",
      "position": 2,
      "name": "Varkensvlees - Premium Pork",
      "description": "Fresh pork cuts including chops, bacon, minced pork, and specialty products",
      "brand": {
        "@type": "Brand",
        "name": "Slagerij John"
      },
      "image": "https://slagerij-john.be/og-image.jpg",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Product",
      "position": 3,
      "name": "Gevogelte - Premium Poultry",
      "description": "Fresh chicken products including breasts, thighs, skewers, and marinated options",
      "brand": {
        "@type": "Brand",
        "name": "Slagerij John"
      },
      "image": "https://slagerij-john.be/og-image.jpg",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Product",
      "position": 4,
      "name": "BBQ Specialiteiten - BBQ Specialties",
      "description": "Marinated BBQ products including ribs, sausages, and grilling specialties",
      "brand": {
        "@type": "Brand",
        "name": "Slagerij John"
      },
      "image": "https://slagerij-john.be/og-image.jpg",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    }
  ]
});
