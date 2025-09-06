import React, { useState, useRef, useCallback, useEffect } from 'react';
import { STATIONS } from './constants.ts';
import type { RadioStation } from './types.ts';
import Header from './components/Header.tsx';
import StationList from './components/StationList.tsx';
import RadioPlayer from './components/RadioPlayer.tsx';

const App: React.FC = () => {
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playStation = useCallback((station: RadioStation) => {
    if (audioRef.current) {
      setCurrentStation(station);
      setIsPlaying(true);
      setIsLoading(true);
      audioRef.current.src = station.streamUrl;
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  }, []);
  
  const handleStationSelect = useCallback((station: RadioStation) => {
    if (currentStation?.id === station.id) {
      setIsPlaying(prev => !prev);
    } else {
      playStation(station);
    }
  }, [currentStation, playStation]);

  const handlePlayPause = useCallback(() => {
    if (currentStation) {
      setIsPlaying(prev => !prev);
    }
  }, [currentStation]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
        setIsLoading(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlaying = () => setIsLoading(false);
    const onWaiting = () => setIsLoading(true);
    const onStalled = () => setIsLoading(true);
    const onError = () => {
      setIsLoading(false);
      setIsPlaying(false);
    }

    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('stalled', onStalled);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('stalled', onStalled);
      audio.removeEventListener('error', onError);
    };
  }, []);

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow p-4 md:p-8 pb-32">
        <StationList
          stations={STATIONS}
          currentStationId={currentStation?.id ?? null}
          isPlaying={isPlaying}
          onStationSelect={handleStationSelect}
        />
      </main>
      {currentStation && (
        <RadioPlayer
          station={currentStation}
          isPlaying={isPlaying}
          isLoading={isLoading}
          volume={volume}
          onPlayPause={handlePlayPause}
          onVolumeChange={handleVolumeChange}
        />
      )}
      <audio ref={audioRef} preload="none" crossOrigin="anonymous" className="hidden"></audio>
    </div>
  );
};

export default App;