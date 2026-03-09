import { MarkerType } from "@/lib/types";

type MarkerPopupProps = {
  title: string;
  subtitle: string;
  markerType: MarkerType;
  onViewDetails: () => void;
};

export default function MarkerPopup({ title, subtitle, markerType, onViewDetails }: MarkerPopupProps) {
  const pillClassName =
    markerType === "business"
      ? "bg-blue-100 text-blue-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="w-64 rounded-xl bg-white p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="line-clamp-1 text-sm font-semibold text-slate-900">{title}</p>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${pillClassName}`}>
          {markerType === "business" ? "Business" : "Corruption"}
        </span>
      </div>
      <p className="mb-3 text-xs text-slate-600">{subtitle}</p>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onViewDetails();
        }}
        className="w-full rounded-lg bg-blue-700 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-800"
      >
        View details
      </button>
    </div>
  );
}