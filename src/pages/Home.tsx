"use client";

import Motherday from "@/components/anuncios/Motherday";
import Mainpage from "@/components/anuncios/PaginaPrincipal";
import { useTheme } from "@/context/themeContext";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {theme.name === "motherday" && <Motherday />}
          <Mainpage />
      </main>
    </div>
  );
}
