import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { Song } from '../types';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const Player: React.FC<PlayerProps> = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  volume,
  onVolumeChange,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentSong]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickTime = (clickX / width) * duration;
    
    audio.currentTime = clickTime;
    setCurrentTime(clickTime);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-sm p-4 font-mono">
      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.url}
          volume={volume}
          muted={isMuted}
          onPlay={() => {}}
          onPause={() => {}}
        />
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="text-green-400 text-sm truncate">
            {currentSong ? `> ${currentSong.title}` : '> No track selected'}
          </div>
          <div className="text-gray-400 text-xs truncate">
            {currentSong ? `by ${currentSong.artist}` : 'Select a track from the library'}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div 
          className="bg-gray-700 h-1 rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="bg-blue-500 h-1 rounded-full transition-all duration-150"
            style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration || 0)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevious}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            disabled={!currentSong}
          >
            <SkipBack size={16} className="text-gray-300" />
          </button>
          
          <button
            onClick={onPlayPause}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            disabled={!currentSong}
          >
            {isPlaying ? (
              <Pause size={20} className="text-green-400" />
            ) : (
              <Play size={20} className="text-green-400" />
            )}
          </button>
          
          <button
            onClick={onNext}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            disabled={!currentSong}
          >
            <SkipForward size={16} className="text-gray-300" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={toggleMute} className="p-1 hover:bg-gray-700 rounded transition-colors">
            {isMuted ? (
              <VolumeX size={16} className="text-gray-400" />
            ) : (
              <Volume2 size={16} className="text-gray-400" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};