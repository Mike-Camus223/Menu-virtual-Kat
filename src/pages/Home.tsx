"use client";

import Motherday from "@/components/anuncios/Motherday";
import Mainpage from "@/components/anuncios/PaginaPrincipal";
import { useTheme } from "@/context/themeContext";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Solo se muestra Motherday si el tema activo es "motherday" */}
        {theme.name === "motherday" && <Motherday />}
        
        {/* Página principal siempre visible */}
        <Mainpage />
      </main>
    </div>
  );
}
