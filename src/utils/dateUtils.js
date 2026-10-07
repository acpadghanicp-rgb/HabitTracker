/**
 * dateUtils.js
 * Comprehensive date calculation utilities for the Habit Streak Tracker.
 * Implements standard array methods, arrow functions, and object manipulation
 * in accordance with Programming Skills-I (CS309PCC06) concepts.
 */

// Format a Date object to 'YYYY-MM-DD' in local timezone to avoid UTC shifts
export const formatDateToKey = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get today's local date string
export const getTodayDateString = () => {
  return formatDateToKey(new Date());
};

// Get yesterday's local date string
export const getYesterdayDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDateToKey(d);
};

// Format date for user-friendly UI display
export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';

  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

// Return array of the last N days (default 7) ending today
export const getLastNDays = (count = 7) => {
  const days = [];
  const today = getTodayDateString();

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = formatDateToKey(d);
    
    days.push({
      dateStr,
      dayShort: d.toLocaleDateString(undefined, { weekday: 'narrow' }), // M, T, W...
      dayName: d.toLocaleDateString(undefined, { weekday: 'short' }),   // Mon, Tue...
      dayNumber: d.getDate(),
      isToday: dateStr === today,
    });
  }

  return days;
};

/**
 * Calculate current streak and longest (best) streak from an array of date strings.
 * Uses JavaScript Set for O(1) lookups and Array methods for sorting and analysis.
 */
export const calculateStreaks = (completionDates = []) => {
  if (!completionDates || completionDates.length === 0) {
    return { currentStreak: 0, bestStreak: 0, totalCompletions: 0 };
  }

  // Remove duplicates and sort chronologically (oldest to newest)
  const uniqueSortedDates = Array.from(new Set(completionDates)).sort();
  const totalCompletions = uniqueSortedDates.length;

  if (totalCompletions === 0) {
    return { currentStreak: 0, bestStreak: 0, totalCompletions: 0 };
  }

  const dateSet = new Set(uniqueSortedDates);
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  // 1. Calculate Current Streak
  let currentStreak = 0;
  let checkDate = new Date();

  // Check if today is completed; if not, check if yesterday was completed to keep streak alive
  const completedToday = dateSet.has(today);
  const completedYesterday = dateSet.has(yesterday);

  if (completedToday) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
    while (dateSet.has(formatDateToKey(checkDate))) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  } else if (completedYesterday) {
    // If user hasn't checked today yet, but checked yesterday, streak is still active from yesterday
    checkDate.setDate(checkDate.getDate() - 1);
    while (dateSet.has(formatDateToKey(checkDate))) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  } else {
    currentStreak = 0;
  }

  // 2. Calculate Best (Max Consecutive) Streak across all recorded history
  let bestStreak = 0;
  let runningStreak = 0;
  let prevTimestamp = null;

  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  for (let i = 0; i < uniqueSortedDates.length; i++) {
    const [y, m, d] = uniqueSortedDates[i].split('-').map(Number);
    const currentTimestamp = new Date(y, m - 1, d).getTime();

    if (prevTimestamp === null) {
      runningStreak = 1;
    } else {
      const diffDays = Math.round((currentTimestamp - prevTimestamp) / ONE_DAY_MS);
      if (diffDays === 1) {
        runningStreak++;
      } else {
        runningStreak = 1;
      }
    }

    if (runningStreak > bestStreak) {
      bestStreak = runningStreak;
    }
    prevTimestamp = currentTimestamp;
  }

  return {
    currentStreak,
    bestStreak: Math.max(bestStreak, currentStreak),
    totalCompletions,
    isCompletedToday: completedToday,
  };
};

// Helper to toggle date completion within an array
export const toggleDateInArray = (dates = [], targetDate) => {
  const set = new Set(dates);
  if (set.has(targetDate)) {
    return dates.filter((d) => d !== targetDate);
  } else {
    return [...dates, targetDate].sort();
  }
};
