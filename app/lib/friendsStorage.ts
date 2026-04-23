import { Streak } from '../types/streak';

export interface Friend {
  id: string;
  name: string;
  streaks: Streak[];
}

const FRIENDS_STORAGE_KEY = 'acclaim-friends';

const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Alex',
    streaks: [
      {
        id: 'f1',
        name: 'Morning Run',
        description: 'Run 5km every morning',
        startDate: new Date('2024-01-01'),
        currentStreak: 15,
        longestStreak: 30,
        isPublic: true,
        lastChecked: new Date(),
        color: '#10b981',
        category: 'Fitness',
        icon: '🏃',
      },
    ],
  },
  {
    id: '2',
    name: 'Jordan',
    streaks: [
      {
        id: 'f2',
        name: 'Read 30 mins',
        description: 'Read for 30 minutes daily',
        startDate: new Date('2024-02-01'),
        currentStreak: 7,
        longestStreak: 12,
        isPublic: true,
        lastChecked: new Date(),
        color: '#8b5cf6',
        category: 'Learning',
        icon: '📚',
      },
    ],
  },
];

export const getFriends = (): Friend[] => {
  if (typeof window === 'undefined') return mockFriends;
  const data = localStorage.getItem(FRIENDS_STORAGE_KEY);
  if (!data) {
    saveFriends(mockFriends);
    return mockFriends;
  }
  try {
    const parsed = JSON.parse(data);
    return parsed.map((f: any) => ({
      ...f,
      streaks: f.streaks.map((s: any) => ({
        ...s,
        startDate: new Date(s.startDate),
        lastChecked: new Date(s.lastChecked),
      })),
    }));
  } catch {
    return mockFriends;
  }
};

export const saveFriends = (friends: Friend[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(friends));
};

export const addFriend = (name: string) => {
  const friends = getFriends();
  const newFriend: Friend = {
    id: Date.now().toString(),
    name,
    streaks: [], // empty for now
  };
  const newFriends = [...friends, newFriend];
  saveFriends(newFriends);
  return newFriends;
};