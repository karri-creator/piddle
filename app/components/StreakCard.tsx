'use client';

import { Streak } from '../types/streak';
import Flame from './Flame';
import { motion } from 'framer-motion';

interface Props {
  streak: Streak;
  onCheck: (id: string) => void;
}

export default function StreakCard({ streak, onCheck }: Props) {
  const isTodayChecked = streak.lastChecked.toDateString() === new Date().toDateString();
  const timeUntilMidnight = new Date();
  timeUntilMidnight.setHours(24, 0, 0, 0);
  const hoursLeft = Math.floor((timeUntilMidnight.getTime() - Date.now()) / (1000 * 60 * 60));

  const fireCount = Math.min(streak.currentStreak, 5);

  return (
    <motion.div
      className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
        !isTodayChecked && hoursLeft < 6
          ? 'border-l-red-400 pulse-red'
          : 'border-l-[var(--color-hero)]'
      }`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4">{streak.icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[var(--color-neutral)] mb-1">{streak.name}</h3>
          <p className="text-sm text-gray-500 uppercase tracking-wide">{streak.category}</p>
        </div>
        {streak.isPublic && (
          <div className="bg-[var(--color-accent)] text-[var(--color-neutral)] px-2 py-1 rounded-full text-xs font-medium">
            Public
          </div>
        )}
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed">{streak.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-[var(--color-hero)]">{streak.currentStreak}</div>
          <div className="text-sm text-gray-500">Current Streak</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[var(--color-secondary)]">{streak.longestStreak}</div>
          <div className="text-sm text-gray-500">Best Streak</div>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        {Array.from({ length: fireCount }, (_, i) => (
          <Flame key={i} size={24} />
        ))}
      </div>
      {!isTodayChecked && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 font-medium">
            ⚠️ Check in before midnight! {hoursLeft} hours left.
          </p>
        </div>
      )}
      <motion.button
        onClick={() => onCheck(streak.id)}
        disabled={isTodayChecked}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 shadow-md ${
          isTodayChecked
            ? 'bg-gray-300 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-[var(--color-hero)] to-[var(--color-secondary)] hover:shadow-lg hover:from-[var(--color-secondary)] hover:to-[var(--color-hero)]'
        }`}
        whileHover={!isTodayChecked ? { scale: 1.02 } : {}}
        whileTap={!isTodayChecked ? { scale: 0.98 } : {}}
      >
        {isTodayChecked ? '✅ Completed Today' : '🎯 Mark as Done'}
      </motion.button>
    </motion.div>
  );
}