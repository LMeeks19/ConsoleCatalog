import { PSNProfile } from "../../interfaces";

export async function getProfileById(id: string): Promise<PSNProfile> {
    const response = await fetch(`/playstation/getProfileById/${id}`);
    return await response.json();
  }
  
  export async function getProfileByOnlineId(onlineId: string): Promise<PSNProfile> {
    const response = await fetch(`/playstation/getProfileByOnlineId/${onlineId}`);
    return await response.json();
  }
  
  export async function getProfileByAccountId(accountId: string): Promise<PSNProfile> {
    const response = await fetch(`/playstation/getProfileByAccountId/${accountId}`);
    return await response.json();
  }
  
  export async function postProfile(psnProfile: PSNProfile): Promise<PSNProfile> {
    const response = await fetch(`/playstation/postProfile`, {
      method: "POST",
      body: JSON.stringify(psnProfile),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    return await response.json();
  }
  
  export async function putProfile(psnProfile: PSNProfile): Promise<PSNProfile> {
    const response = await fetch(`/playstation/putProfile`, {
      method: "PUT",
      body: JSON.stringify(psnProfile),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    return await response.json();
  }