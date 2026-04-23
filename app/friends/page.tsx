'use client';

import { useState, useEffect } from 'react';
import { getFriends, addFriend, Friend } from '../lib/friendsStorage';
import { motion } from 'framer-motion';
import StreakCard from '../components/StreakCard';

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = useState('');

  useEffect(() => {
    setFriends(getFriends());
  }, []);

  const handleAddFriend = () => {
    if (!newFriendName.trim()) return;
    const newFriends = addFriend(newFriendName);
    setFriends(newFriends);
    setNewFriendName('');
  };

  const handleCheer = (friendName: string, streakName: string) => {
    alert(`You cheered ${friendName} on "${streakName}"! 🎉`);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 uppercase tracking-wide">
            Your Squad
          </h1>
          <p className="text-white/70 font-body">
            Cheer on your friends and keep each other accountable.
          </p>
        </motion.div>

        {/* Add Friend Form */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={e => { e.preventDefault(); handleAddFriend(); }} className="flex gap-3">
            <input
              type="text"
              value={newFriendName}
              onChange={e => setNewFriendName(e.target.value)}
              className="flex-1 p-4 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl text-white placeholder-white/50 font-body focus:border-white focus:outline-none transition-colors"
              placeholder="Enter friend&apos;s name"
              required
            />
            <motion.button
              type="submit"
              className="bg-white text-[var(--color-primary)] px-6 py-4 rounded-xl font-heading font-bold hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Friend
            </motion.button>
          </form>
        </motion.div>

        {/* Friends List */}
        <div>
          {friends.length === 0 ? (
            <motion.div
              className="text-center py-12 border-2 border-dashed border-white/20 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-5xl mb-4">👥</div>
              <p className="text-lg text-white/80 font-body mb-2">No friends yet</p>
              <p className="text-white/50 text-sm font-body">Add friends to cheer on their streaks!</p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {friends.map(friend => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white text-[var(--color-primary)] flex items-center justify-center font-heading font-bold">
                      {friend.name.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wide">{friend.name}</h3>
                  </div>
                  
                  {friend.streaks.length === 0 ? (
                    <p className="text-white/50 text-sm font-body p-4 border border-white/10 rounded-xl">
                      No public streaks yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {friend.streaks.map(streak => (
                        <StreakCard 
                          key={streak.id} 
                          streak={streak} 
                          onCheck={() => {}} 
                          showCheerButton
                          onCheer={() => handleCheer(friend.name, streak.name)}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
