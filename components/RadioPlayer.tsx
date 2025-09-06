import React from 'react';
import type { RadioStation } from '../types.ts';
import { PlayIcon } from './icons/PlayIcon.tsx';
import { PauseIcon } from './icons/PauseIcon.tsx';
import { VolumeUpIcon } from './icons/VolumeUpIcon.tsx';
import { VolumeOffIcon } from './icons/VolumeOffIcon.tsx';
import { LoadingSpinner } from './icons/LoadingSpinner.tsx';

interface RadioPlayerProps {
  station: RadioStation;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ station, isPlaying, isLoading, volume, onPlayPause, onVolumeChange }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-slate-800/80 backdrop-blur-lg border-t border-slate-700 z-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-emerald-400 truncate">{station.name}</p>
          <p className="text-xs text-slate-400">{isLoading ? 'جاري التحميل...' : (isPlaying ? 'يعمل الآن' : 'متوقف')}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={onPlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="bg-emerald-500 text-white rounded-full p-3 hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:bg-slate-600"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner className="w-6 h-6"/> : (isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />)}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 w-32">
          {volume > 0 ? <VolumeUpIcon className="w-6 h-6 text-slate-400" /> : <VolumeOffIcon className="w-6 h-6 text-slate-400" />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            aria-label="Volume control"
          />
        </div>
      </div>
    </footer>
  );
};

export default RadioPlayer;