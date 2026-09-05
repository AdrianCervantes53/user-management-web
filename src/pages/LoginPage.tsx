import { useEffect, useState, type FormEvent } from "react"
import { getToken, setToken } from "../core/auth/storage"
import { useNavigate, Link } from "react-router-dom"
import { ApiError } from "../core/api/client"
import { getProfile, login, login as loginRequest } from "../core/auth/api"
import { useAuth } from "../core/auth/AuthContext"


export default function LoginPage() {
  const {login} = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
      event.preventDefault()
      setIsSubmitting(true)
      setError(null)
      try {
          const token = await loginRequest(email, password)
          setToken(token.access_token)
          const me = await getProfile()
          login(me)
          navigate('/')
      } catch (err) {
          setError(err instanceof ApiError ? err.message : "no se pudo iniciar sesion")
      } finally {
          setIsSubmitting(false)
      }
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
            {error ? <div className="error-msg">
              <p>{error}</p> 
            </div> : null}
            <button className='login-btn' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Loading...' : 'LogIn'}
            </button>
          </form>
          <p className='no-account-btn'>Don't have an account? 
            <Link to='/signup'>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}