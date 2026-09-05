import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotesPage from './pages/NotesPage'
import { AuthProvider } from './core/auth/AuthContext'
import { ProtectedRoute } from './core/auth/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <LoginPage />} />
          <Route path="/signup" element={ <RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={ <NotesPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
