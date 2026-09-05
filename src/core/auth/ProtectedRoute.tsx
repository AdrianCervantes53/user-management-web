import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute() {
    const {status} = useAuth()
    
    if (status === 'loading') {
        return <div className="page-center muted">Cargando sesión…</div>
    }

    if (status === 'unauthenticated') {
        return <Navigate to="/login" replace/>
    }

    if (status === 'authenticated') {
        return <Outlet/>
    }
}