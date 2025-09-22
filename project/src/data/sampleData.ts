import { Song, Comment, SongRequest } from '../types';

export const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Ambient Workspace',
    artist: 'Focus Sounds',
    genre: 'Ambient',
    duration: 240,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  },
  {
    id: '2',
    title: 'Coding Flow',
    artist: 'Dev Beats',
    genre: 'Electronic',
    duration: 195,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  },
  {
    id: '3',
    title: 'Terminal Blues',
    artist: 'System Admin',
    genre: 'Blues',
    duration: 210,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  },
  {
    id: '4',
    title: 'Debug Session',
    artist: 'Code Warriors',
    genre: 'Rock',
    duration: 165,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  },
  {
    id: '5',
    title: 'Deployment Day',
    artist: 'DevOps Collective',
    genre: 'Electronic',
    duration: 220,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
  },
];

export const sampleComments: Comment[] = [
  {
    id: '1',
    author: 'john_dev',
    content: 'Perfect background music for coding sessions. Really helps with focus.',
    timestamp: new Date('2025-01-01T10:30:00'),
    songId: '1',
  },
  {
    id: '2',
    author: 'sarah_pm',
    content: 'Can we get more tracks like this? Great for team meetings.',
    timestamp: new Date('2025-01-01T11:15:00'),
  },
  {
    id: '3',
    author: 'mike_qa',
    content: 'Love the Terminal Blues track. Reminds me of late night debugging!',
    timestamp: new Date('2025-01-01T14:20:00'),
    songId: '3',
  },
];

export const sampleRequests: SongRequest[] = [
  {
    id: '1',
    title: 'Lo-Fi Hip Hop Study Mix',
    artist: 'Various Artists',
    requestedBy: 'alex_frontend',
    timestamp: new Date('2025-01-01T09:00:00'),
    status: 'pending',
  },
  {
    id: '2',
    title: 'Synthwave Coding',
    artist: 'Retro Dev',
    requestedBy: 'lisa_backend',
    timestamp: new Date('2025-01-01T12:30:00'),
    status: 'approved',
  },
];