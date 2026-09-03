import { useState, type FormEvent } from "react"
import { getToken, setToken } from "../core/auth/storage"
import { useNavigate, Link } from "react-router-dom"

class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/*type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: unknown
    auth?: boolean
}

type TokenResponse = {
    access_token: string
    token_type: string
}

function login(email: string, password:string): Promise<TokenResponse> {
    return apiRequest('/auth/login', { method: 'POST', body: { email, password }})
}

async function apiRequest<T>(
    path: string,
    options: RequestOptions = {}
): Promise<T> {
    const { body, auth = true, headers, ...rest } = options
    const requestHeaders = new Headers(headers)

    if (auth) {
        const token = localStorage.getItem('test_access_token')
        if (token) {
            requestHeaders.set('Authorization', `Bearer ${token}`)
        }
    }

    if (body !== undefined) {
        requestHeaders.set('Content-Type', 'application/json')
    }

    const response = await fetch(`http://localhost:8000${path}`, {
        ...rest,
        headers: requestHeaders,
        body: body === undefined ? undefined : JSON.stringify(body)
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
}*/

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    //const [user, setUser] = useState<string | null>(null)
    const navigate = useNavigate()

    async function loginWithToken() {
        try {
                const response2 = await fetch(`http://localhost:8000/users/me`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    },
                    method: 'GET'
                })
                const text2 = await response2.json()
                console.log(text2["username"])
        } catch (err) {
            console.error(err)
            setError(err instanceof ApiError ? err.message : "no se pudo iniciar sesion")
        }
        navigate("/")
    }
    
    if (getToken()) {
        loginWithToken()
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setError(null)
        try {
            const response = await fetch(`http://localhost:8000/auth/login`, {
                body: new URLSearchParams({username: email, password: password}),
                method: 'POST'
            })
            const text = await response.json()
            const accessToken = text["access_token"]
            setToken(accessToken)

        } catch (err) {
            console.error(err)
            setError(err instanceof ApiError ? err.message : "no se pudo iniciar sesion")
        } finally {
            console.log("end")
        }
        loginWithToken()
        

    }

    return (
    <div className='app-shell'>
      <div className='login-container'>
        <div className='login-panel'>
          <h1 className='login-title'>User Management API Demo</h1>
          <p className='login-msg'>Login to your account</p>
          <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor='email'>Email:</label>
            <input 
                type="email" 
                id="email" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='you@example' 
                required />
            
            <label htmlFor='password'>Password</label>
            <input 
                type="password" 
                id="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password' 
                required />

            {error ? <p className="error">{error}</p> : null}
            <button className='login-btn' type="submit" >Login</button>
          </form>
          <p className='no-account-btn'>Don't have an account? 
            <Link to='/signup'>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}