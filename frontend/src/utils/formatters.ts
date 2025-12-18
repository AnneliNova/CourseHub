export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesStr = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;

  return `${hoursStr}:${minutesStr}`;
};

export const formatCreationDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  if (!year || !month || !day) return dateString;

  return `${day}.${month}.${year}`;
};
