import { BusinessCategory } from "@/lib/types";

export type CategoryFilterOption = "All" | BusinessCategory;

type FilterPanelProps = {
  selectedCategory: CategoryFilterOption;
  onCategoryChange: (value: CategoryFilterOption) => void;
};

const categoryOptions: CategoryFilterOption[] = ["All", "CarRepair", "Renovation", "Lawyer", "Healthcare"];

export default function FilterPanel({ selectedCategory, onCategoryChange }: FilterPanelProps) {
  return (
    <div className="w-full md:w-56">
      <label htmlFor="category-filter" className="sr-only">
        Filter category
      </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value as CategoryFilterOption)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
      >
        {categoryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}