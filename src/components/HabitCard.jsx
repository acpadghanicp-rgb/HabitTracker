import React from 'react';
import { Check, Flame, Trophy, Trash2, Edit2, Calendar, Sparkles } from 'lucide-react';
import { calculateStreaks, getLastNDays, getTodayDateString } from '../utils/dateUtils';
import { CATEGORY_COLORS } from '../utils/demoData';

export const HabitCard = ({
  habit,
  onToggleToday,
  onToggleDate,
  onEdit,
  onDelete,
}) => {
  const todayStr = getTodayDateString();
  const completionDates = habit.completionDates || [];
  const { currentStreak, bestStreak } = calculateStreaks(completionDates);
  const isCompletedToday = completionDates.includes(todayStr);

  const last7Days = getLastNDays(7);
  const habitColor = habit.color || CATEGORY_COLORS[habit.category] || '#6366f1';

  return (
    <div className="habit-card glass-panel glass-panel-hover">
      {/* Visual left color bar */}
      <div
        className="habit-card-border-accent"
        style={{ backgroundColor: habitColor }}
      />

      <div className="habit-card-main">
        {/* Checkmark Button & Habit Details */}
        <div className="habit-details">
          <button
            className={`habit-check-btn ${isCompletedToday ? 'completed' : ''}`}
            onClick={() => onToggleToday(habit.id)}
            title={isCompletedToday ? 'Mark as Pending (Undo)' : 'Complete for Today'}
            aria-label={`Toggle completion for ${habit.name}`}
          >
            <Check size={20} strokeWidth={3} />
          </button>

          <div className="habit-title-area">
            <span className={`habit-name ${isCompletedToday ? 'is-done' : ''}`}>
              {habit.name}
            </span>
            <div className="habit-meta">
              <span
                className="category-tag"
                style={{
                  backgroundColor: `${habitColor}1a`,
                  color: habitColor,
                  border: `1px solid ${habitColor}40`,
                }}
              >
                {habit.category || 'General'}
              </span>
              <span>•</span>
              <span title="Total lifetime check-ins">
                {completionDates.length} check-ins
              </span>
            </div>
          </div>
        </div>

        {/* Streaks Information & Card Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="streak-badge-group">
            {/* Current Streak Flame */}
            <div
              className={`flame-badge ${currentStreak > 0 ? 'fire-active' : ''}`}
              title={`Current active streak: ${currentStreak} days`}
            >
              <Flame size={16} />
              <span>{currentStreak}d</span>
            </div>

            {/* Best Streak Pill */}
            <div className="best-streak-pill" title={`Best streak record: ${bestStreak} days`}>
              <Trophy size={13} style={{ color: '#f59e0b' }} />
              <span>Best: {bestStreak}d</span>
            </div>
          </div>

          {/* Edit / Delete Buttons */}
          <div className="card-actions">
            <button
              className="btn-icon"
              onClick={() => onEdit(habit)}
              title="Edit Habit"
              aria-label="Edit Habit"
            >
              <Edit2 size={15} />
            </button>
            <button
              className="btn-icon"
              onClick={() => onDelete(habit.id)}
              title="Delete Habit"
              aria-label="Delete Habit"
              style={{ color: 'var(--danger-color)' }}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive 7-Day Activity History Strip */}
      <div className="seven-day-strip">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.725rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            marginRight: '0.5rem',
          }}
        >
          <Calendar size={13} />
          <span>7-Day:</span>
        </div>

        {last7Days.map((day) => {
          const isDone = completionDates.includes(day.dateStr);
          return (
            <div key={day.dateStr} className="day-cell">
              <span className="day-label" style={{ color: day.isToday ? 'var(--accent-primary)' : undefined }}>
                {day.dayName}
              </span>
              <button
                type="button"
                className={`day-bubble ${isDone ? 'done' : ''} ${day.isToday ? 'is-today-active' : ''}`}
                onClick={() => onToggleDate(habit.id, day.dateStr)}
                title={`${day.dateStr}: ${isDone ? 'Completed (Click to undo)' : 'Pending (Click to complete)'}`}
                style={isDone ? { backgroundColor: habitColor, borderColor: habitColor } : {}}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : day.dayNumber}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitCard;
