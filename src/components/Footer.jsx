import React from 'react';
import { Code, BookOpen, Layers, Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p className="footer-dept">
          P. R. Pote Patil College of Engineering & Management, Amravati
        </p>
        <p style={{ marginBottom: '0.75rem' }}>
          Department of Computer Science & Engineering • Academic Year 2026–27
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
          <span className="badge-outline">
            <BookOpen size={12} /> Course: Programming Skills-I Lab (CS309PCC06)
          </span>
          <span className="badge-outline">
            <Code size={12} /> Practical No. 11: Habit Streak Tracker
          </span>
          <span className="badge-outline">
            <Layers size={12} /> React 19 + ES6 JS
          </span>
        </div>

        <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
          Implemented with Functional Components, Custom Hooks (<code>useToggle</code>, <code>useLocalStorage</code>, <code>useTheme</code>), Array Methods, Object Operations, and Web Audio API Synthesizer.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
