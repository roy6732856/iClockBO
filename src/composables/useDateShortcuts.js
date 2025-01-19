import dayjs from 'dayjs';

export function useDateShortcuts() {
  const dateShortcuts = [
    {
      text: '今天',
      value: () => {
        const start = dayjs().startOf('day');
        return [start, dayjs().endOf('day')];
      }
    },
    {
      text: '昨天',
      value: () => {
        const start = dayjs().subtract(1, 'day').startOf('day');
        return [start, dayjs().subtract(1, 'day').endOf('day')];
      }
    },
    {
      text: '本週',
      value: () => {
        const start = dayjs().startOf('week');
        return [start, dayjs().endOf('week')];
      }
    },
    {
      text: '上週',
      value: () => {
        const start = dayjs().subtract(1, 'week').startOf('week');
        const end = dayjs().subtract(1, 'week').endOf('week');
        return [start, end];
      }
    },
    {
      text: '本月',
      value: () => {
        const start = dayjs().startOf('month');
        return [start, dayjs().endOf('month')];
      }
    }
  ];

  return {
    dateShortcuts
  };
} 