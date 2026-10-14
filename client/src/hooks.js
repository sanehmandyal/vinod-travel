import { useEffect, useState } from 'react';
import { settingsApi } from './api';
import { business } from './data/siteConfig';

// Fetches from the given API function; on any failure or slow network,
// it instantly provides local fallback content so the site renders immediately.
export function useContent(fetcher, fallback, cacheKey) {
  const [data, setData] = useState(() => {
    if (cacheKey) {
      try {
        const cached = localStorage.getItem(`vinod_cache_${cacheKey}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return fallback;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetcher()
      .then((res) => {
        if (mounted && Array.isArray(res) && res.length > 0) {
          const enriched = res.map((item, idx) => {
            if (item.image && typeof item.image === 'string' && item.image.trim() !== '') {
              return item;
            }
            const match = Array.isArray(fallback)
              ? fallback.find(
                  (f) =>
                    (f.name && item.name && f.name.toLowerCase().trim() === item.name.toLowerCase().trim()) ||
                    (f.to && item.to && f.to.toLowerCase().trim() === item.to.toLowerCase().trim()) ||
                    (f.title && item.title && f.title.toLowerCase().trim() === item.title.toLowerCase().trim()) ||
                    (f._id && item._id && f._id === item._id)
                ) || fallback[idx]
              : null;
            return {
              ...item,
              image: match?.image || item.image || '',
            };
          });
          setData(enriched);
          if (cacheKey) {
            try {
              localStorage.setItem(`vinod_cache_${cacheKey}`, JSON.stringify(enriched));
            } catch (e) {}
          }
        }
      })
      .catch(() => {
        /* keep instant fallback content */
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
}

// Fetches the editable business/contact settings with instant local storage caching
// so the site never waits on cold starts.
export function useSettings() {
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem('vinod_cached_settings');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.name) {
          return {
            ...business,
            ...parsed,
            whatsapp: parsed.whatsappNumber || business.whatsapp,
          };
        }
      }
    } catch (e) {}
    return business;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    settingsApi
      .get()
      .then((res) => {
        if (mounted && res && res.name) {
          const merged = {
            ...business,
            ...res,
            whatsapp: res.whatsappNumber || business.whatsapp,
          };
          setData(merged);
          try {
            localStorage.setItem('vinod_cached_settings', JSON.stringify(res));
          } catch (e) {}
        }
      })
      .catch(() => {
        /* keep instant fallback */
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
}
