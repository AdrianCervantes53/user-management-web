import type { User } from "../../types/user";
import { apiRequest } from "../api/client";

export function login(username: string, password: string): Promise<void> {
    return apiRequest<void>(
        '/auth/login', {
            method: 'POST',
            body: { username, password},
            retry: false
        },
        'application/x-www-form-urlencoded'
    )
}

export function logout(): Promise<void> {
    return apiRequest<void>('/auth/logout', {
        retry: false
    })
}

export function signup(username: string, email: string, password:string): Promise<User> {
    return apiRequest<User>('/users', {
        method: 'POST',
        body: { username, email, password }
    })
}

export function getProfile(): Promise<User> {
    return apiRequest<User>('/users/me')
}
