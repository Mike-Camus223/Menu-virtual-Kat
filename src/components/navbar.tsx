import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Salad, Menu, X, ShoppingCart, Trash2, Phone } from "lucide-react";
import { useCart } from "@/context/cartContext";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { items, removeItem, clearCart, plan, isCartOpen, openCartSidebar, closeCartSidebar } = useCart();

  // Total de items en carrito
  const total = items.reduce((acc, i) => acc + i.quantity, 0);

  // Manejo de scroll para mostrar/ocultar navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false); // bajando → oculto
      } else {
        setShowNavbar(true); // subiendo → muestro
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full bg-gradient-to-r from-lime-800 to-green-800 shadow-md z-[20] transition-transform duration-500 ${showNavbar ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Navbar desktop */}
        <div className="mx-auto max-w-5xl px-4 lg:block hidden">
          <div className="flex items-center justify-between w-full py-4">
            {/* Logo + Título */}
            <div className="flex items-center gap-3">
              <Salad className="text-white" size={55} strokeWidth={1.5} />
              <Link to="/">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold title3 tracking-widest text-white">
                    Katyka
                  </h1>
                  <p className="text-sm font-medium tracking-widest font-sans text-white">
                    Comidas caseras saludables
                  </p>
                </div>
              </Link>
            </div>

            <ul className="flex items-center gap-6">
              <li>
                <Link
                  to="/menu"
                  className="font-sans font-medium text-white text-[16px]"
                >
                  Menú
                </Link>
              </li>
              <li>
                <Link
                  to="/pedidos"
                  className="font-sans font-medium text-white text-[16px]"
                >
                  Ordenar
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-sans font-medium text-white text-[16px]"
                >
                  Acerca de nosotros
                </Link>
              </li>
              {/* Icono Carrito */}
              <li className="relative">
                <button onClick={openCartSidebar} className="relative cursor-pointer py-1 text-white">
                  <ShoppingCart size={22} strokeWidth={2} />
                  {total > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {total}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Navbar móvil */}
        <div className="mx-auto max-w-5xl sm:max-w-4xl px-4 block lg:hidden">
          <div className="flex items-center justify-between w-full py-4">
            {/* Logo + Título */}
            <div className="flex items-center gap-3">
              <Salad className="text-white" size={40} strokeWidth={1.5} />
              <Link to="/">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold title3 tracking-widest text-white">
                    Katyka
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Carrito móvil */}
              <li className="relative">
                <button onClick={openCartSidebar} className="relative cursor-pointer py-1 text-white">
                  <ShoppingCart size={22} strokeWidth={2} />
                  {total > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {total}
                    </span>
                  )}
                </button>
              </li>

              {/* Botón menú */}
              <button
                onClick={() => setOpenMenu(true)}
                className="py-2 px-3 focus:outline-none"
              >
                <Menu className="text-white" size={28} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay menú móvil */}
      {openMenu && (
        <div
          className="fixed block lg:hidden inset-0 bg-black/60 h-screen z-[90]"
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* Sidebar menú móvil */}
      <div
        className={`fixed top-0 block lg:hidden right-0 h-screen w-64 bg-green-800 z-[110] transform transition-transform duration-300 ease-in-out ${openMenu ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-end p-4 border-b border-green-800">
          <button onClick={() => setOpenMenu(false)}>
            <X className="text-white" size={28} />
          </button>
        </div>

        <ul className="flex flex-col gap-6 p-6 text-white text-lg">
          <li>
            <Link
              to="/menu"
              className="text-white transition-colors"
              onClick={() => setOpenMenu(false)}
            >
              Menú
            </Link>
          </li>
          <li>
            <Link
              to="/pedidos"
              className="text-white transition-colors"
              onClick={() => setOpenMenu(false)}
            >
              Ordenar
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white transition-colors"
              onClick={() => setOpenMenu(false)}
            >
              Acerca de nosotros
            </Link>
          </li>
        </ul>

      </div>

      {/* Overlay carrito */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/60 h-screen z-[120]"
          onClick={closeCartSidebar} // cerrar al hacer click afuera
        />
      )}

      {/* Sidebar Carrito */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-[#FFFDFB] shadow-2xl z-[130] transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-300 bg-[#FFF6F0]">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-lime-800"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Tu{" "}
            <span
              className="text-amber-500"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Carrito
            </span>
          </h2>
          <button
            className="cursor-pointer text-lime-800 hover:text-lime-900 transition"
            onClick={closeCartSidebar}
          >
            <X size={26} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex flex-col h-[calc(100%-70px)]">
          {/* Zona de scroll */}
          <div className="p-5 flex-1 flex flex-col gap-4 overflow-y-auto">
            {/* Mostrar mensaje de plan solo si se seleccionó uno */}
            {plan && items.length > 0 && (
              <p className="text-sm text-gray-700 italic">
                Plan seleccionado: <b className="text-green-900">{plan.maxItems} viandas {plan.type === 'gran' ? 'grandes' : 'pequeñas'}</b>
              </p>
            )}

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-lime-800">
                <ShoppingCart size={55} strokeWidth={1.5} />
                <p className="mt-3 text-lg font-medium">Carrito vacío</p>
              </div>
            ) : (
              <div className="flex flex-col flex-1">
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium">
                        {item.name} <span className="text-gray-500">x{item.quantity}</span>
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-green-800 cursor-pointer hover:text-green-900 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
                
                {/* Total al final del contenido */}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total:</span>
                    <span className="text-xl font-bold text-green-900">
                      ${items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 flex gap-3 bg-[#FFF6F0] border-t border-gray-300">
              {/* Vaciar */}
              <button
                onClick={clearCart}
                className="flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-lg bg-gray-200 text-gray-700 text-base px-3 py-2 shadow hover:bg-gray-300 transition-all duration-300"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Vaciar
              </button>

              {/* Comprar por WhatsApp */}
              <a
                href={total === (plan?.maxItems || 0) ? `https://wa.me/+5491121911765?text=${encodeURIComponent(
                  `Hola, me gustaría hacer un pedido:\n\n${items
                    .map((i) => `• ${i.name} x${i.quantity}`)
                    .join("\n")}\n\n${plan ? `Plan seleccionado: ${plan.maxItems} viandas ${plan.type === 'gran' ? 'grandes' : 'pequeñas'}` : ""}`
                )}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg text-white text-base px-3 py-2 shadow-lg transition-all duration-300
                ${total === (plan?.maxItems || 0)
                    ? "bg-green-800 hover:bg-green-900 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                  }`}
                style={{ fontFamily: "Times New Roman, serif" }}
                onClick={(e) => {
                  if (total !== (plan?.maxItems || 0)) e.preventDefault();
                }}
              >
                <Phone size={20} strokeWidth={1.75} />
                Comprar
              </a>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default Navbar;
