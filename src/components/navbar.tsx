import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Salad, Menu, X, ShoppingCart, Trash2, Phone } from "lucide-react";
import { useCart } from "@/context/cartContext";
import { useTheme } from "@/context/themeContext";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { items, removeItem, clearCart, plan, isCartOpen, openCartSidebar, closeCartSidebar } = useCart();
  const { theme } = useTheme();

  // Total de items en carrito
  const total = items.reduce((acc, i) => acc + i.quantity, 0);

  // Manejo de scroll para mostrar/ocultar navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
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
        className={`fixed top-0 w-full bg-gradient-to-r ${theme.navbar} shadow-md z-[20] transition-transform duration-500 ${showNavbar ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Navbar desktop */}
        <div className="mx-auto max-w-5xl px-4 lg:block hidden">
          <div className="flex items-center justify-between w-full py-4">
            {/* Logo + Título */}
            <div className="flex items-center gap-3">
              <Salad className='text-white' size={55} strokeWidth={1.5} />
              <Link to="/">
                <div className="flex flex-col">
                  <h1 className={`text-3xl font-bold title3 tracking-widest text-white`}>
                    Katyka
                  </h1>
                  <p className={`text-sm font-medium tracking-widest font-sans text-white`}>
                    Comidas caseras saludables
                  </p>
                </div>
              </Link>
            </div>

            <ul className="flex items-center gap-6">
              <li>
                <Link
                  to="/menu"
                  className={`font-sans font-medium ${theme.buttontext} text-[16px]`}
                >
                  Menú
                </Link>
              </li>
              <li>
                <Link
                  to="/pedidos"
                  className={`font-sans font-medium ${theme.buttontext} text-[16px]`}
                >
                  Ordenar
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`font-sans font-medium ${theme.buttontext} text-[16px]`}
                >
                  Acerca de nosotros
                </Link>
              </li>
              {/* Icono Carrito */}
              <li className="relative">
                <button onClick={openCartSidebar} className={`relative cursor-pointer py-1 ${theme.buttontext}`}>
                  <ShoppingCart size={22} strokeWidth={2} />
                  {total > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
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
              <Salad className='text-white' size={40} strokeWidth={1.5} />
              <Link to="/">
                <div className="flex flex-col">
                  <h1 className={`text-2xl font-bold title3 tracking-widest text-white`}>
                    Katyka
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Carrito móvil */}
              <li className="relative">
                <button onClick={openCartSidebar} className={`relative cursor-pointer py-1 ${theme.buttontext}`}>
                  <ShoppingCart size={22} strokeWidth={2} />
                  {total > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
                <Menu className={theme.buttontext} size={28} strokeWidth={2} />
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
        className={`fixed top-0 block lg:hidden right-0 h-screen w-64 ${theme.navbar} z-[110] transform transition-transform duration-300 ease-in-out ${openMenu ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className={`flex items-center justify-end p-4 border-b ${theme.bordercolor}`}>
          <button onClick={() => setOpenMenu(false)}>
            <X className={theme.buttontext} size={28} />
          </button>
        </div>

        <ul className={`flex flex-col gap-6 p-6 ${theme.buttontext} text-lg`}>
          <li>
            <Link
              to="/menu"
              className={`${theme.buttontext} transition-colors`}
              onClick={() => setOpenMenu(false)}
            >
              Menú
            </Link>
          </li>
          <li>
            <Link
              to="/pedidos"
              className={`${theme.buttontext} transition-colors`}
              onClick={() => setOpenMenu(false)}
            >
              Ordenar
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${theme.buttontext} transition-colors`}
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
          onClick={closeCartSidebar}
        />
      )}

      {/* Sidebar Carrito */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 ${theme.cartbackground} shadow-2xl z-[130] transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b ${theme.bordermain} ${theme.background}`}>
          <h2
            className={`text-2xl sm:text-3xl font-semibold ${theme.title}`}
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Tu{" "}
            <span
              className={theme.titleSecond}
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Carrito
            </span>
          </h2>
          <button
            className={`cursor-pointer ${theme.title} hover:opacity-80 transition`}
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
              <p className={`text-sm ${theme.textsecond} italic`}>
                Plan seleccionado: <b className={theme.title}>{plan.maxItems} viandas {plan.type === 'gran' ? 'grandes' : 'pequeñas'}</b>
              </p>
            )}

            {items.length === 0 ? (
              <div className={`flex flex-1 flex-col items-center justify-center ${theme.title}`}>
                <ShoppingCart size={55} strokeWidth={1.5} />
                <p className="mt-3 text-lg font-medium">Carrito vacío</p>
              </div>
            ) : (
              <div className="flex flex-col flex-1">
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between">
                      <span className={`${theme.text} font-medium`}>
                        {item.name} <span className={theme.textsecond}>x{item.quantity}</span>
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className={`${theme.icons} cursor-pointer hover:opacity-80 transition`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Total al final del contenido */}
                <div className={`mt-auto pt-4 border-t ${theme.bordermain}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-lg font-semibold ${theme.text}`}>Total:</span>
                    <span className={`text-xl font-bold ${theme.title}`}>
                      ${items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className={`p-5 flex gap-3 ${theme.cartbackground} border-t ${theme.bordermain}`}>
              {/* Vaciar */}
              <button
                onClick={clearCart}
                className={`flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-lg bg-gray-200 ${theme.textsecond} text-base px-3 py-2 shadow hover:bg-gray-300 transition-all duration-300`}
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Vaciar
              </button>

              {/* Comprar por WhatsApp */}
              <a
                href={total === (plan?.maxItems || 0) ? `https://wa.me/+5491121911765?text=${encodeURIComponent(
                  `Hola, me gustaría hacer un pedido:\n\n${items
                    .map((i) => `• ${i.name} x${i.quantity}`)
                    .join("\n")}\n\n${plan ? `Plan seleccionado: ${plan.maxItems} viandas ${plan.type === 'gran' ? 'grandes' : 'pequeñas'}` : ""}\n\nCosto total: $${items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString()}`
                )}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg ${theme.buttontext} text-base px-3 py-2 shadow-lg transition-all duration-300
  ${total === (plan?.maxItems || 0)
                    ? `${theme.buttoncolor} hover:${theme.buttonhovercolor} cursor-pointer`
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