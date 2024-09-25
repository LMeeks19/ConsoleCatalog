export function hasCookie(key: string): boolean {
  return getCookie(key) !== null ? true : false;
}

export function setCookie(key: string, value: string, days: number = 0) {
  if (days === 0) {
    document.cookie = `${key}=${value}`;
  } else {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = `${key}=${value}; expires=${expirationDate.toUTCString()}`;
  }
}

export function getCookie(key: string): string | null {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`));

  return cookies ? cookies.split("=")[1] : null;
}

export function deleteCookie(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
