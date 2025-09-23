import Navbar from '../components/navbar';
import React from 'react';
import Footer from '../components/Footer';

interface PublicTemplateProps {
  children: React.ReactNode;
}

export default function PublicTemplate({ children }: PublicTemplateProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Fondo de hojas */}
      <div id="leafback"></div>
      <div className="h-[76px] lg:h-[88px] bgunico shrink-0"></div>

      {/* Main ocupa todo el espacio disponible */}
      <main className="flex-1">{children}</main>

      {/* Footer al final */}
      <Footer />
    </div>
  );
}
