'use client';
import { X, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

export default function FeedbackPanel({ feedback, onClose }) {
  if (!feedback) return null;

  const scoreColor = feedback.score >= 80 ? 'var(--success)' : feedback.score >= 50 ? '#fbbf24' : 'var(--error)';
  const scoreLabel = feedback.score >= 80 ? 'Strong answer' : feedback.score >= 50 ? 'Good start' : 'Needs work';

  return (
    <div style={{ 
      position: 'absolute', top: 0, right: 0, width: 'min(440px, 100vw)', height: '100vh', 
      backgroundColor: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)',
      boxShadow: '-10px 0 30px rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>AI Evaluation</h2>
        <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}><X size={20} /></button>
      </div>

      <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: scoreColor, lineHeight: 1 }}>
            {feedback.score}<span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/100</span>
          </div>
          <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{scoreLabel}</div>
        </div>

        <Section title="Strengths" items={feedback.strengths} icon={<CheckCircle size={18} color="var(--success)" />} />
        <Section title="Missing Points" items={feedback.missing} icon={<AlertTriangle size={18} color="var(--error)" />} />
        <Section title="Areas for Improvement" items={feedback.improvements} icon={<Lightbulb size={18} color="#fbbf24" />} />
      </div>
    </div>
  );
}

function Section({ title, items, icon }) {
  const visibleItems = Array.isArray(items) ? items.filter(Boolean) : [];
  if (visibleItems.length === 0) return null;
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {icon} {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {visibleItems.map((item, idx) => (
          <li key={idx} style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: '6px', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
