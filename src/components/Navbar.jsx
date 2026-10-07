import React from 'react';
import { Flame, Moon, Sun, LogIn, LogOut, Sparkles, User } from 'lucide-react';
import { formatDisplayDate, getTodayDateString } from '../utils/dateUtils';

export const Navbar = ({ user, onOpenAuth, onLogout, theme, toggleTheme, totalActiveStreaks }) => {
  const todayStr = getTodayDateString();

  return (
    <header className="navbar glass-panel">
      <div className="logo-group">
        <div className="logo-icon-badge">
          <Flame size={24} className="flame-icon" />
        </div>
        <div className="logo-text">
          <h1>StreakPulse</h1>
          <span>Habit Streak Tracker • CS309PCC06</span>
        </div>
      </div>

      <div className="nav-actions">
        {/* Today's Date Pill */}
        <div className="badge-outline" title="Current Tracking Date">
          <Sparkles size={14} style={{ color: '#ec4899' }} />
          <span>{formatDisplayDate(todayStr)}</span>
        </div>

        {/* Global Active Streaks Counter */}
        {totalActiveStreaks > 0 && (
          <div className="flame-badge fire-active" title="Total Active Streak Days">
            <Flame size={16} />
            <span>{totalActiveStreaks}d Streak</span>
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          className="btn-icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Auth Action */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="badge-outline" style={{ padding: '0.4rem 0.75rem' }}>
              <User size={14} />
              <span style={{ fontWeight: 600 }}>{user.name || user.username}</span>
            </div>
            <button
              className="btn btn-secondary"
              onClick={onLogout}
              title="Sign Out"
              style={{ padding: '0.5rem 0.85rem' }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={onOpenAuth}>
            <LogIn size={16} />
            <span>Sign In / Demo</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
