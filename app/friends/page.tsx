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

  const handleCheer = (friendId: string, streakId: string) => {
    // In a real app, this would send to backend
    alert(`You cheered ${friends.find(f => f.id === friendId)?.name} on their streak! 🎉`);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.h1
          className="text-5xl font-heading text-center mb-12 bg-gradient-to-r from-[var(--color-hero)] to-[var(--color-secondary)] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Squad 🤝
        </motion.h1>

        <motion.div
          className="mb-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-[var(--color-neutral)]">Add a Friend</h2>
          <form onSubmit={e => { e.preventDefault(); handleAddFriend(); }} className="flex gap-4">
            <input
              type="text"
              value={newFriendName}
              onChange={e => setNewFriendName(e.target.value)}
              className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-[var(--color-hero)] focus:outline-none transition-colors"
              placeholder="Enter friend's name"
              required
            />
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-hero)] text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Friend 👥
            </motion.button>
          </form>
        </motion.div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-[var(--color-neutral)]">Friends&apos; Streaks</h2>
          {friends.length === 0 ? (
            <motion.div
              className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-6xl mb-4">👥</div>
              <p className="text-xl text-gray-600 mb-4">No friends yet?</p>
              <p className="text-gray-500">Add some friends to cheer on their streaks!</p>
            </motion.div>
          ) : (
            friends.map(friend => (
              <motion.div
                key={friend.id}
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-[var(--color-neutral)]">{friend.name}&apos;s Streaks</h3>
                {friend.streaks.length === 0 ? (
                  <p className="text-gray-500 bg-white p-6 rounded-xl shadow">No public streaks yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
                    {friend.streaks.map(streak => (
                      <div key={streak.id} className="relative">
                        <StreakCard streak={streak} onCheck={() => {}} />
                        <motion.button
                          onClick={() => handleCheer(friend.id, streak.id)}
                          className="absolute top-4 right-4 bg-[var(--color-accent)] text-[var(--color-neutral)] p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          🙌
                        </motion.button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}