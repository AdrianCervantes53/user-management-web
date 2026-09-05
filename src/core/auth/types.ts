export type TokenResponse = {
    access_token: string
    token_type: string
}

export type User = {
  id: number
  username: string
  email: string
  is_active: boolean
  created_at: string
}