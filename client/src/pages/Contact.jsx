import React from 'react';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';

const Contact = () => (
  <>
    <PageHeader
      eyebrow="Get In Touch"
      title="Contact Vinod Tour & Travels"
      description="Reach the ISBT Una desk directly by phone, WhatsApp, or the quick booking form below."
    />
    <ContactSection showHeading={false} />
  </>
);

export default Contact;
