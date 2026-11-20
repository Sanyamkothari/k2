/**
 * Site content: every fact from the original site, rewritten shorter.
 * Edit here; components only render.
 */
import { projectCount } from './projects';

export const site = {
  name: 'K2 Architects',
  tagline: 'Architecture for institutions that last.',
  city: 'Nagpur',
  since: 1999,
  description:
    'K2 Architects is an architecture practice founded in Nagpur, Maharashtra in 1999. 450+ schools, colleges, hospitals, hostels, townships and commercial buildings across seven Indian states.',
  phone: '9422101718',
  phoneDisplay: '+91 94221 01718',
  email: 'ar8880@gmail.com',
  address: {
    line1: '101, Ozone Apartments',
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
  ],
};

export const services = [
  { name: 'Educational Campus Architecture', description: 'Comprehensive architectural design for CBSE, ICSE, and international schools, colleges, and university campuses.' },
  { name: 'Hospital & Healthcare Architecture', description: 'NABH-compliant multi-speciality hospital complexes, medical colleges, diagnostic centres, and healthcare facilities.' },
  { name: 'Banquet & Hospitality Venues', description: 'Grand celebration venues, marriage halls, and commercial hospitality complexes designed for major gatherings.' },
  { name: 'Residential Townships & Housing', description: 'Integrated residential townships, apartment complexes, commercial plazas, and mixed-use developments.' },
  { name: 'Landscape Ecology & Biophilic Design', description: 'Sustainable micro-climates, water harvesting, native botanical integration, and therapeutic campus greens.' },
  { name: 'Luxury Bungalows & Private Estates', description: 'Bespoke country villas, farmhouses, and private family residences.' },
];

export const faqs = [
  {
    question: 'What architectural services does K2 Architects offer?',
    answer: 'K2 Architects specialises in architectural design for educational campuses (schools and colleges), multi-speciality hospital complexes, and grand banquet venues. Alongside these core sectors, our practice delivers complete architectural and engineering consultancy for residential developments, commercial complexes, and private residences.'
  },
  {
    question: 'Where is K2 Architects located and which regions does it serve?',
    answer: 'The practice is headquartered in Nagpur, Maharashtra (101, Ozone Apartments, Puranik Layout, Bharat Nagar, Amravati Road). While based in Central India, K2 Architects undertakes and delivers architectural projects all over India, partnering with educational trusts, hospital groups, and promoters nationwide.'
  },
  {
    question: 'Who leads the studio at K2 Architects?',
    answer: 'The practice is led by Principal Architect Ar. Sachin Kothari (Council of Architecture-registered, with 25+ years of institutional design experience) alongside Landscape Architect & Partner Ar. Riya Kothari, specialising in environmental design, sustainable micro-climates, and landscape ecology.'
  },
  {
    question: 'What is K2 Architects’ experience in school and educational campus design?',
    answer: 'K2 Architects has designed campuses for major national educational networks including Delhi Public School (DPS), Delhi World Public School, Sanskar International, Jindal World School, Vidyanchal, and Shri Shankaracharya Technical Campus, delivering comprehensive academic, residential, and sports infrastructure.'
  },
  {
    question: 'How do you initiate a project consultation with K2 Architects?',
    answer: 'You can reach out to our principal studio team via phone at +91 94221 01718, email ar8880@gmail.com, or submit a brief on our Contact page. Our studio typically replies within two working days.'
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
  { value: projectCount, suffix: '', label: 'Works in this portfolio' },
];

/** The eight sectors of the portfolio, matching Works filters and categories. */
export const sectors = [
  {
    index: '01',
    name: 'Schools',
    line: 'Architectural design for CBSE, ICSE, and international school campuses.',
    category: 'engineering',
    image: 'images/schools/dps-amravati-aerial.png',
  },
  {
    index: '02',
    name: 'Colleges & Campuses',
    line: 'Engineering faculties, polytechnic institutes, and university campus design.',
    category: 'college',
    image: 'images/colleges/pragati-eng-college-raipur.jpg',
  },
  {
    index: '03',
    name: 'Hospitals & Healthcare',
    line: 'NABH-compliant multi-speciality hospital complexes and medical facilities.',
    category: 'medi',
    image: 'images/healthcare/bilaspur-hospital-1.jpg',
  },
  {
    index: '04',
    name: 'Hostels & Public Buildings',
    line: 'Student hostel complexes, community facilities, and civic infrastructure.',
    category: 'hostel',
    image: 'images/hostels/washim-hostel.jpg',
  },
  {
    index: '05',
    name: 'Residential & Commercial',
    line: 'Multi-storied apartment towers, shopping complexes, and commercial plazas.',
    category: 'residential',
    image: 'images/residential/khamgaon-shreeram-plaza.jpg',
  },
  {
    index: '06',
    name: 'Bungalows & Townships',
    line: 'Integrated residential townships, country farmhouses, and private estates.',
    category: 'bungalow',
    image: 'images/bungalows/green-city.jpg',
  },
  {
    index: '07',
    name: 'Banquets & Hospitality',
    line: 'Grand celebratory venues, marriage complexes, and hospitality architecture.',
    category: 'banquets',
    image: 'images/hospitality/complex-hotel-hingoli.jpg',
  },
  {
    index: '08',
    name: 'Industrial',
    line: 'Manufacturing units, processing plants, and warehousing facilities.',
    category: 'industrial',
    image: 'images/hostels/gaushala-aerial-view.jpg',
  },
];

export const manifesto = [
  'Over 25 years of building schools, hospitals and campuses across Central India.',
  'Every project begins with the people who will use it, and ends with a building that will outlast us.',
  'Consortiums with national organisations let a Nagpur studio deliver at national scale.',
];

export const team = [
  {
    name: 'Ar. Sachin Kothari',
    role: 'Principal Architect',
    discipline: 'Architecture',
    index: '01',
    credentials: 'COA Registered · Founder',
    image: 'images/team/sachin-kothari.jpg',
  },
  {
    name: 'Ar. Riya Kothari',
    role: 'Landscape Architect',
    discipline: 'Landscape',
    index: '02',
    credentials: 'B.Arch · Landscape Architecture',
    image: 'images/team/riya-kothari.jpg',
  },
  {
    name: 'Ar. Mustan',
    role: 'Studio In-charge',
    discipline: 'Architecture',
    index: '03',
    credentials: 'Lead Architect · Project Coordination',
    image: 'images/team/mustan.jpg',
  },
  {
    name: 'Er. Lata',
    role: 'Studio In-charge',
    discipline: 'Engineering',
    index: '04',
    credentials: 'Lead Engineer · Structural & Execution',
    image: 'images/team/lata.jpg',
  },
];

export const clients = [
  { name: 'S.B. Jain Institute of Technology, Management & Research', image: 'images/clients/sb-jain.png' },
  { name: 'Delhi Public School', image: 'images/clients/delhi-public-school.png' },
  { name: 'Shri Shankaracharya Technical Campus, Bhilai', image: 'images/clients/shankaracharya-campus.png' },
  { name: 'G.H. Raisoni University', image: 'images/clients/raisoni-university.png' },
  { name: 'Vidyanchal The School', image: 'images/clients/vidyanchal.png' },
  { name: 'Sanskar International School', image: 'images/clients/sanskar-international.png' },
  { name: 'Happy Faces The Concept School', image: 'images/clients/happy-faces.png' },
  { name: 'Jindal World School', image: 'images/clients/jindal-school.jpg' },
  { name: 'Yugantar Public School', image: 'images/clients/yugantar-school.png' },
];

/** Named clients for copy (from the brief and the logo wall). */
export const clientNames = ['Delhi Public School', 'DPS World', 'G.D. Goenka', 'Jindal', 'Vidyanchal', 'Sanskar', 'Happy Faces', 'Yugantar'];

/**
 * Selected Works on the home page: slugs from projects.ts, in order.
 * `image` overrides the cover with a specific gallery image where a better frame exists.
 * Layout alternates one wide 16:9 frame with a pair of 4:5 frames.
 */
export const featured: { slug: string; image?: string; position?: string }[] = [
  { slug: 'delhi-public-school-amravati', image: 'images/schools/dps-amravati-aerial.png' },
  { slug: 'jito-delhi-public-school-chh-sambhaji-nagar', position: '92% 50%' },
  { slug: 'triveni-multi-speciality-hospital-bilaspur', position: '10% 70%' },
  { slug: 'shankaracharya-medical-college-bhilai' },
  { slug: 'yugantar-public-school-rajnandgaon' },
  { slug: 'pakal-residence-chh-sambhaji-nagar' },
  { slug: 'vivek-mandir-school-gondia', image: 'images/schools/gondia-school.jpg' },
];

export const heroSlides = [
  {
    index: '01',
    image: 'images/colleges/pragati-eng-college-raipur.jpg',
    alt: 'Pragati Engineering College campus in Raipur (C.G.), designed by K2 Architects',
    title: 'Pragati Engineering College',
    location: 'Raipur (C.G.)',
    slug: 'pragati-engineering-college-raipur',
  },
  {
    index: '02',
    image: 'images/colleges/citm-bhilai.jpg',
    alt: 'CITM Bhilai (C.G.) institutional campus, designed by K2 Architects',
    title: 'CITM',
    location: 'Bhilai (C.G.)',
    slug: 'citm-bhilai',
  },
  {
    index: '03',
    image: 'images/schools/dps-amravati-aerial.png',
    alt: 'Aerial photograph of Delhi Public School, Amravati (M.S.), designed by K2 Architects',
    title: 'Delhi Public School',
    location: 'Amravati (M.S.)',
    slug: 'delhi-public-school-amravati',
  },
];

export const hero = heroSlides[0];

