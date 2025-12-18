  // export const formatDuration = (minutes: number): string => {
  //   const hours = Math.floor(minutes / 60);
  //   const remainingMinutes = minutes % 60;
    
  //   // Додавання нулів попереду, якщо число менше 10
  //   const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  //   const minutesStr = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
  
  //   return `${hoursStr}:${minutesStr} hours`;
  // };
  
  // export const formatCreationDate = (dateString: string): string => {
  //   // Припускаємо формат 'YYYY-MM-DD' для вхідних даних
  //   const [year, month, day] = dateString.split('-');
  //   if (!year || !month || !day) return dateString;
    
  //   // Форматування у 'DD.MM.YYYY'
  //   return `${day}.${month}.${year}`;
  // };



export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesStr = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;

  // В тестах очікується формат типу "02:40" без додаткового тексту
  return `${hoursStr}:${minutesStr}`;
};

export const formatCreationDate = (dateString: string): string => {
  // Припускаємо формат 'YYYY-MM-DD' для вхідних даних
  const [year, month, day] = dateString.split('-');
  if (!year || !month || !day) return dateString;

  // Форматування у 'DD.MM.YYYY'
  return `${day}.${month}.${year}`;
};
