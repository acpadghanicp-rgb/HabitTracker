import React, { useMemo } from 'react';
import { CheckCircle2, Flame, Award, Target, TrendingUp, Sparkles } from 'lucide-react';
import { calculateStreaks, getTodayDateString } from '../utils/dateUtils';

export const StatsDashboard = ({ habits = [] }) => {
  const todayStr = getTodayDateString();

  const stats = useMemo(() => {
    const totalHabits = habits.length;
    if (totalHabits === 0) {
      return {
        totalHabits: 0,
        completedToday: 0,
        percentage: 0,
        totalCheckins: 0,
        highestCurrentStreak: 0,
        highestBestStreak: 0,
      };
    }

    let completedToday = 0;
    let totalCheckins = 0;
    let highestCurrentStreak = 0;
    let highestBestStreak = 0;

    habits.forEach((habit) => {
      const dates = habit.completionDates || [];
      const { currentStreak, bestStreak } = calculateStreaks(dates);

      if (dates.includes(todayStr)) {
        completedToday++;
      }

      totalCheckins += dates.length;
      if (currentStreak > highestCurrentStreak) highestCurrentStreak = currentStreak;
      if (bestStreak > highestBestStreak) highestBestStreak = bestStreak;
    });

    const percentage = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

    return {
      totalHabits,
      completedToday,
      percentage,
      totalCheckins,
      highestCurrentStreak,
      highestBestStreak,
    };
  }, [habits, todayStr]);

  const getEncouragement = () => {
    if (stats.totalHabits === 0) return 'Create your first habit below to begin tracking!';
    if (stats.percentage === 100) return '🎉 Phenomenal! You have crushed all your habits today!';
    if (stats.percentage >= 70) return '🔥 Outstanding momentum! Almost finished for the day!';
    if (stats.percentage >= 40) return '⚡ Great progress! Keep going to lock in your streaks.';
    if (stats.completedToday > 0) return '🚀 You are off to a solid start today. Keep pushing!';
    return '🌱 Ready to build momentum? Check off your first habit today!';
  };

  return (
    <section aria-label="Habit Performance Analytics">
      {/* Progress Track Banner */}
      <div className="progress-banner glass-panel" style={{ marginBottom: '1.25rem' }}>
        <div className="progress-header">
          <div className="progress-title">
            <Target size={18} style={{ color: 'var(--accent-primary)' }} />
            <span>Today's Daily Target</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              ({stats.completedToday} of {stats.totalHabits} completed)
            </span>
          </div>
          <div className="progress-percentage">{stats.percentage}%</div>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${stats.percentage}%`,
              background:
                stats.percentage === 100
                  ? 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'
                  : 'var(--accent-gradient)',
            }}
          />
        </div>

        <div
          style={{
            marginTop: '0.65rem',
            fontSize: '0.825rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <Sparkles size={14} style={{ color: '#f59e0b', flexShrink: 0 }} />
          <span>{getEncouragement()}</span>
        </div>
      </div>

      {/* Grid of Key Performance Cards */}
      <div className="stats-grid">
        {/* Completed Today */}
        <div className="stat-card glass-panel glass-panel-hover">
          <div
            className="stat-icon-wrapper"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              color: 'var(--success-color)',
            }}
          >
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Done Today</span>
            <span className="stat-value">
              {stats.completedToday}
              <small style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                /{stats.totalHabits}
              </small>
            </span>
            <span className="stat-subtext">Active daily tasks</span>
          </div>
        </div>

        {/* Top Active Streak */}
        <div className="stat-card glass-panel glass-panel-hover">
          <div
            className="stat-icon-wrapper"
            style={{
              backgroundColor: 'rgba(249, 115, 22, 0.12)',
              color: '#f97316',
            }}
          >
            <Flame size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Top Streak</span>
            <span className="stat-value">{stats.highestCurrentStreak} <small style={{ fontSize: '0.85rem' }}>days</small></span>
            <span className="stat-subtext">Active unbroken run</span>
          </div>
        </div>

        {/* Best Recorded Streak */}
        <div className="stat-card glass-panel glass-panel-hover">
          <div
            className="stat-icon-wrapper"
            style={{
              backgroundColor: 'rgba(236, 72, 153, 0.12)',
              color: '#ec4899',
            }}
          >
            <Award size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Best Record</span>
            <span className="stat-value">{stats.highestBestStreak} <small style={{ fontSize: '0.85rem' }}>days</small></span>
            <span className="stat-subtext">Personal best streak</span>
          </div>
        </div>

        {/* Total Check-ins */}
        <div className="stat-card glass-panel glass-panel-hover">
          <div
            className="stat-icon-wrapper"
            style={{
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              color: 'var(--accent-primary)',
            }}
          >
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Check-ins</span>
            <span className="stat-value">{stats.totalCheckins}</span>
            <span className="stat-subtext">Lifetime repetitions</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsDashboard;
