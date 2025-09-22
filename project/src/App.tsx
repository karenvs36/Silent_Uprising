import React, { useState, useCallback } from 'react';
import { LockScreen } from './components/LockScreen';
import { Player } from './components/Player';
import { SongList } from './components/SongList';
import { Queue } from './components/Queue';
import { Song, QueueItem } from './types';
import { sampleSongs } from './data/sampleData';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [songs] = useState<Song[]>(sampleSongs);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [nextQueuePosition, setNextQueuePosition] = useState(1);

  const addToQueue = useCallback((song: Song) => {
    const queueItem: QueueItem = {
      ...song,
      queuePosition: nextQueuePosition,
    };
    setQueue(prev => [...prev, queueItem]);
    setNextQueuePosition(prev => prev + 1);
  }, [nextQueuePosition]);

  const removeFromQueue = useCallback((songId: string) => {
    setQueue(prev => prev.filter(item => item.id !== songId));
  }, []);

  const playNow = useCallback((song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    // Remove from queue if it exists there
    setQueue(prev => prev.filter(item => item.id !== song.id));
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setCurrentSong(nextSong);
      setQueue(prev => prev.slice(1));
      setIsPlaying(true);
    }
  }, [queue]);

  const handlePrevious = useCallback(() => {
    // Simple implementation - could be enhanced to maintain history
    if (currentSong && queue.length > 0) {
      // Add current song back to beginning of queue
      const currentAsQueueItem: QueueItem = {
        ...currentSong,
        queuePosition: nextQueuePosition,
      };
      setQueue(prev => [currentAsQueueItem, ...prev]);
      setNextQueuePosition(prev => prev + 1);
    }
  }, [currentSong, queue.length, nextQueuePosition]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  const handleReorderQueue = useCallback((fromIndex: number, toIndex: number) => {
    setQueue(prev => {
      const newQueue = [...prev];
      const [movedItem] = newQueue.splice(fromIndex, 1);
      newQueue.splice(toIndex, 0, movedItem);
      return newQueue;
    });
  }, []);

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  // Show lock screen if not unlocked
  if (!isUnlocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-mono text-green-400 mb-1">
            ~/Silent_Uprising/audio_system
          </h1>
          <p className="text-sm font-mono text-gray-500">
             Where walls rise, we build our own soundscape #SoundAnarchy
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Player and Queue */}
          <div className="space-y-4">
            <Player
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              volume={volume}
              onVolumeChange={handleVolumeChange}
            />
            <Queue
              queue={queue}
              currentSongId={currentSong?.id || null}
              onRemoveFromQueue={removeFromQueue}
              onReorderQueue={handleReorderQueue}
            />
          </div>

          {/* Right Column - Song Library */}
          <div className="lg:col-span-2">
            <SongList
              songs={songs}
              onAddToQueue={addToQueue}
              onPlayNow={playNow}
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 border border-gray-700 rounded-sm p-2 mt-6">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-4">
              <span className="text-green-400">
                STATUS: {isPlaying ? 'PLAYING' : 'PAUSED'}
              </span>
              <span className="text-gray-400">
                QUEUE: {queue.length}
              </span>
              <span className="text-gray-400">
                LIBRARY: {songs.length}
              </span>
              <span className="text-blue-400">
                VOLUME: {Math.round(volume * 100)}%
              </span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;