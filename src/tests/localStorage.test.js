import dayjs from 'dayjs';
import {
  saveToLocalStorage,
  getFromLocalStorage,
  checkIfExpired,
} from '../utils/LocalStorage';
import 'mock-local-storage';

describe('Local Storage Utils', () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  describe('saveToLocalStorage', () => {
    test('should save value to local storage with current date and time', () => {
      const key = 'myKey';
      const value = { name: 'John Doe' };

      saveToLocalStorage(key, value);

      const storedValue = JSON.parse(localStorage.getItem(key));
      expect(storedValue).toBeDefined();
      expect(storedValue.updatedAt).toBeDefined();
      expect(dayjs(storedValue.updatedAt).isValid()).toBe(true);
      expect(storedValue.value).toEqual(value);
    });
  });

  describe('getFromLocalStorage', () => {
    test('should return null if key does not exist in local storage', () => {
      const key = 'nonExistingKey';
      const result = getFromLocalStorage(key);

      expect(result).toBeNull();
    });

    test('should return value if key exists in local storage', () => {
      const key = 'myKey';
      const value = { name: 'John Doe' };
      localStorage.setItem(key, JSON.stringify({ updatedAt: dayjs(), value }));

      const result = getFromLocalStorage(key);

      expect(result).toEqual(value);
    });
  });

  describe('checkIfExpired', () => {
    test('should return true if value does not exist in local storage', () => {
      const key = 'nonExistingKey';
      const result = checkIfExpired(key);

      expect(result).toBe(true);
    });

    test('should return true if value in local storage is older than 24 hours', () => {
      const key = 'myKey';
      const value = { name: 'John Doe' };
      const before24h = dayjs().subtract(25, 'hour');
      localStorage.setItem(
        key,
        JSON.stringify({ updatedAt: before24h, value })
      );

      const result = checkIfExpired(key);

      expect(result).toBe(true);
    });

    test('should return false if value in local storage is newer than 24 hours', () => {
      const key = 'myKey';
      const value = { name: 'John Doe' };
      const after24h = dayjs().add(24, 'hour');
      localStorage.setItem(key, JSON.stringify({ updatedAt: after24h, value }));

      const result = checkIfExpired(key);

      expect(result).toBe(false);
    });
  });
});
