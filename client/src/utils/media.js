// The API base URL looks like "http://localhost:5000/api" (or a deployed
// equivalent). Uploaded images are served from the same host but without
// the "/api" suffix, e.g. "http://localhost:5000/uploads/photo.jpg".
const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
const serverOrigin = apiBase.replace(/\/api\/?$/, '');

// Turns a stored image value into something an <img> tag can load.
// - Empty/undefined -> null (caller shows a placeholder)
// - Full URL (http/https) -> used as-is (admin pasted an external link)
// - "/uploads/xyz.jpg" (from our own upload feature) -> prefixed with the API origin
export const resolveImageUrl = (value) => {
  if (!value || typeof value !== 'string' || value.trim() === '') return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/uploads/')) return `${serverOrigin}${value}`;
  return value;
};

// Verified, high-resolution default images for vehicles (served locally from /images/)
export const defaultVehicleImages = {
  sedan: '/images/vehicles/dzire.jpg',
  dzire: '/images/vehicles/dzire.jpg',
  ertiga: '/images/vehicles/ertiga.jpg',
  suv: '/images/vehicles/ertiga.jpg',
  innova: '/images/vehicles/innova.jpg',
  tempo: '/images/vehicles/tempo.jpg',
};

export const getVehicleImage = (v) => {
  const resolved = resolveImageUrl(v?.image);
  if (resolved && !resolved.includes('unsplash.com')) return resolved;
  const name = (v?.name || '').toLowerCase();
  const cat = (v?.category || '').toLowerCase();
  if (name.includes('dzire') || name.includes('sedan') || cat.includes('sedan') || name.includes('etios')) {
    return defaultVehicleImages.dzire;
  }
  if (name.includes('ertiga')) return defaultVehicleImages.ertiga;
  if (name.includes('innova') || name.includes('crysta')) return defaultVehicleImages.innova;
  if (name.includes('tempo') || name.includes('traveller') || cat.includes('group')) {
    return defaultVehicleImages.tempo;
  }
  if (cat.includes('suv') || cat.includes('family')) return defaultVehicleImages.ertiga;
  return defaultVehicleImages.innova;
};

// Verified, high-resolution default images for destinations
export const defaultDestinationImages = {
  chd: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
  delhi: 'https://images.unsplash.com/photo-1585506942812-e72b29cef752?auto=format&fit=crop&w=1200&q=80',
  shimla: '/images/destinations/shimla.jpg',
  manali: '/images/destinations/manali.jpg',
  dharamshala: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
  chintpurni: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80',
  dalhousie: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
};

export const getDestinationImage = (d) => {
  const resolved = resolveImageUrl(d?.image);
  if (resolved && !resolved.includes('unsplash.com')) return resolved;
  const to = (d?.to || '').toLowerCase();
  if (to.includes('chandigarh') || to.includes('ixc') || to.includes('pgi')) return defaultDestinationImages.chd;
  if (to.includes('delhi') || to.includes('igi') || to.includes('ncr')) return defaultDestinationImages.delhi;
  if (to.includes('shimla') || to.includes('kufri')) return defaultDestinationImages.shimla;
  if (to.includes('manali') || to.includes('solang') || to.includes('rohtang')) return defaultDestinationImages.manali;
  if (to.includes('dharamshala') || to.includes('mcleod')) return defaultDestinationImages.dharamshala;
  if (to.includes('chintpurni') || to.includes('temple') || to.includes('yatra') || to.includes('shrine')) {
    return defaultDestinationImages.chintpurni;
  }
  if (to.includes('dalhousie') || to.includes('khajjiar')) return defaultDestinationImages.dalhousie;
  return defaultDestinationImages.shimla;
};

// Verified, high-resolution default images for tour packages
export const getTourPackageImage = (t) => {
  const resolved = resolveImageUrl(t?.image);
  if (resolved) return resolved;
  const title = (t?.title || '').toLowerCase();
  const tagline = (t?.tagline || '').toLowerCase();
  if (title.includes('shimla') || tagline.includes('queen of hills')) {
    return '/images/destinations/shimla.jpg';
  }
  if (title.includes('manali') || tagline.includes('snow') || title.includes('rohtang')) {
    return '/images/destinations/manali.jpg';
  }
  if (title.includes('dharamshala') || title.includes('mcleod') || tagline.includes('monasteries')) {
    return 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80';
  }
  if (title.includes('dalhousie') || title.includes('khajjiar') || tagline.includes('switzerland')) {
    return 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80';
  }
  return '/images/destinations/shimla.jpg';
};

// Verified, high-resolution default images for gallery
const galleryStockImages = [
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
];

export const getGalleryImage = (g, index = 0) => {
  const resolved = resolveImageUrl(g?.image);
  if (resolved) return resolved;
  return galleryStockImages[index % galleryStockImages.length];
};
