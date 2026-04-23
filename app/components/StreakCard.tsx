'use client';

import { Streak } from '../types/streak';
import { motion } from 'framer-motion';

interface Props {
  streak: Streak;
  onCheck: (id: string) => void;
  showCheerButton?: boolean;
  onCheer?: () => void;
}

export default function StreakCard({ streak, onCheck, showCheerButton, onCheer }: Props) {
  const isTodayChecked = new Date(streak.lastChecked).toDateString() === new Date().toDateString();
  const timeUntilMidnight = new Date();
  timeUntilMidnight.setHours(24, 0, 0, 0);
  const hoursLeft = Math.floor((timeUntilMidnight.getTime() - Date.now()) / (1000 * 60 * 60));
  const isUrgent = !isTodayChecked && hoursLeft < 6;

  const fireCount = Math.min(streak.currentStreak, 5);

  return (
    <motion.div
      className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
        isUrgent
          ? 'border-white bg-white/10 pulse-glow'
          : 'border-white/20 bg-white/5 hover:bg-white/10'
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{streak.icon}</span>
          <div>
            <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wide">{streak.name}</h3>
            <p className="text-xs text-white/50 font-body uppercase tracking-wide">{streak.category}</p>
          </div>
        </div>
        {streak.isPublic && (
          <span className="text-xs text-white/60 font-body bg-white/10 px-2 py-1 rounded-full">
            Public
          </span>
        )}
      </div>
      
      {streak.description && (
        <p className="text-sm text-white/70 font-body mb-4 leading-relaxed">{streak.description}</p>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-white">{streak.currentStreak}</div>
            <div className="text-xs text-white/50 font-body">Current</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-white/60">{streak.longestStreak}</div>
            <div className="text-xs text-white/50 font-body">Best</div>
          </div>
        </div>
        
        {fireCount > 0 && (
          <div className="flex gap-1">
            {Array.from({ length: fireCount }, (_, i) => (
              <span key={i} className="flame-animate text-xl" style={{ animationDelay: `${i * 0.1}s` }}>
                🔥
              </span>
            ))}
          </div>
        )}
      </div>

      {isUrgent && (
        <div className="mb-3 p-2 bg-white/10 rounded-lg">
          <p className="text-xs text-white font-body font-semibold">
            {hoursLeft} hours left to check in!
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <motion.button
          onClick={() => onCheck(streak.id)}
          disabled={isTodayChecked}
          className={`flex-1 py-3 px-4 rounded-xl font-heading font-bold text-sm transition-all duration-200 ${
            isTodayChecked
              ? 'bg-white/20 text-white/50 cursor-not-allowed'
              : 'bg-white text-[var(--color-primary)] hover:shadow-lg'
          }`}
          whileHover={!isTodayChecked ? { scale: 1.02 } : {}}
          whileTap={!isTodayChecked ? { scale: 0.98 } : {}}
        >
          {isTodayChecked ? 'Done Today' : 'Mark Complete'}
        </motion.button>
        
        {showCheerButton && (
          <motion.button
            onClick={onCheer}
            className="py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white font-heading font-bold text-sm hover:bg-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🙌 Cheer
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
