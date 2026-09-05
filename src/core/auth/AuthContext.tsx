import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthContextValue, AuthState } from "./types";
import { clearToken, getToken, setToken } from "./storage";
import { getProfile, login as loginRequest } from "./api";
import type { User } from "../../types/user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({children}: {children: ReactNode }) {
    const [state, setState] = useState<AuthState>({status: 'loading', user: null})

    useEffect(() => {
        let mounted = true
        const token = getToken()
        if (!token) {
            setState({status: 'unauthenticated', user: null})
            return
        }
        
        getProfile()
        .then((me) => {
                if (mounted) {
                    setState({status: 'authenticated', user: me})
                }
            })
            .catch(() => {
                clearToken()
                if (mounted) {
                    setState({status: 'unauthenticated', user: null})
                }
            })
        
        return () => {
            mounted = false
        }
    }, [])

    const login = useCallback((me: User) => {
        setState({status: 'authenticated', user: me})
    }, [])

    const logout = useCallback(() => {
        clearToken()
        setState({status: 'unauthenticated', user: null})
    }, [])

    const value = useMemo(
        () => ({...state, login, logout}), 
        [state, login, logout]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext)
    if (ctx === undefined) {
        throw new Error('useAuth must be used within AuthProvider') 
    }
    return ctx
}