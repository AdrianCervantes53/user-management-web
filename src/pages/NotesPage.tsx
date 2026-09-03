import { Link } from "react-router-dom";
import { clearToken } from "../core/auth/storage";

export default function NotesPage() {
    return (
        <div>
            <p>This is NotesPage</p>
            <Link to="/login" onClick={clearToken}>Logout</Link>
        </div>
    )
}