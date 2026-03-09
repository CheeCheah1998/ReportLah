export type BusinessCategory = "CarRepair" | "Renovation" | "Lawyer" | "Healthcare";
export type ServiceProviderType = "Business" | "Individual";
export type CostCurrency = "RM" | "USD" | "SGD";
export type RecommendationType = "THUMBSUP" | "THUMBSDOWN" | "NEUTRAL";
export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

export type Business = {
  id: string;
  name: string;
  category: BusinessCategory;
  latitude: number;
  longitude: number;
  address?: string;
};

export type PriceReport = {
  id: string;
  businessId: string;
  serviceType: string;
  amount: number;
  currency?: CostCurrency;
  description: string;
  date: string;
  serviceProvider?: ServiceProviderType;
  providerName?: string;
  dateOfService?: string;
  rating?: RatingValue;
  recommendation?: RecommendationType;
  evidenceFileName?: string;
  evidenceUrl?: string;
  evidenceType?: string;
};

export type CorruptionReport = {
  id: string;
  latitude: number;
  longitude: number;
  policeStation: string;
  description: string;
  date: string;
  isVerified: boolean;
  address?: string;
  evidenceFileName?: string;
  evidenceUrl?: string;
  evidenceType?: string;
};

export type MarkerType = "business" | "corruption";

export type MarkerItem = {
  id: string;
  type: MarkerType;
  icon: string;
  latitude: number;
  longitude: number;
  title: string;
  subtitle: string;
};

export type BusinessMarkerDetails = {
  type: "business";
  business: Business;
  reports: PriceReport[];
};

export type CorruptionMarkerDetails = {
  type: "corruption";
  report: CorruptionReport;
};

export type MarkerDetails = BusinessMarkerDetails | CorruptionMarkerDetails;

export type SubmissionType = "corruption" | "business";

export type CorruptionSubmission = {
  type: "corruption";
  address: string;
  policeStation: string;
  description: string;
  dashcamFile?: File;
};

export type BusinessSubmission = {
  type: "business";
  address: string;
  serviceProvider: ServiceProviderType;
  providerName: string;
  dateOfService: string;
  category: BusinessCategory;
  serviceType: string;
  amount: number;
  currency: CostCurrency;
  rating: RatingValue;
  recommendation: RecommendationType;
  description: string;
  invoiceFile?: File;
};

export type ReportSubmissionPayload = CorruptionSubmission | BusinessSubmission;