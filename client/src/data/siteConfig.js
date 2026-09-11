// Central place for business details.
// These are FALLBACK values only, shown instantly while the live
// Settings (editable from /admin/settings) load from the API, and if the
// API is briefly unavailable. Edit the real values from the admin panel
// so changes go live without a code deployment.
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '916230521544';

export const business = {
  name: 'Vinod Tour & Travels',
  tagline: 'Your Trusted Travel Partner from Una',
  location: 'ISBT Una, Himachal Pradesh',
  fullAddress: 'Counter Desk, Inter State Bus Terminal (ISBT), Una, Himachal Pradesh 174303',
  mapEmbedQuery: 'ISBT Una Himachal Pradesh',
  phonePrimary: '+91 62305 21544',
  phoneSecondary: '',
  whatsapp: WHATSAPP_NUMBER,
  email: 'booking@vinodtravelsuna.com',
  rating: 4.8,
  reviewCount: 24,
  hours: '24 Hours Open (7 Days a Week)',
};

export const waLink = (text, number = WHATSAPP_NUMBER) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Tour Packages', to: '/tour-packages' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
];

export const services = [
  {
    icon: 'local_taxi',
    title: 'Local Taxi Service',
    subtitle: 'Una & Surrounding Tehsil',
    description:
      'Instant pickups from Una Railway Station, ISBT Una counter, Tahliwal and Mehatpur industrial complexes. Full & half-day hourly packages for local visits.',
    points: [
      'Una Railway Station Drop',
      'Tahliwal / Mehatpur Industrial Hubs',
      'Maa Chintpurni & Vadbhag Singh Darshan',
    ],
  },
  {
    icon: 'navigation',
    title: 'Outstation Cab Service',
    subtitle: 'Punjab, Delhi NCR & J&K',
    description:
      'Reliable one-way drop and roundtrip rentals from Una to Chandigarh, Delhi NCR, Amritsar, Jalandhar, Ludhiana, and Jammu with transparent per-km billing.',
    points: [
      'Dedicated One-Way Fares',
      'All Tolls & Entry Taxes Included',
      'Express NH-44 & Himalayan Expressways',
    ],
  },
  {
    icon: 'flight_takeoff',
    title: 'Airport Transfers',
    subtitle: 'Punctual Guaranteed Reporting',
    description:
      'Stress-free direct drops to Chandigarh Airport (IXC), Delhi IGI Airport (DEL), and Amritsar Airport (ATQ). Zero missed flights with proactive traffic routing.',
    points: [
      'Chandigarh IXC in ~2.5 hrs',
      'Flight delay tracking & buffer planning',
      'Doorstep luggage assistance',
    ],
  },
  {
    icon: 'landscape',
    title: 'Himachal Tour Packages',
    subtitle: 'Curated Mountain Escapes',
    description:
      'Custom multiday holiday packages across Shimla, Manali, Dharamshala, Dalhousie & Spiti. Experienced mountain drivers who know every scenic lookout.',
    points: ['Fixed departure & custom dates', 'Hotel + cab combo available', 'Local sightseeing guide'],
    highlight: true,
  },
];

export const whyChooseUs = [
  {
    num: '01',
    icon: 'alarm_on',
    title: 'Dependable & On-Time Pickups',
    description:
      'Direct dispatch from ISBT Una counter or your home doorstep. Our drivers arrive 15 minutes before the departure bell, every time.',
  },
  {
    num: '02',
    icon: 'airline_seat_recline_normal',
    title: 'Clean, Sanitized AC Cars',
    description:
      'Spotless interiors, fresh upholstery, working air-conditioning and odorless cabins. We deep clean vehicles after every return journey.',
  },
  {
    num: '03',
    icon: 'terrain',
    title: 'Expert Himachal Hill Drivers',
    description:
      'Navigating mountain hairpins, fog, and icy passes requires authentic experience. Our drivers have a minimum of 10 years of hill transit record.',
  },
  {
    num: '04',
    icon: 'receipt_long',
    title: 'Transparent Fares — No Hidden Tolls',
    description:
      'What we quote is what you pay. Toll taxes, state border entry fees, parking and driver food allowance are clearly stated upfront before departure.',
  },
  {
    num: '05',
    icon: 'touch_app',
    title: 'Hassle-Free Booking',
    description:
      'No mandatory app downloads, OTP hurdles, or complicated forms. One quick WhatsApp message or phone call confirms your car instantly.',
  },
  {
    num: '06',
    icon: 'distance',
    title: 'Deep Local Una Roots',
    description:
      'We are physically based inside the ISBT Una complex. Have peace of mind knowing you are dealing with recognized, accountable local operators.',
  },
];

export const fleetHighlights = [
  'Toyota Innova Crysta (6+1 / 7+1)',
  'Maruti Suzuki Ertiga Smart Hybrid',
  'Maruti Dzire Executive Sedan',
  'Tempo Traveller 12 / 17-Seater',
  'Mahindra Scorpio 4x4 Hill Edition',
];

export const quickLinks = [
  'Home & Fare Matrix',
  'Local & Outstation Rides',
  'Airport Pickup & Drop',
  'Chintpurni Pilgrimage Yatra',
  'Corporate & Event Booking',
  'Verified Driver Reviews',
];

export const popularRouteLinks = [
  'Una to Shimla / Kufri Cabs',
  'Una to Manali / Solang Valley',
  'Una to Dharamshala & McLeodganj',
  'Una to Dalhousie & Khajjiar',
  'Una to Chandigarh Airport (IXC)',
  'Una to Delhi IGI Airport (DEL)',
];

// Fallback content shown instantly while the API loads (and if the API
// is briefly unavailable), so the site never renders empty sections.
export const fallbackVehicles = [
  {
    _id: 'fallback-sedan',
    name: 'Maruti Dzire Executive Sedan',
    category: 'Sedan',
    seatingCapacity: '4+1 Seater',
    image: '/images/vehicles/dzire.jpg',
    description:
      'Fuel-efficient, whisper-quiet cabin, perfect for couples and small family travel to Chandigarh and Delhi NCR.',
    features: ['2 Large Bags', 'Climate AC', 'Hill Permit OK'],
    ratePerKm: '10 - 11',
    featured: false,
  },
  {
    _id: 'fallback-suv',
    name: 'Maruti Ertiga Hybrid',
    category: 'Family SUV',
    seatingCapacity: '6+1 Seater',
    image: '/images/vehicles/ertiga.jpg',
    description:
      'High ground clearance, flexible 3rd row seating, and generous roof luggage carriers for family pilgrimage and vacations.',
    features: ['4 Bags + Carrier', 'Dual AC', 'Comfort Recline'],
    ratePerKm: '13 - 14',
    featured: false,
  },
  {
    _id: 'fallback-innova',
    name: 'Toyota Innova Crysta',
    category: 'Luxury MPV',
    seatingCapacity: '6/7+1 Seater',
    image: '/images/vehicles/innova.jpg',
    description:
      'The gold standard in mountain travel. Plush leather captain recliners, independent climate zones, and unmatched uphill ride dampening.',
    features: ['Captain Seats', '5+ Bags', 'Hill Master Driver'],
    ratePerKm: '17 - 19',
    featured: true,
  },
  {
    _id: 'fallback-tempo',
    name: 'Luxury Tempo Traveller',
    category: 'Group Transit',
    seatingCapacity: '12 to 17 Seats',
    image: '/images/vehicles/tempo.jpg',
    description:
      'Ideal for wedding groups, extended family yatras, and corporate outings with pushback 1x1 recliners, onboard LED & sound system.',
    features: ['12 - 17 Guests', 'Heavy Boot', 'Pushback Seats'],
    ratePerKm: '24 - 28',
    featured: false,
  },
];

export const fallbackDestinations = [
  {
    _id: 'fallback-chd',
    to: 'Chandigarh (IXC / PGI)',
    distanceKm: 115,
    durationLabel: '~2.5 hrs',
    tag: 'Highway Corridor',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    description:
      'Via Nangal & Ropar bypass. Direct cab service to Chandigarh International Airport, PGI Hospital, Sector 17, and IT Park.',
    approxFare: '2,200 - 2,500',
    fareLabel: 'Approx. Sedan Fare',
  },
  {
    _id: 'fallback-del',
    to: 'Delhi NCR / IGI Airport',
    distanceKm: 360,
    durationLabel: '~6.5 hrs',
    tag: 'NH-44 Express',
    image: 'https://images.unsplash.com/photo-1585506942812-e72b29cef752?auto=format&fit=crop&w=1200&q=80',
    description:
      'Smooth NH-44 highway express route. Direct drop at IGI Terminal 1/2/3, New Delhi Railway Station, Gurgaon or Noida.',
    approxFare: '5,400 - 5,900',
    fareLabel: 'Approx. Sedan Fare',
  },
  {
    _id: 'fallback-shimla',
    to: 'Shimla / Kufri',
    distanceKm: 160,
    durationLabel: '~4.5 hrs',
    tag: 'Mountain Scenic',
    image: '/images/destinations/shimla.jpg',
    description:
      'Ascend to the Queen of Hills via Bilaspur / Solan route. Drop to Mall Road lifts, Lakkar Bazaar, and high-altitude Kufri resorts.',
    approxFare: '3,600 - 4,000',
    fareLabel: 'Approx. Sedan Fare',
  },
  {
    _id: 'fallback-manali',
    to: 'Manali / Solang Valley',
    distanceKm: 245,
    durationLabel: '~7 hrs',
    tag: 'Himalayan Scenic',
    image: '/images/destinations/manali.jpg',
    description:
      'Scenic route via Bilaspur, Mandi and Kullu valley along the Beas river to the adventure capital of Himachal.',
    approxFare: '5,800 - 6,300',
    fareLabel: 'Approx. Sedan Fare',
  },
  {
    _id: 'fallback-dharamshala',
    to: 'Dharamshala / McLeodganj',
    distanceKm: 95,
    durationLabel: '~2.5 hrs',
    tag: 'Kangra Valley',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
    description:
      'Passing Kangra Fort & Tea Gardens. Direct drop to HPCA Stadium, Dalai Lama Temple, Bhagsu Waterfall, and Dharamkot.',
    approxFare: '2,800 - 3,200',
    fareLabel: 'Approx. Sedan Fare',
  },
  {
    _id: 'fallback-chintpurni',
    to: 'Maa Chintpurni Shrine',
    distanceKm: 52,
    durationLabel: '~1.2 hrs',
    tag: 'Holy Yatra',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80',
    description:
      'Dedicated roundtrip darshan taxi with waiting time included. Optional extension to Jwala Ji, Kangra Devi, and Chamunda Devi temples.',
    approxFare: '1,600 - 1,900',
    fareLabel: 'Roundtrip Package',
  },
  {
    _id: 'fallback-dalhousie',
    to: 'Dalhousie & Khajjiar',
    distanceKm: 175,
    durationLabel: '~5 hrs',
    tag: 'Mini Switzerland',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description:
      'Breathtaking cedar forests, emerald Khajjiar lake, Kalatop wildlife sanctuary, and colonial churches.',
    approxFare: '4,500 - 4,900',
    fareLabel: 'Approx. Sedan Fare',
  },
];

export const fallbackTourPackages = [
  {
    _id: 'fallback-shimla-tour',
    title: 'Shimla & Kufri Package',
    tagline: 'Queen of Hills',
    duration: '3 Days / 2 Nights',
    image: '/images/destinations/shimla.jpg',
    description:
      'Includes Mall Road, Christ Church, Jakhu Temple ropeway, Kufri snow amusement park, and green valley viewpoints.',
    price: '8,500',
    priceNote: 'total',
  },
  {
    _id: 'fallback-manali-tour',
    title: 'Manali & Rohtang Pass',
    tagline: 'Adventure & Snow',
    duration: '4 Days / 3 Nights',
    image: '/images/destinations/manali.jpg',
    description:
      'Covers Solang Valley paragliding, Atal Tunnel, Sissu waterfalls, Hadimba Temple, and Vashisht hot springs.',
    price: '13,500',
    priceNote: 'total',
  },
  {
    _id: 'fallback-dharamshala-tour',
    title: 'Dharamshala & Mcleod',
    tagline: 'Monasteries & Mountains',
    duration: '3 Days / 2 Nights',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    description:
      'Visit Tsuglagkhang complex, Norbulingka Institute, scenic HPCA Cricket Stadium, Bhagsu Nag, and Kangra Fort.',
    price: '7,800',
    priceNote: 'total',
  },
  {
    _id: 'fallback-dalhousie-tour',
    title: 'Dalhousie & Khajjiar',
    tagline: 'Mini Switzerland',
    duration: '3 Days / 2 Nights',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Explore Khajjiar meadows, Kalatop Sanctuary, Chamera Lake, and colonial-era churches of Dalhousie.',
    price: '9,200',
    priceNote: 'total',
  },
];

export const fallbackReviews = [
  {
    _id: 'fallback-review-1',
    name: 'Rahul Sharma',
    tag: 'Una to Manali • Verified Passenger',
    rating: 5,
    comment:
      'Excellent service from ISBT Una counter. Driver was experienced with hill roads and the car was spotless. Highly recommend for Manali trips.',
  },
  {
    _id: 'fallback-review-2',
    name: 'Pooja Kapoor',
    tag: 'Airport Transfer IXC • Verified Passenger',
    rating: 5,
    comment:
      'Booked an early morning airport drop to Chandigarh. The cab arrived on time and the fare matched exactly what was quoted on WhatsApp.',
  },
  {
    _id: 'fallback-review-3',
    name: 'Gurinder Singh',
    tag: 'Ludhiana • Pilgrimage Yatra',
    rating: 5,
    comment:
      'Best taxi desk inside ISBT Una. We arrived by train and wanted an immediate cab to Chintpurni temple. They offered an honest fixed price without haggling.',
  },
];

export const fallbackGallery = [
  {
    _id: 'g1',
    caption: 'Atal Tunnel North Portal Road',
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'g2',
    caption: 'Sanitized Crysta Captain Interior',
    category: 'cabs',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'g3',
    caption: 'Maa Chintpurni Temple Yatra',
    category: 'pilgrimage',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'g4',
    caption: 'Pine Canopy near Kufri & Shimla',
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'g5',
    caption: 'Snow Slopes & Solang Valley',
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'g6',
    caption: 'Scenic Himalayan Mountain Highway',
    category: 'cabs',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'g7',
    caption: 'Khajjiar Alpine Pine Meadows',
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'g8',
    caption: 'Executive Fleet on Hill Transit',
    category: 'cabs',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
  },
];
