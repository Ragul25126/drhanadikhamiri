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

/* ── Helpers ── */
const statusColors: Record<string, string> = {
  pending: '#f59e0b', confirmed: '#10b981', completed: '#6366f1', cancelled: '#ef4444',
};
const statusLabels: Record<string, string> = {
  pending: '⏳ Pending', confirmed: '✅ Confirmed', completed: '🎉 Completed', cancelled: '✕ Cancelled',
};

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString('en-AE', { day: 'numeric', month: 'short' });
}

/* ═══════════════════════════════════════════════════════════
   MAIN ADMIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState<'bookings' | 'blog'>('bookings');

  // Check sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authed') === '1') {
      setAuthed(true);
    }
  }, []);

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
      sessionStorage.setItem('admin_authed', '1');
    } else {
      setPwError(true);
    }
  };

  if (!authed) {
    return (
      <div className="admin-shell">
        <div className="login-screen">
          <div className="login-card">
            <div className="login-logo">🦷</div>
            <h1>Admin Access</h1>
            <p>Dr. Hanadi Khamiri Clinic</p>
            <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
              <input
                type="password"
                className="login-input"
                placeholder="Enter password"
                value={pw}
                onChange={e => { setPw(e.target.value); setPwError(false); }}
                autoFocus
              />
              {pwError && <div className="login-error">Incorrect password</div>}
              <button type="submit" className="login-btn">Enter Dashboard</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div>
            <h1>{tab === 'bookings' ? 'Bookings' : 'Blog Posts'}</h1>
            <p className="admin-subtitle">Dr. Hanadi Khamiri</p>
          </div>
          <button className="logout-btn" onClick={() => { setAuthed(false); sessionStorage.removeItem('admin_authed'); }} aria-label="Logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </header>

      {/* Tab bar */}
      <div className="tab-bar">
        <button className={`tab-item ${tab === 'bookings' ? 'active' : ''}`} onClick={() => setTab('bookings')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/></svg>
          Bookings
        </button>
        <button className={`tab-item ${tab === 'blog' ? 'active' : ''}`} onClick={() => setTab('blog')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19,5V19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M14,17H7V15H14V17M17,13H7V11H17V13M17,9H7V7H17V9Z"/></svg>
          Blog
        </button>
      </div>

      {/* Content */}
      {tab === 'bookings' ? <BookingsPanel /> : <BlogPanel />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOOKINGS PANEL
   ═══════════════════════════════════════════════════════════ */
function BookingsPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setError('');
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBookings(data.bookings || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  return (
    <>
      {/* Stats */}
      <div className="stats-row">
        {([['all','Total','#C9A96E'],['pending','Pending','#f59e0b'],['confirmed','Confirmed','#10b981'],['completed','Done','#6366f1']] as const).map(([key, label, color]) => (
          <button key={key} className={`stat-chip ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)} style={{ '--chip-color': color } as React.CSSProperties}>
            <span className="stat-num">{counts[key]}</span>
            <span className="stat-label">{label}</span>
          </button>
        ))}
      </div>

      <main className="admin-content">
        {loading ? (
          <div className="admin-empty"><div className="loader" /><p>Loading bookings...</p></div>
        ) : error ? (
          <div className="admin-empty admin-error"><p>⚠️ {error}</p><button className="retry-btn" onClick={() => { setLoading(true); fetchBookings(); }}>Retry</button></div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty"><p>No {filter !== 'all' ? filter : ''} bookings yet</p></div>
        ) : (
          <ul className="booking-list">
            {filtered.map(b => {
              const isExpanded = expandedId === b.id;
              return (
                <li key={b.id} className={`booking-card ${isExpanded ? 'expanded' : ''}`} onClick={() => setExpandedId(isExpanded ? null : b.id)}>
                  <div className="card-top">
                    <div className="card-left">
                      <div className="avatar" style={{ background: statusColors[b.status] || '#888' }}>{b.patient_name.charAt(0).toUpperCase()}</div>
                      <div style={{ minWidth: 0 }}>
                        <h3 className="patient-name">{b.patient_name}</h3>
                        <p className="card-service">{b.service}</p>
                      </div>
                    </div>
                    <div className="card-right">
                      <span className="status-badge" style={{ background: `${statusColors[b.status]}18`, color: statusColors[b.status] }}>{statusLabels[b.status] || b.status}</span>
                      <span className="card-time">{timeAgo(b.created_at)}</span>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="card-details">
                      <a href={`tel:${b.phone}`} className="detail-action" onClick={e => e.stopPropagation()}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/></svg>
                        {b.phone}
                      </a>
                      <a href={`mailto:${b.email}`} className="detail-action" onClick={e => e.stopPropagation()}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/></svg>
                        {b.email}
                      </a>
                      <div className="detail-meta">Booked: {new Date(b.created_at).toLocaleString('en-AE', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   BLOG PANEL
   ═══════════════════════════════════════════════════════════ */
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosts(data.posts || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleCreate = async () => {
    if (!form.title || !form.category || !form.excerpt) return;
    setSaving(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      setForm({ title: '', category: '', excerpt: '', image: '', content: '' });
      setShowForm(false);
      setLoading(true);
      fetchPosts();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  return (
    <>
      {/* Action bar */}
      <div className="action-bar">
        <span className="post-count">{posts.length} post{posts.length !== 1 ? 's' : ''}</span>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ New Post'}
        </button>
      </div>

      {/* New post form */}
      {showForm && (
        <div className="blog-form-wrap">
          <div className="blog-form">
            <input className="form-input" placeholder="Post title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input className="form-input" placeholder="Category *" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <input className="form-input" placeholder="Image URL (optional)" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
            <textarea className="form-textarea" placeholder="Excerpt / summary *" rows={3} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
            <textarea className="form-textarea" placeholder="Full content (optional)" rows={5} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
            <button className="save-btn" onClick={handleCreate} disabled={saving || !form.title || !form.category || !form.excerpt}>
              {saving ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </div>
      )}

      <main className="admin-content">
        {loading ? (
          <div className="admin-empty"><div className="loader" /><p>Loading posts...</p></div>
        ) : error ? (
          <div className="admin-empty admin-error"><p>⚠️ {error}</p><button className="retry-btn" onClick={() => { setLoading(true); fetchPosts(); }}>Retry</button></div>
        ) : posts.length === 0 ? (
          <div className="admin-empty"><p>No blog posts yet. Tap &quot;+ New Post&quot; to create one.</p></div>
        ) : (
          <ul className="booking-list">
            {posts.map(p => (
              <li key={p.id} className="booking-card blog-card-admin">
                <div className="card-top">
                  <div className="card-left" style={{ minWidth: 0 }}>
                    <div className="avatar blog-avatar">📝</div>
                    <div style={{ minWidth: 0 }}>
                      <h3 className="patient-name">{p.title}</h3>
                      <p className="card-service">{p.category}</p>
                    </div>
                  </div>
                  <div className="card-right">
                    <span className="card-time">{timeAgo(p.created_at)}</span>
                  </div>
                </div>
                <p className="blog-excerpt">{p.excerpt}</p>
                <div className="blog-actions">
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
