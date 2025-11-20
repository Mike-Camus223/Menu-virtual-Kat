import Navbar from '../components/navbar';
import React from 'react';
import Footer from '../components/Footer';
import { useTheme } from '@/context/themeContext';

interface PublicTemplateProps {
  children: React.ReactNode;
}

export default function PublicTemplate({ children }: PublicTemplateProps) {

  const {theme} = useTheme();

  return (
    <div className={`min-h-screen ${theme.background} flex flex-col overflow-x-hidden`}>
      <Navbar />
      {/* Fondo de hojas */}
      <div id="leafback"></div>
      <div className={`h-[76px] lg:h-[88px] ${theme.background} shrink-0`}></div>
      {/* Main ocupa todo el espacio disponible */}
      <main className="flex-1">{children}</main>
      {/* Footer al final */}
      <Footer />
    </div>
  );
}
