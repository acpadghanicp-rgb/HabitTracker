import React, { useState } from 'react';
import { X, Lock, User, Mail, Sparkles } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, onLogin, onGuestLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanUsername = username.trim();
    if (!cleanUsername) {
      setError('Please enter your username');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    // In-browser mock authentication using localStorage
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');

    if (isSignUp) {
      const existing = users.find((u) => u.username.toLowerCase() === cleanUsername.toLowerCase());
      if (existing) {
        setError('Username is already taken. Please choose another.');
        return;
      }

      const newUser = {
        id: `user_${Date.now()}`,
        username: cleanUsername,
        name: cleanUsername,
        email: email.trim(),
        password,
      };

      users.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(users));
      onLogin(newUser);
      onClose();
    } else {
      const found = users.find(
        (u) => u.username.toLowerCase() === cleanUsername.toLowerCase() && u.password === password
      );

      if (!found) {
        // Allow automatic quick-login if demo user or register on the fly
        const autoUser = {
          id: `user_${cleanUsername.toLowerCase()}`,
          username: cleanUsername,
          name: cleanUsername,
        };
        onLogin(autoUser);
        onClose();
        return;
      }

      onLogin(found);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn-icon"
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Track streaks, build consistency, and level up your daily routine.
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '0.65rem 0.9rem',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: 'var(--danger-color)',
              fontSize: '0.825rem',
              marginBottom: '1rem',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <div style={{ position: 'relative' }}>
              <User
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                className="input-field"
                style={{ paddingLeft: '2.4rem' }}
                placeholder="e.g. AlexMorgan"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Email (Optional)</label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                />
                <input
                  type="email"
                  className="input-field"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="password"
                className="input-field"
                style={{ paddingLeft: '2.4rem' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.75rem' }}
          >
            {isSignUp ? 'Create Profile' : 'Sign In'}
          </button>
        </form>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '1.25rem 0',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <span style={{ padding: '0 0.75rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>

        {/* Quick Demo Preloaded Login Button */}
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: '100%', padding: '0.7rem' }}
          onClick={() => {
            onGuestLogin();
            onClose();
          }}
        >
          <Sparkles size={16} style={{ color: '#ec4899' }} />
          <span>Continue with Demo Guest Account</span>
        </button>

        <div style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.825rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
