import { MarkerDetails } from "@/lib/types";

type ReportModalProps = {
  details: MarkerDetails | null;
  onClose: () => void;
};

export default function ReportModal({ details, onClose }: ReportModalProps) {
  if (!details) {
    return null;
  }

  const categoryIconByName: Record<string, string> = {
    CarRepair: "🚗",
    Renovation: "🏚️",
    Lawyer: "⚖️",
    Healthcare: "🧑‍⚕️"
  };

  const formatMonthYear = (value: string) => {
    const [year, month] = value.split("-");
    if (!year || !month) {
      return value;
    }

    return `${month}/${year}`;
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">View Details</p>
            <h2 className="text-xl font-semibold text-slate-900">
              {details.type === "business" ? details.business.name : details.report.policeStation}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        {details.type === "business" ? (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img
                src="/images/business-place.svg"
                alt="Sample business location"
                className="h-52 w-full object-cover md:h-60"
              />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Category</p>
                  <p className="text-base font-medium text-slate-900">{details.business.category}</p>
                  {details.business.address ? (
                    <p className="mt-1 text-xs text-slate-500">Address: {details.business.address}</p>
                  ) : null}
                </div>
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {categoryIconByName[details.business.category] ?? "📍"} {details.business.category}
                </span>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-base font-semibold text-slate-900">
                Price Reports ({details.reports.length})
              </h3>
              <div className="space-y-3">
                {details.reports.map((report) => {
                  const rating = report.rating ?? 0;

                  return (
                    <div
                      key={report.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200"
                    >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">{report.serviceType}</p>
                      <p className="rounded-full bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700">
                        {report.currency ?? "RM"} {report.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-2 text-xs text-slate-600 md:grid-cols-2">
                      {report.serviceProvider ? (
                        <p>
                          <span className="font-medium text-slate-700">Service Provider:</span> {report.serviceProvider}
                        </p>
                      ) : null}
                      {report.providerName ? (
                        <p>
                          <span className="font-medium text-slate-700">Name:</span> {report.providerName}
                        </p>
                      ) : null}
                      {details.business.address ? (
                        <p>
                          <span className="font-medium text-slate-700">Address:</span> {details.business.address}
                        </p>
                      ) : null}
                      {report.dateOfService ? (
                        <p>
                          <span className="font-medium text-slate-700">Date of Service:</span>{" "}
                          {formatMonthYear(report.dateOfService)}
                        </p>
                      ) : null}
                      {report.rating ? (
                        <p>
                          <span className="font-medium text-slate-700">Rating:</span>{" "}
                          <span className="inline-flex items-center gap-0.5 align-middle">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-sm ${
                                  star <= rating
                                    ? "text-amber-500"
                                    : "text-slate-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </span>
                        </p>
                      ) : null}
                      {report.recommendation ? (
                        <p>
                          <span className="font-medium text-slate-700">Recommendation:</span>{" "}
                          {report.recommendation === "THUMBSUP"
                            ? "👍"
                            : report.recommendation === "THUMBSDOWN"
                              ? "👎"
                              : "😐"}
                        </p>
                      ) : null}
                    </div>
                    <p className="mb-2 text-sm text-slate-600">{report.description}</p>
                    <p className="text-xs text-slate-500">Reported on {report.date}</p>
                    {report.evidenceFileName ? (
                      <p className="mt-2 text-xs text-slate-500">Invoice: {report.evidenceFileName}</p>
                    ) : null}
                    {report.evidenceUrl ? (
                      report.evidenceType?.startsWith("image/") ? (
                        <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                          <img
                            src={report.evidenceUrl}
                            alt="Uploaded invoice"
                            className="h-44 w-full object-cover"
                          />
                        </div>
                      ) : (
                        <a
                          href={report.evidenceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-xs font-medium text-blue-700 underline"
                        >
                          Open uploaded invoice
                        </a>
                      )
                    ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img
                src="/images/corruption-place.svg"
                alt="Sample station area"
                className="h-52 w-full object-cover md:h-60"
              />
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Police Station</p>
              <p className="text-base font-medium text-slate-900">{details.report.policeStation}</p>
              {details.report.address ? (
                <p className="mt-1 text-xs text-slate-500">Address: {details.report.address}</p>
              ) : null}
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-2 text-sm text-slate-700">{details.report.description}</p>
              <p className="text-xs text-slate-500">Reported on {details.report.date}</p>
              {details.report.evidenceFileName ? (
                <p className="mt-2 text-xs text-slate-500">Dashcam: {details.report.evidenceFileName}</p>
              ) : null}
              {details.report.evidenceUrl ? (
                details.report.evidenceType?.startsWith("video/") ? (
                  <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                    <video
                      controls
                      src={details.report.evidenceUrl}
                      className="h-52 w-full bg-slate-900 object-cover"
                    />
                  </div>
                ) : (
                  <a
                    href={details.report.evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs font-medium text-blue-700 underline"
                  >
                    Open uploaded dashcam file
                  </a>
                )
              ) : null}
              <p
                className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                  details.report.isVerified
                    ? "border border-blue-200 bg-blue-100 text-blue-700"
                    : "border border-amber-200 bg-amber-100 text-amber-700"
                }`}
              >
                Verification: {details.report.isVerified ? "Verified" : "Unverified"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}