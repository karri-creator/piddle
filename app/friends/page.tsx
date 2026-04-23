'use client';

import { useState, useEffect } from 'react';
import { getFriends, addFriend, Friend } from '../lib/friendsStorage';
import { motion } from 'framer-motion';
import StreakCard from '../components/StreakCard';
import BottomNav from '../components/BottomNav';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [newFriendName, setNewFriendName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setFriends(getFriends());
  }, []);

  const handleAddFriend = () => {
    if (!newFriendName.trim()) return;
    const newFriends = addFriend(newFriendName);
    setFriends(newFriends);
    setNewFriendName('');
    setShowAddForm(false);
  };

  const handleCheer = (friendName: string, streakName: string) => {
    alert(`You cheered ${friendName} on "${streakName}"! 🎉`);
  };

  return (
    <main className="min-h-screen bg-cream pb-24">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 -ml-2 rounded-xl hover:bg-charcoal/5 transition-colors">
              <ArrowLeft size={24} className="text-charcoal" />
            </Link>
            <h1 className="text-xl font-heading font-bold text-charcoal">Your Squad</h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-2 rounded-xl bg-blue text-white hover:bg-blue/90 transition-colors"
          >
            <UserPlus size={20} />
          </button>
        </div>

        {/* Add Friend Form */}
        {showAddForm && (
          <motion.div
            className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-charcoal/5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={e => { e.preventDefault(); handleAddFriend(); }} className="flex gap-3">
              <input
                type="text"
                value={newFriendName}
                onChange={e => setNewFriendName(e.target.value)}
                className="flex-1 p-3 bg-cream border border-charcoal/10 rounded-xl text-charcoal placeholder-charcoal/40 font-body focus:border-blue focus:outline-none transition-colors"
                placeholder="Enter friend's name"
                autoFocus
                required
              />
              <motion.button
                type="submit"
                className="bg-coral text-white px-5 py-3 rounded-xl font-body font-semibold hover:bg-coral/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Friends List */}
        {friends.length === 0 ? (
          <motion.div
            className="bg-white rounded-2xl p-8 text-center shadow-sm border border-charcoal/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-5xl mb-4">👥</div>
            <p className="text-lg font-heading font-semibold text-charcoal mb-2">No friends yet</p>
            <p className="text-charcoal/60 text-sm font-body mb-4">
              Add friends to cheer on their streaks!
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue text-white px-6 py-3 rounded-xl font-body font-semibold"
            >
              Add your first friend
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue text-white flex items-center justify-center font-heading font-bold">
                    {friend.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-charcoal">{friend.name}</h3>
                    <p className="text-xs text-charcoal/50 font-body">
                      {friend.streaks.length} public streak{friend.streaks.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                
                {friend.streaks.length === 0 ? (
                  <p className="text-charcoal/50 text-sm font-body p-4 bg-white rounded-xl border border-charcoal/5">
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

      <BottomNav />
    </main>
  );
}
