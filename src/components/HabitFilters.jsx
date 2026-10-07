import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { HABIT_CATEGORIES } from '../utils/demoData';

export const HabitFilters = ({
  activeFilter,
  onFilterChange,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  counts,
}) => {
  return (
    <div className="toolbar">
      {/* Search Input */}
      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search habits..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Status Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All ({counts.all})
          </button>
          <button
            className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => onFilterChange('pending')}
          >
            Pending ({counts.pending})
          </button>
          <button
            className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            Completed ({counts.completed})
          </button>
        </div>

        {/* Category Dropdown */}
        <select
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="input-field"
          style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
        >
          {HABIT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        {/* Sort Select */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-field"
          style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
        >
          <option value="default">Sort: Default</option>
          <option value="streak-desc">🔥 Highest Streak</option>
          <option value="name-asc">🔤 Alphabetical (A-Z)</option>
          <option value="completions-desc">📊 Total Completions</option>
        </select>
      </div>
    </div>
  );
};

export default HabitFilters;
