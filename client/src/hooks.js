import { useEffect, useState } from 'react';
import { settingsApi } from './api';
import { business } from './data/siteConfig';

// Fetches from the given API function; on any failure (backend not
// running yet, network error, etc.) it falls back to local content so
// the site always renders fully instead of showing empty sections.
export function useContent(fetcher, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetcher()
      .then((res) => {
        if (mounted && Array.isArray(res) && res.length > 0) {
          // If items from API do not have an image set, attach the fallback image
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
        }
      })
      .catch(() => {
        /* keep fallback content */
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

// Fetches the editable business/contact/location settings (managed from
// /admin/settings). Falls back to the static defaults in siteConfig.js
// so the site never renders empty contact info.
export function useSettings() {
  const [data, setData] = useState(business);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    settingsApi
      .get()
      .then((res) => {
        if (mounted && res) {
          setData({
            ...business,
            ...res,
            whatsapp: res.whatsappNumber || business.whatsapp,
          });
        }
      })
      .catch(() => {
        /* keep fallback content */
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
