// components/SEO.jsx
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = "Study Abroad Consultants | Top University Admissions", 
  description = "AI-powered study abroad guidance with 98% admission success rate. Get into Stanford, MIT, IIT with scholarship support.",
  keywords = "study abroad, college admission, scholarship, university counseling",
  image = "/preview-image.jpg"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Study Abroad Consultants",
          "description": description,
          "url": typeof window !== 'undefined' ? window.location.href : '',
          "successRate": "98%",
          "award": "Top Rated Educational Consultancy",
          "areaServed": "Worldwide"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;