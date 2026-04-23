'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStreaks, saveStreaks } from '../lib/storage';
import { Streak } from '../types/streak';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';

const categories = ['Fitness', 'Writing', 'Learning', 'Habit', 'Wellness', 'Creative'];
const icons = ['🎯', '💪', '📚', '🎓', '🧘', '🏃', '✍️', '🧠', '🌱', '⭐', '💧', '😴'];

export default function NewStreakPage() {
  const router = useRouter();
  const [newStreak, setNewStreak] = useState({
    name: '',
    description: '',
    isPublic: false,
    category: 'Habit',
    icon: '🎯'
  });

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
      color: '#2583FF',
      category: newStreak.category,
      icon: newStreak.icon,
    };
    
    const existingStreaks = getStreaks();
    const newStreaks = [...existingStreaks, streak];
    saveStreaks(newStreaks);
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 -ml-2 rounded-xl hover:bg-charcoal/5 transition-colors">
            <ArrowLeft size={24} className="text-charcoal" />
          </Link>
          <h1 className="text-xl font-heading font-bold text-charcoal">New Streak</h1>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={e => { e.preventDefault(); handleCreate(); }}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-body font-semibold mb-3 text-charcoal">
              Pick an icon
            </label>
            <div className="flex flex-wrap gap-2">
              {icons.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setNewStreak({...newStreak, icon})}
                  className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                    newStreak.icon === icon 
                      ? 'bg-blue text-white scale-110' 
                      : 'bg-white border border-charcoal/10 hover:border-blue'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-body font-semibold mb-2 text-charcoal">
              What are you tracking?
            </label>
            <input
              type="text"
              value={newStreak.name}
              onChange={e => setNewStreak({...newStreak, name: e.target.value})}
              className="w-full p-4 bg-white border border-charcoal/10 rounded-xl text-charcoal placeholder-charcoal/40 font-body focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20 transition-all"
              placeholder="e.g., Morning meditation"
              required
            />
          </div>
          
          {/* Category */}
          <div>
            <label className="block text-sm font-body font-semibold mb-3 text-charcoal">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setNewStreak({...newStreak, category: cat})}
                  className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                    newStreak.category === cat 
                      ? 'bg-blue text-white' 
                      : 'bg-white border border-charcoal/10 text-charcoal hover:border-blue'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-body font-semibold mb-2 text-charcoal">
              Notes (optional)
            </label>
            <textarea
              value={newStreak.description}
              onChange={e => setNewStreak({...newStreak, description: e.target.value})}
              className="w-full p-4 bg-white border border-charcoal/10 rounded-xl text-charcoal placeholder-charcoal/40 font-body focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20 transition-all resize-none"
              placeholder="Why is this important to you?"
              rows={3}
            />
          </div>

          {/* Public Toggle */}
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-charcoal/10">
            <div>
              <p className="font-body font-semibold text-charcoal">Make public</p>
              <p className="text-sm text-charcoal/60 font-body">Friends can see and cheer</p>
            </div>
            <button
              type="button"
              onClick={() => setNewStreak({...newStreak, isPublic: !newStreak.isPublic})}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                newStreak.isPublic ? 'bg-blue' : 'bg-charcoal/20'
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                newStreak.isPublic ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-coral text-white py-4 px-8 rounded-2xl font-heading font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap size={20} />
            Start This Streak
          </motion.button>
        </motion.form>
      </div>
    </main>
  );
}
