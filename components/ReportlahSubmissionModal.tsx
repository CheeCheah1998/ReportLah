import { useMemo, useState } from "react";
import {
  BusinessCategory,
  CostCurrency,
  RatingValue,
  RecommendationType,
  ReportSubmissionPayload,
  ServiceProviderType,
  SubmissionType
} from "@/lib/types";

type ReportlahSubmissionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: ReportSubmissionPayload) => void;
};

const categories: BusinessCategory[] = ["CarRepair", "Renovation", "Lawyer", "Healthcare"];
const currencies: CostCurrency[] = ["RM", "USD", "SGD"];
const ratings: Array<1 | 2 | 3 | 4 | 5> = [1, 2, 3, 4, 5];

export default function ReportlahSubmissionModal({
  isOpen,
  onClose,
  onSubmit
}: ReportlahSubmissionModalProps) {
  const [submissionType, setSubmissionType] = useState<SubmissionType>("corruption");
  const [address, setAddress] = useState("");

  const [policeStation, setPoliceStation] = useState("");
  const [corruptionDescription, setCorruptionDescription] = useState("");
  const [dashcamFile, setDashcamFile] = useState<File | undefined>(undefined);

  const [serviceProvider, setServiceProvider] = useState<ServiceProviderType>("Business");
  const [providerName, setProviderName] = useState("");
  const [dateOfService, setDateOfService] = useState("");
  const [category, setCategory] = useState<BusinessCategory>("CarRepair");
  const [serviceType, setServiceType] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<CostCurrency>("RM");
  const [rating, setRating] = useState<RatingValue>(0);
  const [recommendation, setRecommendation] = useState<RecommendationType | null>(null);
  const [businessDescription, setBusinessDescription] = useState("");
  const [invoiceFile, setInvoiceFile] = useState<File | undefined>(undefined);

  const isSubmitDisabled = useMemo(() => {
    if (!address.trim()) {
      return true;
    }

    if (submissionType === "corruption") {
      return !policeStation.trim() || !corruptionDescription.trim() || !dashcamFile;
    }

    return (
      !providerName.trim() ||
      !dateOfService ||
      !serviceType.trim() ||
      !recommendation ||
      !businessDescription.trim() ||
      !invoiceFile ||
      Number.isNaN(Number(amount)) ||
      Number(amount) <= 0
    );
  }, [
    address,
    amount,
    businessDescription,
    currency,
    corruptionDescription,
    dashcamFile,
    dateOfService,
    invoiceFile,
    policeStation,
    providerName,
    rating,
    recommendation,
    serviceProvider,
    serviceType,
    submissionType
  ]);

  const resetForm = () => {
    setSubmissionType("corruption");
    setAddress("");
    setPoliceStation("");
    setCorruptionDescription("");
    setDashcamFile(undefined);
    setServiceProvider("Business");
    setProviderName("");
    setDateOfService("");
    setCategory("CarRepair");
    setServiceType("");
    setAmount("");
    setCurrency("RM");
    setRating(0);
    setRecommendation(null);
    setBusinessDescription("");
    setInvoiceFile(undefined);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submissionType === "corruption") {
      onSubmit({
        type: "corruption",
        address: address.trim(),
        policeStation: policeStation.trim(),
        description: corruptionDescription.trim(),
        dashcamFile
      });
      handleClose();
      return;
    }

    onSubmit({
      type: "business",
      address: address.trim(),
      serviceProvider,
      providerName: providerName.trim(),
      dateOfService,
      category,
      serviceType: serviceType.trim(),
      amount: Number(amount),
      currency,
      rating,
      recommendation: recommendation ?? "NEUTRAL",
      description: businessDescription.trim(),
      invoiceFile
    });
    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[2200] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">New Submission</p>
            <h2 className="text-xl font-semibold text-slate-900">REPORTLAH</h2>
            <p className="mt-1 text-sm text-slate-600">Submit corruption or business price reports with evidence.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Report Type</label>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setSubmissionType("corruption")}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  submissionType === "corruption"
                    ? "border-red-300 bg-red-50 text-red-700"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Corruption (Police)
              </button>
              <button
                type="button"
                onClick={() => setSubmissionType("business")}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  submissionType === "business"
                    ? "border-blue-300 bg-blue-50 text-blue-700"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Business Price Report
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="submission-address" className="mb-1 block text-sm font-medium text-slate-700">
              Location
            </label>
            <input
              id="submission-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter location/area or full address"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {submissionType === "corruption" ? (
            <>
              <div>
                <label htmlFor="police-station" className="mb-1 block text-sm font-medium text-slate-700">
                  Police Station
                </label>
                <input
                  id="police-station"
                  value={policeStation}
                  onChange={(event) => setPoliceStation(event.target.value)}
                  placeholder="e.g. Dang Wangi Police Station"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="corruption-description" className="mb-1 block text-sm font-medium text-slate-700">
                  Report Details
                </label>
                <textarea
                  id="corruption-description"
                  value={corruptionDescription}
                  onChange={(event) => setCorruptionDescription(event.target.value)}
                  rows={4}
                  placeholder="Describe what happened"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="dashcam-upload" className="mb-1 block text-sm font-medium text-slate-700">
                  Dashcam Video Upload
                </label>
                <input
                  id="dashcam-upload"
                  type="file"
                  accept="video/*"
                  onChange={(event) => setDashcamFile(event.target.files?.[0])}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-red-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-red-700 hover:file:bg-red-200"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="service-provider" className="mb-1 block text-sm font-medium text-slate-700">
                  Service Provider
                </label>
                <select
                  id="service-provider"
                  value={serviceProvider}
                  onChange={(event) => setServiceProvider(event.target.value as ServiceProviderType)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Business">Business</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="provider-name" className="mb-1 block text-sm font-medium text-slate-700">
                    Name (Business/Person)
                  </label>
                  <input
                    id="provider-name"
                    value={providerName}
                    onChange={(event) => setProviderName(event.target.value)}
                    placeholder="Provider name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="service-month" className="mb-1 block text-sm font-medium text-slate-700">
                    Date Of Service (Month/Year)
                  </label>
                  <input
                    id="service-month"
                    type="month"
                    value={dateOfService}
                    onChange={(event) => setDateOfService(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="business-category" className="mb-1 block text-sm font-medium text-slate-700">
                    Type of Service
                  </label>
                  <select
                    id="business-category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value as BusinessCategory)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="service-type" className="mb-1 block text-sm font-medium text-slate-700">
                    Service Details
                  </label>
                  <input
                    id="service-type"
                    value={serviceType}
                    onChange={(event) => setServiceType(event.target.value)}
                    placeholder="e.g. Brake Pad Replacement"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="amount" className="mb-1 block text-sm font-medium text-slate-700">
                    Cost
                  </label>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    min={1}
                    step={0.01}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="currency" className="mb-1 block text-sm font-medium text-slate-700">
                    Currency
                  </label>
                  <select
                    id="currency"
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value as CostCurrency)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  >
                    {currencies.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Rating</label>
                  <div className="flex items-center gap-1">
                    {ratings.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setRating((previous) => (previous === item ? 0 : item))}
                        className="rounded-md px-1 py-0.5 text-2xl leading-none transition hover:scale-110"
                        aria-label={`Set rating ${item} star`}
                      >
                        <span className={item <= rating ? "text-amber-500" : "text-slate-300"}>★</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Recommendation</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setRecommendation("THUMBSUP")}
                      className="rounded-md px-1 py-0.5 text-2xl leading-none transition hover:scale-110"
                      aria-label="Recommend thumbs up"
                    >
                      <span
                        className={`inline-block transition ${
                          recommendation === "THUMBSUP"
                            ? "opacity-100 [filter:none]"
                            : "opacity-50 [filter:grayscale(1)]"
                        }`}
                      >
                        👍
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecommendation("NEUTRAL")}
                      className="rounded-md px-1 py-0.5 text-2xl leading-none transition hover:scale-110"
                      aria-label="Recommend neutral"
                    >
                      <span
                        className={`inline-block transition ${
                          recommendation === "NEUTRAL"
                            ? "opacity-100 [filter:none]"
                            : "opacity-50 [filter:grayscale(1)]"
                        }`}
                      >
                        😐
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecommendation("THUMBSDOWN")}
                      className="rounded-md px-1 py-0.5 text-2xl leading-none transition hover:scale-110"
                      aria-label="Recommend thumbs down"
                    >
                      <span
                        className={`inline-block transition ${
                          recommendation === "THUMBSDOWN"
                            ? "opacity-100 [filter:none]"
                            : "opacity-50 [filter:grayscale(1)]"
                        }`}
                      >
                        👎
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="business-description" className="mb-1 block text-sm font-medium text-slate-700">
                  Description of your experience
                </label>
                <textarea
                  id="business-description"
                  value={businessDescription}
                  onChange={(event) => setBusinessDescription(event.target.value)}
                  rows={4}
                  placeholder="Share what happened and service quality"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="invoice-upload" className="mb-1 block text-sm font-medium text-slate-700">
                  Upload Invoice
                </label>
                <input
                  id="invoice-upload"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(event) => setInvoiceFile(event.target.files?.[0])}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-blue-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-200"
                  required
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}
