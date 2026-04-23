'use client';

import { useState, useEffect } from 'react';
import { getStreaks, saveStreaks } from './lib/storage';
import StreakCard from './components/StreakCard';
import { Streak } from './types/streak';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Logo from './components/Logo';
import BottomNav from './components/BottomNav';
import Mascot from './components/Mascot';
import WeekTracker from './components/WeekTracker';
import { Zap, ChevronRight } from 'lucide-react';

export default function Home() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [milestoneMessage, setMilestoneMessage] = useState('');
  const [showMilestone, setShowMilestone] = useState(false);
  const { width, height } = useWindowSize();

  // Mock user data
  const userName = 'Alex';
  const currentStreak = streaks.reduce((max, s) => Math.max(max, s.currentStreak), 0);

  useEffect(() => {
    setStreaks(getStreaks());
  }, []);

  const handleCheck = (id: string) => {
    const newStreaks = streaks.map(s => {
      if (s.id === id) {
        const today = new Date();
        const last = new Date(s.lastChecked);
        const diff = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
        let current = s.currentStreak;
        if (diff === 1) {
          current += 1;
        } else if (diff > 1) {
          current = 1;
        }
        const newStreak = {
          ...s,
          currentStreak: current,
          longestStreak: Math.max(s.longestStreak, current),
          lastChecked: today,
        };

        const milestones = [7, 30, 100];
        if (milestones.includes(current) && current > s.currentStreak) {
          setMilestoneMessage(`${current} days on "${s.name}"!`);
          setShowConfetti(true);
          setShowMilestone(true);
          setTimeout(() => {
            setShowConfetti(false);
            setShowMilestone(false);
          }, 5000);
        }

        return newStreak;
      }
      return s;
    });
    setStreaks(newStreaks);
    saveStreaks(newStreaks);
  };

  // Generate week data for main display
  const generateMainWeekData = () => {
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1;
    // Mock: show some checked days
    return [true, true, true, true, true, false, false].slice(0, adjustedToday + 1).concat(Array(6 - adjustedToday).fill(false));
  };

  return (
    <main className="min-h-screen bg-cream pb-24">
      {showConfetti && <Confetti width={width} height={height} />}
      
      {/* Milestone Celebration Modal */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-coral rounded-3xl p-8 text-center max-w-sm w-full"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-heading font-bold text-white mb-2">
                New streak high five!
              </h2>
              <p className="text-white/90 font-body mb-2">
                {"You're"} showing up for you.
              </p>
              <div className="my-6">
                <Mascot mood="excited" size="lg" />
              </div>
              <p className="text-5xl font-heading font-bold text-white mb-6">
                {milestoneMessage.split(' ')[0]}
              </p>
              <button
                onClick={() => setShowMilestone(false)}
                className="w-full bg-white text-coral py-4 rounded-2xl font-heading font-bold text-lg"
              >
                {"Let's go!"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-charcoal/60 font-body text-sm mb-1">Hey {userName} 👋</p>
            <h1 className="text-xl font-heading font-bold text-charcoal">
              {"You've got this."}<br />
              {"Let's keep it going."}
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-coral text-white px-3 py-2 rounded-full">
            <span className="flame-animate">🔥</span>
            <span className="font-heading font-bold">{currentStreak || 0}</span>
          </div>
        </div>

        {/* Current Streak Card */}
        <motion.div
          className="bg-blue rounded-3xl p-6 mb-6 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white/70 text-xs font-body uppercase tracking-wide mb-1">Current Streak</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-heading font-bold">{currentStreak || 0} <span className="text-2xl font-normal">days</span></p>
              <p className="text-white/80 font-body text-sm mt-2">
                Keep it up — {"you're"} building something great.
              </p>
            </div>
            <div className="absolute right-4 bottom-4">
              <Mascot mood="happy" size="lg" />
            </div>
          </div>
          
          {/* Week Tracker */}
          <div className="mt-6 bg-white/10 rounded-2xl p-4">
            <WeekTracker checkedDays={generateMainWeekData()} />
          </div>
        </motion.div>

        {/* Daily Goal Card */}
        {streaks.length > 0 && (
          <motion.div
            className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-charcoal/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-charcoal/50 font-body uppercase tracking-wide">Daily Goal</p>
              <span className="text-charcoal/50 text-sm font-body">
                {streaks.filter(s => new Date(s.lastChecked).toDateString() === new Date().toDateString()).length}/{streaks.length}
              </span>
            </div>
            <p className="font-heading font-semibold text-charcoal mb-3">Log one piddle</p>
            <div className="w-full h-2 bg-charcoal/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-coral rounded-full transition-all duration-500"
                style={{ 
                  width: `${(streaks.filter(s => new Date(s.lastChecked).toDateString() === new Date().toDateString()).length / Math.max(streaks.length, 1)) * 100}%` 
                }}
              />
            </div>
            {streaks.every(s => new Date(s.lastChecked).toDateString() === new Date().toDateString()) && (
              <p className="text-sm text-coral font-body font-medium mt-3">Boom! Goal met 🎉</p>
            )}
          </motion.div>
        )}

        {/* Missed Day Reminder (show if applicable) */}
        {streaks.length > 0 && streaks.some(s => {
          const last = new Date(s.lastChecked);
          const diff = Math.floor((Date.now() - last.getTime()) / (1000 * 60 * 60 * 24));
          return diff > 1;
        }) && (
          <motion.div
            className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-charcoal/5 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="text-3xl">😊</div>
            <div className="flex-1">
              <p className="font-heading font-semibold text-charcoal">
                Missed a day? <span className="text-blue">No biggie.</span>
              </p>
              <p className="text-sm text-charcoal/60 font-body">
                Your streak is safe. {"You've"} got this.
              </p>
            </div>
          </motion.div>
        )}

        {/* Active Streaks */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-bold text-charcoal">Your Streaks</h2>
            <button className="text-blue text-sm font-body font-medium flex items-center gap-1">
              View insights <ChevronRight size={16} />
            </button>
          </div>
          
          {streaks.length === 0 ? (
            <motion.div
              className="bg-white rounded-2xl p-8 text-center shadow-sm border border-charcoal/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Mascot mood="thinking" size="lg" />
              <p className="text-lg font-heading font-semibold text-charcoal mt-4 mb-2">No streaks yet</p>
              <p className="text-charcoal/60 text-sm font-body mb-4">
                Tap the + button to start your first streak!
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {streaks.map((streak, index) => (
                <motion.div
                  key={streak.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StreakCard streak={streak} onCheck={handleCheck} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );
}
