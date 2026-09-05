import { useEffect, useState, type FormEvent } from "react"
import { getToken, setToken } from "../core/auth/storage"
import { useNavigate, Link } from "react-router-dom"
import { ApiError } from "../core/api/client"
import { login } from "../core/auth/api"


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<string | null>(null)
    const navigate = useNavigate()

    async function loginWithToken() {
        try {
                const response2 = await fetch(`http://192.168.1.18:8000/users/me`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    },
                    method: 'GET'
                })
                const text2 = await response2.json()
                setUser(text2["username"])
        } catch (err) {
            console.error(err)
            setError(err instanceof ApiError ? err.message : "no se pudo iniciar sesion")
        }
        console.log(user)
        if (user) { navigate("/") }
        
    }
    
    useEffect(() => { loginWithToken() },[])


    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setError(null)
        try {
            const token = await login(email, password)
            setToken(token['access_token'])
            console.log(token['access_token'])

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