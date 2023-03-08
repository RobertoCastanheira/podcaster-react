import dayjs from 'dayjs';

export const saveToLocalStorage = (key, value) => {
  const valueToStore = {
    updatedAt: dayjs(),
    value,
  };

  localStorage.setItem(key, JSON.stringify(valueToStore));
};

export const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);

  return value ? JSON.parse(value).value : null;
};

export const checkIfExpired = (key) => {
  const value = JSON.parse(localStorage.getItem(key));
  if (!value) return true;

  const now = dayjs();
  const before24h = now.subtract(24, 'hour');

  return dayjs(value.updatedAt).isBefore(before24h);
};
