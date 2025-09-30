import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicTemplate from "./template/PublicTemplate";
import Home from "./pages/Home.tsx";
import Menu from "./pages/Menu.tsx";
import Order from "./pages/Order.tsx";
import About from "./pages/About.tsx";
import Plans from "./components/template/plans.tsx";



// Importar el provider
import { CartProvider } from "./context/cartContext";
import { ThemeProvider } from "./context/themeContext.tsx";

export default function App() {
  return (
    <CartProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PublicTemplate>
                  <Home></Home>
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
            {/* /pedidos ahora abre Plans */}
            <Route
              path="/pedidos"
              element={
                <PublicTemplate>
                  <Plans />
                </PublicTemplate>
              }
            />
            {/* /pedidos/order abre la pantalla de ordenes */}
            <Route
              path="/pedidos/order"
              element={
                <PublicTemplate>
                  <Order />
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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CartProvider>
  );
}