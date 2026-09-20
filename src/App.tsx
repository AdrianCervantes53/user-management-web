import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/AuthPages/LoginPage'
import RegisterPage from './pages/AuthPages/RegisterPage'
import NotesPage from './pages/NotePage/NotesPage'
import { AuthProvider } from './core/auth/AuthContext'
import { ProtectedRoute, PublicOnlyRoute } from './core/auth/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={ <LoginPage />} />
            <Route path="/signup" element={ <RegisterPage />} />
          </Route>
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
