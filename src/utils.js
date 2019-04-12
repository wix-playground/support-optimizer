export const convertDate = date =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

export const getTomorrowDate = () => {
  const today = new Date();
  const tomorrowDate = new Date();
  return tomorrowDate.setDate(today.getDate() + 1) && tomorrowDate;
};
