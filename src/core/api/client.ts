import { getToken } from "../auth/storage"

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: Record<string, unknown>
    auth?: boolean
}



export async  function apiRequest<T>(
    path: string,
    options: RequestOptions = {},
    contentType: string = 'application/json'
): Promise<T> {
    const { body, auth = true, headers, ...rest } = options
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

    if (auth) {
        const token = getToken()
        if (token) {
            requestHeaders.set('Authorization', `Bearer ${token}`)
        }
    }

    const response = await fetch(`http://192.168.1.18:8000${path}`, {
        ...rest,
        headers: requestHeaders,
        body: body === undefined ? undefined : action(body)
    })
    
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