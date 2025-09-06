import React from 'react';
import type { RadioStation } from '../types.ts';
import { PlayIcon } from './icons/PlayIcon.tsx';
import { PauseIcon } from './icons/PauseIcon.tsx';
import { VolumeWaveIcon } from './icons/VolumeWaveIcon.tsx';

interface StationCardProps {
  station: RadioStation;
  isPlaying: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

const StationCard: React.FC<StationCardProps> = ({ station, isPlaying, isCurrent, onClick }) => {
  const cardClasses = `
    bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-center
    cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105
    focus:outline-none focus:ring-4 focus:ring-emerald-500/50
    ${isCurrent ? 'border-2 border-emerald-500' : 'border-2 border-transparent'}
    ${isPlaying ? 'ring-4 ring-emerald-500/50' : ''}
  `;

  return (
    <div className={cardClasses} onClick={onClick} onKeyPress={onClick} role="button" tabIndex={0}>
        <div className="relative mb-4">
            {isCurrent ? (
                isPlaying ? (
                    <VolumeWaveIcon className="w-16 h-16 text-emerald-400" />
                ) : (
                    <PauseIcon className="w-16 h-16 text-gray-400" />
                )
            ) : (
                <PlayIcon className="w-16 h-16 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            )}
        </div>
      <h3 className="font-semibold text-lg text-slate-100">{station.name}</h3>
      {isCurrent && (
        <span className={`mt-2 text-sm font-bold ${isPlaying ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>
          {isPlaying ? 'جاري التشغيل' : 'متوقف مؤقتاً'}
        </span>
      )}
    </div>
  );
};

export default StationCard;