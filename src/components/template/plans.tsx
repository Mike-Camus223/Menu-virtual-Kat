import { Package, RefreshCw, CheckCircle, Wheat, Cake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/cartContext";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/themeContext";

export default function Plans() {
  const navigate = useNavigate();
  const { setPlan, plan, items, clearCart, clearItems, addMultiPlan } = useCart();
  const [showProgressModal, setShowProgressModal] = useState(false);
  const { theme } = useTheme();

  const planOptions = [
    {
      id: 7,
      name: "Plan 7 Viandas Grandes",
      type: "gran" as const,
      icon: Package,
      maxItems: 7,
      popular: true,
    },
    {
      id: 8,
      name: "Plan 7 Viandas Pequeñas",
      type: "peq" as const,
      icon: Package,
      maxItems: 7,
      popular: false,
    },
  ];

  const totalInCart = items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
  // Solo mostrar modal si hay plan Y items, pero NO si acabamos de agregar un multiplan
  if (plan !== null && items.length > 0) {
    setShowProgressModal(true);
  } else {
    setShowProgressModal(false);
  }
}, [plan, items.length]);

  const selectPlan = (planOption: typeof planOptions[number]) => {
    setPlan({
      id: planOption.id,
      type: planOption.type,
      maxItems: planOption.maxItems,
    });
    navigate("/pedidos/order");
  };

  const continueToPreviousPlan = () => {
    setShowProgressModal(false);
    navigate("/pedidos/order");
  };

  const startNewPlan = () => {
    clearCart();
    setShowProgressModal(false);
  };

  const addNewPlan = () => {
  if (plan && totalInCart === plan.maxItems) {
    const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    // 1. Generar ID único para este plan guardado
    const uniquePlanId = Date.now();
    
    // 2. Guardar el plan actual con ID único
    addMultiPlan({
      planId: uniquePlanId,
      planType: plan.type,
      quantity: plan.maxItems,
      totalPrice: totalPrice,
      items: [...items]
    });
    
    // 3. Limpiar todo para permitir nuevo plan
    clearItems();
    
    // 4. Cerrar el modal
    setShowProgressModal(false);
    
    // 5. Limpiar el plan para desbloquear botones
    // Usamos un pequeño delay para que el modal se cierre primero
    setTimeout(() => {
      // Forzar limpieza del plan sin usar clearCart (que borraría multiPlans)
      setPlan(null as any);
    }, 200);
  }
};

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fondo dividido */}
      <div className="absolute inset-0">
        <div className={`h-1/2 ${theme.background}`} />
        <div className={`h-1/2 ${theme.plansBg}`} />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-10">
        {/* Título */}
        <div className="mb-7">
          <h1
            className={`text-3xl sm:text-4xl text-shadow-lg md:text-5xl font-semibold ${theme.title} mb-4`}
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            VIANDAS{" "}
            <span
              className={`${theme.titleSecond} text-shadow-lg`}
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              SALUDABLES
            </span>
          </h1>
        </div>

        {/* Cards */}
        <div className={`grid gap-6 w-full max-w-4xl md:max-w-5xl ${
          theme.name === "motherday" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1 sm:grid-cols-2"
        }`}>
          {planOptions.map((planOption) => (
            <div
              key={planOption.id}
              className={`relative group ${theme.cardbackground} ${theme.bordermain} border-1 rounded-xl transition-all duration-400 shadow-xl hover:shadow-2xl overflow-hidden`}
            >
              <div className="absolute top-5 right-2 z-1">
                <Wheat
                  className={`
                    ${theme.iconssecond}
                    w-32 h-32
                    sm:w-36 sm:h-36
                    md:w-40 md:h-40
                    lg:w-44 lg:h-44
                    xl:w-48 xl:h-48
                  `}
                  strokeWidth={2}
                />
              </div>
              <div className="p-4 relative z-2 sm:p-4 text-center space-y-5">
                {/* Icono */}
                <div
                  className={`w-20 h-20 mx-auto rounded-full border-3 ${theme.bordercolor} flex items-center justify-center`}
                >
                  <Package size={36} className={`${theme.icons} font-bold`} />
                </div>

                {/* Nombre */}
                <div className="flex flex-col gap-2">
                  <h2
                    className={`text-3xl sm:text-3xl text-shadow-lg md:text-2xl font-semibold ${theme.text} mb-4`}
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    {planOption.name.toUpperCase()}
                  </h2>
                </div>

                {/* Detalles */}
                <div className="flex flex-col items-center mb-4">
                  <div className={`text-3xl sm:text-4xl ${theme.text} font-bold`}>
                    {planOption.maxItems}
                  </div>
                  <div className={`${theme.text} font-bold text-sm sm:text-base mt-1`}>
                    Viandas Incluidas
                  </div>
                </div>

                {/* Beneficios */}
                <div className="rounded-xl p-4">
                  <ul
                    className={`space-y-1 ${theme.text} font-bold text-sm sm:text-base`}
                  >
                    <li>Ingredientes frescos y naturales</li>
                    <li>Preparación casera artesanal</li>
                    <li>Entrega a domicilio gratuita</li>
                  </ul>
                </div>

                {/* Botón - DISABLED cuando hay un plan activo */}
                <div className="w-full flex justify-center py-3 md:py-3 px-4">
                  <button
                    onClick={() => selectPlan(planOption)}
                    disabled={plan !== null && items.length > 0}
                    className={`w-full rounded-lg text-base md:text-lg font-serif px-3 py-2 shadow-lg transition-all duration-300 ${
                      plan !== null && items.length > 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : `${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} hover:scale-105 active:scale-95 cursor-pointer`
                    }`}
                  >
                    Continuar
                  </button>
                </div>
                <p className={`text-xs ${theme.text} font-bold sm:text-sm`}>
                  * Podrás personalizar tus viandas en el siguiente paso
                </p>
              </div>
            </div>
          ))}

          {/* EXTRA CARD para día de la madre */}
          {theme.name === "motherday" && (
            <div
              className={`relative group ${theme.cardbackground} ${theme.bordermain} border-1 rounded-xl transition-all duration-400 shadow-xl hover:shadow-2xl overflow-hidden`}
            >
              <div className="absolute top-5 right-2 z-1">
                <Cake
                  className={`
                    ${theme.iconssecond}
                    w-32 h-32
                    sm:w-36 sm:h-36
                    md:w-40 md:h-40
                    lg:w-44 lg:h-44
                    xl:w-48 xl:h-48
                  `}
                  strokeWidth={2}
                />
              </div>
              <div className="p-4 relative z-2 sm:p-4 text-center space-y-5">
                <div
                  className={`w-20 h-20 mx-auto rounded-full border-3 ${theme.bordercolor} flex items-center justify-center`}
                >
                  <Cake size={36} className={`${theme.icons} font-bold`} />
                </div>

                <div className="flex flex-col gap-2">
                  <h2
                    className={`text-3xl sm:text-3xl text-shadow-lg md:text-2xl font-semibold ${theme.text} mb-4`}
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    ESPECIAL DÍA DE LA MADRE
                  </h2>
                </div>

                <div className="flex flex-col items-center mb-4">
                  <div className={`text-3xl sm:text-4xl ${theme.text} font-bold`}>
                    Un regalo único
                  </div>
                  <div className={`${theme.text} font-bold text-sm sm:text-base mt-1`}>
                    Incluye postre y sorpresa especial
                  </div>
                </div>

                <div className="rounded-xl p-4">
                  <ul
                    className={`space-y-1 ${theme.text} font-bold text-sm sm:text-base`}
                  >
                    <li>Ingredientes frescos y naturales</li>
                    <li>Preparación casera artesanal</li>
                    <li>Entrega a domicilio gratuita</li>
                  </ul>
                </div>

                <div className="w-full flex justify-center py-3 md:py-3 px-4">
                  <button
                    onClick={() => navigate("/pedidos/motherday")}
                    className={`w-full rounded-lg ${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} text-base md:text-lg font-serif hover:scale-105 active:scale-95 px-3 py-2 shadow-lg cursor-pointer transition-all duration-300`}
                  >
                    Ver Detalles
                  </button>
                </div>
                <p className={`text-xs ${theme.text} font-bold sm:text-sm`}>
                  * Podrás personalizar tus productos en el siguiente paso
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de progreso - CON BOTÓN "AGREGAR NUEVO PLAN" */}
      {showProgressModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 px-4">
          <div className={`${theme.background} rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl space-y-5`}>
            <h3 className={`text-xl md:text-2xl font-bold ${theme.title}`}>
              Selección Guardada
            </h3>

            <div className={`${theme.plansBg} rounded-full px-4 mt-2 py-2 inline-block`}>
              <span className={`${theme.text} font-semibold`}>
                Plan de {plan?.maxItems || 7} viandas{" "}
                {plan?.type === "gran" ? "grandes" : "pequeñas"}
              </span>
            </div>

            <div className={`${theme.plansBg} rounded-full px-4 mt-2 py-2 inline-block`}>
              <span className={`${theme.text} font-semibold`}>
                Selección: {totalInCart}/{plan?.maxItems || 7} viandas
              </span>
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <button
                onClick={continueToPreviousPlan}
                className={`w-full hover:scale-105 active:scale-95 duration-300 transition-all flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg ${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} font-medium text-base shadow-lg`}
              >
                <CheckCircle size={23} />
                Continuar
              </button>
              
              {/* BOTÓN "AGREGAR NUEVO PLAN" - solo aparece si completó el plan */}
              {totalInCart === plan?.maxItems && (
                <button
                  onClick={addNewPlan}
                  className={`w-full hover:scale-105 active:scale-95 duration-300 transition-all flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium text-base shadow-lg`}
                >
                  <CheckCircle size={23} />
                  Agregar Nuevo Plan
                </button>
              )}
              
              <button
                onClick={startNewPlan}
                className={`w-full hover:scale-105 active:scale-95 duration-300 transition-all flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg ${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} font-medium text-base shadow-lg`}
              >
                <RefreshCw size={23} />
                Empezar de Nuevo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}