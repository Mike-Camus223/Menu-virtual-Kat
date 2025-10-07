import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { ThemeProvider } from "./context/themeContext.tsx";

export default function App() {
  return (
    <CartProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Home */}
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

            {/* Redirección automática a Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CartProvider>
  );
}
