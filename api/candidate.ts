"use client";

import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export async function getProfile() {
  const res = await apiClient.get(ENDPOINTS.CANDIDATE.GET_PROFILE);
  return res.data.data;
}
