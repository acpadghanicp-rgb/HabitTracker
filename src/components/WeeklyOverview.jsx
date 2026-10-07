import React from 'react';
import { Calendar, Check, Circle } from 'lucide-react';
import { getLastNDays } from '../utils/dateUtils';

export const WeeklyOverview = ({ habits = [] }) => {
  if (habits.length === 0) return null;

  const last7Days = getLastNDays(7);

  return (
    <div className="glass-panel" style={{ padding: '1.4rem', marginTop: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
        <Calendar size={18} style={{ color: 'var(--accent-primary)' }} />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Weekly Consistency Matrix</h3>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '400px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                Habit
              </th>
              {last7Days.map((d) => (
                <th
                  key={d.dateStr}
                  style={{
                    padding: '0.5rem',
                    color: d.isToday ? 'var(--accent-primary)' : 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {d.dayName}
                  <br />
                  <span style={{ fontSize: '0.7rem', opacity: 0.75 }}>{d.dayNumber}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => {
              const dates = habit.completionDates || [];
              const habitColor = habit.color || '#6366f1';
              return (
                <tr key={habit.id} style={{ borderTop: '1px solid var(--border-color)' }}>
                  <td
                    style={{
                      textAlign: 'left',
                      padding: '0.65rem 0.5rem',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      whiteSpace: 'nowrap',
                      maxWidth: '180px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: habitColor,
                        marginRight: '0.5rem',
                      }}
                    />
                    {habit.name}
                  </td>
                  {last7Days.map((d) => {
                    const isDone = dates.includes(d.dateStr);
                    return (
                      <td key={d.dateStr} style={{ padding: '0.65rem 0.5rem' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            margin: '0 auto',
                            borderRadius: '6px',
                            backgroundColor: isDone ? habitColor : 'var(--bg-tertiary)',
                            color: isDone ? '#ffffff' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            border: isDone ? `1px solid ${habitColor}` : '1px solid var(--border-color)',
                          }}
                        >
                          {isDone ? <Check size={14} strokeWidth={3} /> : null}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyOverview;
