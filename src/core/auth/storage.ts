const TOKEN_KEY = "user-token-key"

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(access_token:string): void {
    localStorage.setItem(TOKEN_KEY , access_token)
}

export function clearToken(): void {
    localStorage.removeItem(TOKEN_KEY)
    console.log("token del")
}