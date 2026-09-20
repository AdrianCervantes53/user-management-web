import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginRequest, signup } from "../../core/auth/api";
import { setToken } from "../../core/auth/storage";
import { useAuth } from "../../core/auth/AuthContext";
import { ApiError } from "../../core/api/client";
import "./AuthPages.css"

export default function RegisterPage() {
    const {login} = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setIsSubmitting(true)
        setError(null)
        if (password !== confirmPassword) {
            setError("Confirm Password is different")
            setIsSubmitting(false)
            return
        }
        try {
            const me = await signup(username, email, password)
            const token = await loginRequest(email, password)
            setToken(token.access_token)
            login(me)
            navigate('/')
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Could not log in")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
    <div className='app-shell'>
        <div className='login-container'>
            <div className='login-panel register-panel'>
            <h1 className='login-title'>User Management API Demo</h1>
            <p className='login-msg'>Create an account</p>
            <form className='login-form register-form' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                    type="username" 
                    id="username" 
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='username' 
                    required />

                <label htmlFor='email'>Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='you@example' 
                    required />
                
                <label htmlFor='confirm-password'>Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="confirm-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password' 
                    required />
                <label htmlFor='password'>Confirm Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm your Password' 
                    required />
                {error ? <div className="error-msg">
                <p>{error}</p> 
                </div> : null}
                <button className='login-btn' type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Loading...' : 'SignUp'}
                </button>
            </form>
            <p className='no-account-btn'>Already have an account? 
                <Link to="/login">Go to login</Link>
            </p>
            </div>
        </div>
    </div>
    )
}