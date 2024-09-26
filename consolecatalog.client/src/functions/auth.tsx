export interface Cookie {
  id: number;
  userId: string;
  authId: string;
  expiryDate: Date;
}

export async function createCookies(
  userId: string,
  days: number = 0
): Promise<void> {
  await deleteCookiesByUserId(userId);

  const cookie = await postCookie(userId, days);
  setCookie("AuthId", cookie.authId, cookie.expiryDate);
}

export async function deleteCookiesByUserId(userId: string) {
  await deleteCookieByUserId(userId);
  if (hasCookie("AuthId")) {
    removeCookie("AuthId");
  }
}

export async function deleteCookiesByAuthId() {
  if (hasCookie("AuthId")) {
    await deleteCookieByAuthId(getCookie("AuthId")!);
    removeCookie("AuthId");
  }
}

export async function getCookies(): Promise<Cookie | null> {
  if (hasCookie("AuthId")) {
    const cookie = await getCookieByAuthId(getCookie("AuthId")!);
    if (cookie === null) {
      removeCookie("AuthId");
    }
    return cookie;
  }
  return null;
}

// Server Side Cookies
export async function getCookieByAuthId(authId: string) {
  const response = await fetch(`/Cookie/GetCookieByAuthId/${authId}`);
  return await response.json();
}

export async function postCookie(
  userId: string,
  days: number
): Promise<Cookie> {
  const response = await fetch(`/Cookie/PostCookie`, {
    method: "POST",
    body: JSON.stringify({ userId, days }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function deleteCookieByUserId(userId: string) {
  await fetch(`/Cookie/DeleteCookieByUserId/${userId}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

export async function deleteCookieByAuthId(authId: string) {
  await fetch(`/Cookie/DeleteCookieByAuthId/${authId}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

// Client Side Cookies
export function hasCookie(key: string): boolean {
  return getCookie(key) !== null ? true : false;
}

export function setCookie(key: string, value: string, expirationDate: Date) {
  document.cookie = `${key}=${value}; expires=${new Date(
    expirationDate
  ).toUTCString()}`;
}

export function getCookie(key: string): string | null {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`));

  return cookies ? cookies.split("=")[1] : null;
}

export function removeCookie(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
