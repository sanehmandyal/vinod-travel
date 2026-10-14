import { useEffect } from 'react';

const SITE_URL = 'https://vinod-tour-travel.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/images/vehicles/innova.jpg`;
const DEFAULT_TITLE = 'Vinod Tour & Travels | #1 Taxi Service in Una Himachal | 24/7 Cab Booking ISBT Una';
const DEFAULT_DESC =
  'Top-rated 24/7 taxi service in Una, Amb Andaura, Nangal, Anandpur Sahib, Dharamshala, Gaggal Airport & Daulatpur Chowk. Clean AC cars, expert hill drivers, guaranteed on-time pickup. Call +91 62305 21544.';

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  schema,
}) => {
  useEffect(() => {
    // 1. Title
    const finalTitle = title ? (title.includes('Vinod Tour & Travels') ? title : `${title} | Vinod Tour & Travels`) : DEFAULT_TITLE;
    document.title = finalTitle;

    // Helper to set meta tag
    const setMeta = (attr, key, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set link tag
    const setLink = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Meta description
    const finalDesc = description || DEFAULT_DESC;
    setMeta('name', 'description', finalDesc);

    // 3. Keywords
    if (keywords) {
      const kwString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      setMeta('name', 'keywords', kwString);
    }

    // 4. Canonical link
    const finalCanonical = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${SITE_URL}${canonical.startsWith('/') ? '' : '/'}${canonical}`
      : `${SITE_URL}${window.location.pathname}`;
    setLink('canonical', finalCanonical);

    // 5. Open Graph Meta Tags
    setMeta('property', 'og:title', finalTitle);
    setMeta('property', 'og:description', finalDesc);
    setMeta('property', 'og:url', finalCanonical);
    setMeta('property', 'og:type', ogType);
    setMeta(
      'property',
      'og:image',
      ogImage ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`) : DEFAULT_IMAGE
    );
    setMeta('property', 'og:site_name', 'Vinod Tour & Travels');
    setMeta('property', 'og:locale', 'en_IN');

    // 6. Twitter Card Meta Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', finalDesc);
    setMeta(
      'name',
      'twitter:image',
      ogImage ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`) : DEFAULT_IMAGE
    );

    // 7. Inject JSON-LD Schema
    let scriptTag = document.getElementById('dynamic-seo-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-seo-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (schema) {
      const schemaData = Array.isArray(schema) ? schema : [schema];
      scriptTag.textContent = JSON.stringify(schemaData.length === 1 ? schemaData[0] : schemaData);
    }

    return () => {
      // Cleanup dynamically injected schema when navigating away
      const el = document.getElementById('dynamic-seo-schema');
      if (el) el.remove();
    };
  }, [title, description, keywords, canonical, ogImage, ogType, schema]);

  return null;
};

export default SEO;
