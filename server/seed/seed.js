const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('../config/db');
const User = require('../models/User');
const Settings = require('../models/Settings');
const Vehicle = require('../models/Vehicle');
const Destination = require('../models/Destination');
const TourPackage = require('../models/TourPackage');
const GalleryItem = require('../models/GalleryItem');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

const vehicles = [
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
    order: 4,
  },
];

const destinations = [
  {
    to: 'Chandigarh (IXC / PGI)',
    distanceKm: 115,
    durationLabel: '~2.5 hrs',
    tag: 'Highway Corridor',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    description:
      'Via Nangal & Ropar bypass. Direct cab service to Chandigarh International Airport, PGI Hospital, Sector 17, and IT Park.',
    approxFare: '2,200 - 2,500',
    order: 1,
  },
  {
    to: 'Delhi NCR / IGI Airport',
    distanceKm: 360,
    durationLabel: '~6.5 hrs',
    tag: 'NH-44 Express',
    image: 'https://images.unsplash.com/photo-1585506942812-e72b29cef752?auto=format&fit=crop&w=1200&q=80',
    description:
      'Smooth NH-44 highway express route. Direct drop at IGI Terminal 1/2/3, New Delhi Railway Station, Gurgaon or Noida.',
    approxFare: '5,400 - 5,900',
    order: 2,
  },
  {
    to: 'Shimla / Kufri',
    distanceKm: 160,
    durationLabel: '~4.5 hrs',
    tag: 'Mountain Scenic',
    image: '/images/destinations/shimla.jpg',
    description:
      'Ascend to the Queen of Hills via Bilaspur / Solan route. Drop to Mall Road lifts, Lakkar Bazaar, and high-altitude Kufri resorts.',
    approxFare: '3,600 - 4,000',
    order: 3,
  },
  {
    to: 'Manali / Solang Valley',
    distanceKm: 245,
    durationLabel: '~7 hrs',
    tag: 'Himalayan Scenic',
    image: '/images/destinations/manali.jpg',
    description:
      'Scenic route via Bilaspur, Mandi and Kullu valley along the Beas river to the adventure capital of Himachal.',
    approxFare: '5,800 - 6,300',
    order: 4,
  },
  {
    to: 'Dharamshala / McLeodganj',
    distanceKm: 95,
    durationLabel: '~2.5 hrs',
    tag: 'Kangra Valley',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
    description:
      'Passing Kangra Fort & Tea Gardens. Direct drop to HPCA Stadium, Dalai Lama Temple, Bhagsu Waterfall, and Dharamkot.',
    approxFare: '2,800 - 3,200',
    order: 5,
  },
  {
    to: 'Maa Chintpurni Shrine',
    distanceKm: 52,
    durationLabel: '~1.2 hrs',
    tag: 'Holy Yatra',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80',
    description:
      'Dedicated roundtrip darshan taxi with waiting time included. Optional extension to Jwala Ji, Kangra Devi, and Chamunda Devi temples.',
    approxFare: '1,600 - 1,900',
    fareLabel: 'Roundtrip Package',
    order: 6,
  },
  {
    to: 'Dalhousie & Khajjiar',
    distanceKm: 175,
    durationLabel: '~5 hrs',
    tag: 'Mini Switzerland',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description:
      'Breathtaking cedar forests, emerald Khajjiar lake, Kalatop wildlife sanctuary, and colonial churches.',
    approxFare: '4,500 - 4,900',
    fareLabel: 'Approx. Sedan Fare',
    order: 7,
  },
];

const tourPackages = [
  {
    title: 'Shimla & Kufri Package',
    tagline: 'Queen of Hills',
    duration: '3 Days / 2 Nights',
    image: '/images/destinations/shimla.jpg',
    description:
      'Includes Mall Road, Christ Church, Jakhu Temple ropeway, Kufri snow amusement park, and green valley viewpoints.',
    price: '8,500',
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
    order: 4,
  },
];

const galleryItems = [
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

const reviews = [
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

const seedData = async () => {
  try {
    await connectDB();

    await Promise.all([
      Vehicle.deleteMany(),
      Destination.deleteMany(),
      TourPackage.deleteMany(),
      GalleryItem.deleteMany(),
      Review.deleteMany(),
    ]);

    await Vehicle.insertMany(vehicles);
    await Destination.insertMany(destinations);
    await TourPackage.insertMany(tourPackages);
    await GalleryItem.insertMany(galleryItems);
    await Review.insertMany(reviews);

    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      await Settings.create({
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
      });
      console.log('Business settings seeded (edit anytime from /admin/settings).');
    } else {
      console.log('Business settings already exist, skipping creation.');
    }

    const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@vinodtravelsuna.com';
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'V!nodTravels#2026Una';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'Vinod Travels Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log(`Admin user created -> email: ${adminEmail} / password: ${adminPassword}`);
    } else {
      existingAdmin.password = adminPassword;
      await existingAdmin.save();
      console.log(`Admin password updated -> email: ${adminEmail}`);
    }

    console.log('Seed data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Promise.all([
      Vehicle.deleteMany(),
      Destination.deleteMany(),
      TourPackage.deleteMany(),
      GalleryItem.deleteMany(),
      Review.deleteMany(),
      Booking.deleteMany(),
    ]);
    console.log('All content data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}
