import { apiRequest } from "../api/client";
import type { TokenResponse, User } from "./types";

export function login(username: string, password: string): Promise<TokenResponse> {
    return apiRequest<TokenResponse>(
        '/auth/login', {
            method: 'POST',
            body: { username, password}
        },
        'application/x-www-form-urlencoded'
    )
}

export function logout(): Promise<void> {
    return apiRequest<void>('/auth/logout', {
        method: 'POST'
    })
}

export function signup(email: string, password:string): Promise<User> {
    return apiRequest<User>('/users', {
        method: 'POST',
        body: { email, password }
    })
}