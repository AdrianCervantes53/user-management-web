import type { RequestOptions } from "./types"

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const API_URL = import.meta.env.VITE_API_URL

let refreshPromise: Promise<void> | null = null
let sessionExpiredHandler: (() => void) | null = null

export function onSessionExpired(handler: () => void): () => void {
    sessionExpiredHandler = handler
    return () => { sessionExpiredHandler = null }
}

// El backend rota el refresh token en cada uso, así que dos refresh
// simultáneos con el mismo token harían fallar al segundo: una sola
// petición de refresh en vuelo, compartida por todos los callers.
function refreshSession(): Promise<void> {
    refreshPromise ??= fetch(`${API_URL}/auth/refresh`, { credentials: 'include' })
        .then(res => { if (!res.ok) throw new ApiError(res.status, 'Session expired') })
        .finally(() => { refreshPromise = null })
    return refreshPromise
}

export async  function apiRequest<T>(
    path: string,
    options: RequestOptions = {},
    contentType: string = 'application/json'
): Promise<T> {
    const { body, retry = true, headers, ...rest } = options
    const requestHeaders = new Headers(headers)

    if (body !== undefined) {
        requestHeaders.set('Content-Type', contentType)
    }

    const action = (body: Record<string, unknown>): string | URLSearchParams => {
        if (contentType === 'application/json') {
            return JSON.stringify(body)
        }
        if (Object.values(body).every(val => typeof val === 'string')) {
            return new URLSearchParams({...body as Record<string, string>})
        }
        throw new Error("body content is not a string")
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...rest,
        credentials: 'include',
        headers: requestHeaders,
        body: body === undefined ? undefined : action(body)
    })

    if (response.status === 401 && retry) {
        try {
            await refreshSession()
        } catch {
            sessionExpiredHandler?.()
            throw new ApiError(401, 'Session expired')
        }
        return apiRequest<T>(path, { ...options, retry: false }, contentType)
    }

    const text = await response.text()
    const data = text ? (JSON.parse(text) as unknown) : null

    if (!response.ok) {
        const detail =
        typeof data === 'object' &&
        data !== null &&
        'detail' in data &&
        typeof (data as { detail: unknown }).detail === 'string'
        ? (data as { detail: string }).detail
        : `Request failed (${response.status})`
    throw new ApiError(response.status, detail)
    }

    return data as T
}
