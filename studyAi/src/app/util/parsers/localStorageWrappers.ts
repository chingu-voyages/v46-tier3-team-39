'use client'
// Get the LocalStorageObj from local storage
export function getLocalStorageObj<T>(key: string) {
  const storedValue = localStorage.getItem(key);
  const value = storedValue ? JSON.parse(storedValue) : null;
  return value as T | null;
}
// Delete the LocalStorageObj from local storage
export function deleteLocalStorageObj(key: string) {
  localStorage.removeItem(key);
}
// Add or update the LocalStorageObj in local storage
export function addLocalStorageObj<T>(key: string, value: T) {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}
