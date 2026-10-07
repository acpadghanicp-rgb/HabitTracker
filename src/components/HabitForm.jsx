import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit3, AlertCircle, Sparkles } from 'lucide-react';
import { HABIT_CATEGORIES, CATEGORY_COLORS } from '../utils/demoData';

export const HabitForm = ({ onAddHabit, onUpdateHabit, editingHabit, onCancelEdit, existingHabitNames = [] }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Productivity');
  const [color, setColor] = useState('#6366f1');
  const [error, setError] = useState('');

  const isEditing = Boolean(editingHabit);

  // Sync state if an existing habit is passed for editing
  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name || '');
      setCategory(editingHabit.category || 'Productivity');
      setColor(editingHabit.color || '#6366f1');
      setError('');
    } else {
      setName('');
      setCategory('Productivity');
      setColor(CATEGORY_COLORS['Productivity'] || '#6366f1');
      setError('');
    }
  }, [editingHabit]);

  const handleCategorySelect = (cat) => {
    if (cat === 'All') return;
    setCategory(cat);
    if (CATEGORY_COLORS[cat]) {
      setColor(CATEGORY_COLORS[cat]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();

    // Validation 1: Empty name rejection
    if (!trimmedName) {
      setError('Please provide a habit name before saving.');
      return;
    }

    // Validation 2: Duplicate habit name rejection
    const isDuplicate = existingHabitNames.some((existing) => {
      if (isEditing && editingHabit && editingHabit.name.toLowerCase() === trimmedName.toLowerCase()) {
        return false; // same as current edited item
      }
      return existing.toLowerCase() === trimmedName.toLowerCase();
    });

    if (isDuplicate) {
      setError(`A habit named "${trimmedName}" already exists. Please choose a unique name.`);
      return;
    }

    if (isEditing) {
      onUpdateHabit({
        ...editingHabit,
        name: trimmedName,
        category,
        color,
      });
      onCancelEdit();
    } else {
      onAddHabit({
        name: trimmedName,
        category,
        color,
      });
      setName('');
    }
  };

  return (
    <div className="form-card glass-panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {isEditing ? (
          <Edit3 size={20} style={{ color: 'var(--accent-primary)' }} />
        ) : (
          <PlusCircle size={20} style={{ color: 'var(--accent-primary)' }} />
        )}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
          {isEditing ? 'Edit Habit Details' : 'Create New Habit'}
        </h3>
      </div>

      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 0.85rem',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: 'var(--danger-color)',
            fontSize: '0.8rem',
            marginBottom: '1rem',
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="habit-input">
            Habit Title
          </label>
          <input
            id="habit-input"
            type="text"
            className="input-field"
            placeholder="e.g. Read 20 pages, 15 min Meditation..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            maxLength={60}
            autoFocus={isEditing}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <div className="category-chips">
            {HABIT_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
              <button
                type="button"
                key={cat}
                className={`chip ${category === cat ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Accent Color</label>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            {['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'].map(
              (c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: c,
                    border: color === c ? '3px solid #ffffff' : '2px solid transparent',
                    boxShadow: color === c ? `0 0 0 2px ${c}` : 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                  }}
                  title={c}
                />
              )
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.4rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {isEditing ? 'Save Changes' : 'Add Habit'}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
