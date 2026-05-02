'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '../store/useStore';

export default function Home() {
  const router = useRouter();
  const token = useStore((state) => state.token);
  const setToken = useStore((state) => state.setToken);

  useEffect(() => {
    // Check local storage on initial load
    const storedToken = localStorage.getItem('designcode_token');
    if (storedToken && !token) {
      setToken(storedToken);
      router.push('/dashboard');
    } else if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [token, router, setToken]);

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      Loading...
    </div>
  );
}
