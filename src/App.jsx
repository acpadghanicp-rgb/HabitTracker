import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import StatsDashboard from './components/StatsDashboard';
import HabitFilters from './components/HabitFilters';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import WeeklyOverview from './components/WeeklyOverview';
import Footer from './components/Footer';

import useLocalStorage from './hooks/useLocalStorage';
import useToggle from './hooks/useToggle';
import useTheme from './hooks/useTheme';

import { getTodayDateString, calculateStreaks, toggleDateInArray } from './utils/dateUtils';
import { getDemoHabits } from './utils/demoData';
import { playCheckSound, playUndoSound, triggerCelebration } from './utils/soundEffects';
import { Download, Upload, RotateCcw, Plus, Sparkles } from 'lucide-react';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useLocalStorage('current_user', {
    id: 'demo_student',
    username: 'Demo Student',
    name: 'Demo Student',
  });

  const [habits, setHabits] = useLocalStorage('user_habits', () => getDemoHabits('demo_student'));

  // Auth modal toggle using custom useToggle hook (Practical 09 concept)
  const [isAuthOpen, toggleAuthModal] = useToggle(false);

  // Editing state
  const [editingHabit, setEditingHabit] = useState(null);

  // Filters and search state
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const todayStr = getTodayDateString();

  // If user switches, or habits are empty on first load, initialize demo habits
  useEffect(() => {
    if ((!habits || habits.length === 0) && user) {
      setHabits(getDemoHabits(user.id));
    }
  }, [user]);

  // Calculate global total active streaks
  const totalActiveStreaks = useMemo(() => {
    return habits.reduce((acc, habit) => {
      const { currentStreak } = calculateStreaks(habit.completionDates || []);
      return acc + currentStreak;
    }, 0);
  }, [habits]);

  // Handler: Add New Habit
  const handleAddHabit = (habitData) => {
    const newHabit = {
      id: `habit_${Date.now()}`,
      userId: user?.id || 'guest',
      name: habitData.name,
      category: habitData.category,
      color: habitData.color,
      createdAt: todayStr,
      completionDates: [],
    };

    setHabits((prev) => [newHabit, ...prev]);
  };

  // Handler: Update Existing Habit
  const handleUpdateHabit = (updatedHabit) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === updatedHabit.id ? { ...h, ...updatedHabit } : h))
    );
    setEditingHabit(null);
  };

  // Handler: Delete Habit
  const handleDeleteHabit = (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits((prev) => prev.filter((h) => h.id !== habitId));
      if (editingHabit?.id === habitId) {
        setEditingHabit(null);
      }
    }
  };

  // Handler: Toggle Today's Completion (With Audio & Confetti)
  const handleToggleToday = useCallback(
    (habitId) => {
      setHabits((prevHabits) => {
        let isNowCompleted = false;
        const nextHabits = prevHabits.map((habit) => {
          if (habit.id === habitId) {
            const currentDates = habit.completionDates || [];
            const hasCompletedToday = currentDates.includes(todayStr);
            isNowCompleted = !hasCompletedToday;

            return {
              ...habit,
              completionDates: toggleDateInArray(currentDates, todayStr),
            };
          }
          return habit;
        });

        // Trigger Audio Feedback
        if (isNowCompleted) {
          playCheckSound();

          // Check if all habits are now 100% completed today!
          const allCompleted = nextHabits.every((h) =>
            (h.completionDates || []).includes(todayStr)
          );
          if (allCompleted && nextHabits.length > 0) {
            setTimeout(() => {
              triggerCelebration();
            }, 150);
          }
        } else {
          playUndoSound();
        }

        return nextHabits;
      });
    },
    [todayStr, setHabits]
  );

  // Handler: Toggle Specific Historical Date
  const handleToggleDate = useCallback(
    (habitId, targetDateStr) => {
      setHabits((prevHabits) =>
        prevHabits.map((habit) => {
          if (habit.id === habitId) {
            const currentDates = habit.completionDates || [];
            const isAdding = !currentDates.includes(targetDateStr);
            if (isAdding) {
              playCheckSound();
            } else {
              playUndoSound();
            }
            return {
              ...habit,
              completionDates: toggleDateInArray(currentDates, targetDateStr),
            };
          }
          return habit;
        })
      );
    },
    [setHabits]
  );

  // Handler: Reset to Fresh Demo Data
  const handleResetDemoData = () => {
    if (window.confirm('Reset all habits to the preloaded demo set?')) {
      setHabits(getDemoHabits(user?.id || 'demo_student'));
    }
  };

  // Handler: Export Backup JSON
  const handleExportData = () => {
    const dataStr = JSON.stringify(habits, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habits_backup_${todayStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handler: Import Backup JSON
  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (Array.isArray(parsed)) {
          setHabits(parsed);
          alert('Habits imported successfully!');
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Filter and Sort Processing (Demonstrates ES6 array methods: filter, sort, map)
  const filteredHabits = useMemo(() => {
    return habits
      .filter((habit) => {
        // Status filter
        const isDone = (habit.completionDates || []).includes(todayStr);
        if (activeFilter === 'completed' && !isDone) return false;
        if (activeFilter === 'pending' && isDone) return false;

        // Category filter
        if (activeCategory !== 'All' && habit.category !== activeCategory) return false;

        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          return habit.name.toLowerCase().includes(query);
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'streak-desc') {
          const streakA = calculateStreaks(a.completionDates).currentStreak;
          const streakB = calculateStreaks(b.completionDates).currentStreak;
          return streakB - streakA;
        }
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'completions-desc') {
          return (b.completionDates?.length || 0) - (a.completionDates?.length || 0);
        }
        return 0; // default order
      });
  }, [habits, activeFilter, activeCategory, searchQuery, sortBy, todayStr]);

  // Counts for filters
  const counts = useMemo(() => {
    let completed = 0;
    habits.forEach((h) => {
      if ((h.completionDates || []).includes(todayStr)) completed++;
    });
    return {
      all: habits.length,
      pending: habits.length - completed,
      completed,
    };
  }, [habits, todayStr]);

  const existingHabitNames = useMemo(() => habits.map((h) => h.name), [habits]);

  return (
    <div className="app-container">
      {/* Dynamic Background Ambient Blobs */}
      <div className="bg-ambient">
        <div className="blob-1" />
        <div className="blob-2" />
      </div>

      {/* Navigation Header */}
      <Navbar
        user={user}
        onOpenAuth={() => toggleAuthModal(true)}
        onLogout={() => {
          setUser(null);
          setHabits([]);
        }}
        theme={theme}
        toggleTheme={toggleTheme}
        totalActiveStreaks={totalActiveStreaks}
      />

      {/* Analytical Top Dashboard */}
      <StatsDashboard habits={habits} />

      {/* Split Main Content Area */}
      <div className="main-content-split">
        {/* Left Column: Habit Creator & Quick Utilities */}
        <div>
          <HabitForm
            onAddHabit={handleAddHabit}
            onUpdateHabit={handleUpdateHabit}
            editingHabit={editingHabit}
            onCancelEdit={() => setEditingHabit(null)}
            existingHabitNames={existingHabitNames}
          />

          {/* Quick Data Actions Card */}
          <div className="glass-panel" style={{ padding: '1.25rem', marginTop: '1.25rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              Data Management & Backup
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem' }}
                onClick={handleExportData}
              >
                <Download size={14} /> Export Backup (.json)
              </button>

              <label
                className="btn btn-outline"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  margin: 0,
                }}
              >
                <Upload size={14} /> Import Backup (.json)
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  style={{ display: 'none' }}
                />
              </label>

              <button
                type="button"
                className="btn btn-outline"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                }}
                onClick={handleResetDemoData}
              >
                <RotateCcw size={14} /> Reset Demo Habits
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Filters, Habit Cards List & Matrix */}
        <div>
          <HabitFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            counts={counts}
          />

          <HabitList
            habits={filteredHabits}
            onToggleToday={handleToggleToday}
            onToggleDate={handleToggleDate}
            onEdit={(h) => setEditingHabit(h)}
            onDelete={handleDeleteHabit}
            filterType={activeFilter}
          />

          {/* 7-Day Consistency Matrix */}
          <WeeklyOverview habits={habits} />
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => toggleAuthModal(false)}
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
          if (!habits || habits.length === 0) {
            setHabits(getDemoHabits(loggedInUser.id));
          }
        }}
        onGuestLogin={() => {
          const guest = { id: 'guest_user', username: 'Guest Student', name: 'Guest Student' };
          setUser(guest);
          setHabits(getDemoHabits('guest_user'));
        }}
      />

      {/* Footer referencing college curriculum */}
      <Footer />
    </div>
  );
}

export default App;
