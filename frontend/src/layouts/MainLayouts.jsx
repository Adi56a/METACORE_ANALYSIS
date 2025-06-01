import React from 'react';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="pt-20 px-4 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}
