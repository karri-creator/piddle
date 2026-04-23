'use client';

import { Streak } from '../types/streak';
import { motion } from 'framer-motion';
import WeekTracker from './WeekTracker';
import { Zap } from 'lucide-react';

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

  // Generate mock week data based on current streak
  const generateWeekData = () => {
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1;
    const checkedDays = Array(7).fill(false);
    
    for (let i = 0; i < Math.min(streak.currentStreak, adjustedToday + 1); i++) {
      checkedDays[adjustedToday - i] = true;
    }
    
    if (isTodayChecked) {
      checkedDays[adjustedToday] = true;
    }
    
    return checkedDays;
  };

  return (
    <motion.div
      className="bg-white p-5 rounded-2xl shadow-sm border border-charcoal/5"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{streak.icon}</span>
          <div>
            <h3 className="text-base font-heading font-semibold text-charcoal">{streak.name}</h3>
            <p className="text-xs text-charcoal/50 font-body">{streak.category}</p>
          </div>
        </div>
        
        {/* Streak Badge */}
        <div className="flex items-center gap-1.5 bg-coral text-white px-3 py-1.5 rounded-full">
          <span className="flame-animate">🔥</span>
          <span className="font-heading font-bold text-sm">{streak.currentStreak}</span>
        </div>
      </div>

      {/* Week Tracker */}
      <div className="mb-4">
        <WeekTracker checkedDays={generateWeekData()} />
      </div>

      {/* Urgent Warning */}
      {isUrgent && (
        <div className="mb-4 p-3 bg-coral/10 rounded-xl border border-coral/20">
          <p className="text-sm text-coral font-body font-medium">
            {hoursLeft} hours left to keep your streak!
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          onClick={() => onCheck(streak.id)}
          disabled={isTodayChecked}
          className={`flex-1 py-3 px-4 rounded-xl font-body font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            isTodayChecked
              ? 'bg-charcoal/5 text-charcoal/40 cursor-not-allowed'
              : 'bg-coral text-white hover:bg-coral/90'
          }`}
          whileHover={!isTodayChecked ? { scale: 1.02 } : {}}
          whileTap={!isTodayChecked ? { scale: 0.98 } : {}}
        >
          <Zap size={16} />
          {isTodayChecked ? 'Logged today' : 'Log my day'}
        </motion.button>
        
        {showCheerButton && (
          <motion.button
            onClick={onCheer}
            className="py-3 px-4 rounded-xl bg-blue/10 text-blue font-body font-semibold text-sm hover:bg-blue/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cheer
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
