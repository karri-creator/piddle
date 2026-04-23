import { Streak } from '../types/streak';

const STORAGE_KEY = 'acclaim-streaks';

export const getStreaks = (): Streak[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    return parsed.map((s: any) => ({
      ...s,
      startDate: new Date(s.startDate),
      lastChecked: new Date(s.lastChecked),
      category: s.category || 'Other',
      icon: s.icon || '🎯',
    }));
  } catch {
    return [];
  }
};

export const saveStreaks = (streaks: Streak[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(streaks));
};