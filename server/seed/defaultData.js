const Vehicle = require('../models/Vehicle');
const Destination = require('../models/Destination');
const TourPackage = require('../models/TourPackage');
const GalleryItem = require('../models/GalleryItem');
const Review = require('../models/Review');
const Settings = require('../models/Settings');
const Booking = require('../models/Booking');

const defaultBookings = [
  {
    name: 'Rohit Verma',
    phone: '+91 98160 12345',
    email: 'rohit.verma@example.com',
    tripType: 'One Way',
    pickup: 'ISBT Una Counter',
    destination: 'Chandigarh Airport (IXC)',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    vehicle: 'Maruti Dzire Executive Sedan',
    passengers: 2,
    notes: 'Morning flight transfer. 2 medium luggage bags.',
    status: 'Confirmed',
    source: 'Website Form',
  },
  {
    name: 'Simranjeet Kaur',
    phone: '+91 98722 54321',
    email: 'simran.kaur@example.com',
    tripType: 'Round Trip',
    pickup: 'Una Railway Station',
    destination: 'Maa Chintpurni Shrine',
    date: new Date(Date.now() + 48 * 60 * 60 * 1000),
    vehicle: 'Toyota Innova Crysta',
    passengers: 5,
    notes: 'Family pilgrimage darshan with return to Una station.',
    status: 'Pending',
    source: 'Website Form',
  },
];

const defaultVehicles = [
  {
    name: 'Maruti Dzire Executive Sedan',
    category: 'Sedan',
    seatingCapacity: '4+1 Seater',
    image: '/images/vehicles/dzire.jpg',
    description:
      'Fuel-efficient, whisper-quiet cabin, perfect for couples and small family travel to Chandigarh and Delhi NCR.',
    features: ['2 Large Bags', 'Climate AC', 'Hill Permit OK'],
    ratePerKm: '10 - 11',
    featured: false,
    active: true,
    order: 1,
  },
  {
    name: 'Maruti Ertiga Hybrid',
    category: 'Family SUV',
    seatingCapacity: '6+1 Seater',
    image: '/images/vehicles/ertiga.jpg',
    description:
      'High ground clearance, flexible 3rd row seating, and generous roof luggage carriers for family pilgrimage and vacations.',
    features: ['4 Bags + Carrier', 'Dual AC', 'Comfort Recline'],
    ratePerKm: '13 - 14',
    featured: false,
    active: true,
    order: 2,
  },
  {
    name: 'Toyota Innova Crysta',
    category: 'Luxury MPV',
    seatingCapacity: '6/7+1 Seater',
    image: '/images/vehicles/innova.jpg',
    description:
      'The gold standard in mountain travel. Plush leather captain recliners, independent climate zones, and unmatched uphill ride dampening.',
    features: ['Captain Seats', '5+ Bags', 'Hill Master Driver'],
    ratePerKm: '17 - 19',
    featured: true,
    active: true,
    order: 3,
  },
  {
    name: 'Luxury Tempo Traveller',
    category: 'Group Transit',
    seatingCapacity: '12 to 17 Seats',
    image: '/images/vehicles/tempo.jpg',
    description:
      'Ideal for wedding groups, extended family yatras, and corporate outings with pushback 1x1 recliners, onboard LED & sound system.',
    features: ['12 - 17 Guests', 'Heavy Boot', 'Pushback Seats'],
    ratePerKm: '24 - 28',
    featured: false,
    active: true,
    order: 4,
  },
];

const defaultDestinations = [
  {
    from: 'Una',
    to: 'Chandigarh (IXC / PGI)',
    distanceKm: 115,
    durationLabel: '~2.5 hrs',
    tag: 'Highway Corridor',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    description:
      'Via Nangal & Ropar bypass. Direct cab service to Chandigarh International Airport, PGI Hospital, Sector 17, and IT Park.',
    approxFare: '2,200 - 2,500',
    fareLabel: 'Approx. Sedan Fare',
    active: true,
    order: 1,
  },
  {
    from: 'Una',
    to: 'Delhi NCR / IGI Airport',
    distanceKm: 360,
    durationLabel: '~6.5 hrs',
    tag: 'NH-44 Express',
    image: 'https://images.unsplash.com/photo-1585506942812-e72b29cef752?auto=format&fit=crop&w=1200&q=80',
    description:
      'Smooth NH-44 highway express route. Direct drop at IGI Terminal 1/2/3, New Delhi Railway Station, Gurgaon or Noida.',
    approxFare: '5,400 - 5,900',
    fareLabel: 'Approx. Sedan Fare',
    active: true,
    order: 2,
  },
  {
    from: 'Una',
    to: 'Shimla / Kufri',
    distanceKm: 160,
    durationLabel: '~4.5 hrs',
    tag: 'Mountain Scenic',
    image: '/images/destinations/shimla.jpg',
    description:
      'Ascend to the Queen of Hills via Bilaspur / Solan route. Drop to Mall Road lifts, Lakkar Bazaar, and high-altitude Kufri resorts.',
    approxFare: '3,600 - 4,000',
    fareLabel: 'Approx. Sedan Fare',
    active: true,
    order: 3,
  },
  {
    from: 'Una',
    to: 'Manali / Solang Valley',
    distanceKm: 245,
    durationLabel: '~7 hrs',
    tag: 'Himalayan Scenic',
    image: '/images/destinations/manali.jpg',
    description:
      'Scenic route via Bilaspur, Mandi and Kullu valley along the Beas river to the adventure capital of Himachal.',
    approxFare: '5,800 - 6,300',
    fareLabel: 'Approx. Sedan Fare',
    active: true,
    order: 4,
  },
  {
    from: 'Una',
    to: 'Maa Chintpurni Shrine',
    distanceKm: 52,
    durationLabel: '~1.2 hrs',
    tag: 'Holy Yatra',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80',
    description:
      'Dedicated roundtrip darshan taxi with waiting time included. Optional extension to Jwala Ji, Kangra Devi, and Chamunda Devi temples.',
    approxFare: '1,600 - 1,900',
    fareLabel: 'Roundtrip Package',
    active: true,
    order: 6,
  },
  {
    from: 'Una',
    to: 'Dalhousie & Khajjiar',
    distanceKm: 175,
    durationLabel: '~5 hrs',
    tag: 'Mini Switzerland',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description:
      'Breathtaking cedar forests, emerald Khajjiar lake, Kalatop wildlife sanctuary, and colonial churches.',
    approxFare: '4,500 - 4,900',
    fareLabel: 'Approx. Sedan Fare',
    active: true,
    order: 7,
  },
];

const defaultTourPackages = [
  {
    title: 'Shimla & Kufri Package',
    tagline: 'Queen of Hills',
    duration: '3 Days / 2 Nights',
    image: '/images/destinations/shimla.jpg',
    description:
      'Includes Mall Road, Christ Church, Jakhu Temple ropeway, Kufri snow amusement park, and green valley viewpoints.',
    price: '8,500',
    priceNote: 'total',
    active: true,
    order: 1,
  },
  {
    title: 'Manali & Rohtang Pass',
    tagline: 'Adventure & Snow',
    duration: '4 Days / 3 Nights',
    image: '/images/destinations/manali.jpg',
    description:
      'Covers Solang Valley paragliding, Atal Tunnel, Sissu waterfalls, Hadimba Temple, and Vashisht hot springs.',
    price: '13,500',
    priceNote: 'total',
    active: true,
    order: 2,
  },
  {
    title: 'Dharamshala & Mcleod',
    tagline: 'Monasteries & Mountains',
    duration: '3 Days / 2 Nights',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    description:
      'Visit Tsuglagkhang complex, Norbulingka Institute, scenic HPCA Cricket Stadium, Bhagsu Nag, and Kangra Fort.',
    price: '7,800',
    priceNote: 'total',
    active: true,
    order: 3,
  },
  {
    title: 'Dalhousie & Khajjiar',
    tagline: 'Mini Switzerland',
    duration: '3 Days / 2 Nights',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Explore Khajjiar meadows, Kalatop Sanctuary, Chamera Lake, and colonial-era churches of Dalhousie.',
    price: '9,200',
    priceNote: 'total',
    active: true,
    order: 4,
  },
];

const defaultGalleryItems = [
  {
    caption: 'Atal Tunnel North Portal Road',
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    order: 1,
  },
  {
    caption: 'Sanitized Crysta Captain Interior',
    category: 'cabs',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    order: 2,
  },
  {
    caption: 'Maa Chintpurni Temple Yatra',
    category: 'pilgrimage',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80',
    order: 3,
  },
  {
    caption: 'Pine Canopy near Kufri & Shimla',
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    order: 4,
  },
  {
    caption: 'Snow Slopes & Solang Valley',
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    order: 5,
  },
  {
    caption: 'Scenic Himalayan Mountain Highway',
    category: 'cabs',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    order: 6,
  },
  {
    caption: 'Khajjiar Alpine Pine Meadows',
    category: 'mountains',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    order: 7,
  },
  {
    caption: 'Executive Fleet on Hill Transit',
    category: 'cabs',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
    order: 8,
  },
];

const defaultReviews = [
  {
    name: 'Rahul Sharma',
    tag: 'Una to Manali • Verified Passenger',
    rating: 5,
    comment:
      'Excellent service from ISBT Una counter. Driver was experienced with hill roads and the car was spotless. Highly recommend for Manali trips.',
    approved: true,
  },
  {
    name: 'Pooja Kapoor',
    tag: 'Airport Transfer IXC • Verified Passenger',
    rating: 5,
    comment:
      'Booked an early morning airport drop to Chandigarh. The cab arrived on time and the fare matched exactly what was quoted on WhatsApp.',
    approved: true,
  },
  {
    name: 'Gurinder Singh',
    tag: 'Ludhiana • Pilgrimage Yatra',
    rating: 5,
    comment:
      'Best taxi desk inside ISBT Una. We arrived by train and wanted an immediate cab to Chintpurni temple. They offered an honest fixed price without haggling.',
    approved: true,
  },
];

const defaultSettings = {
  businessName: 'Vinod Tour & Travels',
  tagline: 'Your Trusted Travel Partner from Una',
  location: 'ISBT Una, Himachal Pradesh',
  fullAddress: 'Counter Desk, Inter State Bus Terminal (ISBT), Una, Himachal Pradesh 174303',
  mapEmbedQuery: 'ISBT Una Himachal Pradesh',
  phonePrimary: '+91 62305 21544',
  phoneSecondary: '',
  whatsappNumber: '916230521544',
  email: 'booking@vinodtravelsuna.com',
  hours: '24 Hours Open (7 Days a Week)',
};

const seedIfEmpty = async () => {
  try {
    const vCount = await Vehicle.countDocuments();
    if (vCount === 0) {
      await Vehicle.insertMany(defaultVehicles);
      console.log(`Auto-seeded ${defaultVehicles.length} default vehicles.`);
    }

    const dCount = await Destination.countDocuments();
    if (dCount === 0) {
      await Destination.insertMany(defaultDestinations);
      console.log(`Auto-seeded ${defaultDestinations.length} default destinations.`);
    }

    const pCount = await TourPackage.countDocuments();
    if (pCount === 0) {
      await TourPackage.insertMany(defaultTourPackages);
      console.log(`Auto-seeded ${defaultTourPackages.length} default tour packages.`);
    }

    const gCount = await GalleryItem.countDocuments();
    if (gCount === 0) {
      await GalleryItem.insertMany(defaultGalleryItems);
      console.log(`Auto-seeded ${defaultGalleryItems.length} default gallery items.`);
    }

    const rCount = await Review.countDocuments();
    if (rCount === 0) {
      await Review.insertMany(defaultReviews);
      console.log(`Auto-seeded ${defaultReviews.length} default reviews.`);
    }

    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      await Settings.create(defaultSettings);
      console.log('Auto-seeded default business settings.');
    }
  } catch (err) {
    console.error('Error auto-seeding default data:', err.message);
  }
};

const forceSeed = async () => {
  await Promise.all([
    Vehicle.deleteMany(),
    Destination.deleteMany(),
    TourPackage.deleteMany(),
    GalleryItem.deleteMany(),
    Review.deleteMany(),
  ]);

  await Vehicle.insertMany(defaultVehicles);
  await Destination.insertMany(defaultDestinations);
  await TourPackage.insertMany(defaultTourPackages);
  await GalleryItem.insertMany(defaultGalleryItems);
  await Review.insertMany(defaultReviews);

  const existingSettings = await Settings.findOne();
  if (!existingSettings) {
    await Settings.create(defaultSettings);
  } else {
    Object.assign(existingSettings, defaultSettings);
    await existingSettings.save();
  }

  return {
    vehicles: defaultVehicles.length,
    destinations: defaultDestinations.length,
    tourPackages: defaultTourPackages.length,
    galleryItems: defaultGalleryItems.length,
    reviews: defaultReviews.length,
  };
};

module.exports = {
  defaultVehicles,
  defaultDestinations,
  defaultTourPackages,
  defaultGalleryItems,
  defaultReviews,
  defaultSettings,
  seedIfEmpty,
  forceSeed,
};
