export type MatchStatus = 'new' | 'viewed' | 'connected' | 'passed' | 'meeting' | 'mou' | 'closed';
export type FinanceType = 'Cash' | 'Mortgage' | 'Post-handover' | 'Crypto';
export type SellerMotivation = 'High' | 'Medium' | 'Low' | 'Testing market';
export type DealStage = 'matched' | 'viewing' | 'offer' | 'mou' | 'transfer';

export interface Agent {
  id: string;
  name: string;
  company: string;
  rera: string;
  phone: string;
  email: string;
  avatar: string;
  transactions: number;
  rating: number;
  yearsActive: number;
}

export interface Listing {
  id: string;
  agent: Agent;
  title: string;
  community: string;
  subArea: string;
  beds: number;
  baths: number;
  sqft: number;
  floor: number;
  totalFloors: number;
  askingPrice: number;
  pricePerSqft: number;
  view: string;
  handover: string;
  furnishing: string;
  financeAccepted: FinanceType[];
  commissionSplit: number;
  motivation: SellerMotivation;
  serviceCharge: number;
  parking: number;
  description: string;
  highlights: string[];
  amenities: string[];
  reraPermit: string;
  listedDate: string;
  status: 'Listed' | 'Off-market' | 'Pre-launch';
  matchScore: number;
  matchReasons: string[];
  matchMisses: string[];
  matchStatus: MatchStatus;
  priceHistory: { date: string; price: number }[];
  emoji: string;
}

export interface BuyerBrief {
  id: string;
  agent: Agent;
  refCode: string;
  nationality: string;
  residencyStatus: string;
  incomeSource: string;
  employer: string;
  annualIncome: number;
  financeType: FinanceType;
  budgetMin: number;
  budgetMax: number;
  budgetStretch: number;
  downPayment: number;
  mortgagePreApproval: number;
  mortgageLender: string;
  creditScore: number;
  creditRating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'N/A';
  amlCleared: boolean;
  proofOfFunds: string;
  locationPrimary: string[];
  locationAlternate: string[];
  propertyType: string;
  bedsMin: number;
  bedsMax: number;
  sqftMin: number;
  timeline: string;
  dealBreakers: string[];
  previousViewings: number;
  rejectionReasons: string[];
  seriousness: number;
  notes: string;
  matchScore: number;
  matchReasons: string[];
  matchMisses: string[];
  matchStatus: MatchStatus;
  dealStage?: DealStage;
  emoji: string;
}

export const AGENTS: Record<string, Agent> = {
  ahmed: {
    id: 'ahmed', name: 'Ahmed Al-Khoury', company: 'Allsopp & Allsopp',
    rera: 'DLD-AG-44821', phone: '+971 50 234 5678', email: 'ahmed.alkhoury@allsopp.ae',
    avatar: 'AK', transactions: 147, rating: 4.9, yearsActive: 8,
  },
  sara: {
    id: 'sara', name: 'Sara Mendez', company: 'Betterhomes',
    rera: 'DLD-AG-38102', phone: '+971 52 891 3344', email: 'sara.m@betterhomes.ae',
    avatar: 'SM', transactions: 89, rating: 4.7, yearsActive: 5,
  },
  raj: {
    id: 'raj', name: 'Raj Patel', company: 'Haus & Haus',
    rera: 'DLD-AG-51223', phone: '+971 55 410 7722', email: 'raj.p@hausandhaus.ae',
    avatar: 'RP', transactions: 213, rating: 4.8, yearsActive: 11,
  },
  lena: {
    id: 'lena', name: 'Lena Novak', company: 'fäm Properties',
    rera: 'DLD-AG-29441', phone: '+971 50 667 9912', email: 'lena.n@famproperties.ae',
    avatar: 'LN', transactions: 61, rating: 4.6, yearsActive: 3,
  },
  tom: {
    id: 'tom', name: 'Tom Jenkins', company: 'Allsopp & Allsopp',
    rera: 'DLD-AG-30112', phone: '+971 55 123 4567', email: 'tom.j@allsopp.ae',
    avatar: 'TJ', transactions: 92, rating: 4.8, yearsActive: 6,
  },
  priya: {
    id: 'priya', name: 'Priya Desai', company: 'Driven Properties',
    rera: 'DLD-AG-41892', phone: '+971 50 998 2211', email: 'priya.d@drivenproperties.ae',
    avatar: 'PD', transactions: 178, rating: 4.9, yearsActive: 9,
  },
  mohammed: {
    id: 'mohammed', name: 'Mohammed Al-Rashid', company: 'Coldwell Banker',
    rera: 'DLD-AG-19023', phone: '+971 52 334 8810', email: 'm.rashid@coldwellbanker.ae',
    avatar: 'MR', transactions: 44, rating: 4.5, yearsActive: 2,
  },
  elena: {
    id: 'elena', name: 'Elena Petrov', company: 'Knight Frank',
    rera: 'DLD-AG-55671', phone: '+971 50 771 0043', email: 'elena.p@knightfrank.ae',
    avatar: 'EP', transactions: 302, rating: 5.0, yearsActive: 14,
  },
};

export const LISTINGS: Listing[] = [
  {
    id: 'l1', agent: AGENTS.ahmed, emoji: '🌊',
    title: '2BR Marina Gate 2', community: 'JLT', subArea: 'Marina Gate Tower 2',
    beds: 2, baths: 2, sqft: 1180, floor: 22, totalFloors: 28,
    askingPrice: 2450000, pricePerSqft: 2076, view: 'Full marina panorama',
    handover: 'Q3 2025', furnishing: 'Fully furnished',
    financeAccepted: ['Cash', 'Mortgage'],
    commissionSplit: 2, motivation: 'High', serviceCharge: 18, parking: 1,
    description: 'Rare fully upgraded unit with Miele kitchen appliances, Calacatta marble floors throughout, and floor-to-ceiling glazing offering unobstructed 180° marina views. Currently tenanted, vacant possession guaranteed Q3. Owner recently relocated to London — highly motivated to close.',
    highlights: ['Upgraded kitchen & bathrooms', 'Full marina view', 'High floor', 'Miele appliances', 'Marble finishes'],
    amenities: ['Infinity pool', 'Gym', 'Concierge', 'Valet', 'Kids play area', 'Sauna'],
    reraPermit: 'DLD-2024-09871', listedDate: '2025-05-12', status: 'Listed',
    matchScore: 94, matchReasons: ['Budget ✓', 'Location ✓', 'Size ✓', 'Timeline ✓', 'Finance ✓'],
    matchMisses: [], matchStatus: 'new',
    priceHistory: [
      { date: 'Jan 2024', price: 2650000 }, { date: 'Mar 2024', price: 2550000 },
      { date: 'Jan 2025', price: 2500000 }, { date: 'May 2025', price: 2450000 },
    ],
  },
  {
    id: 'l2', agent: AGENTS.sara, emoji: '🏢',
    title: '2BR Goldcrest Views, JLT', community: 'JLT', subArea: 'Cluster M',
    beds: 2, baths: 2, sqft: 1050, floor: 14, totalFloors: 24,
    askingPrice: 2200000, pricePerSqft: 2095, view: 'Community & golf',
    handover: 'Vacant now', furnishing: 'Semi-furnished',
    financeAccepted: ['Cash', 'Mortgage'],
    commissionSplit: 1.5, motivation: 'Medium', serviceCharge: 15, parking: 1,
    description: 'Well-maintained unit with original developer finishes in excellent condition. Vacant and available for immediate transfer. Long-term owner looking to liquidate investment portfolio. Straightforward transaction — no chains, no complications.',
    highlights: ['Vacant possession', 'Original finishes', 'Investment grade', 'Clean title'],
    amenities: ['Pool', 'Gym', 'Security', 'Covered parking'],
    reraPermit: 'DLD-2024-11234', listedDate: '2025-05-20', status: 'Listed',
    matchScore: 81, matchReasons: ['Budget ✓', 'Size ✓', 'Finance ✓', 'Vacant ✓'], matchMisses: ['Location ~'],
    matchStatus: 'viewed',
    priceHistory: [
      { date: 'Jun 2024', price: 2350000 }, { date: 'Jan 2025', price: 2280000 }, { date: 'May 2025', price: 2200000 },
    ],
  },
  {
    id: 'l3', agent: AGENTS.raj, emoji: '🌿',
    title: '2BR Sienna, The Greens', community: 'The Greens', subArea: 'Sienna',
    beds: 2, baths: 2, sqft: 1240, floor: 6, totalFloors: 12,
    askingPrice: 2600000, pricePerSqft: 2097, view: 'Lush garden courtyard',
    handover: 'Q4 2025', furnishing: 'Partly furnished',
    financeAccepted: ['Cash'],
    commissionSplit: 1.5, motivation: 'Low', serviceCharge: 17, parking: 2,
    description: 'Spacious garden-facing unit in the highly sought-after Sienna building. Seller is a developer testing market appetite — willing to negotiate AED 50K off asking for clean cash deal with 30-day close. Currently tenanted, notice served.',
    highlights: ['Garden view', '2 parking bays', 'Large layout', 'Mature community'],
    amenities: ['Multiple pools', 'Tennis courts', 'Golf view', 'Retail boulevard'],
    reraPermit: 'DLD-2024-08891', listedDate: '2025-04-28', status: 'Listed',
    matchScore: 67, matchReasons: ['Size ✓', 'Community ✓'], matchMisses: ['Above budget', 'Cash only'],
    matchStatus: 'new',
    priceHistory: [{ date: 'Apr 2025', price: 2700000 }, { date: 'May 2025', price: 2600000 }],
  },
  {
    id: 'l4', agent: AGENTS.lena, emoji: '🏖',
    title: '2BR Sadaf 6, JBR', community: 'JBR', subArea: 'Sadaf 6',
    beds: 2, baths: 2, sqft: 1350, floor: 18, totalFloors: 30,
    askingPrice: 2900000, pricePerSqft: 2148, view: 'Full Arabian Gulf',
    handover: 'Vacant', furnishing: 'Fully furnished',
    financeAccepted: ['Cash'],
    commissionSplit: 1, motivation: 'Low', serviceCharge: 22, parking: 1,
    description: 'Prestigious JBR beachfront unit with full sea view. High-quality custom fit-out by Luxury Concepts. Seller firm on price — recent comparable sold at AED 2.95M. Cash only due to existing mortgage structure complexity.',
    highlights: ['Beachfront access', 'Full sea view', 'Custom fit-out', 'High floor'],
    amenities: ['Beach access', 'Pool', 'Gym', 'Retail promenade', 'Concierge'],
    reraPermit: 'DLD-2024-07723', listedDate: '2025-03-15', status: 'Listed',
    matchScore: 58, matchReasons: ['Size ✓'], matchMisses: ['Significantly above budget', 'Cash only', 'Low co-broke'],
    matchStatus: 'passed',
    priceHistory: [{ date: 'Mar 2025', price: 3100000 }, { date: 'Apr 2025', price: 2900000 }],
  },
  {
    id: 'l5', agent: AGENTS.elena, emoji: '🌃',
    title: '3BR Address BLVD, Downtown', community: 'Downtown Dubai', subArea: 'Address Boulevard',
    beds: 3, baths: 3, sqft: 1890, floor: 34, totalFloors: 63,
    askingPrice: 5800000, pricePerSqft: 3069, view: 'Burj Khalifa & fountain',
    handover: 'Q1 2026', furnishing: 'Fully furnished',
    financeAccepted: ['Cash', 'Mortgage', 'Post-handover'],
    commissionSplit: 2, motivation: 'Medium', serviceCharge: 28, parking: 2,
    description: 'Ultra-premium 3BR at the iconic Address Boulevard. Burj Khalifa and fountain views from every room. Branded residences with Address hotel amenities and serviced living. Off-plan — buyer gets to choose interior finishes.',
    highlights: ['Burj Khalifa view', 'Address hotel amenities', 'Branded residence', 'Off-plan customisation'],
    amenities: ['Rooftop pool', 'Spa', 'Fine dining', 'Butler service', 'Valet', 'Concierge'],
    reraPermit: 'DLD-2025-00441', listedDate: '2025-06-01', status: 'Pre-launch',
    matchScore: 45, matchReasons: ['Finance ✓'], matchMisses: ['Well above budget', '3BR vs 2BR pref.'],
    matchStatus: 'new',
    priceHistory: [{ date: 'Jun 2025', price: 5800000 }],
  },
];

export const BUYERS: BuyerBrief[] = [
  {
    id: 'b1', agent: AGENTS.tom, emoji: '🇬🇧', refCode: 'BA-2025-0441',
    nationality: 'British', residencyStatus: 'UAE Resident — employment visa',
    incomeSource: 'Employment', employer: 'Goldman Sachs (DIFC)',
    annualIncome: 480000, financeType: 'Mortgage',
    budgetMin: 2100000, budgetMax: 2600000, budgetStretch: 2750000,
    downPayment: 650000, mortgagePreApproval: 1950000, mortgageLender: 'Emirates NBD',
    creditScore: 820, creditRating: 'Excellent', amlCleared: true,
    proofOfFunds: 'Emirates NBD pre-approval letter + DIFC payslip',
    locationPrimary: ['JLT', 'Dubai Marina'], locationAlternate: ['The Greens', 'Business Bay'],
    propertyType: 'Apartment', bedsMin: 2, bedsMax: 2, sqftMin: 950,
    timeline: '60 days', dealBreakers: ['No ground floor', 'Min 950 sqft', 'No studio'],
    previousViewings: 4, rejectionReasons: ['Price above budget', 'Below-spec finishes'],
    seriousness: 5, notes: 'Signed POA. Wife is the decision-maker — schedule viewings for weekends.',
    matchScore: 96, matchReasons: ['Budget ✓', 'Location ✓', 'Finance pre-approved ✓', 'Timeline ✓', 'DIFC employment ✓'],
    matchMisses: [], matchStatus: 'connected', dealStage: 'viewing',
  },
  {
    id: 'b2', agent: AGENTS.priya, emoji: '🇮🇳', refCode: 'BA-2025-0318',
    nationality: 'Indian', residencyStatus: 'NRI — visiting visa for purchase',
    incomeSource: 'Business owner', employer: 'Desai Manufacturing Pvt. Ltd.',
    annualIncome: 0, financeType: 'Cash',
    budgetMin: 2000000, budgetMax: 2500000, budgetStretch: 2600000,
    downPayment: 2500000, mortgagePreApproval: 0, mortgageLender: '',
    creditScore: 0, creditRating: 'N/A', amlCleared: true,
    proofOfFunds: 'HDFC bank statement — balance AED 3.1M. Source of funds: business sale proceeds.',
    locationPrimary: ['JLT', 'Dubai Marina'], locationAlternate: ['Business Bay'],
    propertyType: 'Apartment', bedsMin: 2, bedsMax: 3, sqftMin: 1000,
    timeline: '30 days', dealBreakers: ['Must have 2+ parking', 'No service apartments'],
    previousViewings: 6, rejectionReasons: ['Title deed issue', 'Location not preferred'],
    seriousness: 5, notes: 'All-cash, AML cleared. Investment purchase — not for own use. Very serious buyer. Will sign MOU within 48hrs of right property.',
    matchScore: 88, matchReasons: ['Full cash ✓', 'Funds verified ✓', 'AML cleared ✓', 'Timeline short ✓'],
    matchMisses: ['Requires 2 parking — check listing'], matchStatus: 'new',
  },
  {
    id: 'b3', agent: AGENTS.mohammed, emoji: '🇦🇪', refCode: 'BA-2025-0512',
    nationality: 'UAE National', residencyStatus: 'UAE citizen',
    incomeSource: 'Government employment', employer: 'Dubai Municipality',
    annualIncome: 280000, financeType: 'Mortgage',
    budgetMin: 1800000, budgetMax: 2200000, budgetStretch: 2350000,
    downPayment: 440000, mortgagePreApproval: 0, mortgageLender: 'ADCB (in process)',
    creditScore: 710, creditRating: 'Good', amlCleared: true,
    proofOfFunds: 'Salary certificate + 3-month bank statement. Mortgage pre-approval in process.',
    locationPrimary: ['JLT'], locationAlternate: ['Discovery Gardens', 'Sports City'],
    propertyType: 'Apartment', bedsMin: 2, bedsMax: 2, sqftMin: 900,
    timeline: '90–120 days', dealBreakers: ['No studio', 'Must have gym'],
    previousViewings: 2, rejectionReasons: ['Price sensitivity'],
    seriousness: 3, notes: 'UAE national — entitled to higher LTV (80%). Mortgage not yet approved. Investor type: first-time buyer, emotional decision-making.',
    matchScore: 74, matchReasons: ['Location ✓', 'Property type ✓'],
    matchMisses: ['Mortgage not pre-approved', 'Lower budget', 'Longer timeline'], matchStatus: 'viewed',
  },
  {
    id: 'b4', agent: AGENTS.elena, emoji: '🇷🇺', refCode: 'BA-2025-0229',
    nationality: 'Russian', residencyStatus: 'UAE Resident — investor visa',
    incomeSource: 'Rental income + investments', employer: 'Self-employed',
    annualIncome: 950000, financeType: 'Cash',
    budgetMin: 4000000, budgetMax: 6500000, budgetStretch: 7000000,
    downPayment: 6500000, mortgagePreApproval: 0, mortgageLender: '',
    creditScore: 0, creditRating: 'N/A', amlCleared: true,
    proofOfFunds: 'Multiple UAE bank accounts. Mashreq + FAB statements provided. Source: sale of Cyprus property.',
    locationPrimary: ['Downtown Dubai', 'Palm Jumeirah'], locationAlternate: ['DIFC', 'Dubai Hills'],
    propertyType: 'Apartment', bedsMin: 3, bedsMax: 4, sqftMin: 1800,
    timeline: '45 days', dealBreakers: ['No ground floor', 'No shared entrance with hotel'],
    previousViewings: 12, rejectionReasons: ['View not satisfactory', 'Building quality', 'Price', 'AML delays resolved'],
    seriousness: 4, notes: 'HNW buyer. Has purchased 3 properties in Dubai previously. Extremely particular about view and finishing quality. AML previously delayed but now fully cleared. Portfolio buyer.',
    matchScore: 45, matchReasons: ['Budget ✓', 'Finance ✓'], matchMisses: ['Location ✓ (Downtown only)', 'Size ✓'],
    matchStatus: 'new',
  },
];

export interface Deal {
  id: string;
  listing: Listing;
  buyer: BuyerBrief;
  stage: DealStage;
  connectedDate: string;
  viewingDate?: string;
  offerAmount?: number;
  mouDate?: string;
  transferDate?: string;
  platformFee: number;
}

export const DEALS: Deal[] = [
  {
    id: 'd1', listing: LISTINGS[0], buyer: BUYERS[0],
    stage: 'viewing', connectedDate: '2025-05-28', viewingDate: '2025-06-08',
    platformFee: 5000,
  },
];

export const MY_AGENT = AGENTS.raj;

export const MY_LISTING = LISTINGS[0];

export function formatAED(n: number): string {
  if (n >= 1000000) return `AED ${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `AED ${(n / 1000).toFixed(0)}K`;
  return `AED ${n.toLocaleString()}`;
}

export function scoreColor(score: number): string {
  if (score >= 85) return '#2ECC8A';
  if (score >= 70) return '#E8A93C';
  return '#E05252';
}

export function creditColor(score: number): string {
  if (score >= 750) return '#2ECC8A';
  if (score >= 650) return '#E8A93C';
  if (score > 0) return '#E05252';
  return '#9B9890';
}
