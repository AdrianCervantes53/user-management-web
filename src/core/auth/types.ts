import type { User } from "../../types/user"

export type TokenResponse = {
    access_token: string
    token_type: string
}

export type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: Record<string, unknown>
    auth?: boolean
}

export type AuthState =
    | { status: 'loading'; user: null }
    | { status: 'unauthenticated'; user: null }
    | { status: 'authenticated'; user: User };

export interface AuthContextValue {
    status: 'loading' | 'authenticated' | 'unauthenticated';
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}