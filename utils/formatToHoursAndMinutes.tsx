const formatToHoursAndMinutes = (totalMinutes: number): string => {
  const hours: number = Math.floor(totalMinutes / 60);
  const minutes: number = totalMinutes % 60;

  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
};

export default formatToHoursAndMinutes;
