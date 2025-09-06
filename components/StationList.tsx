
import React from 'react';
import type { RadioStation } from '../types';
import StationCard from './StationCard';

interface StationListProps {
  stations: RadioStation[];
  currentStationId: number | null;
  isPlaying: boolean;
  onStationSelect: (station: RadioStation) => void;
}

const StationList: React.FC<StationListProps> = ({ stations, currentStationId, isPlaying, onStationSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {stations.map(station => (
        <StationCard
          key={station.id}
          station={station}
          isPlaying={currentStationId === station.id && isPlaying}
          isCurrent={currentStationId === station.id}
          onClick={() => onStationSelect(station)}
        />
      ))}
    </div>
  );
};

export default StationList;
