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
    postalCode: '440033',
    country: 'IN',
  },
  hours: 'Monday to Saturday, 10:00 – 18:00',
  geo: { lat: 21.1489024, lng: 79.0476678 },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.0878375730654!2d79.0476678!3d21.1489024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1c732727e2f%3A0x8d2d17482f9ef606!2sOzone%20Apartments!5e0!3m2!1sen!2sin!4v1729431073089!5m2!1sen!2sin',
  mapLink: 'https://maps.google.com/?q=Ozone+Apartments,+Puranik+Layout,+Bharat+Nagar,+Amravati+Road,+Nagpur',
  states: [
    'Maharashtra',
    'Chhattisgarh',
    'Madhya Pradesh',
    'Andhra Pradesh',
    'Punjab',
    'Gujarat',
    'Odisha',
    'Delhi NCR',
    'Uttar Pradesh',
    'Telangana',
    'Karnataka',
  ],
};

export const services = [
  { name: 'Campus Master Planning', description: 'Comprehensive master planning for CBSE, ICSE and international school campuses, universities, and technical institutes.' },
  { name: 'Hospital & Healthcare Architecture', description: 'NABH-compliant multi-specialty hospital complexes, medical colleges, diagnostic centers, and healthcare facilities.' },
  { name: 'Institutional Architecture', description: 'Educational infrastructure, polytechnic institutions, administrative clusters, and research centers.' },
  { name: 'Townships & High-Density Residential', description: 'Master-planned residential townships, apartment complexes, commercial plazas, and mixed-use developments.' },
  { name: 'Landscape Ecology & Biophilic Design', description: 'Sustainable micro-climates, water harvesting, native botanical integration, and therapeutic campus greens.' },
  { name: 'Luxury Bungalows & Private Estates', description: 'Bespoke country villas, farmhouses, and private family residences.' },
];

export const faqs = [
  {
    question: 'What architectural services does K2 Architects offer?',
    answer: 'K2 Architects provides comprehensive end-to-end architectural consultancy, including educational campus master planning, healthcare and hospital design, high-density residential townships, commercial complexes, landscape ecology, and luxury private residences.'
  },
  {
    question: 'Where is K2 Architects located and which regions do they serve?',
    answer: 'The practice is headquartered in Nagpur, Maharashtra (101, Ozone Apartment, Puranik Layout, Bharat Nagar, Amravati Road). Over 25 years, K2 Architects has delivered 450+ landmark projects across seven Indian states: Maharashtra, Chhattisgarh, Madhya Pradesh, Andhra Pradesh, Punjab, Gujarat, and Odisha.'
  },
  {
    question: 'Who leads the studio at K2 Architects?',
    answer: 'The practice is led by Principal Architect Ar. Sachin Kothari (Council of Architecture registered with 25+ years of institutional design experience) alongside Landscape Architect & Partner Ar. Riya Kothari, specializing in environmental design, sustainable micro-climates, and landscape ecology.'
  },
  {
    question: 'What is K2 Architects’ experience in school and educational campus design?',
    answer: 'K2 Architects has designed and master-planned campuses for major national educational networks including Delhi Public School (DPS), DPS World, Sanskar International, Jindal World School, Vidyanchal, and Shri Shankaracharya Technical Campus, delivering world-class academic, residential, and sporting infrastructure.'
  },
  {
    question: 'How do you initiate a project consultation with K2 Architects?',
    answer: 'You can reach out to our principal studio team via phone at +91 94221 01718, email ar8880@gmail.com, or submit a brief on our Contact page. Our studio typically replies within two business days.'
  }
];

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
  {
    name: 'Ar. Sachin Kothari',
    role: 'Principal Architect',
    index: '01',
    credentials: 'COA Registered · Founder',
    image: 'images/team-sachin.jpg',
  },
  {
    name: 'Ar. Riya Kothari',
    role: 'Landscape Architect',
    index: '02',
    credentials: 'B.Arch · Landscape Architecture',
    image: 'images/team-riya.jpg',
  },
  {
    name: 'Ar. Mustan',
    role: 'Studio Incharge',
    index: '03',
    credentials: 'Lead Architect · Project Coordination',
    image: 'images/team-mustan.jpg',
  },
  {
    name: 'Er. Lata',
    role: 'Studio Incharge',
    index: '04',
    credentials: 'Lead Engineer · Structural & Execution',
    image: 'images/team-lata.jpg',
  },
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

export const heroSlides = [
  {
    index: '01',
    image: 'images/dps_amravati_aerial.png',
    alt: 'Aerial photograph of Delhi Public School, Amravati, designed by K2 Architects',
    title: 'Delhi Public School',
    location: 'Amravati',
    slug: 'delhi-public-school-amravati',
  },
  {
    index: '02',
    image: 'images/PRAGATI ENG. COLLEGE RAIPUR.jpg',
    alt: 'Pragati Engineering College campus in Raipur, designed by K2 Architects',
    title: 'Pragati Engineering College',
    location: 'Raipur',
    slug: 'pragati-engineering-college-raipur',
  },
  {
    index: '03',
    image: 'images/CITM BHILAI.jpg',
    alt: 'CITM Bhilai institutional campus, designed by K2 Architects',
    title: 'CITM',
    location: 'Bhilai',
    slug: 'citm-bhilai',
  },
];

export const hero = heroSlides[0];

