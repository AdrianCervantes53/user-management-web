import type { User } from "../../types/user"

export type AuthState =
    | { status: 'loading'; user: null }
    | { status: 'unauthenticated'; user: null }
    | { status: 'authenticated'; user: User };

export interface AuthContextValue {
    status: 'loading' | 'authenticated' | 'unauthenticated';
    user: User | null;
    login: (user: User) => void;
    logout: () => Promise<void>;
}
