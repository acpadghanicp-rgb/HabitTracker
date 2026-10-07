import React from 'react';
import { PlusCircle, Sparkles, Inbox } from 'lucide-react';
import HabitCard from './HabitCard';

export const HabitList = ({
  habits = [],
  onToggleToday,
  onToggleDate,
  onEdit,
  onDelete,
  onOpenCreateModal,
  filterType,
}) => {
  if (habits.length === 0) {
    return (
      <div
        className="glass-panel"
        style={{
          padding: '3rem 1.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--bg-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            marginBottom: '1rem',
          }}
        >
          <Inbox size={30} />
        </div>
        <h4 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.4rem' }}>
          No habits found
        </h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '320px', marginBottom: '1.25rem' }}>
          {filterType === 'completed'
            ? "You haven't completed any habits yet today. Keep going!"
            : filterType === 'pending'
            ? 'All caught up! No pending habits for today.'
            : 'No habits match your active search or category filter.'}
        </p>
      </div>
    );
  }

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggleToday={onToggleToday}
          onToggleDate={onToggleDate}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HabitList;
