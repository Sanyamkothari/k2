/**
 * Regional hubs configuration for Pan-India & nationwide SEO footprint.
 * Defines national and regional landing pages with search-optimized copy,
 * geographical targeting, transit advantages, and curated project showcases.
 */
import { projects, type Project } from './projects';

export interface RegionHub {
  slug: string;
  name: string;
  title: string;
  badge: string;
  headline: string;
  description: string;
  editorial: string;
  strategicAdvantage: string;
  keyCities: string[];
  focusAreas: { title: string; desc: string }[];
  matchStates?: string[];
  flagshipSlugs: string[];
}

export const REGION_HUBS: Record<string, RegionHub> = {
  'pan-india': {
    slug: 'pan-india',
    name: 'Pan-India Practice',
    title: 'Pan-India Campus Master Planning & Institutional Architects | K2 Architects',
    badge: 'National Practice · Nationwide Reach',
    headline: 'Campus master planning and architecture for generational institutions across all Indian states.',
    description: 'National architectural consultancy headquartered in Central India. 450+ CBSE/ICSE schools, medical colleges, universities, and NABH hospitals master planned across India.',
    editorial:
      'Headquartered in Nagpur at the geographic center of India (the historic Zero Mile Marker), K2 Architects delivers institutional master planning and comprehensive architectural engineering across the country. Our central location provides direct 1-to-2 hour flight and express rail connectivity to every Indian metropolitan hub and state capital, from Delhi NCR and Mumbai to Bengaluru, Hyderabad, and Kolkata. Combined with long-standing national consortium partnerships, our studio offers the institutional rigor, affiliation compliance (CBSE, ICSE, AICTE, NMC, NABH), and rapid site coordination demanded by nationwide educational networks and healthcare trusts.',
    strategicAdvantage:
      'Zero-Mile Strategic Advantage: Headquartered at the geographic heart of India, our studio provides rapid nationwide mobility, direct flight links to all major metros, and national consortiums enabling agile on-site supervision in any state.',
    keyCities: [
      'All Indian States',
      'Delhi NCR',
      'Mumbai & Pune',
      'Bengaluru',
      'Hyderabad',
      'Kolkata',
      'Ahmedabad',
      'Raipur',
      'Bhopal & Indore',
      'Bhubaneswar',
      'Chandigarh',
    ],
    focusAreas: [
      {
        title: 'CBSE, ICSE & International School Campuses',
        desc: 'Turnkey academic master planning adhering strictly to national board affiliation norms, student pedestrian safety, athletic zoning, and energy efficiency.',
      },
      {
        title: 'NABH Multi-Speciality Hospitals & Medical Colleges',
        desc: 'Rigorous clinical zoning, sterile corridors, emergency ingress, ICU/OT suites, infection control pathways, and future expandability.',
      },
      {
        title: 'Universities & Technical Institutes',
        desc: 'High-capacity academic faculties, auditorium complexes, administrative headquarters, and high-density student residential clusters.',
      },
      {
        title: 'Integrated Townships & Public Infrastructure',
        desc: 'Master-planned residential developments, commercial plazas, and environmental landscape ecology.',
      },
    ],
    flagshipSlugs: [
      'delhi-public-school-amravati',
      'shankaracharya-medical-college-bhilai',
      'triveni-multispeciality-hospital-bilaspur',
      'jito-delhi-public-school-chh-sambhaji-nagar',
      'delhi-public-school-katni',
      'indian-public-school-sambalpur',
    ],
  },
  'delhi-ncr': {
    slug: 'delhi-ncr',
    name: 'Delhi NCR & Northern Region',
    title: 'School, University & Institutional Campus Architects — Delhi NCR',
    badge: 'North India Hub · Delhi NCR',
    headline: 'World-class campus master planning and institutional architecture for Delhi NCR and Western UP.',
    description: 'Campus master planning and architectural design for CBSE/ICSE schools, universities, and healthcare facilities across Delhi, Noida, Gurugram, Ghaziabad, and Faridabad.',
    editorial:
      "Delhi NCR is India's epicentre for forward-thinking educational networks and institutional trusts. K2 Architects brings 25+ years of campus planning experience to the National Capital Region, combining deep familiarity with CBSE/ICSE board mandates, micro-climatic thermal comfort, and high-density spatial efficiency. With delivered projects across North India—including the landmark Tyagi Residence in Ghaziabad—our studio partners with trusts to craft visionary, enduring institutional environments.",
    strategicAdvantage:
      'Direct Transit Link: Fast, regular daily flights from Nagpur to New Delhi (1 hr 35 min) enable our principal architects to conduct weekly site inspections and board meetings across Delhi NCR.',
    keyCities: ['New Delhi', 'Noida & Greater Noida', 'Gurugram', 'Ghaziabad', 'Faridabad', 'Sonipat', 'Meerut', 'Panipat'],
    focusAreas: [
      {
        title: 'CBSE & International School Master Planning',
        desc: 'Classrooms designed for natural daylighting, high-efficiency circulation spines, and sports infrastructure tailored to NCR board standards.',
      },
      {
        title: 'Private University Campuses',
        desc: 'Multidisciplinary faculty blocks, student union centers, residential halls, and green courtyards.',
      },
      {
        title: 'Healthcare & Specialty Clinics',
        desc: 'Modern clinical layouts engineered for barrier-free patient mobility, sterile zones, and efficient diagnostics.',
      },
    ],
    flagshipSlugs: [
      'tyagi-residence-ghaziabad',
      'delhi-public-school-amravati',
      'jito-delhi-public-school-chh-sambhaji-nagar',
      'delhi-public-school-katni',
      'g-d-goenka-international-school-campus-development',
      'shankaracharya-medical-college-bhilai',
    ],
  },
  maharashtra: {
    slug: 'maharashtra',
    name: 'Maharashtra',
    title: 'Architects in Maharashtra — Institutional, Hospital & Campus Design',
    badge: 'Headquarters & State Practice',
    headline: '25+ years of landmark educational, healthcare, and civic infrastructure across Maharashtra.',
    description: 'Headquartered in Nagpur, K2 Architects has delivered hundreds of landmark schools, colleges, multi-specialty hospitals, and residential developments across Maharashtra.',
    editorial:
      "From our Nagpur studio, K2 Architects has helped shape Maharashtra's built landscape for more than a quarter of a century. Our portfolio spans acclaimed CBSE school campuses in Amravati, Chhatrapati Sambhaji Nagar, Akola, and Gondia, multi-specialty hospitals in Parbhani, engineering colleges in Malkapur, and high-density civic spaces. We master the hot-composite climate of the Deccan plateau with courtyard shading, optimized daylighting, and robust local masonry craft.",
    strategicAdvantage:
      'Statewide Presence: Comprehensive familiarity with Maharashtra Town Planning regulations, Unified Development Control and Promotion Regulations (UDCPR), and municipal compliance.',
    keyCities: [
      'Nagpur',
      'Mumbai',
      'Pune',
      'Amravati',
      'Chhatrapati Sambhaji Nagar',
      'Chandrapur',
      'Akola',
      'Gondia',
      'Washim',
      'Parbhani',
      'Wardha',
    ],
    matchStates: ['Maharashtra'],
    focusAreas: [
      {
        title: 'Educational Campus Networks',
        desc: 'Over 200+ schools and colleges designed with climate-responsive double corridors, verandahs, and landscaped assembly courts.',
      },
      {
        title: 'Multi-Speciality Hospitals & Trauma Centers',
        desc: 'NABH-compliant healthcare facilities with emergency departments, diagnostic labs, and sterile surgical suites.',
      },
      {
        title: 'Bungalows & Private Estates',
        desc: 'Custom contemporary family residences celebrating natural basalt, terracotta jalis, and cross-ventilation.',
      },
    ],
    flagshipSlugs: [
      'delhi-public-school-amravati',
      'jito-delhi-public-school-chh-sambhaji-nagar',
      'vivek-mandir-school-gondia',
      'p-p-multispeciality-hospital-parbhani',
      'v-b-kolte-engineering-college-malkapur',
      'happy-faces-concept-school-washim',
    ],
  },
  'madhya-pradesh': {
    slug: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    title: 'School, University & Hospital Architects in Madhya Pradesh',
    badge: 'Central Region · Madhya Pradesh',
    headline: 'End-to-end campus master planning and healthcare architecture across Madhya Pradesh.',
    description: '25+ years of institutional architecture in Madhya Pradesh. Designing CBSE campuses, universities, multi-specialty medical centers, and public infrastructure across Bhopal, Indore, Katni, and Jabalpur.',
    editorial:
      'Positioned directly adjacent to Madhya Pradesh, K2 Architects is a trusted master planner for institutional foundations throughout the state. From the comprehensive campus master plan of Delhi Public School in Katni to regional colleges in Betul and healthcare infrastructure, our firm understands the regulatory requirements of MP statutory boards and town planning directorates, delivering robust, climate-resilient architecture that endures.',
    strategicAdvantage:
      'Immediate Regional Proximity: Daily road, rail, and air access to key MP cities ensures prompt site review, milestone handovers, and close collaboration with local district administrations.',
    keyCities: ['Bhopal', 'Indore', 'Jabalpur', 'Katni', 'Gwalior', 'Ujjain', 'Chhindwara', 'Seoni', 'Betul'],
    matchStates: ['Madhya Pradesh'],
    focusAreas: [
      {
        title: 'CBSE & Navodaya-Standard Campuses',
        desc: 'Modern school master plans with dedicated science labs, libraries, athletic tracks, and acoustic auditoriums.',
      },
      {
        title: 'Higher Education & Polytechnic Colleges',
        desc: 'Sprawling campus complexes with administrative hubs, workshops, and high-density student hostels.',
      },
      {
        title: 'Healthcare Facilities',
        desc: 'Hospitals engineered for high patient volumes, thermal comfort, and low maintenance overhead.',
      },
    ],
    flagshipSlugs: [
      'delhi-public-school-katni',
      'mansarovar-school-betul',
      'delhi-public-school-amravati',
      'triveni-multispeciality-hospital-bilaspur',
      'shankaracharya-medical-college-bhilai',
      'yugantar-public-school-rajnandgaon',
    ],
  },
  chhattisgarh: {
    slug: 'chhattisgarh',
    name: 'Chhattisgarh',
    title: 'Campus, Hospital & Township Architects in Chhattisgarh — Raipur, Bhilai, Bilaspur',
    badge: 'Regional Stronghold · Chhattisgarh',
    headline: 'The architectural practice behind iconic medical colleges, public schools, and master-planned townships in Chhattisgarh.',
    description: 'K2 Architects has designed and delivered premier landmarks in Chhattisgarh including Shri Shankaracharya Medical College in Bhilai, Triveni Hospital in Bilaspur, DPS Raigarh, and Green City Township.',
    editorial:
      "Chhattisgarh represents one of K2 Architects' most extensive portfolios of delivered masterworks. Our studio designed the sprawling Shri Shankaracharya Technical Campus & Medical College in Bhilai, Triveni Multispeciality Hospital in Bilaspur, Ayurvedic College & Hospital in Raigarh, DPS Raigarh, Krishna Public Schools in Raipur, and the multi-acre Green City Township in Rajnandgaon. We provide comprehensive architectural, structural coordination, and landscape master planning tailored to Chhattisgarh's industrial and educational growth.",
    strategicAdvantage:
      'Unmatched Portfolio in CG: Decades of successful execution across Raipur, Bhilai, Bilaspur, and Raigarh with proven local authority approvals and turnkey contractor coordination.',
    keyCities: ['Raipur', 'Bhilai', 'Bilaspur', 'Rajnandgaon', 'Raigarh', 'Durg', 'Korba', 'Bhatapara'],
    matchStates: ['Chhattisgarh'],
    focusAreas: [
      {
        title: 'Medical Colleges & Multi-Speciality Hospitals',
        desc: 'Full-scale medical college campus planning with attached 500+ bed teaching hospitals meeting NMC standards.',
      },
      {
        title: 'Major School Networks',
        desc: 'Campuses for Delhi Public School, Krishna Public School, and Yugantar Public School built for generational durability.',
      },
      {
        title: 'Integrated Townships',
        desc: 'Master-planned communities featuring internal road networks, landscaped parks, water retention lakes, and community clubs.',
      },
    ],
    flagshipSlugs: [
      'shankaracharya-medical-college-bhilai',
      'triveni-multispeciality-hospital-bilaspur',
      'delhi-public-school-raigarh',
      'green-city-township-rajnandgaon',
      'yugantar-public-school-rajnandgaon',
      'rmch-ayurvedic-college-raigarh',
    ],
  },
  'odisha-east-india': {
    slug: 'odisha-east-india',
    name: 'Odisha & Eastern Region',
    title: 'Institutional, Campus & Hospital Architects — Odisha & Eastern India',
    badge: 'Eastern Region · Odisha',
    headline: 'Generational educational campuses, healthcare facilities, and civic master plans in Eastern India.',
    description: 'Architectural consultancy for school boards, medical colleges, and private universities across Odisha, West Bengal, and Jharkhand. Landmark projects including Indian Public School Sambalpur.',
    editorial:
      'As Eastern India undergoes rapid industrial and educational expansion, K2 Architects brings decades of technical expertise in large-scale campus master planning. Our work at Indian Public School in Sambalpur showcases our capability to integrate cyclone-resistant structural design, high-capacity drainage systems, and shaded academic spines that withstand Eastern India’s humid subtropical climate.',
    strategicAdvantage:
      'Direct East-West Transit Corridor: Direct rail and highway connectivity from Nagpur along the national corridor directly into Sambalpur, Jharsuguda, Rourkela, and Bhubaneswar.',
    keyCities: ['Bhubaneswar', 'Cuttack', 'Sambalpur', 'Rourkela', 'Jharsuguda', 'Bargarh', 'Balasore', 'Puri'],
    matchStates: ['Odisha'],
    focusAreas: [
      {
        title: 'Climate-Resilient School Architecture',
        desc: 'Deep overhangs, elevated plinths, and robust storm-water management tailored to coastal and monsoon extremes.',
      },
      {
        title: 'Multi-Speciality Healthcare Complexes',
        desc: 'Patient-centric medical centers with natural lighting, efficient diagnostics, and low running energy costs.',
      },
      {
        title: 'Institutional Campuses',
        desc: 'Pedestrianized campus networks connecting academic zones, student hostels, and sports grounds.',
      },
    ],
    flagshipSlugs: [
      'indian-public-school-sambalpur',
      'delhi-public-school-raigarh',
      'delhi-public-school-amravati',
      'shankaracharya-medical-college-bhilai',
      'triveni-multispeciality-hospital-bilaspur',
      'yugantar-public-school-rajnandgaon',
    ],
  },
  'gujarat-west-india': {
    slug: 'gujarat-west-india',
    name: 'Gujarat & Western Region',
    title: 'Institutional, Industrial & Educational Campus Architects — Gujarat',
    badge: 'Western Region · Gujarat',
    headline: 'High-performance campus master planning, industrial architecture, and institutional design for Gujarat.',
    description: 'Comprehensive master planning and architectural engineering for CBSE schools, industrial complexes, and commercial townships in Ahmedabad, Surat, Vadodara, and Rajkot.',
    editorial:
      "Gujarat's entrepreneurial growth requires architecture that maximizes floor plate efficiency, achieves rapid project delivery, and delivers exceptional financial value. K2 Architects brings 25+ years of multi-sector capability—from heavy industrial plants and logistics facilities to international educational campuses and luxury townships—serving forward-looking trusts and industrial groups across Western India.",
    strategicAdvantage:
      'Direct Transit & Industry Expertise: Regular daily flights and trunk express rail lines from Nagpur to Ahmedabad and Surat ensure seamless project leadership and design review.',
    keyCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar', 'Vapi', 'Anand'],
    focusAreas: [
      {
        title: 'CBSE & International Schools',
        desc: 'Cost-efficient, future-ready learning spaces with smart technology integration and flexible academic wings.',
      },
      {
        title: 'Industrial Plants & Logistics Centers',
        desc: 'Engineered structural bays, heavy vehicular circulation, fire compliance, and worker welfare facilities.',
      },
      {
        title: 'Commercial Plazas & Townships',
        desc: 'High-density mixed-use developments balancing vehicular parking, retail frontage, and civic open spaces.',
      },
    ],
    flagshipSlugs: [
      'delhi-public-school-amravati',
      'jito-delhi-public-school-chh-sambhaji-nagar',
      'shankaracharya-medical-college-bhilai',
      'green-city-township-rajnandgaon',
      'triveni-multispeciality-hospital-bilaspur',
      'g-d-goenka-international-school-campus-development',
    ],
  },
  'south-india': {
    slug: 'south-india',
    name: 'South India (Telangana, AP, Karnataka)',
    title: 'Educational Campus & Healthcare Architecture — South India',
    badge: 'Southern Region · Hyderabad & Bengaluru',
    headline: 'Advanced campus master planning, biophilic design, and healthcare architecture for Southern India.',
    description: 'Institutional master planning for international schools, engineering universities, and NABH multi-specialty hospitals across Hyderabad, Bengaluru, Visakhapatnam, and Vijayawada.',
    editorial:
      'Southern India is a national leader in educational excellence and medical innovation. K2 Architects partners with higher education groups, medical foundations, and CBSE/ICSE educational trusts across Telangana, Andhra Pradesh, and Karnataka. Led by Landscape Architect Ar. Riya Kothari, our studio integrates biophilic campus green networks, passive solar orientation, and water harvesting into high-capacity academic and healthcare facilities.',
    strategicAdvantage:
      'Rapid North-South Connectivity: 1-hour direct flights from Nagpur to Hyderabad and Bengaluru allow rapid mobilization and collaborative reviews with southern clients.',
    keyCities: ['Hyderabad', 'Bengaluru', 'Visakhapatnam', 'Vijayawada', 'Warangal', 'Amaravati', 'Mysuru', 'Tirupati'],
    focusAreas: [
      {
        title: 'Biophilic Campus Master Planning',
        desc: 'Landscape ecology integrated into daily student life: shaded outdoor learning spaces, rainwater percolation, and native tree canopies.',
      },
      {
        title: 'NABH Multi-Speciality Hospitals',
        desc: 'Advanced medical spatial layouts facilitating infection control, modular expansion, and positive patient psychology.',
      },
      {
        title: 'Technical Institutes & Universities',
        desc: 'Contemporary faculty buildings, research labs, high-capacity dining halls, and student dormitories.',
      },
    ],
    flagshipSlugs: [
      'delhi-public-school-amravati',
      'shankaracharya-medical-college-bhilai',
      'triveni-multispeciality-hospital-bilaspur',
      'yugantar-public-school-rajnandgaon',
      'jito-delhi-public-school-chh-sambhaji-nagar',
      'green-city-township-rajnandgaon',
    ],
  },
  'punjab-north-india': {
    slug: 'punjab-north-india',
    name: 'Punjab & Northern Region',
    title: 'School, University & Institutional Architects — Punjab & Northern India',
    badge: 'Northern Region · Punjab & Tricity',
    headline: 'High-performance academic campuses, sports academies, and institutional architecture in Punjab.',
    description: 'Architectural consultancy for CBSE schools, sports complexes, student residential hostels, and institutional campuses across Chandigarh, Ludhiana, Amritsar, and Jalandhar.',
    editorial:
      "Northern India's educational heritage demands campuses that integrate expansive sports infrastructure, robust winter and summer climatic design, and dignified public presence. K2 Architects provides turnkey architectural master planning for schools, boarding institutions, and colleges throughout Punjab and Haryana, ensuring strict adherence to national safety codes and educational excellence.",
    strategicAdvantage:
      'Turnkey Consortiums: Strong alliances with national structural and MEP engineering consortiums for seamless on-ground project execution in Northern India.',
    keyCities: ['Chandigarh Tricity', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Mohali', 'Bathinda'],
    focusAreas: [
      {
        title: 'Comprehensive Sports & Academic Campuses',
        desc: 'Olympic-dimension tracks, indoor swimming facilities, and academic classrooms configured for extreme seasonal temperature swings.',
      },
      {
        title: 'Boarding Schools & High-Density Hostels',
        desc: 'Secure, comfortable residential living environments with natural ventilation and high-efficiency dining facilities.',
      },
      {
        title: 'Civic & Gathering Architecture',
        desc: 'High-capacity community auditoriums, celebratory banquets, and cultural centers designed to host thousands.',
      },
    ],
    flagshipSlugs: [
      'delhi-public-school-amravati',
      'vivek-mandir-school-gondia',
      'delhi-public-school-katni',
      'shankaracharya-medical-college-bhilai',
      'yugantar-public-school-rajnandgaon',
      'happy-faces-concept-school-washim',
    ],
  },
};

export const REGION_ORDER = Object.keys(REGION_HUBS);

/**
 * Returns the list of projects to showcase for a given region.
 * First priority: projects located in matching states (if matchStates is provided).
 * Second priority: flagship national projects explicitly declared for this hub.
 */
export function getRegionProjects(hub: RegionHub): Project[] {
  const projectMap = new Map(projects.map((p) => [p.slug, p]));
  const list: Project[] = [];
  const seen = new Set<string>();

  if (hub.matchStates && hub.matchStates.length > 0) {
    for (const p of projects) {
      if (hub.matchStates.includes(p.state) && !seen.has(p.slug)) {
        list.push(p);
        seen.add(p.slug);
      }
    }
  }

  for (const slug of hub.flagshipSlugs) {
    if (!seen.has(slug)) {
      const p = projectMap.get(slug);
      if (p) {
        list.push(p);
        seen.add(slug);
      }
    }
  }

  // Always ensure at least 6 projects for visual density
  if (list.length < 6) {
    for (const p of projects) {
      if (!seen.has(p.slug)) {
        list.push(p);
        seen.add(p.slug);
        if (list.length >= 6) break;
      }
    }
  }

  return list;
}
