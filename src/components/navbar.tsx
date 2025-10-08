import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Salad, Menu, X, ShoppingCart, Trash2, Phone } from "lucide-react";
import { useCart } from "@/context/cartContext";
import { useTheme } from "@/context/themeContext";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setShowNavbar(true);
  }, []);

  const [lastScrollY, setLastScrollY] = useState(0);
  const { items, clearCart, plan, isCartOpen, openCartSidebar, closeCartSidebar, multiPlans, removeCurrentPlan, removeMultiPlanById, motherDayItems, removeMotherDayItem, decrementMotherDayItem } = useCart();
  const { theme } = useTheme();

  // Total de items en carrito actual
  const currentPlanTotal = items.reduce((acc, i) => acc + i.quantity, 0);

  // Total de items en planes guardados
  const savedPlansTotal = multiPlans.reduce((acc, mp) => acc + mp.quantity, 0);

  // Total de productos del Día de la Madre
  const motherDayTotal = motherDayItems.reduce((acc, item) => acc + item.quantity, 0);

  // Total general (planes guardados + plan actual + productos día de la madre)
  const totalItemsInCart = savedPlansTotal + currentPlanTotal + motherDayTotal;

  // Total precio de planes guardados
  const savedPlansPrice = multiPlans.reduce((acc, mp) => acc + mp.totalPrice, 0);

  // Total precio del plan actual
  const currentPlanPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Total precio de productos del Día de la Madre
  const motherDayPrice = motherDayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Total precio total general
  const totalPrice = savedPlansPrice + currentPlanPrice + motherDayPrice;

  // Manejo de scroll para mostrar/ocultar navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 400) {
        setShowNavbar(true);
      } else {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setShowNavbar(false);
        } else if (window.scrollY < lastScrollY) {
          setShowNavbar(true);
        }
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
        className={`fixed top-0 w-full ${theme.navbar} shadow-md z-[50] transition-transform duration-500 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Navbar desktop */}
        <div className="mx-auto max-w-5xl px-4 lg:block hidden">
          <div className="flex items-center justify-between w-full py-4">
            {/* Logo + Título */}
            <div className="flex items-center gap-3">
              <Salad className={`${theme.buttontext}`} size={55} strokeWidth={1.5} />
              <Link to="/">
                <div className="flex flex-col">
                  <h1 className={`text-3xl font-bold title3 tracking-widest ${theme.buttontext}`}>
                    Katyka
                  </h1>
                  <p className={`text-sm font-medium tracking-widest font-sans ${theme.buttontext}`}>
                    Comidas caseras saludables
                  </p>
                </div>
              </Link>
            </div>

            <ul className="flex items-center gap-6">
              <li>
                <Link to="/menu" className={`font-sans font-medium ${theme.buttontext} text-[16px]`}>
                  Menú
                </Link>
              </li>
              <li>
                <Link to="/pedidos" className={`font-sans font-medium ${theme.buttontext} text-[16px]`}>
                  Ordenar
                </Link>
              </li>
              <li>
                <Link to="/about" className={`font-sans font-medium ${theme.buttontext} text-[16px]`}>
                  Acerca de nosotros
                </Link>
              </li>
              {/* Icono Carrito */}
              <li className="relative">
                <button onClick={openCartSidebar} className={`relative cursor-pointer py-1 ${theme.buttontext}`}>
                  <ShoppingCart size={22} strokeWidth={2} />
                  {totalItemsInCart > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItemsInCart}
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
              <Salad className={`${theme.buttontext}`} size={40} strokeWidth={1.5} />
              <Link to="/">
                <div className="flex flex-col">
                  <h1 className={`text-2xl font-bold title3 tracking-widest ${theme.buttontext}`}>
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
                  {totalItemsInCart > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItemsInCart}
                    </span>
                  )}
                </button>
              </li>

              {/* Botón menú */}
              <button onClick={() => setOpenMenu(true)} className="py-2 px-3 focus:outline-none">
                <Menu className={theme.buttontext} size={28} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay menú móvil */}
      {openMenu && (
        <div className="fixed block lg:hidden inset-0 bg-black/60 h-screen z-[90]" onClick={() => setOpenMenu(false)} />
      )}

      {/* Sidebar menú móvil */}
      <div className={`fixed top-0 block lg:hidden right-0 h-screen w-64 ${theme.navbar} z-[110] transform transition-transform duration-300 ease-in-out ${openMenu ? "translate-x-0" : "translate-x-full"}`}>
        <div className={`flex items-center justify-end p-4 border-b ${theme.bordercolor}`}>
          <button onClick={() => setOpenMenu(false)}>
            <X className={theme.buttontext} size={28} />
          </button>
        </div>

        <ul className={`flex flex-col gap-6 p-6 ${theme.buttontext} text-lg`}>
          <li>
            <Link to="/menu" className={`${theme.buttontext} transition-colors`} onClick={() => setOpenMenu(false)}>
              Menú
            </Link>
          </li>
          <li>
            <Link to="/pedidos" className={`${theme.buttontext} transition-colors`} onClick={() => setOpenMenu(false)}>
              Ordenar
            </Link>
          </li>
          <li>
            <Link to="/about" className={`${theme.buttontext} transition-colors`} onClick={() => setOpenMenu(false)}>
              Acerca de nosotros
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay carrito */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 h-screen z-[120]" onClick={closeCartSidebar} />
      )}

      {/* Sidebar Carrito */}
      <div className={`fixed top-0 right-0 h-screen w-80 ${theme.cartbackground} shadow-2xl z-[130] transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b ${theme.bordermain} ${theme.plansBg}`}>
          <h2 className={`text-2xl sm:text-3xl font-semibold ${theme.title}`} style={{ fontFamily: "Times New Roman, serif" }}>
            Tu{" "}
            <span className={theme.titleSecond} style={{ fontFamily: "Times New Roman, serif" }}>
              Carrito
            </span>
          </h2>
          <button className={`cursor-pointer ${theme.title} hover:opacity-80 transition`} onClick={closeCartSidebar}>
            <X size={26} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex flex-col h-[calc(100%-70px)]">
          {/* Zona de scroll */}
          <div className="p-5 flex-1 flex flex-col gap-4 overflow-y-auto">
            {/* Estado vacío */}
            {items.length === 0 && multiPlans.length === 0 && motherDayItems.length === 0 ? (
              <div className={`flex flex-1 flex-col items-center justify-center ${theme.title}`}>
                <ShoppingCart size={55} strokeWidth={1.5} />
                <p className="mt-3 text-lg font-medium">Carrito vacío</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Planes guardados - cada plan individual */}
                {multiPlans.map((mp, idx) => (
                  <div key={idx} className={`${theme.plansBg} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`${theme.title} font-semibold`}>
                        Plan viandas {mp.planType === 'gran' ? 'grandes' : 'pequeñas'}
                      </h4>
                      <button
                        onClick={() => {
                          removeMultiPlanById(mp.planId);
                        }}
                        className={`${theme.icons} cursor-pointer hover:opacity-80 transition`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <ul className="space-y-2 mb-3">
                      {mp.items.map((item, itemIdx) => (
                        <li key={itemIdx} className={`${theme.text} text-sm flex items-center justify-between`}>
                          <span>• {item.name}</span>
                          <span className={`${theme.text} font-medium`}>x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`${theme.title} font-bold text-sm`}>
                      Total: ${mp.totalPrice.toLocaleString()}
                    </div>
                  </div>
                ))}

                {/* Plan actual */}
                {plan && items.length > 0 && (
                  <div className={`${theme.plansBg} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`${theme.title} font-semibold`}>
                        Plan viandas {plan.type === 'gran' ? 'grandes' : 'pequeñas'}
                      </h4>
                      <button
                        onClick={() => {
                          removeCurrentPlan();
                        }}
                        className={`${theme.icons} cursor-pointer hover:opacity-80 transition`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <ul className="space-y-2 mb-3">
                      {items.map((item) => (
                        <li key={item.id} className={`${theme.text} text-sm flex items-center justify-between`}>
                          <span>• {item.name}</span>
                          <span className={`${theme.text} font-medium`}>x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`${theme.title} font-bold text-sm`}>
                      Total: ${currentPlanPrice.toLocaleString()}
                    </div>
                  </div>
                )}

                {/* Productos del Día de la Madre */}
                {motherDayItems.length > 0 && (
                  <div className={`${theme.plansBg} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`${theme.title} font-semibold`}>
                        Productos Día de la Madre
                      </h4>
                      <button
                        onClick={() => {
                          motherDayItems.forEach(item => removeMotherDayItem(item.id));
                        }}
                        className={`${theme.icons} cursor-pointer hover:opacity-80 transition`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <ul className="space-y-2 mb-3">
                      {motherDayItems.map((item) => (
                        <li key={item.id} className={`${theme.text} text-sm flex items-center justify-between`}>
                          <span>• {item.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={`${theme.text} font-medium`}>x{item.quantity}</span>
                            <span className={`${theme.text} font-medium`}>${(item.price * item.quantity).toLocaleString()}</span>
                            <button
                              onClick={() => decrementMotherDayItem(item.id)}
                              className={`${theme.icons} cursor-pointer hover:opacity-80 transition`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className={`${theme.title} font-bold text-sm`}>
                      Total: ${motherDayPrice.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Resumen general */}
          {(items.length > 0 || multiPlans.length > 0 || motherDayItems.length > 0) && (
            <div className={`p-5 border-t ${theme.bordermain}`}>
              <div className="flex justify-between items-center">
                <span className={`text-lg font-semibold ${theme.text}`}>Resumen general:</span>
                <span className={`text-xl font-bold ${theme.title}`}>
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Footer - Botones */}
          {(items.length > 0 || multiPlans.length > 0 || motherDayItems.length > 0) && (
            <div className={`p-5 flex gap-3 ${theme.cartbackground} border-t ${theme.bordermain}`}>
              <button
                onClick={() => {
                  clearCart();
                  closeCartSidebar();
                  navigate("/pedidos");
                }}
                className={`flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-lg bg-gray-200 ${theme.textsecond} text-base px-3 py-2 shadow hover:bg-gray-300 transition-all duration-300`}
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Vaciar
              </button>

              <a
                href={
                  // SOLO productos del Día de la Madre (sin planes de vianda)
                  (motherDayItems.length > 0 && multiPlans.length === 0 && (!plan || items.length === 0))
                    ? `https://wa.me/+5491121911765?text=${encodeURIComponent(
                      `¡Hola! Quiero realizar mi pedido del Día de la Madre:\n\n` +
                      `PRODUCTOS DÍA DE LA MADRE:\n` +
                      `${motherDayItems.map((i) => `• ${i.name} x${i.quantity}`).join("\n")}\n\n` +
                      `Total: $${motherDayPrice.toLocaleString()}\n\n` +
                      `¡Quedo atenta a confirmación!`
                    )}`
                    : // Planes de vianda + productos del Día de la Madre (o solo planes)
                    (multiPlans.length > 0 || (plan && items.length > 0))
                      ? `https://wa.me/+5491121911765?text=${encodeURIComponent(
                        `¡Hola! Quiero realizar el siguiente pedido:\n\n` +

                        // Planes anteriores
                        `${multiPlans.length > 0
                          ? multiPlans.map((mp) =>
                            `Plan ${mp.quantity} viandas ${mp.planType === "gran" ? "grandes" : "pequeñas"}:\n` +
                            mp.items.map((i) => `• ${i.name} x${i.quantity}`).join("\n") +
                            `\nSubtotal: $${mp.totalPrice.toLocaleString()}\n\n`
                          ).join("")
                          : ""
                        }` +

                        // Plan actual
                        `${multiPlans.length > 0 && plan && items.length > 0 ? "" : ""}` +
                        `${plan && items.length > 0
                          ? `Plan ${plan.maxItems} viandas ${plan.type === "gran" ? "grandes" : "pequeñas"}:\n` +
                          items.map((i) => `• ${i.name} x${i.quantity}`).join("\n") +
                          `\nSubtotal: $${currentPlanPrice.toLocaleString()}\n\n`
                          : ""
                        }` +

                        // Productos Día de la Madre (si existen)
                        `${motherDayItems.length > 0
                          ? `PRODUCTOS DÍA DE LA MADRE:\n` +
                          motherDayItems.map((i) => `• ${i.name} x${i.quantity}`).join("\n") +
                          `\nSubtotal: $${motherDayPrice.toLocaleString()}\n\n`
                          : ""
                        }` +

                        `TOTAL FINAL: $${totalPrice.toLocaleString()}\n\n` +
                        `¡Quedo atento/a a confirmación y detalles de pago!`
                      )}`
                      : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg text-white text-base px-3 py-2 shadow-lg transition-all duration-300 ${motherDayItems.length > 0 || multiPlans.length > 0 || (plan && items.length > 0)
                    ? `${theme.buttoncolor} hover:${theme.buttonhovercolor} cursor-pointer`
                    : "bg-gray-400 cursor-not-allowed"
                  }`}
                style={{ fontFamily: "Times New Roman, serif" }}
                onClick={(e) => {
                  if (motherDayItems.length === 0 && multiPlans.length === 0 && (!plan || items.length === 0)) {
                    e.preventDefault();
                  } else {
                    setTimeout(() => {
                      clearCart();
                      navigate("/pedidos");
                    }, 1000);
                  }
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