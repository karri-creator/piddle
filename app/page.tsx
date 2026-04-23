'use client';

import { useState, useEffect } from 'react';
import { getStreaks, saveStreaks } from './lib/storage';
import StreakCard from './components/StreakCard';
import { Streak } from './types/streak';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const categories = ['Fitness', 'Writing', 'Learning', 'Habit', 'Other'];
const icons = ['🎯', '💪', '📚', '🎓', '🔄', '🏃', '✍️', '🧠', '🌱', '⭐'];

export default function Home() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [newStreak, setNewStreak] = useState({
    name: '',
    description: '',
    isPublic: false,
    color: '#ffffff',
    category: 'Habit',
    icon: '🎯'
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [milestoneMessage, setMilestoneMessage] = useState('');
  const { width, height } = useWindowSize();

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
          setTimeout(() => setShowConfetti(false), 5000);
        }

        return newStreak;
      }
      return s;
    });
    setStreaks(newStreaks);
    saveStreaks(newStreaks);
  };

  const handleCreate = () => {
    if (!newStreak.name.trim()) return;
    const streak: Streak = {
      id: Date.now().toString(),
      name: newStreak.name,
      description: newStreak.description,
      startDate: new Date(),
      currentStreak: 0,
      longestStreak: 0,
      isPublic: newStreak.isPublic,
      lastChecked: new Date(Date.now() - 24 * 60 * 60 * 1000),
      color: newStreak.color,
      category: newStreak.category,
      icon: newStreak.icon,
    };
    const newStreaks = [...streaks, streak];
    setStreaks(newStreaks);
    saveStreaks(newStreaks);
    setNewStreak({ name: '', description: '', isPublic: false, color: '#ffffff', category: 'Habit', icon: '🎯' });
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
            Build Your Streak
          </h1>
          <p className="text-white/70 font-body">
            Consistency is key. Start something new today.
          </p>
        </motion.div>

        {/* Milestone Celebration */}
        {milestoneMessage && (
          <motion.div
            className="text-center mb-8 p-4 border-2 border-white/30 rounded-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="text-3xl mb-2">🎉</div>
            <p className="text-xl font-heading font-bold text-white">{milestoneMessage}</p>
            <p className="text-white/70 text-sm font-body">Keep the momentum going!</p>
          </motion.div>
        )}

        {/* Create Streak Form */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={e => { e.preventDefault(); handleCreate(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-body font-semibold mb-2 text-white/90">
                Streak Name
              </label>
              <input
                type="text"
                value={newStreak.name}
                onChange={e => setNewStreak({...newStreak, name: e.target.value})}
                className="w-full p-4 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl text-white placeholder-white/50 font-body focus:border-white focus:outline-none transition-colors"
                placeholder="e.g., Morning Meditation"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-semibold mb-2 text-white/90">
                  Category
                </label>
                <select
                  value={newStreak.category}
                  onChange={e => setNewStreak({...newStreak, category: e.target.value})}
                  className="w-full p-4 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl text-white font-body focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  {categories.map(cat => <option key={cat} value={cat} className="bg-[#A02122] text-white">{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-body font-semibold mb-2 text-white/90">
                  Icon
                </label>
                <select
                  value={newStreak.icon}
                  onChange={e => setNewStreak({...newStreak, icon: e.target.value})}
                  className="w-full p-4 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl text-white font-body text-2xl focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  {icons.map(icon => <option key={icon} value={icon} className="bg-[#A02122]">{icon}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-semibold mb-2 text-white/90">
                Description (optional)
              </label>
              <textarea
                value={newStreak.description}
                onChange={e => setNewStreak({...newStreak, description: e.target.value})}
                className="w-full p-4 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl text-white placeholder-white/50 font-body focus:border-white focus:outline-none transition-colors resize-none"
                placeholder="What are you committing to?"
                rows={3}
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPublic"
                checked={newStreak.isPublic}
                onChange={e => setNewStreak({...newStreak, isPublic: e.target.checked})}
                className="w-5 h-5 rounded border-2 border-white/30 bg-transparent checked:bg-white checked:border-white cursor-pointer"
              />
              <label htmlFor="isPublic" className="text-sm font-body text-white/80 cursor-pointer">
                Make public (friends can see and cheer)
              </label>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-white text-[var(--color-primary)] py-5 px-8 rounded-2xl font-heading font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Launch This Streak!
            </motion.button>
          </form>
        </motion.div>

        {/* Active Streaks */}
        <div>
          <h2 className="text-2xl font-heading font-bold mb-6 text-white flex items-center gap-2">
            <span className="flame-animate">🔥</span>
            Active Streaks
          </h2>
          
          {streaks.length === 0 ? (
            <motion.div
              className="text-center py-12 border-2 border-dashed border-white/20 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-5xl mb-4">🎯</div>
              <p className="text-lg text-white/80 font-body mb-2">No streaks yet</p>
              <p className="text-white/50 text-sm font-body">Create your first streak above!</p>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {streaks.map(streak => (
                <StreakCard key={streak.id} streak={streak} onCheck={handleCheck} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
