export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: number;
  url: string;
  albumArt?: string;
}

export interface QueueItem extends Song {
  queuePosition: number;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  songId?: string;
}

export interface SongRequest {
  id: string;
  title: string;
  artist: string;
  requestedBy: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
}