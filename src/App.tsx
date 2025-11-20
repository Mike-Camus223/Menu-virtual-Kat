import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

// Templates
import PublicTemplate from "./template/PublicTemplate";

// Pages
import Home from "./pages/Home.tsx";
import Menu from "./pages/Menu.tsx";
import Order from "./pages/Order.tsx";
import About from "./pages/About.tsx";
import MotherdayOrder from "./pages/Motherdayorders.tsx";

// Components
import Plans from "./components/template/plans.tsx";

// Contexts
import { CartProvider } from "./context/cartContext";
import { ThemeProvider, useTheme } from "./context/themeContext.tsx";

// ===  EFECTO DE COLOR DINÁMICO PARA EL NAVEGADOR ===
export function ThemeColorEffect() {
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined" || !theme) return;
    const temp = document.createElement("div");
    temp.className = theme.navbar || theme.background;
    document.body.appendChild(temp);
    const color = getComputedStyle(temp).backgroundColor;
    temp.remove();
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

export default function App() {
  return (
    <CartProvider>
      <ThemeProvider>
        <ThemeColorEffect />

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PublicTemplate>
                  <Home />
                </PublicTemplate>
              }
            />

            <Route
              path="/menu"
              element={
                <PublicTemplate>
                  <Menu />
                </PublicTemplate>
              }
            />

            <Route
              path="/pedidos"
              element={
                <PublicTemplate>
                  <Plans />
                </PublicTemplate>
              }
            />

            <Route
              path="/pedidos/order"
              element={
                <PublicTemplate>
                  <Order />
                </PublicTemplate>
              }
            />

            <Route
              path="/pedidos/motherday"
              element={
                <PublicTemplate>
                  <MotherdayOrder />
                </PublicTemplate>
              }
            />

            <Route
              path="/about"
              element={
                <PublicTemplate>
                  <About />
                </PublicTemplate>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CartProvider>
  );
}
