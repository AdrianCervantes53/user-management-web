export function NoteComponent() {
    return(
        {filteredNotes.length > 0 ? (
          <div className="notes-grid" id="notes-grid">
              {filteredNotes.map((note) => (
              <article key={note.id} className="note-card">
                  <div>
                  <div className="note-card-header">
                      <h2 className="note-card-title">{note.title}</h2>
                      <div className="note-card-actions">
                      <button
                          className="btn-edit"
                          title="Editar nota"
                          onClick={() => onEditNote && onEditNote(note.id)}
                      >
                          <span className="material-symbols-outlined icon-18">edit</span>
                      </button>
                      <button
                          className="btn-delete"
                          title="Eliminar nota"
                          onClick={() => onDeleteNote && onDeleteNote(note.id)}
                      >
                          <span className="material-symbols-outlined icon-18">delete</span>
                      </button>
                      </div>
                  </div>
                  <p className="note-card-content">{note.content}</p>
                  </div>
                  <div className="note-card-footer">
                  <time dateTime={note.datetime}>{note.date}</time>
                  <span className="note-tag">{note.tag}</span>
                  </div>
              </article>
              ))}
            </div>
            ) : (
            /* Estado vacío */
            <div className="empty-state" id="empty-state">
                <div className="empty-icon-wrapper">
                <span className="material-symbols-outlined icon-24">note_add</span>
                </div>
                <h3 className="empty-title">No hay notas todavía</h3>
                <p className="empty-description">
                Crea tu primera nota haciendo clic en el botón superior.
                </p>
            </div>
            )}
    )
}