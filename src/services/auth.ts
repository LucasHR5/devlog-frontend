import { apiRequest } from "./api";
import type { TokenResponse, User } from "@/types";

export function register(data: { name: string; email: string; password: string }) {
  return apiRequest<User>("/auth/register", { method: "POST", body: data });
}

export function login(data: { email: string; password: string }) {
  return apiRequest<TokenResponse>("/auth/login", { method: "POST", body: data });
}

export function getMe(token: string) {
  return apiRequest<User>("/auth/me", { token });
}