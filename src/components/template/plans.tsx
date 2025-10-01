import { Package, RefreshCw, CheckCircle, Wheat, Cake } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/cartContext";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/themeContext";

export default function Plans() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPlan, plan, items, clearCart, clearItems, addMultiPlan, addMotherDayItem, motherDayItems, clearMotherDayItems } = useCart();
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
  const [isMotherDayButtonEnabled, setIsMotherDayButtonEnabled] = useState(false);
  const [isAddingNewPlan, setIsAddingNewPlan] = useState(false);
  const [justReturnedFromMotherDay, setJustReturnedFromMotherDay] = useState(false);
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
  // Lógica mejorada para mostrar el modal correctamente
  const comingFromOrder = location.pathname === "/pedidos/order";
  const comingFromMotherDay = location.pathname === "/pedidos/motherday";
  
  if (isAddingNewPlan) {
    // SI ESTAMOS AGREGANDO UN NUEVO PLAN: BLOQUEAR CUALQUIER APARICIÓN DE MODAL
    // Esto previene el DOBLE MODAL definitivamente
    setShowProgressModal(false);
    setIsButtonsDisabled(false);
    return; // SALIR INMEDIATAMENTE - NO MOSTRAR NINGÚN MODAL
  }
  
  // PRIORIDAD 1: Si acabamos de regresar de seleccionar tortas, MOSTRAR modal con productos día de la madre
  if (justReturnedFromMotherDay) {
    setShowProgressModal(true);
    setIsButtonsDisabled(true);
    setJustReturnedFromMotherDay(false);
    return;
  }
  
  // PRIORIDAD 2: Si venimos de seleccionar tortas (Motherday) y tenemos tortas, MOSTRAR modal
  if (comingFromMotherDay && motherDayItems.length > 0) {
    setShowProgressModal(true);
    setIsButtonsDisabled(true);
    setJustReturnedFromMotherDay(true);
    return;
  }
  
  // PRIORIDAD 3: Si hay tortas (independientemente de si hay plan o no), MOSTRAR modal de tortas
  if (motherDayItems.length > 0) {
    setShowProgressModal(true);
    setIsButtonsDisabled(true);
    return;
  }
  
  // PRIORIDAD 4: Si hay un plan activo con items, mostrar modal de plan
  if (plan !== null && items.length > 0) {
    setShowProgressModal(true);
    setIsButtonsDisabled(true);
    return;
  }
  
  // PRIORIDAD 5: Si venimos de Order.tsx y solo hay productos del Día de la Madre, mostrar modal
  if (comingFromOrder && motherDayItems.length > 0 && items.length === 0) {
    setShowProgressModal(true);
    setIsButtonsDisabled(true);
    return;
  }
  
  // CASO 6: No hay nada, ocultar modal
  setShowProgressModal(false);
  setIsButtonsDisabled(false);
  }, [plan, items.length, motherDayItems.length, location.pathname, isAddingNewPlan, justReturnedFromMotherDay]);

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
    // Si viene de motherdayorders, volver allí
    if (location.pathname === "/pedidos/motherday") {
      navigate("/pedidos/motherday");
    } else if (motherDayItems.length > 0 && !plan) {
      // Si solo hay productos del Día de la Madre, ir a motherday
      navigate("/pedidos/motherday");
    } else {
      // Si hay un plan activo, ir a order
      navigate("/pedidos/order");
    }
  };

  const startNewPlan = () => {
    // Vaciar TODO: carrito, plan, y resetear estados
    clearCart();
    setPlan(null as any);
    setIsButtonsDisabled(false);
    setIsMotherDayButtonEnabled(false);
    setShowProgressModal(false);
  };

  const addNewPlan = () => {
    // 1. Marcar que estamos agregando un nuevo plan para prevenir doble modal
    setIsAddingNewPlan(true);
    
    // 2. Si hay plan activo con items, guardarlo como multi-plan
    if (plan && items.length > 0) {
      // 3. Generar ID único para este plan guardado
      const uniquePlanId = Date.now();
      
      // 4. Calcular el precio total (precio base por cantidad)
      const basePrice = plan.type === "gran" ? 3500 : 2800;
      const totalPrice = basePrice * plan.maxItems;
      
      // 5. Guardar el plan actual con ID único
      addMultiPlan({
        planId: uniquePlanId,
        planType: plan.type,
        quantity: plan.maxItems,
        totalPrice: totalPrice,
        items: [...items]
      });
      
      // 6. Limpiar items del plan actual
      clearItems();
    }
    
    // 7. Cerrar el modal primero
    setShowProgressModal(false);
    
    // 8. Limpiar el plan para desbloquear botones (siempre, para poder seleccionar nuevo plan)
    setPlan(null as any);
    
    // 9. Habilitar los botones de planes
    setIsButtonsDisabled(false);
    
    // 10. Si hay tortas, limpiar las tortas también para permitir nuevo plan
    if (motherDayItems.length > 0) {
      clearMotherDayItems();
    }
    
    // 11. **ESPERAR MÁS TIEMPO** para asegurar que TODO el estado se actualice antes de resetear la bandera
    // Esto previene que el useEffect vuelva a abrir el modal
    setTimeout(() => {
      setIsAddingNewPlan(false);
    }, 500); // Aumentado de 100ms a 500ms para mayor seguridad
  };

  const addMotherDayCake = () => {
    // Solo cerrar el modal y habilitar el botón de Ver Detalles
    setShowProgressModal(false);
    setIsMotherDayButtonEnabled(true);
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

                {/* Botón - DISABLED cuando hay un plan activo o cuando el modal está abierto */}
                <div className="w-full flex justify-center py-3 md:py-3 px-4">
                  <button
                    onClick={() => selectPlan(planOption)}
                    disabled={isButtonsDisabled || (plan !== null && items.length > 0)}
                    className={`w-full rounded-lg text-base md:text-lg font-serif px-3 py-2 shadow-lg transition-all duration-300 ${
                      isButtonsDisabled || (plan !== null && items.length > 0)
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
                    disabled={!isMotherDayButtonEnabled && (plan !== null && items.length > 0)}
                    className={`w-full rounded-lg text-base md:text-lg font-serif px-3 py-2 shadow-lg transition-all duration-300 ${
                      !isMotherDayButtonEnabled && (plan !== null && items.length > 0)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : `${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} hover:scale-105 active:scale-95 cursor-pointer`
                    }`}
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
                {motherDayItems.length > 0 ? "Productos Día de la Madre" : "Selección Guardada"}
              </h3>

            {plan && items.length > 0 && (
                <>
                  <div className={`${theme.plansBg} rounded-full px-4 mt-2 py-2 inline-block`}>
                    <span className={`${theme.text} font-semibold`}>
                      Plan de {plan?.maxItems || 7} viandas{" "}
                      {plan?.type === "gran" ? "grandes" : "pequeñas"}
                    </span>
                  </div>

                  {motherDayItems.length === 0 && (
                    <div className={`${theme.plansBg} rounded-full px-4 mt-2 py-2 inline-block`}>
                      <span className={`${theme.text} font-semibold`}>
                        Selección: {totalInCart}/{plan?.maxItems || 7} viandas
                      </span>
                    </div>
                  )}
                </>
              )}

              {motherDayItems.length > 0 && (
                <div className={`${theme.plansBg} rounded-full px-4 mt-2 py-2 inline-block`}>
                  <span className={`${theme.text} font-semibold`}>
                    Tortas Día de la Madre: {motherDayItems.reduce((acc, item) => acc + item.quantity, 0)} productos
                  </span>
                </div>
              )}

            <div className="flex flex-col gap-3 justify-center">
              {/* Botón Continuar - si hay plan activo o tortas */}
              {(plan && items.length > 0) || motherDayItems.length > 0 ? (
                <button
                  onClick={motherDayItems.length > 0 ? () => navigate("/pedidos/motherdayorders") : continueToPreviousPlan}
                  className={`w-full hover:scale-105 active:scale-95 duration-300 transition-all flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg ${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} font-medium text-base shadow-lg`}
                >
                  <CheckCircle size={23} />
                  Continuar 
                </button>
              ) : null}
              
              {/* BOTÓN "AGREGAR NUEVO PLAN" - aparece si completó el plan O si hay tortas */}
              {(totalInCart === plan?.maxItems && plan && items.length > 0) || motherDayItems.length > 0 ? (
                <button
                  onClick={addNewPlan}
                  className={`w-full hover:scale-105 active:scale-95 duration-300 transition-all flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg ${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} font-medium text-base shadow-lg`}
                >
                  <CheckCircle size={23} />
                  Agregar Nuevo Plan
                </button>
              ) : null}
              
              {/* BOTÓN "AÑADIR TORTA DÍA DE LA MADRE" - aparece SOLO si hay plan completo Y no hay tortas ya */}
              {totalInCart === plan?.maxItems && theme.name === "motherday" && motherDayItems.length === 0 && (
                <button
                  onClick={addMotherDayCake}
                  className={`w-full hover:scale-105 active:scale-95 duration-300 transition-all flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg ${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} font-medium text-base shadow-lg`}
                >
                  <Cake size={23} />
                  Añadir Torta Día de la Madre
                </button>
              )}
              
              {/* Botón Vaciar - siempre visible */}
              <button
                onClick={startNewPlan}
                className={`w-full hover:scale-105 active:scale-95 duration-300 transition-all flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg ${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} font-medium text-base shadow-lg`}
              >
                <RefreshCw size={23} />
                Vaciar todo y reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}