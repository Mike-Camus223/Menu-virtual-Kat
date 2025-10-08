import { useEffect } from "react";
import { useTheme } from "./themeContext"; 

export function ThemeColorEffect() {
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined" || !theme) return;

    //  Crear un div temporal para obtener el color de Tailwind
    const temp = document.createElement("div");
    temp.className = theme.navbar || theme.background;
    document.body.appendChild(temp);

    const color = getComputedStyle(temp).backgroundColor;
    temp.remove();

    //  Convertir rgb(...) a hex (#RRGGBB) para compatibilidad amplia
    const rgbMatch = color.match(/\d+/g);
    const hex =
      rgbMatch && rgbMatch.length >= 3
        ? `#${rgbMatch
            .slice(0, 3)
            .map((x) => {
              const h = parseInt(x).toString(16);
              return h.length === 1 ? "0" + h : h;
            })
            .join("")}`
        : "#ffffff";

    //  Actualizar todos los meta tags relevantes (Chrome, Safari, Edge, Firefox)
    const metas = [
      { name: "theme-color", content: color },
      { name: "msapplication-navbutton-color", content: hex },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    ];

    metas.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });
  }, [theme]);

  return null;
}
