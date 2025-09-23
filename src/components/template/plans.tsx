import { Package, RefreshCw, CheckCircle, Wheat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/cartContext";
import { useState, useEffect } from "react";

export default function Plans() {
  const navigate = useNavigate();
  const { setPlan, plan, items, clearCart } = useCart();
  const [showProgressModal, setShowProgressModal] = useState(false);

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
    if (plan !== null && items.length > 0) {
      setShowProgressModal(true);
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

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fondo dividido */}
      <div className="absolute inset-0">
        <div className="h-1/2 " />
        <div className="h-1/2 bg-[#51591B]" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-10">
        {/* Título */}
        <div className="mb-7">
          <h1
            className="text-3xl sm:text-4xl text-shadow-lg md:text-5xl font-semibold text-lime-900 mb-4"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            VIANDAS{" "}
            <span
              className="text-yellow-500 text-shadow-lg"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              SALUDABLES
            </span>
          </h1>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 w-full max-w-5xl">
          {planOptions.map((planOption) => (
            <div
              key={planOption.id}
              className="relative z-5 group bg-card rounded-xl  transition-all duration-400 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute top-5 right-2 z-[-1]">
                <Wheat
                  className="
                    text-lime-100
                    w-45 h-45
                    sm:w-45 sm:h-45
                    md:w-50 md:h-50
                    lg:w-55 lg:h-55
                    xl:w-[15rem] xl:h-[15rem]
                  "
                  strokeWidth={2}
                />
              </div>
              <div className="p-4 sm:p-4 text-center space-y-5">
                {/* Icono */}
                <div className="w-20 h-20 mx-auto rounded-full border-3 border-lime-800 flex items-center justify-center">
                  <Package size={36} className="text-lime-800 font-bold" />
                </div>

                {/* Nombre y descripción */}
                <div className="flex flex-col gap-2">
                  <h2
                    className="text-3xl sm:text-3xl text-shadow-lg md:text-2xl font-semibold text-lime-800 mb-4"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    {planOption.name.toUpperCase()}
                  </h2>
                </div>

                {/* Detalles */}
                <div className="flex flex-col items-center mb-4">
                  <div className="text-3xl sm:text-4xl text-lime-800 font-bold">
                    {planOption.maxItems}
                  </div>
                  <div className="text-lime-800 font-bold text-sm sm:text-base mt-1">
                    Viandas Incluidas
                  </div>
                </div>

                {/* Beneficios */}
                <div className="rounded-xl p-4">
                  <ul className="space-y-1 text-lime-800 font-bold text-sm sm:text-base">
                    <li>Ingredientes frescos y naturales</li>
                    <li>Preparación casera artesanal</li>
                    <li>Entrega a domicilio gratuita</li>
                  </ul>
                </div>

                {/* Botón */}
                <div className="w-full flex justify-center py-3 md:py-3  px-4">
                  <button
                    onClick={() => selectPlan(planOption)}
                    className="w-full rounded-lg text-white bg-green-800 hover:bg-green-900  text-base md:text-lg font-serif px-3 py-2 shadow-lg cursor-pointer transition-all duration-300"
                  >
                    Continuar
                  </button>
                </div>
                <p className=" text-xs text-lime-800 font-bold sm:text-sm">
                  * Podrás personalizar tus viandas en el siguiente paso
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de progreso */}
      {showProgressModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl space-y-5">
            <h3 className="text-xl md:text-2xl font-bold text-[#51591B]">
              Selección Guardada
            </h3>

            <div className="bg-lime-100 rounded-full px-4 mt-2 py-2 inline-block">
              <span className="text-lime-800 font-semibold">
                Plan de {plan?.maxItems || 7} viandas {plan?.type === 'gran' ? 'grandes' : 'pequeñas'}
              </span>
            </div>

            <div className="bg-lime-100 rounded-full px-4 mt-2 py-2 inline-block">
              <span className="text-lime-800 font-semibold">
                Selección: {totalInCart}/{plan?.maxItems || 7} viandas
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-3 justify-center">
              <button
                onClick={continueToPreviousPlan}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-800 text-white hover:bg-green-900 font-medium text-base md:text-sm shadow-lg transition-all duration-300"
              >
                <CheckCircle size={23} />
                Continuar
              </button>
              <button
                onClick={startNewPlan}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-800 text-white hover:bg-green-900 font-medium text-base md:text-sm shadow-lg transition-all duration-300"
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
