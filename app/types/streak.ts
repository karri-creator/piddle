export interface Streak {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  currentStreak: number;
  longestStreak: number;
  isPublic: boolean;
  lastChecked: Date;
  color: string;
  category: string;
  icon: string;
}