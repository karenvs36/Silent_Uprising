import React, { useState } from 'react';
import { Play, Plus, Search, Music } from 'lucide-react';
import { Song } from '../types';

interface SongListProps {
  songs: Song[];
  onAddToQueue: (song: Song) => void;
  onPlayNow: (song: Song) => void;
}

export const SongList: React.FC<SongListProps> = ({ songs, onAddToQueue, onPlayNow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = ['all', ...Array.from(new Set(songs.map(song => song.genre)))];

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-sm">
      <div className="border-b border-gray-700 p-3">
        <div className="flex items-center space-x-2 mb-3">
          <Music size={16} className="text-blue-400" />
          <span className="text-blue-400 font-mono text-sm">music_library/</span>
          <span className="text-gray-500 font-mono text-xs">
            {filteredSongs.length} track{filteredSongs.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="search tracks..."
              className="w-full bg-gray-900 border border-gray-600 rounded-sm pl-9 pr-3 py-2 text-sm font-mono text-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-sm px-3 py-2 text-sm font-mono text-gray-300 focus:outline-none focus:border-blue-500"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'all genres' : genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {filteredSongs.length === 0 ? (
          <div className="p-4 text-center text-gray-500 font-mono text-sm">
            # No tracks found
            <br />
            <span className="text-xs">Try adjusting your search or filter</span>
          </div>
        ) : (
          filteredSongs.map((song) => (
            <div key={song.id} className="p-3 border-b border-gray-800 last:border-b-0 hover:bg-gray-750 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-gray-300 font-mono text-sm truncate">
                      {song.title}
                    </span>
                    <span className="text-gray-500 font-mono text-xs">
                      [{formatDuration(song.duration)}]
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-blue-400 font-mono">
                      {song.artist}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500 font-mono">
                      {song.genre}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onPlayNow(song)}
                    className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-sm transition-colors"
                    title="Play now"
                  >
                    <Play size={12} />
                  </button>
                  <button
                    onClick={() => onAddToQueue(song)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-sm transition-colors"
                    title="Add to queue"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};