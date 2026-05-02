'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '../store/useStore';
import { LayoutDashboard, LogOut } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useStore(state => state.logout);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('designcode_token');
    router.push('/login');
  };

  return (
    <aside style={{ width: '250px', backgroundColor: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'var(--accent-primary)' }}></div>
          DesignCode
        </h2>
      </div>

      <nav style={{ padding: '1.5rem 1rem', flex: 1 }}>
        <Link href="/dashboard" style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
          borderRadius: '8px', color: pathname === '/dashboard' ? 'white' : 'var(--text-secondary)',
          backgroundColor: pathname === '/dashboard' ? 'rgba(92, 103, 255, 0.1)' : 'transparent',
          transition: 'all 0.2s ease', fontWeight: pathname === '/dashboard' ? '500' : '400'
        }}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
      </nav>

      <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--border-color)' }}>
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
          borderRadius: '8px', color: 'var(--text-secondary)', width: '100%', textAlign: 'left',
          transition: 'all 0.2s ease'
        }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--error)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
