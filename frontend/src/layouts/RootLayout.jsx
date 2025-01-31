// src/layouts/RootLayout.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
        <Toaster position="bottom-right" richColors duration={3000} />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
