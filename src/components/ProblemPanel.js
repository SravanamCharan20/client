'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProblemPanel({ problem }) {
  if (!problem) return <div className="solver-panel">Loading problem...</div>;

  return (
    <div className="solver-panel problem-panel">
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{problem.title}</h1>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ 
            padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem',
            backgroundColor: problem.difficulty === 'Easy' ? 'rgba(45, 212, 191, 0.1)' : problem.difficulty === 'Medium' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 113, 133, 0.1)',
            color: problem.difficulty === 'Easy' ? '#2dd4bf' : problem.difficulty === 'Medium' ? '#fbbf24' : '#fb7185'
          }}>
            {problem.difficulty}
          </span>
          {problem.tags?.map(tag => (
            <span key={tag} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ lineHeight: '1.7', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Description</h3>
        <div dangerouslySetInnerHTML={{ __html: problem.description.replace(/\\n/g, '<br/>') }} />
      </div>
    </div>
  );
}
