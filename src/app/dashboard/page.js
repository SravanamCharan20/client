'use client';
import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const { token, problems, setProblems } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('designcode_token');
    if (!token && !storedToken) {
      router.push('/login');
      return;
    }
    if (!token && storedToken) {
      useStore.getState().setToken(storedToken);
    }

    const fetchProblems = async () => {
      try {
        const response = await api.get('/problems');
        if (response.data.success) {
          setProblems(response.data.data.problems);
        }
      } catch (error) {
        console.error("Failed to load problems");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [token, router, setProblems]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Problem Bank</h1>
        
        {loading ? (
          <p>Loading problems...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {problems.map((problem) => (
              <div key={problem._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{problem.title}</h3>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '12px', 
                    fontSize: '0.8rem',
                    backgroundColor: problem.difficulty === 'Easy' ? 'rgba(45, 212, 191, 0.1)' : problem.difficulty === 'Medium' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 113, 133, 0.1)',
                    color: problem.difficulty === 'Easy' ? '#2dd4bf' : problem.difficulty === 'Medium' ? '#fbbf24' : '#fb7185'
                  }}>
                    {problem.difficulty}
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {problem.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link href={`/problems/${problem._id}`} style={{ marginTop: 'auto' }}>
                  <button className="btn-primary" style={{ width: '100%' }}>Solve Problem</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
