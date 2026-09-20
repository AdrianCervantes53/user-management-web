import { Link } from "react-router-dom";
import { clearToken } from "../../core/auth/storage";
import { useAuth } from "../../core/auth/AuthContext";
import { useState } from "react";
import "./NotesPage.css";

export default function NotesPage() {
  const {logout} = useAuth()
  const [searchQuery, setSearchQuery] = useState('');
  //const [notes] = useState<Note[]>(initialNotes);

  function handleNewNote() {
    
  }

  function handleSearchInput() {

  }

  return (
    <div className="notes-container">
      <header className="notes-header">
        <div className="notes-header-inner">
          <div className="notes-brand">
              <div className="notes-logo">
              <span className="material-symbols-outlined icon-20">description</span>
              </div>
              <div>
              <h1 className="notes-title">Notas</h1>
              <span className="notes-subtitle">Noteline</span>
              </div>
          </div>

          <div className="notes-search-container">
              <div className="relative-flex">
              <span className="material-symbols-outlined search-icon icon-18"></span>
              <input
                  className="notes-search-input"
                  id="search-input"
                  placeholder="Search note..."
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInput}
              />
              </div>
          </div>

          <div>
              <button
              className="notes-btn-primary"
              id="btn-new-note"
              onClick={handleNewNote}
              >
              <span className="material-symbols-outlined icon-18">add</span>
              <span>New note</span>
              </button>
          </div>
          <Link to="/login" onClick={logout}>Logout</Link>
          </div>
      </header>

      <main className="notes-main">
        <div className="notes-toolbar">
          <div className="notes-count-group">
              <span className="notes-section-title">All notes</span>
              <span className="notes-badge" id="notes-count-badge">
              X notes
              </span>
          </div>
          <div className="notes-sort-info">
              <span className="material-symbols-outlined icon-16">schedule</span>
              <span>Order most recent</span>
          </div>
        </div>
      </main>
    </div>
  )
}