export type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: Record<string, unknown>
    retry?: boolean
}
