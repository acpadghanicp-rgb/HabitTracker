/**
 * demoData.js
 * Pre-populated demo habits and sample data reflecting student life and productivity.
 * Dynamically computes completion dates relative to today to ensure the demo looks active.
 */
import { formatDateToKey } from './dateUtils';

export const getDemoHabits = (userId = 'guest_user') => {
  const getRelativeDate = (offsetDays) => {
    const d = new Date();
    d.setDate(d.getDate() - offsetDays);
    return formatDateToKey(d);
  };

  return [
    {
      id: 'habit_1',
      userId,
      name: 'Morning Meditation & Breathwork 🧘',
      category: 'Mindfulness',
      color: '#8b5cf6', // Purple
      createdAt: getRelativeDate(14),
      completionDates: [
        getRelativeDate(6),
        getRelativeDate(5),
        getRelativeDate(4),
        getRelativeDate(3),
        getRelativeDate(2),
        getRelativeDate(1),
        getRelativeDate(0), // completed today
      ],
    },
    {
      id: 'habit_2',
      userId,
      name: 'Full Stack React & JS Practice 💻',
      category: 'Coding',
      color: '#3b82f6', // Blue
      createdAt: getRelativeDate(20),
      completionDates: [
        getRelativeDate(9),
        getRelativeDate(8),
        getRelativeDate(7),
        getRelativeDate(6),
        getRelativeDate(5),
        getRelativeDate(4),
        getRelativeDate(3),
        getRelativeDate(2),
        getRelativeDate(1),
        getRelativeDate(0), // completed today
      ],
    },
    {
      id: 'habit_3',
      userId,
      name: 'Read 20 Pages of Tech / Literature 📚',
      category: 'Learning',
      color: '#10b981', // Emerald
      createdAt: getRelativeDate(10),
      completionDates: [
        getRelativeDate(5),
        getRelativeDate(4),
        getRelativeDate(3),
        getRelativeDate(2),
        getRelativeDate(1),
        // not yet completed today
      ],
    },
    {
      id: 'habit_4',
      userId,
      name: '30-Minute Cardio / Workout 🏃',
      category: 'Fitness',
      color: '#f97316', // Orange
      createdAt: getRelativeDate(12),
      completionDates: [
        getRelativeDate(4),
        getRelativeDate(3),
        getRelativeDate(1),
        // streak broken 2 days ago, currently 1 day streak
      ],
    },
    {
      id: 'habit_5',
      userId,
      name: 'Hydration Target: 3 Liters Water 💧',
      category: 'Health',
      color: '#06b6d4', // Cyan
      createdAt: getRelativeDate(8),
      completionDates: [
        getRelativeDate(3),
        getRelativeDate(2),
        getRelativeDate(1),
        getRelativeDate(0),
      ],
    },
  ];
};

export const HABIT_CATEGORIES = [
  'All',
  'Coding',
  'Health',
  'Fitness',
  'Mindfulness',
  'Learning',
  'Productivity',
];

export const CATEGORY_COLORS = {
  Coding: '#3b82f6',
  Health: '#06b6d4',
  Fitness: '#f97316',
  Mindfulness: '#8b5cf6',
  Learning: '#10b981',
  Productivity: '#ec4899',
  General: '#64748b',
};
