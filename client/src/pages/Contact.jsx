import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';

const Contact = () => (
  <>
    <SEO
      title="Contact Us | Taxi Booking Phone Number ISBT Una Himachal Pradesh"
      description="Contact Vinod Tour & Travels at ISBT Una Counter Desk. 24x7 Phone: +91 62305 21544, WhatsApp booking, address and location map."
      keywords={[
        'contact vinod tour travels',
        'taxi booking number una himachal',
        'isbt una taxi phone number',
        'cab stand una contact',
      ]}
      canonical="/contact"
    />
    <PageHeader
      eyebrow="Get In Touch"
      title="Contact Vinod Tour & Travels"
      description="Reach the ISBT Una desk directly by phone, WhatsApp, or the quick booking form below."
    />
    <ContactSection showHeading={false} />
  </>
);

export default Contact;
