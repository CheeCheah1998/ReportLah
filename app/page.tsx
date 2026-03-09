"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import FilterPanel, { CategoryFilterOption } from "@/components/FilterPanel";
import ReportModal from "@/components/ReportModal";
import ReportlahSubmissionModal from "@/components/ReportlahSubmissionModal";
import SearchBar from "@/components/SearchBar";
import { businesses, corruptionReports, priceReports } from "@/lib/mockData";
import {
  Business,
  CorruptionReport,
  MarkerDetails,
  MarkerItem,
  MarkerType,
  PriceReport,
  ReportSubmissionPayload
} from "@/lib/types";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[460px] items-center justify-center rounded-2xl bg-white p-6 text-sm text-slate-500">
      Loading map...
    </div>
  )
});

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterOption>("All");
  const [activeModal, setActiveModal] = useState<MarkerDetails | null>(null);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [userBusinesses, setUserBusinesses] = useState<Business[]>([]);
  const [userPriceReports, setUserPriceReports] = useState<PriceReport[]>([]);
  const [userCorruptionReports, setUserCorruptionReports] = useState<CorruptionReport[]>([]);

  useEffect(() => {
    setActiveModal(null);
  }, [query, selectedCategory]);

  const normalizedQuery = query.trim().toLowerCase();

  const toCoordinatesFromAddress = (address: string): [number, number] => {
    const seedA = address.split("").reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 3), 0);
    const seedB = address.split("").reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 7), 0);
    const latOffset = ((seedA % 220) - 110) * 0.0013;
    const lngOffset = ((seedB % 260) - 130) * 0.0014;

    return [3.139 + latOffset, 101.6869 + lngOffset];
  };

  const allBusinesses = useMemo(() => [...businesses, ...userBusinesses], [userBusinesses]);
  const allPriceReports = useMemo(() => [...priceReports, ...userPriceReports], [userPriceReports]);
  const allCorruptionReports = useMemo(
    () => [...corruptionReports, ...userCorruptionReports],
    [userCorruptionReports]
  );

  const filteredBusinesses = useMemo(() => {
    return allBusinesses.filter((business) => {
      const matchesCategory = selectedCategory === "All" || business.category === selectedCategory;
      const matchesQuery =
        normalizedQuery.length === 0 || business.name.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [allBusinesses, normalizedQuery, selectedCategory]);

  const reportsByBusinessId = useMemo(() => {
    return allPriceReports.reduce<Record<string, typeof allPriceReports>>((result, report) => {
      if (!result[report.businessId]) {
        result[report.businessId] = [];
      }
      result[report.businessId].push(report);
      return result;
    }, {});
  }, [allPriceReports]);

  const markers = useMemo<MarkerItem[]>(() => {
    const businessMarkers: MarkerItem[] = filteredBusinesses.map((business) => {
      const reports = reportsByBusinessId[business.id] ?? [];
      const latestReport = reports[0];
      const recommendationLabel =
        latestReport?.recommendation === "THUMBSUP"
          ? "👍"
          : latestReport?.recommendation === "NEUTRAL"
            ? "😐"
          : latestReport?.recommendation === "THUMBSDOWN"
            ? "👎"
            : "";

      return {
        id: business.id,
        type: "business",
        icon:
          business.category === "Renovation"
            ? "🏚️"
            : business.category === "CarRepair"
              ? "🚗"
              : business.category === "Lawyer"
                ? "⚖️"
                : "🧑‍⚕️",
        latitude: business.latitude,
        longitude: business.longitude,
        title: business.name,
        subtitle:
          reports.length > 0
            ? `${business.category} • ${reports.length} report${reports.length > 1 ? "s" : ""}${
                latestReport?.rating ? ` • ${latestReport.rating}★` : ""
              }${recommendationLabel ? ` ${recommendationLabel}` : ""}`
            : `${business.category} • No price reports`
      };
    });

    const corruptionMarkers: MarkerItem[] = allCorruptionReports.map((report) => ({
      id: report.id,
      type: "corruption",
      icon: "👮",
      latitude: report.latitude,
      longitude: report.longitude,
      title: report.policeStation,
      subtitle: `${report.isVerified ? "Verified" : "Unverified"} • ${report.date}`
    }));

    return [...businessMarkers, ...corruptionMarkers];
  }, [allCorruptionReports, filteredBusinesses, reportsByBusinessId]);

  const onSubmitReport = (payload: ReportSubmissionPayload) => {
    const [latitude, longitude] = toCoordinatesFromAddress(payload.address);
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const uniqueId = now.getTime().toString(36);

    if (payload.type === "corruption") {
      const reportId = `ucr-${uniqueId}`;
      setUserCorruptionReports((previous) => [
        {
          id: reportId,
          latitude,
          longitude,
          policeStation: payload.policeStation,
          description: payload.description,
          date,
          isVerified: false,
          address: payload.address,
          evidenceFileName: payload.dashcamFile?.name,
          evidenceType: payload.dashcamFile?.type,
          evidenceUrl: payload.dashcamFile ? URL.createObjectURL(payload.dashcamFile) : undefined
        },
        ...previous
      ]);
      return;
    }

    const businessId = `ubz-${uniqueId}`;
    const priceId = `upr-${uniqueId}`;

    setUserBusinesses((previous) => [
      {
        id: businessId,
        name: payload.providerName,
        category: payload.category,
        latitude,
        longitude,
        address: payload.address
      },
      ...previous
    ]);

    setUserPriceReports((previous) => [
      {
        id: priceId,
        businessId,
        serviceType: payload.serviceType,
        amount: payload.amount,
        currency: payload.currency,
        description: payload.description,
        date,
        serviceProvider: payload.serviceProvider,
        providerName: payload.providerName,
        dateOfService: payload.dateOfService,
        rating: payload.rating,
        recommendation: payload.recommendation,
        evidenceFileName: payload.invoiceFile?.name,
        evidenceType: payload.invoiceFile?.type,
        evidenceUrl: payload.invoiceFile ? URL.createObjectURL(payload.invoiceFile) : undefined
      },
      ...previous
    ]);
  };

  const onViewDetails = (id: string, type: MarkerType) => {
    if (type === "business") {
      const business = allBusinesses.find((item) => item.id === id);
      if (!business) {
        return;
      }

      setActiveModal({
        type: "business",
        business,
        reports: reportsByBusinessId[business.id] ?? []
      });
      return;
    }

    const report = allCorruptionReports.find((item) => item.id === id);
    if (!report) {
      return;
    }

    setActiveModal({
      type: "corruption",
      report
    });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 p-4 md:p-6">
      <header className="rounded-2xl bg-slate-900 p-5 shadow-sm">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-white md:text-2xl">REPORTLAH</h1>
          <p className="mt-1 text-sm text-slate-300">
            Civic reporting map for price transparency and corruption awareness.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SearchBar value={query} onChange={setQuery} />
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
            <FilterPanel selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
            <button
              type="button"
              onClick={() => setIsSubmissionOpen(true)}
              className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              REPORTLAH
            </button>
          </div>
        </div>
      </header>

      <section className="flex-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
        <MapComponent markers={markers} onViewDetails={onViewDetails} />
      </section>

      <ReportModal details={activeModal} onClose={() => setActiveModal(null)} />
      <ReportlahSubmissionModal
        isOpen={isSubmissionOpen}
        onClose={() => setIsSubmissionOpen(false)}
        onSubmit={onSubmitReport}
      />
    </main>
  );
}