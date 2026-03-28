interface StructuredDataProps {
  dict: {
    business: {
      name: string;
      description: string;
      url: string;
      email: string;
      city: string;
      neighborhoods: string[];
      priceRange: string;
    };
  };
}

export default function StructuredData({ dict }: StructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: dict.business.name,
    description: dict.business.description,
    url: dict.business.url,
    email: dict.business.email,
    areaServed: {
      "@type": "City",
      name: dict.business.city,
    },
    serviceArea: dict.business.neighborhoods.map((n) => ({
      "@type": "Place",
      name: n,
    })),
    knowsLanguage: ["es", "en"],
    priceRange: dict.business.priceRange,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
