import { TimePeriod } from '../../components/staff/filters/TimeFilter';

export function getDateRange(period: TimePeriod): { start: Date; end: Date } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (period) {
    case 'today':
      return {
        start: today,
        end: now
      };
    case 'yesterday': {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        start: yesterday,
        end: new Date(today)
      };
    }
    case 'week': {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      return {
        start: startOfWeek,
        end: now
      };
    }
    case 'month': {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return {
        start: startOfMonth,
        end: now
      };
    }
    case 'quarter': {
      const currentQuarter = Math.floor(today.getMonth() / 3);
      const startOfQuarter = new Date(today.getFullYear(), currentQuarter * 3, 1);
      return {
        start: startOfQuarter,
        end: now
      };
    }
    case 'year': {
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      return {
        start: startOfYear,
        end: now
      };
    }
    default:
      return {
        start: today,
        end: now
      };
  }
}