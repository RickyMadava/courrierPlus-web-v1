import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface SecureStorageOptions {
  encrypt?: boolean;
  expiry?: number; // in days
}

export const useSecureStorage = (key: string, initialValue: any, options: SecureStorageOptions = {}) => {
  const { encrypt = false, expiry = 7 } = options;
  
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      
      const item = Cookies.get(key);
      if (!item) return initialValue;
      
      let parsed = JSON.parse(item);
      
      // Check for expiry
      if (parsed.expiry && Date.now() > parsed.expiry) {
        Cookies.remove(key);
        return initialValue;
      }
      
      return parsed.value || initialValue;
    } catch (error) {
      console.error(`Error reading from secure storage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      
      if (typeof window !== 'undefined') {
        const dataToStore = {
          value,
          expiry: expiry ? Date.now() + (expiry * 24 * 60 * 60 * 1000) : null,
          timestamp: Date.now()
        };
        
        Cookies.set(key, JSON.stringify(dataToStore), {
          expires: expiry,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          httpOnly: false // Client-side access needed
        });
      }
    } catch (error) {
      console.error(`Error setting secure storage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        Cookies.remove(key);
      }
    } catch (error) {
      console.error(`Error removing secure storage key "${key}":`, error);
    }
  };

  // Clean expired items on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = Cookies.get(key);
      if (item) {
        try {
          const parsed = JSON.parse(item);
          if (parsed.expiry && Date.now() > parsed.expiry) {
            Cookies.remove(key);
            setStoredValue(initialValue);
          }
        } catch (error) {
          Cookies.remove(key);
          setStoredValue(initialValue);
        }
      }
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
};