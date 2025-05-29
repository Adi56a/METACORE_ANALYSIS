import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Clear auth data
    localStorage.removeItem('isAuthenticated');

    // ⏩ Redirect to login
    navigate('/');
  }, [navigate]);

  return null; // No UI needed
}
