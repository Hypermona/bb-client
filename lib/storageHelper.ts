export function getLocalStorage(key: string, defaultValue: any) {
  if (typeof window !== "undefined") {
    const stickyValue = localStorage?.getItem(key);

    return stickyValue !== null && stickyValue !== "undefined"
      ? JSON.parse(stickyValue)
      : defaultValue;
  }
}

export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
