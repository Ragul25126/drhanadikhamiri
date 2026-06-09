'use client';

import { useState, useEffect, useCallback } from 'react';
import './admin.css';

const ADMIN_PASSWORD = '12345';

/* ── Types ── */
type Booking = {
  id: string;
  service: string;
  patient_name: string;
  phone: string;
  email: string;
  status: string;
  notes: string;
  created_at: string;
};

type BlogPost = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
  created_at: string;
};

/* ── Constants ── */
const STATUSES = ['booked', 'confirmed', 'visited', 'completed', 'cancelled'] as const;

const STATUS_META: Record<string, { label: string; color: string }> = {
  booked:    { label: 'Booked',    color: '#6366f1' },
  confirmed: { label: 'Confirmed', color: '#0ea5e9' },
  visited:   { label: 'Visited',   color: '#f59e0b' },
  completed: { label: 'Completed', color: '#10b981' },
  cancelled: { label: 'Cancelled', color: '#94a3b8' },
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' });
}
function formatTime(d: string) {
  return new Date(d).toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' });
}

/* ═══════════════════════════════════════
   ROOT
   ═══════════════════════════════════════ */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState<'bookings' | 'blog'>('bookings');

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authed') === '1') setAuthed(true);
  }, []);

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); sessionStorage.setItem('admin_authed', '1'); }
    else setPwError(true);
  };

  /* ── Login ── */
  if (!authed) {
    return (
      <div className="adm">
        <div className="login-screen">
          <div className="login-card">
            <div className="login-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
            <h1>Admin Panel</h1>
            <p>Dr. Hanadi Khamiri Clinic</p>
            <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
              <input type="password" className="login-input" placeholder="Password" value={pw} onChange={e => { setPw(e.target.value); setPwError(false); }} autoFocus />
              {pwError && <div className="login-error">Incorrect password</div>}
              <button type="submit" className="login-btn">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="adm">
      <header className="adm-header">
        <div className="adm-top-row">
          <div className="adm-brand">
            <span className="adm-name">Dr. Hanadi Khamiri</span>
            <span className="adm-sub">Clinic Dashboard</span>
          </div>
          <button className="adm-icon-btn" onClick={() => { setAuthed(false); sessionStorage.removeItem('admin_authed'); }} title="Sign out">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
        <nav className="adm-tabs">
          <button className={`adm-tab ${tab === 'bookings' ? 'active' : ''}`} onClick={() => setTab('bookings')}>Appointments</button>
          <button className={`adm-tab ${tab === 'blog' ? 'active' : ''}`} onClick={() => setTab('blog')}>Blog</button>
        </nav>
      </header>

      {tab === 'bookings' ? <BookingsPanel /> : <BlogPanel />}
    </div>
  );
}

/* ═══════════════════════════════════════
   BOOKINGS PANEL
   ═══════════════════════════════════════ */
function BookingsPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ patient_name: '', phone: '', email: '', service: '' });
  const [notesId, setNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [saving, setSaving] = useState(false);

  const fetch_ = useCallback(async () => {
    try {
      setError('');
      const res = await fetch('/api/bookings');
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      setBookings(d.bookings || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const updateBooking = async (id: string, updates: Record<string, unknown>) => {
    setSaving(true);
    try {
      const res = await fetch('/api/bookings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...updates }) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      const d = await res.json();
      setBookings(prev => prev.map(b => b.id === id ? d.booking : b));
    } catch (e: unknown) { alert(e instanceof Error ? e.message : 'Update failed'); }
    finally { setSaving(false); }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this appointment permanently?')) return;
    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setBookings(prev => prev.filter(b => b.id !== id));
      setActiveId(null);
    } catch { alert('Failed to delete'); }
  };

  const startEdit = (b: Booking) => {
    setEditId(b.id);
    setEditForm({ patient_name: b.patient_name, phone: b.phone, email: b.email, service: b.service });
  };

  const saveEdit = async () => {
    if (!editId) return;
    await updateBooking(editId, editForm);
    setEditId(null);
  };

  const startNotes = (b: Booking) => {
    setNotesId(b.id);
    setNotesDraft(b.notes || '');
  };

  const saveNotes = async () => {
    if (!notesId) return;
    await updateBooking(notesId, { notes: notesDraft });
    setNotesId(null);
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
  const counts: Record<string, number> = { all: bookings.length };
  STATUSES.forEach(s => { counts[s] = bookings.filter(b => b.status === s).length; });

  return (
    <>
      {/* Filter bar */}
      <div className="filter-bar">
        <button className={`filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All <span className="chip-count">{counts.all}</span>
        </button>
        {STATUSES.map(s => (
          <button key={s} className={`filter-chip ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)} style={{ '--c': STATUS_META[s].color } as React.CSSProperties}>
            {STATUS_META[s].label} <span className="chip-count">{counts[s] || 0}</span>
          </button>
        ))}
      </div>

      <main className="adm-main">
        {loading ? (
          <div className="adm-empty"><div className="spinner" /><p>Loading appointments...</p></div>
        ) : error ? (
          <div className="adm-empty"><p className="err-text">{error}</p><button className="btn-sm" onClick={() => { setLoading(true); fetch_(); }}>Retry</button></div>
        ) : filtered.length === 0 ? (
          <div className="adm-empty"><p>No {filter !== 'all' ? filter : ''} appointments</p></div>
        ) : (
          <div className="card-list">
            {filtered.map(b => {
              const open = activeId === b.id;
              const meta = STATUS_META[b.status] || { label: b.status, color: '#888' };
              return (
                <div key={b.id} className={`card ${open ? 'open' : ''}`}>
                  <div className="card-row" onClick={() => setActiveId(open ? null : b.id)}>
                    <div className="card-avatar" style={{ background: meta.color }}>{b.patient_name.charAt(0).toUpperCase()}</div>
                    <div className="card-info">
                      <span className="card-name">{b.patient_name}</span>
                      <span className="card-svc">{b.service}</span>
                    </div>
                    <div className="card-end">
                      <span className="badge" style={{ background: `${meta.color}14`, color: meta.color, borderColor: `${meta.color}30` }}>{meta.label}</span>
                      <span className="card-date">{formatDate(b.created_at)}</span>
                    </div>
                  </div>

                  {open && (
                    <div className="card-body">
                      {/* Contact */}
                      <div className="detail-grid">
                        <a href={`tel:${b.phone}`} className="detail-item" onClick={e => e.stopPropagation()}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                          <span>{b.phone}</span>
                        </a>
                        <a href={`mailto:${b.email}`} className="detail-item" onClick={e => e.stopPropagation()}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                          <span>{b.email}</span>
                        </a>
                      </div>
                      <div className="detail-time">Submitted {formatDate(b.created_at)} at {formatTime(b.created_at)}</div>

                      {/* Notes */}
                      {b.notes && <div className="notes-display"><span className="notes-label">Notes</span>{b.notes}</div>}

                      {/* Status selector */}
                      <div className="status-section">
                        <span className="section-label">Update Status</span>
                        <div className="status-pills">
                          {STATUSES.map(s => (
                            <button key={s} className={`pill ${b.status === s ? 'active' : ''}`}
                              style={{ '--c': STATUS_META[s].color } as React.CSSProperties}
                              disabled={saving || b.status === s}
                              onClick={() => updateBooking(b.id, { status: s })}>
                              {STATUS_META[s].label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="action-row">
                        <button className="btn-sm" onClick={() => startNotes(b)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                          {b.notes ? 'Edit Notes' : 'Add Notes'}
                        </button>
                        <button className="btn-sm" onClick={() => startEdit(b)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          Edit
                        </button>
                        <button className="btn-sm btn-danger" onClick={() => deleteBooking(b.id)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Notes modal */}
      {notesId && (
        <div className="modal-overlay" onClick={() => setNotesId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Appointment Notes</h3>
            <textarea className="modal-textarea" rows={5} value={notesDraft} onChange={e => setNotesDraft(e.target.value)} placeholder="Add clinical notes, follow-up reminders..." autoFocus />
            <div className="modal-actions">
              <button className="btn-sm" onClick={() => setNotesId(null)}>Cancel</button>
              <button className="btn-sm btn-primary" onClick={saveNotes} disabled={saving}>{saving ? 'Saving...' : 'Save Notes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editId && (
        <div className="modal-overlay" onClick={() => setEditId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Edit Appointment</h3>
            <div className="modal-fields">
              <label>Patient Name<input className="modal-input" value={editForm.patient_name} onChange={e => setEditForm({ ...editForm, patient_name: e.target.value })} /></label>
              <label>Phone<input className="modal-input" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} /></label>
              <label>Email<input className="modal-input" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} /></label>
              <label>Service<input className="modal-input" value={editForm.service} onChange={e => setEditForm({ ...editForm, service: e.target.value })} /></label>
            </div>
            <div className="modal-actions">
              <button className="btn-sm" onClick={() => setEditId(null)}>Cancel</button>
              <button className="btn-sm btn-primary" onClick={saveEdit} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════
   BLOG PANEL
   ═══════════════════════════════════════ */
function BlogPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', excerpt: '', image: '', content: '' });

  const fetchPosts = useCallback(async () => {
    try {
      setError('');
      const res = await fetch('/api/blog');
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      setPosts(d.posts || []);
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Failed'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleCreate = async () => {
    if (!form.title || !form.category || !form.excerpt) return;
    setSaving(true);
    try {
      const res = await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      setForm({ title: '', category: '', excerpt: '', image: '', content: '' });
      setShowForm(false);
      setLoading(true); fetchPosts();
    } catch (e: unknown) { alert(e instanceof Error ? e.message : 'Failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch { alert('Failed to delete'); }
  };

  return (
    <>
      <div className="toolbar">
        <span className="toolbar-label">{posts.length} post{posts.length !== 1 ? 's' : ''}</span>
        <button className="btn-sm btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : '+ New Post'}</button>
      </div>

      {showForm && (
        <div className="form-card">
          <input className="modal-input" placeholder="Post title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input className="modal-input" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          <input className="modal-input" placeholder="Image URL (optional)" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <textarea className="modal-textarea" placeholder="Excerpt / summary" rows={3} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
          <textarea className="modal-textarea" placeholder="Full content (optional)" rows={5} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
          <button className="btn-sm btn-primary full-w" onClick={handleCreate} disabled={saving || !form.title || !form.category || !form.excerpt}>{saving ? 'Publishing...' : 'Publish Post'}</button>
        </div>
      )}

      <main className="adm-main">
        {loading ? (
          <div className="adm-empty"><div className="spinner" /><p>Loading posts...</p></div>
        ) : error ? (
          <div className="adm-empty"><p className="err-text">{error}</p><button className="btn-sm" onClick={() => { setLoading(true); fetchPosts(); }}>Retry</button></div>
        ) : posts.length === 0 ? (
          <div className="adm-empty"><p>No blog posts yet</p></div>
        ) : (
          <div className="card-list">
            {posts.map(p => (
              <div key={p.id} className="card">
                <div className="card-row">
                  <div className="card-avatar blog-av">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div className="card-info">
                    <span className="card-name">{p.title}</span>
                    <span className="card-svc">{p.category}</span>
                  </div>
                  <span className="card-date">{formatDate(p.created_at)}</span>
                </div>
                <p className="blog-excerpt">{p.excerpt}</p>
                <div className="action-row" style={{ borderTop: '1px solid var(--border)', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
                  <button className="btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
