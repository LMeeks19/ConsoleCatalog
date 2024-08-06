import { UserTitlesResponse } from "psn-api";

const BASE_PSN_API_URL = "http://localhost:3000";

export async function getPlaystationTitles(accountId: string, offset: number): Promise<UserTitlesResponse> {
    const response = await fetch(`${BASE_PSN_API_URL}/profiles/${accountId}/titles/${offset}`)
    return response.json();
}