import { Business, CorruptionReport, PriceReport } from "./types";

export const businesses: Business[] = [
  {
    id: "biz-1",
    name: "KL AutoCare Pro",
    category: "CarRepair",
    latitude: 3.139,
    longitude: 101.6869
  },
  {
    id: "biz-2",
    name: "Sentul Precision Motors",
    category: "CarRepair",
    latitude: 3.184,
    longitude: 101.695
  },
  {
    id: "biz-3",
    name: "Damansara HomeCraft",
    category: "Renovation",
    latitude: 3.1478,
    longitude: 101.6147
  },
  {
    id: "biz-4",
    name: "Brickfields BuildRight",
    category: "Renovation",
    latitude: 3.132,
    longitude: 101.6865
  },
  {
    id: "biz-5",
    name: "Azman & Co Legal",
    category: "Lawyer",
    latitude: 3.1516,
    longitude: 101.7076
  },
  {
    id: "biz-6",
    name: "Civic Justice Chambers",
    category: "Lawyer",
    latitude: 3.1569,
    longitude: 101.7123
  },
  {
    id: "biz-7",
    name: "Bangsar Family Clinic",
    category: "Healthcare",
    latitude: 3.1327,
    longitude: 101.679
  },
  {
    id: "biz-8",
    name: "Setapak Care Medical",
    category: "Healthcare",
    latitude: 3.1925,
    longitude: 101.728
  }
];

export const priceReports: PriceReport[] = [
  {
    id: "pr-1",
    businessId: "biz-1",
    serviceType: "Oil Change",
    amount: 185,
    description: "Synthetic oil package including filter replacement.",
    date: "2026-01-04"
  },
  {
    id: "pr-2",
    businessId: "biz-1",
    serviceType: "Brake Pad Replacement",
    amount: 440,
    description: "Front brake pads replaced with mid-range ceramic set.",
    date: "2026-01-20"
  },
  {
    id: "pr-3",
    businessId: "biz-2",
    serviceType: "Battery Replacement",
    amount: 380,
    description: "12V battery replacement with 18-month warranty.",
    date: "2026-02-03"
  },
  {
    id: "pr-4",
    businessId: "biz-2",
    serviceType: "Aircond Service",
    amount: 260,
    description: "A/C gas refill and compressor cleaning.",
    date: "2026-02-10"
  },
  {
    id: "pr-5",
    businessId: "biz-3",
    serviceType: "Kitchen Cabinet Install",
    amount: 5200,
    description: "L-shaped laminate cabinets and soft-close hinges.",
    date: "2025-12-19"
  },
  {
    id: "pr-6",
    businessId: "biz-3",
    serviceType: "Toilet Renovation",
    amount: 8400,
    description: "Full bathroom renovation with waterproofing and tiling.",
    date: "2026-01-07"
  },
  {
    id: "pr-7",
    businessId: "biz-4",
    serviceType: "Plaster Ceiling Repair",
    amount: 1700,
    description: "Leak damage patch and repainting works.",
    date: "2026-02-01"
  },
  {
    id: "pr-8",
    businessId: "biz-4",
    serviceType: "Roof Tile Replacement",
    amount: 3100,
    description: "Replace cracked roof tiles and seal ridge lines.",
    date: "2026-02-18"
  },
  {
    id: "pr-9",
    businessId: "biz-5",
    serviceType: "Property SPA Review",
    amount: 2200,
    description: "Legal review for sub-sale Sale & Purchase Agreement.",
    date: "2026-01-15"
  },
  {
    id: "pr-10",
    businessId: "biz-5",
    serviceType: "Will Drafting",
    amount: 1400,
    description: "Standard personal will drafting and witnessing.",
    date: "2026-02-05"
  },
  {
    id: "pr-11",
    businessId: "biz-6",
    serviceType: "Employment Advisory",
    amount: 950,
    description: "Consultation for wrongful termination case review.",
    date: "2025-12-28"
  },
  {
    id: "pr-12",
    businessId: "biz-7",
    serviceType: "General Consultation",
    amount: 85,
    description: "Walk-in GP consultation excluding medication.",
    date: "2026-01-30"
  },
  {
    id: "pr-13",
    businessId: "biz-7",
    serviceType: "Dengue Test",
    amount: 160,
    description: "NS1 antigen rapid test including doctor review.",
    date: "2026-02-14"
  },
  {
    id: "pr-14",
    businessId: "biz-8",
    serviceType: "Health Screening",
    amount: 420,
    description: "Basic blood panel with liver and kidney profile.",
    date: "2026-01-08"
  },
  {
    id: "pr-15",
    businessId: "biz-8",
    serviceType: "Minor Procedure",
    amount: 280,
    description: "Outpatient wound stitching and follow-up dressing.",
    date: "2026-02-21"
  }
];

export const corruptionReports: CorruptionReport[] = [
  {
    id: "cr-1",
    latitude: 3.1472,
    longitude: 101.695,
    policeStation: "Dang Wangi Police Station",
    description: "Alleged request for unofficial payment during permit inspection.",
    date: "2026-01-12",
    isVerified: true
  },
  {
    id: "cr-2",
    latitude: 3.1202,
    longitude: 101.6765,
    policeStation: "Pantai Police Station",
    description: "Reported favoritism in handling a neighborhood complaint.",
    date: "2026-01-18",
    isVerified: false
  },
  {
    id: "cr-3",
    latitude: 3.1711,
    longitude: 101.7094,
    policeStation: "Sentul Police Station",
    description: "Witness claims of delayed action pending informal incentive.",
    date: "2026-02-02",
    isVerified: true
  },
  {
    id: "cr-4",
    latitude: 3.0901,
    longitude: 101.6678,
    policeStation: "Cheras Police Station",
    description: "Complaint of case file deprioritized without clear justification.",
    date: "2026-02-11",
    isVerified: false
  },
  {
    id: "cr-5",
    latitude: 3.1968,
    longitude: 101.6379,
    policeStation: "Kepong Police Station",
    description: "Community report of recurring facilitation fee requests.",
    date: "2026-02-19",
    isVerified: true
  },
  {
    id: "cr-6",
    latitude: 3.1558,
    longitude: 101.7421,
    policeStation: "Ampang Jaya Police Station",
    description: "Anonymous report of preferential treatment linked to payments.",
    date: "2026-02-26",
    isVerified: false
  }
];