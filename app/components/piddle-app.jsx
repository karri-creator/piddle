'use client';
import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';

// ── HAMBURGER MENU ───────────────────────────────────────────────
function HamburgerMenu({ onNav, currentScreen, username }) {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "dashboard", icon: "🏠", label: "Home" },
    { id: "friends", icon: "👥", label: "Friends" },
    { id: "stats", icon: "📊", label: "Stats" },
    { id: "account", icon: "⚙️", label: "Account" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <>
      <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: 22, padding: "4px 8px", lineHeight: 1 }}>
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 260, background: "linear-gradient(135deg, #1a1a6e 0%, #2563eb 100%)", zIndex: 50, padding: "48px 24px 24px", display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontWeight: 800, fontSize: 18, fontStyle: "italic" }}>piddle</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{username || "@you"}</div>
            </div>
            {items.map(item => (
              <button key={item.id} onClick={() => { onNav(item.id); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 14, background: currentScreen === item.id ? "rgba(255,255,255,0.15)" : "none", border: "none", color: "white", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: currentScreen === item.id ? 700 : 400, padding: "14px 16px", borderRadius: 12, marginBottom: 4, textAlign: "left", transition: "background 0.2s" }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button onClick={() => { onNav("login"); setOpen(false); }} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: 12, padding: "12px 16px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 700 }}>
              ↩ Log out
            </button>
          </div>
        </>
      )}
    </>
  );
}

// ── TOP BAR ──────────────────────────────────────────────────────
function TopBar({ title, onBack, onNav, currentScreen, username, showBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {showBack && <button onClick={onBack} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: 20, padding: 0 }}>←</button>}
        <div style={{ fontWeight: 800, fontSize: 18, fontStyle: "italic" }}>{title || "piddle"}</div>
      </div>
      <HamburgerMenu onNav={onNav} currentScreen={currentScreen} username={username} />
    </div>
  );
}

// ── LOGIN ────────────────────────────────────────────────────────
function LoginScreen({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else onLogin();
  };

  return (
    <div className="screen" style={{ justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🌱</div>
        <div style={{ fontWeight: 800, fontSize: 32, fontStyle: "italic", marginBottom: 4 }}>piddle</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>Welcome back! Keep the streak alive.</div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Email</div>
        <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Password</div>
        <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {error && <div style={{ fontSize: 13, color: "rgba(255,150,150,0.9)", marginBottom: 16, textAlign: "center" }}>{error}</div>}
      <button className="btn btn-primary" style={{ width: "100%", padding: 16, fontSize: 15, marginBottom: 16, opacity: loading ? 0.7 : 1 }} onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Log In 🔐"}
      </button>
      <div style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
        <span style={{ cursor: "pointer", textDecoration: "underline" }}>Forgot password?</span>
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
        Don't have an account?{" "}
        <span style={{ color: "white", fontWeight: 700, cursor: "pointer" }} onClick={onSwitch}>Sign up</span>
      </div>
    </div>
  );
}

// ── SIGN UP ──────────────────────────────────────────────────────
function SignUpScreen({ onSignUp, onSwitch }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsername = (val) => {
    const cleaned = val.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
    setUsername(cleaned);
    setUsernameError(cleaned.length > 0 && cleaned.length < 3 ? "Username must be at least 3 characters" : "");
  };

  const handleSignUp = async () => {
    setError("");
    if (!name || !username || !email || !password) { setError("Please fill in all fields."); return; }
    if (username.length < 3) { setError("Username must be at least 3 characters."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) { setError(signUpError.message); setLoading(false); return; }
    const { error: profileError } = await supabase.from('users').insert({
      id: data.user.id,
      username,
      display_name: name,
    });
    setLoading(false);
    if (profileError) setError(profileError.message);
    else onSignUp(`@${username}`);
  };

  return (
    <div className="screen" style={{ justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🌱</div>
        <div style={{ fontWeight: 800, fontSize: 32, fontStyle: "italic", marginBottom: 4 }}>piddle</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>Everyone deserves applause. Start today.</div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Your name</div>
        <input className="input" placeholder="e.g., Alex" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Username</div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.5)", fontSize: 15 }}>@</div>
          <input className="input" placeholder="yourname" value={username} onChange={e => handleUsername(e.target.value)} style={{ paddingLeft: 28 }} />
        </div>
        {usernameError && <div style={{ fontSize: 12, color: "rgba(255,150,150,0.9)", marginTop: 4 }}>{usernameError}</div>}
        {username.length >= 3 && !usernameError && <div style={{ fontSize: 12, color: "rgba(100,255,150,0.9)", marginTop: 4 }}>@{username} looks good!</div>}
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Email</div>
        <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Password</div>
        <input className="input" type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {error && <div style={{ fontSize: 13, color: "rgba(255,150,150,0.9)", marginBottom: 16, textAlign: "center" }}>{error}</div>}
      <button className="btn btn-primary" style={{ width: "100%", padding: 16, fontSize: 15, marginBottom: 16, opacity: loading ? 0.7 : 1 }} onClick={handleSignUp} disabled={loading}>
        {loading ? "Creating account..." : "Create Account 🚀"}
      </button>
      <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
        By signing up you agree to our Terms & Privacy Policy
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
        Already have an account?{" "}
        <span style={{ color: "white", fontWeight: 700, cursor: "pointer" }} onClick={onSwitch}>Log in</span>
      </div>
    </div>
  );
}

// ── ONBOARDING ───────────────────────────────────────────────────
function OnboardingScreen({ onNext }) {
  return (
    <div className="screen" style={{ justifyContent: "center", alignItems: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🌱</div>
      <div style={{ fontSize: 36, fontWeight: 800, fontStyle: "italic", marginBottom: 8 }}>piddle</div>
      <div style={{ color: "rgba(255,255,255,0.8)", marginBottom: 48, fontSize: 16 }}>Everyone deserves applause!</div>
      <div style={{ width: "100%", maxWidth: 320, marginBottom: 48 }}>
        {[
          { icon: "💧", title: "Track Your Streaks", sub: "Build momentum day by day" },
          { icon: "👏", title: "Get Applause", sub: "Friends cheer you on" },
          { icon: "📈", title: "Share Success", sub: "Celebrate on social media" },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, textAlign: "left" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{f.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{f.title}</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{f.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" style={{ width: "100%", maxWidth: 320, padding: "16px", fontSize: 16 }} onClick={onNext}>Get Started 🚀</button>
    </div>
  );
}

// ── CREATE STREAK ────────────────────────────────────────────────
function CreateStreakScreen({ onNext, onNav, username, userId }) {
  const [value, setValue] = useState("");
  const [motto, setMotto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = [
    { emoji: "🛁", label: "Bathe (yes, really)" },
    { emoji: "📺", label: "Only one ep of Scandal per day" },
    { emoji: "📵", label: "Don't stalk their Instagram" },
    { emoji: "🚶", label: "Touch grass once a day" },
    { emoji: "💧", label: "Drink water before coffee" },
    { emoji: "🛏️", label: "Make the bed (it takes 2 min)" },
    { emoji: "🍕", label: "No pizza before noon" },
    { emoji: "📱", label: "No phone for the first 10 min" },
    { emoji: "😴", label: "In bed by midnight" },
    { emoji: "💌", label: "Don't text them back immediately" },
  ];

  const handleCreate = async () => {
    if (!value.trim()) { setError("Give your streak a name!"); return; }
    setLoading(true);
    setError("");
    const { error } = await supabase.from('streaks').insert({
      user_id: userId,
      name: value.trim(),
      motto: motto.trim() || null,
      is_public: true,
      category: "General",
    });
    setLoading(false);
    if (error) setError(error.message);
    else onNext();
  };

  return (
    <div className="screen">
      <TopBar title="create streak" onNav={onNav} currentScreen="create" username={username} />
      <div className="scroll-area">
        <div style={{ textAlign: "center", padding: "24px 0 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
          <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Start a New Streak</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>Pick a habit you want to build. Check in every day!</div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>What do you want to commit to?</div>
          <input className="input" placeholder="e.g., Only one ep of Scandal per day" value={value} onChange={e => setValue(e.target.value)} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Your streak motto</div>
            <div style={{ fontSize: 12, color: motto.length > 90 ? "rgba(255,150,100,0.9)" : "rgba(255,255,255,0.45)" }}>{motto.length}/100</div>
          </div>
          <textarea className="input" placeholder="e.g., I contain multitudes but also I need sleep 🌙" value={motto} onChange={e => { if (e.target.value.length <= 100) setMotto(e.target.value); }} style={{ resize: "none", height: 80 }} />
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>Visible to friends on your public dashboard</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "rgba(255,255,255,0.75)" }}>Need inspiration? 👇</div>
        <div className="suggestion-grid" style={{ marginBottom: 20 }}>
          {suggestions.map((s, i) => (
            <button key={i} className="suggestion-btn" onClick={() => setValue(s.label)}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.emoji}</div>
              <div>{s.label}</div>
            </button>
          ))}
        </div>
        {error && <div style={{ fontSize: 13, color: "rgba(255,150,150,0.9)", marginBottom: 12, textAlign: "center" }}>{error}</div>}
        <button className="btn btn-primary" style={{ width: "100%", padding: 16, fontSize: 15, opacity: loading ? 0.7 : 1 }} onClick={handleCreate} disabled={loading}>
          {loading ? "Creating..." : "Start This Streak 🔥"}
        </button>
      </div>
    </div>
  );
}

// ── CHECK-IN SUCCESS ─────────────────────────────────────────────
function CheckInSuccessScreen({ streakName = "Your streak", days = 1, onContinue }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i, x: Math.random() * 100, delay: Math.random() * 1.5,
      duration: 1.5 + Math.random() * 1.5,
      emoji: ["🎉", "⭐", "✨", "🔥", "👏"][Math.floor(Math.random() * 5)],
      size: 16 + Math.random() * 16,
    }));
    setParticles(p);
  }, []);
  const milestones = [7, 30, 100];
  const nextMilestone = milestones.find(m => m > days) || 100;
  const progress = Math.min((days / nextMilestone) * 100, 100);
  return (
    <div className="screen" style={{ justifyContent: "center", alignItems: "center", padding: "40px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes float-up { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-300px) scale(0.5); opacity: 0; } }
        @keyframes pop-in { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
        .checkin-flame { animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .pulse-ring { animation: pulse-ring 1.5s ease-out infinite; }
      `}</style>
      {particles.map(p => (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, bottom: 0, fontSize: p.size, animation: `float-up ${p.duration}s ease-out ${p.delay}s both`, pointerEvents: "none" }}>{p.emoji}</div>
      ))}
      <div style={{ position: "relative", marginBottom: 32 }}>
        <div className="pulse-ring" style={{ position: "absolute", inset: -20, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)" }} />
        <div className="pulse-ring" style={{ position: "absolute", inset: -10, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", animationDelay: "0.3s" }} />
        <div className="checkin-flame" style={{ fontSize: 80 }}>🔥</div>
      </div>
      <div style={{ fontWeight: 800, fontSize: 28, marginBottom: 8 }}>You did it!</div>
      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, marginBottom: 6 }}>{streakName}</div>
      <div style={{ fontWeight: 800, fontSize: 56, marginBottom: 4, lineHeight: 1 }}>{days}</div>
      <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginBottom: 32 }}>day streak 🏆</div>
      <div className="card" style={{ width: "100%", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>Next milestone</span>
          <span style={{ fontWeight: 700 }}>{nextMilestone} days</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, height: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "white", borderRadius: 20, transition: "width 1s ease" }} />
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>{nextMilestone - days} days to go!</div>
      </div>
      <button className="btn btn-primary" style={{ width: "100%", padding: 14, marginBottom: 12 }}>👏 Share with friends</button>
      <button onClick={onContinue} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>Back to dashboard →</button>
    </div>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────────
function DashboardScreen({ onStreakDetail, onCheckin, onNav, username, userId }) {
  const [streaks, setStreaks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStreaks = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('streaks')
      .select(`*, checkins(checkin_date)`)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (!error && data) {
      const today = new Date().toISOString().split('T')[0];
      const enriched = data.map(st => {
        const dates = (st.checkins || []).map(c => c.checkin_date).sort();
        const checkedToday = dates.includes(today);
        let current = 0;
        let d = new Date();
        if (checkedToday) {
          while (true) {
            const ds = d.toISOString().split('T')[0];
            if (dates.includes(ds)) { current++; d.setDate(d.getDate() - 1); }
            else break;
          }
        }
        return { ...st, current, checkedToday, totalCheckins: dates.length };
      });
      setStreaks(enriched);
    }
    setLoading(false);
  };

  useEffect(() => { loadStreaks(); }, [userId]);

  const handleCheck = async (streak, e) => {
    e.stopPropagation();
    if (streak.checkedToday) return;
    const { error } = await supabase.from('checkins').insert({
      streak_id: streak.id,
      user_id: userId,
      checkin_date: new Date().toISOString().split('T')[0],
    });
    if (!error) {
      await loadStreaks();
      onCheckin && onCheckin({ ...streak, current: streak.current + 1 });
    }
  };

  return (
    <div className="screen">
      <TopBar title="piddle" onNav={onNav} currentScreen="dashboard" username={username} />
      <div className="scroll-area">
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>Stop piddling around! 🔥 {username && <span style={{ color: "rgba(255,255,255,0.4)" }}>· {username}</span>}</div>
        </div>
        <div className="stat-grid" style={{ marginBottom: 20 }}>
          {[
            { icon: "🏆", label: "Streaks", val: streaks.length },
            { icon: "📈", label: "Active", val: streaks.filter(s => s.current > 0).length },
          ].map((s, i) => (
            <div key={i} className="stat-box">
              <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontWeight: 800, fontSize: 22 }}>{s.val}</div>
            </div>
          ))}
        </div>
        {loading && <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", padding: 40 }}>Loading streaks...</div>}
        {!loading && streaks.length === 0 && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", padding: 40 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🌱</div>
            <div>No streaks yet! Create your first one.</div>
          </div>
        )}
        {streaks.map(st => (
          <div key={st.id} className="streak-card" style={{ cursor: "pointer" }} onClick={() => onStreakDetail && onStreakDetail(st)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{st.icon || "🔥"} {st.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{st.totalCheckins} total check-ins</div>
              </div>
            </div>
            {st.motto && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontStyle: "italic", marginBottom: 10, padding: "6px 10px", background: "rgba(255,255,255,0.06)", borderRadius: 8 }}>"{st.motto}"</div>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div className="stat-box" style={{ padding: 12 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>Current streak</div>
                <div style={{ fontWeight: 800, fontSize: 20 }}>{st.current}d 🔥</div>
              </div>
              <div className="stat-box" style={{ padding: 12 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>Total days</div>
                <div style={{ fontWeight: 800, fontSize: 20 }}>{st.totalCheckins}d</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }} onClick={e => e.stopPropagation()}>
              <button className="check-btn" style={{ opacity: st.checkedToday ? 0.5 : 1, background: st.checkedToday ? "rgba(52,211,153,0.3)" : undefined }} onClick={(e) => handleCheck(st, e)} disabled={st.checkedToday}>
                {st.checkedToday ? "✅ Done today!" : "CHECK IN"}
              </button>
              <button className="icon-btn">↗</button>
            </div>
          </div>
        ))}
        <button className="btn btn-primary" style={{ width: "100%", padding: 14, marginTop: 8 }} onClick={() => onNav("create")}>+ New Streak</button>
      </div>
    </div>
  );
}

// ── STREAK DETAIL ────────────────────────────────────────────────
function StreakDetailScreen({ streak, onBack, onNav, username, userId }) {
  const [checkedToday, setCheckedToday] = useState(streak.checkedToday || false);
  const [current, setCurrent] = useState(streak.current || 0);

  const handleCheckin = async () => {
    if (checkedToday) return;
    const { error } = await supabase.from('checkins').insert({
      streak_id: streak.id,
      user_id: userId,
      checkin_date: new Date().toISOString().split('T')[0],
    });
    if (!error) { setCheckedToday(true); setCurrent(c => c + 1); }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this streak? This can't be undone.")) return;
    await supabase.from('streaks').delete().eq('id', streak.id);
    onBack();
  };

  return (
    <div className="screen">
      <TopBar title={streak.name} onBack={onBack} showBack onNav={onNav} currentScreen="detail" username={username} />
      <div className="scroll-area">
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>{streak.category} · Started {streak.created_at?.split('T')[0]}</div>
        {streak.motto && (
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontStyle: "italic", marginBottom: 16, padding: "12px 14px", background: "rgba(255,255,255,0.08)", borderRadius: 12, borderLeft: "3px solid rgba(255,255,255,0.3)" }}>
            "{streak.motto}"
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div className="card" style={{ textAlign: "center", padding: "20px 16px" }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 4 }}>Current streak</div>
            <div style={{ fontWeight: 800, fontSize: 40, lineHeight: 1 }}>{current}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>days 🔥</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "20px 16px" }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 4 }}>Total check-ins</div>
            <div style={{ fontWeight: 800, fontSize: 40, lineHeight: 1 }}>{streak.totalCheckins || 0}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>days 🏆</div>
          </div>
        </div>
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Streak settings</div>
          {[
            { icon: "👁", label: "Visibility", val: streak.is_public ? "Public" : "Private" },
            { icon: "🎨", label: "Category", val: streak.category || "General" },
          ].map((s, i) => (
            <div key={i} className="menu-row">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span>{s.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{s.val}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
              </div>
            </div>
          ))}
        </div>
        <button className="check-btn" style={{ width: "100%", padding: 16, fontSize: 16, background: checkedToday ? "rgba(52,211,153,0.3)" : undefined, marginBottom: 12 }} onClick={handleCheckin} disabled={checkedToday}>
          {checkedToday ? "✅ Checked in today!" : "CHECK IN TODAY 🔥"}
        </button>
        <button style={{ width: "100%", background: "rgba(255,50,50,0.15)", border: "1px solid rgba(255,50,50,0.3)", color: "rgba(255,150,150,0.9)", borderRadius: 8, padding: 12, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }} onClick={handleDelete}>
          🗑 Delete this streak
        </button>
      </div>
    </div>
  );
}

// ── FRIEND PUBLIC DASHBOARD ──────────────────────────────────────
function FriendDashboardScreen({ friend, onBack, onNav, username, userId }) {
  const [streaks, setStreaks] = useState([]);
  const [applaudedIds, setApplaudedIds] = useState(new Set());

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('streaks')
        .select(`*, checkins(checkin_date)`)
        .eq('user_id', friend.id)
        .eq('is_public', true);
      if (data) {
        const today = new Date().toISOString().split('T')[0];
        setStreaks(data.map(st => {
          const dates = (st.checkins || []).map(c => c.checkin_date).sort();
          let current = 0;
          let d = new Date();
          if (dates.includes(today)) {
            while (true) {
              const ds = d.toISOString().split('T')[0];
              if (dates.includes(ds)) { current++; d.setDate(d.getDate() - 1); }
              else break;
            }
          }
          return { ...st, current, totalCheckins: dates.length };
        }));
      }
    };
    load();
  }, [friend.id]);

  const handleApplaud = async (streakId) => {
    if (applaudedIds.has(streakId)) return;
    await supabase.from('applause').insert({
      from_user_id: userId,
      streak_id: streakId,
      applause_date: new Date().toISOString().split('T')[0],
    });
    setApplaudedIds(prev => new Set([...prev, streakId]));
  };

  return (
    <div className="screen">
      <TopBar title={friend.display_name} onBack={onBack} showBack onNav={onNav} currentScreen="friends" username={username} />
      <div className="scroll-area">
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div className="avatar" style={{ width: 56, height: 56, fontSize: 28 }}>👤</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20 }}>{friend.display_name}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>@{friend.username}</div>
          </div>
        </div>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Public Streaks</div>
        {streaks.length === 0 && <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14, padding: 24 }}>No public streaks yet</div>}
        {streaks.map((st, i) => (
          <div key={i} className="streak-card">
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{st.icon || "🔥"} {st.name}</div>
            {st.motto && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontStyle: "italic", marginBottom: 10, padding: "6px 10px", background: "rgba(255,255,255,0.06)", borderRadius: 8 }}>"{st.motto}"</div>}
            <div className="stat-box" style={{ padding: 12, textAlign: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>Current streak</div>
              <div style={{ fontWeight: 800, fontSize: 20 }}>{st.current}d 🔥</div>
            </div>
            <button className="btn btn-applaud" style={{ width: "100%", opacity: applaudedIds.has(st.id) ? 0.6 : 1 }} onClick={() => handleApplaud(st.id)} disabled={applaudedIds.has(st.id)}>
              {applaudedIds.has(st.id) ? "👏 Applauded!" : "👏 Applaud this streak"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FRIENDS ──────────────────────────────────────────────────────
function FriendsScreen({ onInvite, onFindFriend, onViewFriend, onNav, username, userId }) {
  const [friends, setFriends] = useState([]);
  const [activity, setActivity] = useState([]);
  const [applaudedIds, setApplaudedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!userId) return;

      // Load accepted friendships
      const { data: friendships } = await supabase
        .from('friendships')
        .select('requester_id, addressee_id')
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
        .eq('status', 'accepted');

      if (!friendships || friendships.length === 0) {
        setLoading(false);
        return;
      }

      const friendIds = friendships.map(f => f.requester_id === userId ? f.addressee_id : f.requester_id);

      // Load friend profiles
      const { data: profiles } = await supabase
        .from('users')
        .select('id, username, display_name')
        .in('id', friendIds);
      setFriends(profiles || []);

      // Load this week's check-ins from friends
      const monday = new Date();
      monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
      monday.setHours(0, 0, 0, 0);
      const mondayStr = monday.toISOString().split('T')[0];

      const { data: checkins } = await supabase
        .from('checkins')
        .select('checkin_date, user_id, streak_id, streaks(name)')
        .in('user_id', friendIds)
        .gte('checkin_date', mondayStr)
        .order('checkin_date', { ascending: false });

      if (checkins && profiles) {
        const profileMap = Object.fromEntries((profiles || []).map(p => [p.id, p]));
        const enriched = checkins.map(c => ({
          ...c,
          user: profileMap[c.user_id],
          streakName: c.streaks?.name,
        }));
        setActivity(enriched);
      }

      setLoading(false);
    };
    load();
  }, [userId]);

  const handleApplaud = async (checkin) => {
    const key = `${checkin.user_id}-${checkin.streak_id}`;
    if (applaudedIds.has(key)) return;
    await supabase.from('applause').insert({
      from_user_id: userId,
      streak_id: checkin.streak_id,
      applause_date: new Date().toISOString().split('T')[0],
    });
    setApplaudedIds(prev => new Set([...prev, key]));
  };

  return (
    <div className="screen">
      <TopBar title="friends" onNav={onNav} currentScreen="friends" username={username} />
      <div className="scroll-area">
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 16 }}>Your crew 🎉</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          <button className="btn btn-primary" style={{ padding: 14, fontSize: 13 }} onClick={onInvite}>🔗 Invite a friend</button>
          <button className="btn btn-primary" style={{ padding: 14, fontSize: 13 }} onClick={onFindFriend}>🔍 Find a friend</button>
        </div>

        {/* This week's activity */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: 700 }}>This week's check-ins 🗓</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>resets Monday</div>
        </div>
        {loading && <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13, padding: 20 }}>Loading...</div>}
        {!loading && activity.length === 0 && friends.length > 0 && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13, padding: 20 }}>No check-ins from friends this week yet!</div>
        )}
        {!loading && friends.length === 0 && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13, padding: 20 }}>Add some friends to see their activity here!</div>
        )}
        {activity.map((a, i) => {
          const key = `${a.user_id}-${a.streak_id}`;
          const applauded = applaudedIds.has(key);
          return (
            <div key={i} className="activity-row" style={{ cursor: "pointer" }} onClick={() => handleApplaud(a)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13 }}>
                  <strong>@{a.user?.username}</strong> checked in on <em>{a.streakName}</em> · {a.checkin_date}
                </div>
                <button className="btn btn-applaud" style={{ marginLeft: 10, opacity: applauded ? 0.6 : 1, flexShrink: 0 }} onClick={e => { e.stopPropagation(); handleApplaud(a); }} disabled={applauded}>
                  {applauded ? "👏" : "👏 Applaud"}
                </button>
              </div>
            </div>
          );
        })}

        {/* Friend list */}
        <div style={{ fontWeight: 700, marginBottom: 12, marginTop: 20 }}>Your Friends ({friends.length})</div>
        {friends.map((f, i) => (
          <div key={i} className="friend-row" style={{ cursor: "pointer" }} onClick={() => onViewFriend && onViewFriend(f)}>
            <div className="avatar">👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{f.display_name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>@{f.username}</div>
            </div>
            <button className="icon-btn" style={{ fontSize: 16 }}>👁</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FIND FRIEND ──────────────────────────────────────────────────
function FindFriendScreen({ onBack, onNav, username, userId }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [addedIds, setAddedIds] = useState(new Set());

  const handleSearch = async (val) => {
    setQuery(val);
    if (val.length < 2) { setResults([]); return; }
    setSearching(true);
    const { data } = await supabase
      .from('users')
      .select('id, username, display_name')
      .ilike('username', `%${val}%`)
      .neq('id', userId)
      .limit(10);
    setResults(data || []);
    setSearching(false);
  };

  const handleAdd = async (user) => {
    if (addedIds.has(user.id)) return;
    await supabase.from('friendships').insert({
      requester_id: userId,
      addressee_id: user.id,
      status: 'accepted',
    });
    setAddedIds(prev => new Set([...prev, user.id]));
  };

  return (
    <div className="screen">
      <TopBar title="find a friend" onBack={onBack} showBack onNav={onNav} currentScreen="friends" username={username} />
      <div className="scroll-area">
        <div style={{ marginBottom: 16 }}>
          <input className="input" placeholder="Search by @username" value={query} onChange={e => handleSearch(e.target.value)} />
        </div>
        {results.map((u, i) => (
          <div key={i} className="friend-row">
            <div className="avatar">👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{u.display_name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>@{u.username}</div>
            </div>
            <button className="btn btn-applaud" style={{ opacity: addedIds.has(u.id) ? 0.6 : 1 }} onClick={() => handleAdd(u)} disabled={addedIds.has(u.id)}>
              {addedIds.has(u.id) ? "✅ Added" : "+ Add"}
            </button>
          </div>
        ))}
        {query.length > 1 && !searching && results.length === 0 && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14, padding: 24 }}>No users found for "{query}"</div>
        )}
        {query.length === 0 && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14, padding: 24 }}>Type a @username to search</div>
        )}
      </div>
    </div>
  );
}

// ── FRIEND INVITE ────────────────────────────────────────────────
function FriendInviteScreen({ onBack, onNav, username }) {
  const [copied, setCopied] = useState(false);
  const inviteLink = "https://piddle.app/invite/abc123";
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="screen">
      <TopBar title="invite a friend" onBack={onBack} showBack onNav={onNav} currentScreen="friends" username={username} />
      <div className="scroll-area">
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 20 }}>Invite your friends to join!</div>
        <div className="card" style={{ marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>👥</div>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Your private group</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>Only close friends. Only real support.</div>
        </div>
        <div className="streak-card">
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>🔗 Your invite link</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: 12, wordBreak: "break-all" }}>{inviteLink}</div>
          <button className="btn btn-primary" style={{ width: "100%", padding: 14, fontSize: 15 }} onClick={handleCopy}>
            {copied ? "✅ Copied!" : "Copy invite link"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── STATS ────────────────────────────────────────────────────────
function StatsScreen({ onNav, username, userId }) {
  const [stats, setStats] = useState({ total: 0, active: 0, totalDays: 0, longestStreak: 0 });
  const [topStreaks, setTopStreaks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      const { data: streaks } = await supabase
        .from('streaks')
        .select(`*, checkins(checkin_date)`)
        .eq('user_id', userId);

      if (streaks) {
        const today = new Date().toISOString().split('T')[0];
        let totalDays = 0, longestStreak = 0;
        const enriched = streaks.map(st => {
          const dates = (st.checkins || []).map(c => c.checkin_date).sort();
          totalDays += dates.length;
          let current = 0;
          let d = new Date();
          if (dates.includes(today)) {
            while (true) {
              const ds = d.toISOString().split('T')[0];
              if (dates.includes(ds)) { current++; d.setDate(d.getDate() - 1); }
              else break;
            }
          }
          if (current > longestStreak) longestStreak = current;
          return { ...st, current, totalCheckins: dates.length };
        });
        setStats({ total: streaks.length, active: enriched.filter(s => s.current > 0).length, totalDays, longestStreak });
        setTopStreaks(enriched.sort((a, b) => b.totalCheckins - a.totalCheckins).slice(0, 3));
      }
      setLoading(false);
    };
    load();
  }, [userId]);

  return (
    <div className="screen">
      <TopBar title="stats" onNav={onNav} currentScreen="stats" username={username} />
      <div className="scroll-area">
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 20 }}>Track your progress 📊</div>
        {loading ? <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", padding: 40 }}>Loading...</div> : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              {[
                { icon: "🏆", label: "Total Streaks", val: stats.total },
                { icon: "🎯", label: "Active", val: stats.active },
                { icon: "🔄", label: "Total Days", val: stats.totalDays },
                { icon: "🔥", label: "Longest Streak", val: `${stats.longestStreak}d` },
              ].map((s, i) => (
                <div key={i} className="card" style={{ padding: "20px 16px" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontWeight: 800, fontSize: 28 }}>{s.val}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Top Streaks 🏆</div>
              {topStreaks.length === 0 && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No streaks yet!</div>}
              {topStreaks.map((s, i) => (
                <div key={i} className="top-streak-row">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontWeight: 800, color: "#60a5fa" }}>#{i + 1}</div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 10px", fontSize: 13 }}>🔥 {s.totalCheckins}d</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── ACCOUNT ──────────────────────────────────────────────────────
function AccountScreen({ onNav, username, onLogout }) {
  const [notifications, setNotifications] = useState(true);
  const [streakRisk, setStreakRisk] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 12, background: value ? "#60a5fa" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 3, left: value ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "white", transition: "left 0.2s", display: "block" }} />
    </button>
  );
  return (
    <div className="screen">
      <TopBar title="account" onNav={onNav} currentScreen="account" username={username} />
      <div className="scroll-area">
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 20 }}>Manage your settings</div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Profile</div>
          <div className="menu-row">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 16 }}>🔑</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Username</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{username || "@you"}</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            </div>
          </div>
        </div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Notifications</div>
          {[
            { label: "Daily Reminder", sub: "Get notified at 9:00 AM", value: notifications, onChange: setNotifications },
            { label: "Streak at Risk", sub: "Alert before midnight", value: streakRisk, onChange: setStreakRisk },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i === 0 ? 14 : 0 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{r.sub}</div>
              </div>
              <Toggle value={r.value} onChange={r.onChange} />
            </div>
          ))}
        </div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Privacy</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Public Profile</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Friends can see your streaks</div>
            </div>
            <Toggle value={publicProfile} onChange={setPublicProfile} />
          </div>
        </div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>More</div>
          {[{ icon: "↗", label: "Share App" }, { icon: "❓", label: "Help & Support" }, { icon: "📋", label: "Terms & Privacy" }].map((m, i) => (
            <div key={i} className="menu-row">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>{m.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{m.label}</span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" style={{ width: "100%", padding: 14, marginBottom: 16, background: "rgba(255,255,255,0.1)" }} onClick={onLogout}>↩ LOG OUT</button>
        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>piddle v1.0.0 · Made with ❤️ for habit builders</div>
      </div>
    </div>
  );
}

// ── PROFILE ──────────────────────────────────────────────────────
function ProfileScreen({ onNav, username, userId }) {
  const [profile, setProfile] = useState(null);
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      const { data: p } = await supabase.from('users').select('*').eq('id', userId).single();
      setProfile(p);
      const { data: s } = await supabase
        .from('streaks')
        .select(`*, checkins(checkin_date)`)
        .eq('user_id', userId)
        .eq('is_public', true);
      if (s) setStreaks(s.map(st => ({ ...st, totalCheckins: (st.checkins || []).length })));
    };
    load();
  }, [userId]);

  return (
    <div className="screen">
      <TopBar title="profile" onNav={onNav} currentScreen="profile" username={username} />
      <div className="scroll-area">
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 20 }}>Your public profile</div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div className="avatar" style={{ width: 52, height: 52, fontSize: 26 }}>👑</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{profile?.display_name || "..."}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{username}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div className="stat-box"><div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 2 }}>Public Streaks</div><div style={{ fontWeight: 800, fontSize: 22 }}>{streaks.length}</div></div>
            <div className="stat-box"><div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 2 }}>Total Days</div><div style={{ fontWeight: 800, fontSize: 22 }}>{streaks.reduce((a, s) => a + s.totalCheckins, 0)}</div></div>
          </div>
        </div>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Your Public Streaks</div>
        {streaks.length === 0 && <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14, padding: 24 }}>No public streaks yet</div>}
        {streaks.map((st, i) => (
          <div key={i} className="streak-card">
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{st.icon || "🔥"} {st.name}</div>
            {st.motto && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontStyle: "italic", marginBottom: 8 }}>"{st.motto}"</div>}
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>🔥 {st.totalCheckins} days</div>
          </div>
        ))}
        <button className="btn btn-primary" style={{ width: "100%", padding: 14, marginTop: 8 }} onClick={() => onNav("account")}>⚙️ Account Settings</button>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────
export default function PiddleApp() {
  const [screen, setScreen] = useState("login");
  const [authMode, setAuthMode] = useState("login");
  const [selectedStreak, setSelectedStreak] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [checkinStreak, setCheckinStreak] = useState(null);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);

  const noBottomNav = ["login", "signup", "onboarding", "detail", "create", "checkin-success", "invite", "find-friend", "friend-dashboard", "account"];

  const navItems = [
    { id: "dashboard", icon: "🏠", label: "Home" },
    { id: "friends", icon: "👥", label: "Friends" },
    { id: "stats", icon: "📊", label: "Stats" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthMode("login");
    setUsername("");
    setUserId(null);
    setScreen("login");
  };

  const handleLogin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
      const { data: profile } = await supabase.from('users').select('username').eq('id', user.id).single();
      if (profile) setUsername(`@${profile.username}`);
      setScreen("dashboard");
    }
  };

  const commonProps = { onNav: setScreen, username, userId, onLogout: handleLogout };

  const renderScreen = () => {
    switch (screen) {
      case "login":
        return authMode === "login"
          ? <LoginScreen onLogin={handleLogin} onSwitch={() => setAuthMode("signup")} />
          : <SignUpScreen onSignUp={async () => { await handleLogin(); }} onSwitch={() => setAuthMode("login")} />;
      case "onboarding": return <OnboardingScreen onNext={() => setScreen("create")} />;
      case "create": return <CreateStreakScreen onNext={() => setScreen("dashboard")} {...commonProps} />;
      case "checkin-success": return <CheckInSuccessScreen streakName={checkinStreak?.name} days={checkinStreak?.current || 1} onContinue={() => setScreen("dashboard")} />;
      case "dashboard": return <DashboardScreen onStreakDetail={(s) => { setSelectedStreak(s); setScreen("detail"); }} onCheckin={(s) => { setCheckinStreak(s); setScreen("checkin-success"); }} {...commonProps} />;
      case "detail": return selectedStreak ? <StreakDetailScreen streak={selectedStreak} onBack={() => setScreen("dashboard")} {...commonProps} /> : null;
      case "friends": return <FriendsScreen onInvite={() => setScreen("invite")} onFindFriend={() => setScreen("find-friend")} onViewFriend={(f) => { setSelectedFriend(f); setScreen("friend-dashboard"); }} {...commonProps} />;
      case "friend-dashboard": return selectedFriend ? <FriendDashboardScreen friend={selectedFriend} onBack={() => setScreen("friends")} {...commonProps} /> : null;
      case "find-friend": return <FindFriendScreen onBack={() => setScreen("friends")} {...commonProps} />;
      case "invite": return <FriendInviteScreen onBack={() => setScreen("friends")} {...commonProps} />;
      case "stats": return <StatsScreen {...commonProps} />;
      case "account": return <AccountScreen {...commonProps} />;
      case "profile": return <ProfileScreen {...commonProps} />;
      default: return <DashboardScreen {...commonProps} />;
    }
  };

  return (
    <div className="piddle-app" style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {renderScreen()}
      </div>
      {!noBottomNav.includes(screen) && (
        <nav className="nav">
          {navItems.map(n => (
            <button key={n.id} className={`nav-btn ${screen === n.id ? "active" : ""}`} onClick={() => setScreen(n.id)}>
              <span>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
