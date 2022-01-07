export const getNextWeek = (startDate) => {
  const nextWeek = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 7
  );
  return nextWeek;
};
export const getDifferenceBetweenDates = (nextDate) => {
  const currentDate = new Date();
  const timeDiff = nextDate.getTime() - currentDate.getTime();
  const newDate = new Date(Math.abs(timeDiff));
  return {
    timeStatus: timeDiff > 0 ? 'in' : 'out',
    time:
      newDate.getDate() +
      'd ' +
      newDate.getHours() +
      'h ' +
      newDate.getMinutes() +
      'm ',
  };
};
