"use client";
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
function isQuotaExceededError(err: unknown): boolean {
  return (
    err instanceof DOMException &&
    // everything except Firefox
    (err.code === 22 ||
      // Firefox
      err.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      err.name === "QuotaExceededError" ||
      // Firefox
      err.name === "NS_ERROR_DOM_QUOTA_REACHED")
  );
}
// Add or update the LocalStorageObj in local storage
export const clearLocalStorage = () => {
  const nextAuthDataKey = "nextauth.message";
  //grab auth values
  const nextAuthData = localStorage.getItem(nextAuthDataKey);
  localStorage.clear();
  //add auth values back
  localStorage.setItem(nextAuthDataKey, nextAuthData || "");
};
export function addLocalStorageObj<T>(key: string, value: T) {
  const stringValue = JSON.stringify(value);
  try {
    localStorage.setItem(key, stringValue);
  } catch (error) {
    if (isQuotaExceededError(error)) {
      clearLocalStorage();
      localStorage.setItem(key, stringValue);
    } else {
      console.error(error);
    }
  }
}
