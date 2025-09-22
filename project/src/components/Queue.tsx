import React from 'react';
import { X, GripVertical } from 'lucide-react';
import { QueueItem } from '../types';

interface QueueProps {
  queue: QueueItem[];
  currentSongId: string | null;
  onRemoveFromQueue: (songId: string) => void;
  onReorderQueue: (fromIndex: number, toIndex: number) => void;
}

export const Queue: React.FC<QueueProps> = ({
  queue,
  currentSongId,
  onRemoveFromQueue,
  onReorderQueue,
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-sm">
      <div className="border-b border-gray-700 p-3">
        <div className="flex items-center space-x-2">
          <span className="text-green-400 font-mono text-sm">queue/</span>
          <span className="text-gray-500 font-mono text-xs">
            {queue.length} track{queue.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      <div className="max-h-48 overflow-y-auto">
        {queue.length === 0 ? (
          <div className="p-4 text-center text-gray-500 font-mono text-sm">
            # Queue is empty
            <br />
            <span className="text-xs">Add tracks from the library</span>
          </div>
        ) : (
          queue.map((song, index) => (
            <div
              key={`${song.id}-${song.queuePosition}`}
              className={`px-3 py-2 border-b border-gray-800 last:border-b-0 transition-colors ${
                song.id === currentSongId 
                  ? 'bg-blue-900 bg-opacity-30' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <GripVertical size={14} className="text-gray-600 cursor-move" />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-mono truncate ${
                    song.id === currentSongId ? 'text-blue-400' : 'text-gray-300'
                  }`}>
                    {song.id === currentSongId ? '▶ ' : ''}{song.title}
                  </div>
                  <div className="text-xs font-mono text-gray-500 truncate">
                    {song.artist} • {formatDuration(song.duration)}
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFromQueue(song.id)}
                  className="p-1 hover:bg-gray-600 rounded-sm transition-colors"
                  title="Remove from queue"
                >
                  <X size={12} className="text-gray-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};