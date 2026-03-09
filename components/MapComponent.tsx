"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon, latLngBounds, point } from "leaflet";
import MarkerPopup from "./MarkerPopup";
import { MarkerItem, MarkerType } from "@/lib/types";

type MapComponentProps = {
  markers: MarkerItem[];
  onViewDetails: (id: string, type: MarkerType) => void;
};
const KUALA_LUMPUR_COORDINATES: [number, number] = [3.139, 101.6869];

function FitBoundsOnMarkerChange({ markers }: { markers: MarkerItem[] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) {
      map.setView(KUALA_LUMPUR_COORDINATES, 10);
      return;
    }

    const bounds = latLngBounds(markers.map((marker) => [marker.latitude, marker.longitude]));
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 13 });
  }, [map, markers]);

  return null;
}

const buildMarkerIcon = (type: MarkerType, icon: string) =>
  divIcon({
    className: `custom-marker ${type}`,
    html: `<span class="custom-marker-icon">${icon}</span>`,
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  });

const buildClusterIcon = (count: number) =>
  divIcon({
    html: `<div class="custom-cluster-bubble"><span class="custom-cluster-count">${count}</span></div>`,
    className: "custom-cluster",
    iconSize: point(48, 48, true)
  });

export default function MapComponent({ markers, onViewDetails }: MapComponentProps) {
  const markerIcons = useMemo(() => {
    return markers.reduce<Record<string, ReturnType<typeof divIcon>>>((result, marker) => {
      const key = `${marker.type}-${marker.icon}`;
      if (!result[key]) {
        result[key] = buildMarkerIcon(marker.type, marker.icon);
      }
      return result;
    }, {});
  }, [markers]);

  const clusterOptions = useMemo(
    () => ({
      showCoverageOnHover: false,
      maxClusterRadius: 45,
      iconCreateFunction: (cluster: { getChildCount: () => number }) =>
        buildClusterIcon(cluster.getChildCount())
    }),
    []
  );

  return (
    <div className="h-[70vh] min-h-[460px] w-full overflow-hidden rounded-2xl shadow-sm">
      <MapContainer center={KUALA_LUMPUR_COORDINATES} zoom={10} className="reportlah-map h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MarkerClusterGroup chunkedLoading {...clusterOptions}>
          {markers.map((marker) => (
            <Marker
              key={`${marker.type}-${marker.id}`}
              position={[marker.latitude, marker.longitude]}
              icon={markerIcons[`${marker.type}-${marker.icon}`]}
            >
              <Popup closeButton={true} offset={[0, -6]}>
                <MarkerPopup
                  title={marker.title}
                  subtitle={marker.subtitle}
                  markerType={marker.type}
                  onViewDetails={() => onViewDetails(marker.id, marker.type)}
                />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <FitBoundsOnMarkerChange markers={markers} />
      </MapContainer>
    </div>
  );
}