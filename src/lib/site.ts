/**
 * Site content: every fact from the original site, rewritten shorter.
 * Edit here; components only render.
 */
export const site = {
  name: 'K2 Architects',
  tagline: 'Architecture for institutions that last.',
  city: 'Nagpur',
  since: 1999,
  description:
    'K2 Architects is a 25-year-old architecture practice in Nagpur, Maharashtra. 450+ schools, colleges, hospitals, hostels, townships and commercial buildings across seven Indian states.',
  phone: '9422101718',
  phoneDisplay: '+91 94221 01718',
  email: 'ar8880@gmail.com',
  address: {
    line1: '101, Ozone Apartment',
    line2: 'Puranik Layout, Bharat Nagar',
    line3: 'Amravati Road, Nagpur',
    locality: 'Nagpur',
    region: 'Maharashtra',
    country: 'IN',
  },
  hours: 'Monday to Saturday, 10:00 – 18:00',
  geo: { lat: 21.1489024, lng: 79.0476678 },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0878375730654!2d79.0476678!3d21.1489024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1c732727e2f%3A0x8d2d17482f9ef606!2sOzone%20Apartments!5e0!3m2!1sen!2sin!4v1729431073089!5m2!1sen!2sin',
  mapLink: 'https://maps.google.com/?q=Ozone+Apartments,+Puranik+Layout,+Bharat+Nagar,+Amravati+Road,+Nagpur',
  states: ['Maharashtra', 'Chhattisgarh', 'Madhya Pradesh', 'Andhra Pradesh', 'Punjab', 'Gujarat', 'Odisha'],
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/works', label: 'Works' },
  { href: '/studio', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
];

export const credentials = [
  { value: 25, suffix: '+', label: 'Years of practice' },
  { value: 450, suffix: '+', label: 'Projects delivered' },
  { value: 7, suffix: '', label: 'Indian states' },
  { value: 69, suffix: '', label: 'Works in this portfolio' },
];

/** The five sectors from the original About page, each tied to a category and a preview image. */
export const sectors = [
  {
    index: '01',
    name: 'Education & Institutions',
    line: 'Campus design, institutional facilities, university master planning.',
    category: 'engineering',
    image: 'images/dps_amravati_aerial.png',
  },
  {
    index: '02',
    name: 'Health & Public Places',
    line: 'Multi-speciality hospitals, healthcare institutions, teerth master planning.',
    category: 'medi',
    image: 'images/BILASPUR HOSPITAL-1.jpg',
  },
  {
    index: '03',
    name: 'Townships & Farmhouses',
    line: 'Multi-storied apartments, mini and major townships, independent bungalows.',
    category: 'bungalow',
    image: 'images/green city.jpg',
  },
  {
    index: '04',
    name: 'Industrial',
    line: 'Industrial plants, factory buildings, a wire-drawing plant.',
    category: 'residential',
    image: 'images/gaushala Aerial view.jpg',
  },
  {
    index: '05',
    name: 'Urban Development',
    line: 'Development planning, land use, land development.',
    category: 'bungalow',
    image: 'images/JANGIR TOWNSHIP.jpg',
  },
];

export const manifesto = [
  'Twenty-five years of building schools, hospitals and campuses across central India.',
  'Every project begins with the people who will use it, and ends with a building that will outlast us.',
  'Consortiums with national organisations let a Nagpur studio deliver at national scale.',
];

export const team = [
  { name: 'Ar. Sachin Kothari', role: 'Principal Architect', image: 'images/team1.jpg' },
  { name: 'Ar. Riya Kothari', role: 'Landscape Architect', image: 'images/team333pre2.png' },
  { name: 'Ar. Mustan', role: 'Studio Incharge', image: 'images/mem44.jpg' },
  { name: 'Er. Lata', role: 'Studio Incharge', image: 'images/team22.png' },
];

export const clients = [
  { name: 'S.B. Jain Institute of Technology, Management & Research', image: 'images/clg1.png' },
  { name: 'Delhi Public School', image: 'images/clientdps.png' },
  { name: 'Shri Shankaracharya Technical Campus, Bhilai', image: 'images/client3.png' },
  { name: 'G H Raisoni University', image: 'images/client4-removebg.png' },
  { name: 'Vidyanchal The School', image: 'images/vidyanchal.png' },
  { name: 'Sanskar International School', image: 'images/sanskarschool.png' },
  { name: 'Happy Faces The Concept School', image: 'images/happyfaces.png' },
  { name: 'Jindal World School', image: 'images/jindalschool.jpg' },
  { name: 'Yugantar Public School', image: 'images/yugantarschool.png' },
];

/** Named clients for copy (from the brief and the logo wall). */
export const clientNames = ['Delhi Public School', 'DPS World', 'GD Goenka', 'Jindal', 'Vidyanchal', 'Sanskar', 'Happy Faces', 'Yugantar'];

/**
 * Selected Works on the home page: slugs from projects.ts, in order.
 * `image` overrides the cover with a specific gallery image where a better frame exists.
 * Layout alternates one wide 16:9 frame with a pair of 4:5 frames.
 */
export const featured: { slug: string; image?: string }[] = [
  { slug: 'delhi-public-school-amravati', image: 'images/dps_amravati_aerial.png' },
  { slug: 'jito-delhi-public-school-chh-sambhaji-nagar' },
  { slug: 'triveni-multispeciality-hospital-bilaspur' },
  { slug: 'shankaracharya-medical-college-bhilai' },
  { slug: 'yugantar-public-school-rajnandgaon' },
  { slug: 'green-city-township-rajnandgaon' },
  { slug: 'vivek-mandir-school-gondia', image: 'images/GONDIA SCHOOL.jpg' },
];

export const hero = {
  image: 'images/dps_amravati_aerial.png',
  alt: 'Aerial photograph of Delhi Public School, Amravati, designed by K2 Architects',
};
