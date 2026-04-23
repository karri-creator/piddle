'use client';

import { useState, useEffect } from 'react';
import { getStreaks, saveStreaks } from './lib/storage';
import StreakCard from './components/StreakCard';
import { Streak } from './types/streak';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const categories = ['Fitness', 'Writing', 'Learning', 'Habit', 'Other'];
const icons = ['💪', '📚', '🎓', '🔄', '🎯', '🏃', '✍️', '🧠', '🌱', '⭐'];

export default function Home() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [newStreak, setNewStreak] = useState({
    name: '',
    description: '',
    isPublic: false,
    color: '#3b82f6',
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

        // Check for milestones
        const milestones = [7, 30, 100];
        if (milestones.includes(current) && current > s.currentStreak) {
          setMilestoneMessage(`🎉 Amazing! You've hit ${current} days on "${s.name}"!`);
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
    setNewStreak({ name: '', description: '', isPublic: false, color: '#3b82f6', category: 'Habit', icon: '🎯' });
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.h1
          className="text-5xl font-heading text-center mb-12 bg-[var(--color-surface)] text-[var(--color-secondary)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Stop Piddling Around!
        </motion.h1>
        {milestoneMessage && (
          <motion.div
            className="text-center mb-8 p-6 bg-gradient-to-r from-[var(--color-accent)] to-yellow-300 border-2 border-[var(--color-accent)] rounded-xl shadow-lg bounce-in max-w-md mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <p className="text-2xl font-bold text-[var(--color-neutral)]">{milestoneMessage}</p>
          </motion.div>
        )}
        <motion.div
          className="mb-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-[var(--color-neutral)]">Start Your Streak</h2>
          <form onSubmit={e => { e.preventDefault(); handleCreate(); }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-neutral)]">Streak Name</label>
              <input
                type="text"
                value={newStreak.name}
                onChange={e => setNewStreak({...newStreak, name: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[var(--color-hero)] focus:outline-none transition-colors"
                placeholder="e.g., Morning Meditation"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-neutral)]">Category</label>
              <select
                value={newStreak.category}
                onChange={e => setNewStreak({...newStreak, category: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[var(--color-hero)] focus:outline-none transition-colors"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-[var(--color-neutral)]">Description</label>
              <textarea
                value={newStreak.description}
                onChange={e => setNewStreak({...newStreak, description: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[var(--color-hero)] focus:outline-none transition-colors resize-none"
                placeholder="What are you committing to?"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-neutral)]">Icon</label>
              <select
                value={newStreak.icon}
                onChange={e => setNewStreak({...newStreak, icon: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[var(--color-hero)] focus:outline-none transition-colors text-3xl"
              >
                {icons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-neutral)]">Accent Color</label>
              <input
                type="color"
                value={newStreak.color}
                onChange={e => setNewStreak({...newStreak, color: e.target.value})}
                className="w-full h-16 border-2 border-gray-200 rounded-xl cursor-pointer"
              />
            </div>
            <div className="md:col-span-2 flex items-center space-x-3">
              <input
                type="checkbox"
                checked={newStreak.isPublic}
                onChange={e => setNewStreak({...newStreak, isPublic: e.target.checked})}
                className="w-5 h-5 text-[var(--color-hero)] focus:ring-[var(--color-hero)] border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-[var(--color-neutral)]">Make this streak public (friends can see it)</label>
            </div>
            <div className="md:col-span-2">
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--color-hero)] to-[var(--color-secondary)] text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🚀 Launch This Streak!
              </motion.button>
            </div>
          </form>
        </motion.div>
        <div>
          <h2 className="text-3xl font-bold mb-8 text-[var(--color-neutral)]">Your Active Streaks</h2>
          {streaks.length === 0 ? (
            <motion.div
              className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-xl text-gray-600 mb-4">Ready to build some habits?</p>
              <p className="text-gray-500">Create your first streak above and start your journey!</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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