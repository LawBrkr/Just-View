export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Signalia",
    description: "Consultoría tech — Visibilidad digital + automatización IA para PyMEs en CDMX",
    url: "https://signalia.com.mx",
    email: "hola@signalia.com.mx",
    areaServed: {
      "@type": "City",
      name: "Ciudad de México",
    },
    serviceArea: [
      { "@type": "Place", name: "Polanco" },
      { "@type": "Place", name: "Condesa" },
      { "@type": "Place", name: "Roma" },
      { "@type": "Place", name: "Coyoacán" },
      { "@type": "Place", name: "Del Valle" },
      { "@type": "Place", name: "Santa Fe" },
    ],
    knowsLanguage: ["es", "en"],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
