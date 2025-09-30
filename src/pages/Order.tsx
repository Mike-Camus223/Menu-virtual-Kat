import { useState, useEffect, useRef } from "react";
import { Plus, Minus, Loader2, ShoppingBasket, ChevronDown, Loader, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useCart } from "@/context/cartContext";
import { useNavigate } from "react-router-dom";
import Notification from "@/components/system/notification";
import {
  pollosGran, mealsGran, pastasGran, pescadosGran, tartasGran, tartasBaseRicottaGran,
  vegetarianasGran, postresGran, mealsPeq, pollosPeq, pastasPeq, pescadosPeq,
  tartasPeq, tartasBaseRicottaPeq, vegetarianasPeq, postresPeq
} from "@/components/utils/DataProduct";
import { useTheme } from "@/context/themeContext";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
}

// Productos separados por tipo de plan
const productosGrandes: Product[] = [
  ...mealsGran,
  ...pollosGran,
  ...pastasGran,
  ...pescadosGran,
  ...tartasGran,
  ...tartasBaseRicottaGran,
  ...vegetarianasGran,
  ...postresGran
];

const productosPequenos: Product[] = [
  ...mealsPeq,
  ...pollosPeq,
  ...pastasPeq,
  ...pescadosPeq,
  ...tartasPeq,
  ...tartasBaseRicottaPeq,
  ...vegetarianasPeq,
  ...postresPeq
];

export default function Order() {
  const { plan, items, addItem, incrementItem, removeItem, openCartSidebar } = useCart();
  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [paginationDropdownOpen, setPaginationDropdownOpen] = useState(false);
  const {theme} = useTheme();


  const total = items.reduce((acc, i) => acc + i.quantity, 0);
  const categories = ["Todas", "carne", "pollos", "pastas", "pescados", "tartas", "tartasBaseRicotta", "vegetarianas", "postres"];

  const titles: Record<string, string> = {
    Todas: "Todos nuestros platos gourmet",
    carne: "Nuestros platos con carne",
    pollos: "Nuestros platos con pollo",
    pastas: "Deliciosas pastas caseras",
    pescados: "Frescos platos de pescado",
    tartas: "Deliciosas tartas caseras",
    tartasBaseRicotta: "Tartas con base de ricotta",
    vegetarianas: "Platos para vegetarianos",
    postres: "Dulces tentaciones",
  };

  // 🔹 Obtener productos según el tipo de plan
  const getAllProductsForPlan = (): Product[] => {
    if (!plan) return [];
    return plan.type === "gran" ? productosGrandes : productosPequenos;
  };

  // 🔹 Calcular conteo por categoría
  const categoryCounts: Record<string, number> = items.reduce((acc, item) => {
    const allProductsForPlan = getAllProductsForPlan();
    const product = allProductsForPlan.find((p) => p.id === item.id);
    if (product) {
      acc[product.category] = (acc[product.category] || 0) + item.quantity;
    }
    return acc;
  }, {} as Record<string, number>);

  // 🔹 "Todas" es la suma total
  categoryCounts["Todas"] = total;

  // Redirigir si no hay plan
  useEffect(() => {
    if (!plan) navigate("/pedidos");
  }, [plan, navigate]);

  // 🔹 Establecer productos según el plan seleccionado
  useEffect(() => {
    if (plan) {
      const allProductsForPlan = getAllProductsForPlan();
      setProducts(allProductsForPlan);
    }
  }, [plan]);

  // Mostrar notificación al completar plan
  useEffect(() => {
    if (plan && total === plan.maxItems) setShowNotification(true);
  }, [total, plan]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  // Filtrar productos
  const handleFilterChange = (category: string) => {
    setSelectedFilter(category);
    setCurrentPage(1); // Reset to first page when filtering
    setLoading(true);
    setTimeout(() => {
      const allProductsForPlan = getAllProductsForPlan();
      let filteredProducts;
      if (category === "Todas") {
        filteredProducts = allProductsForPlan;
      } else {
        filteredProducts = allProductsForPlan.filter((p) => p.category === category);
      }
      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  };



  // Agregar producto
  const handleAddItem = (product: Product) => {
    if (!plan || total >= plan.maxItems) return; //  usa plan.maxItems
    const itemInCart = items.find((i) => i.id === product.id);
    if (itemInCart) incrementItem(product.id);
    else addItem({ id: product.id, name: product.name, quantity: 1, price: product.price });
  };



  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleProductsPerPageChange = (value: number) => {
    setProductsPerPage(value);
    setCurrentPage(1);
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  if (!plan) {
  return (
    <div className={`min-h-screen ${theme.background} flex flex-col items-center justify-center gap-6 py-10`}>
      <Loader className={`animate-spin ${theme.loader} ${theme.loadertext} w-12 h-12`} />
    </div>
  );
}

  return (
    <div className={`min-h-screen ${theme.background}`}>
    {/* Hero */}
    <section className="relative w-full h-64 md:h-96 overflow-hidden">
      <img src="https://cdn.pixabay.com/photo/2023/06/20/17/30/youtube-banner-8077450_1280.jpg" alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 to-red-900/40"></div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col gap-6 items-center justify-center text-center">
        <h2
          className={`text-3xl sm:text-4xl text-shadow-lg md:text-6xl font-semibold text-white mb-4`}
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Arma tu{" "}
          <span className={`${theme.titleSecond} text-shadow-lg`} style={{ fontFamily: "Times New Roman, serif" }}>
            Pedido
          </span>
        </h2>
        <p className={`text-white text-lg`}>
          Plan seleccionado: {plan.type === "gran" ? "Viandas Grandes" : "Viandas Pequeñas"}
        </p>
      </div>
    </section>

    {/* Notificación */}
    {showNotification && (
      <Notification
        message="¡Perfecto! Has completado tu selección de viandas."
        type="aceptado"
        onClose={() => setShowNotification(false)}
      />
    )}

    {/* Filtros */}
    <div className={`flex flex-wrap w-full ${theme.background} shadow-lg justify-between items-center gap-3 md:gap-4 px-4 py-2 pb-6`}>
      {/* Dropdown mobile/tablet */}
      <div ref={dropdownRef} className="md:hidden relative w-48">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className={`w-full px-4 py-2 ${theme.cartbackground} ${theme.bordercolor} border rounded-md flex justify-between items-center ${theme.filterText} font-semibold shadow-sm hover:ring-1 ${theme.dropdownring} transition-all duration-200`}
        >
          {selectedFilter} {categoryCounts[selectedFilter] ? `(${categoryCounts[selectedFilter]})` : ""}
          <ChevronDown className={`ml-2 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} size={18} />
        </button>

        {/* Lista del dropdown */}
        <div
          className={`absolute z-50 mt-1 w-full ${theme.cartbackground} ${theme.bordercolor} border rounded-md shadow-lg overflow-hidden transition-all duration-200 origin-top ${dropdownOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
        >
          {categories.map((c) => (
            <div
  key={c}
  onClick={() => { handleFilterChange(c); setDropdownOpen(false); }}
  className={`px-4 py-2 cursor-pointer ${theme.filterText} ${
    selectedFilter === c ? `${theme.dropdownselected} font-semibold` : theme.cartbackground
  } transition-colors duration-200`}
>
  {c} {categoryCounts[c] ? `(${categoryCounts[c]})` : ""}
</div>
          ))}
        </div>
      </div>

      {/* Botones desktop */}
      <div className="hidden md:flex flex-wrap gap-3 justify-center w-full">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => handleFilterChange(c)}
            className={`px-4 py-1 cursor-pointer font-semibold text-sm md:text-lg transition-all duration-300 ${selectedFilter === c ? `${theme.title} shadow-lg` : theme.textsecond
              }`}
          >
            {c} {categoryCounts[c] ? `(${categoryCounts[c]})` : ""}
          </button>
        ))}
      </div>
    </div>

      {/* Productos */}
      <main className={`min-h-screen ${theme.background}`}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className={`animate-spin ${theme.icons} w-12 h-12`} />
        </div>
      ) : (
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="pt-2 pb-5">
            <h2
              className={`text-2xl ${theme.title} sm:text-2xl text-shadow-lg md:text-3xl font-semibold mb-4`}
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              {titles[selectedFilter]}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {currentProducts.map((product) => {
              const itemInCart = items.find((i) => i.id === product.id);
              const quantity = itemInCart ? itemInCart.quantity : 0;
              const canAddMore = total < plan.maxItems;

              return (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden shadow-lg flex flex-col h-[420px]"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 bg-white/90 ${theme.title} font-semibold text-xs sm:text-sm rounded-full`}>
                        {product.category}
                      </span>
                    </div>

                    {quantity > 0 && (
                      <div className="absolute top-3 left-3">
                        <div className={`w-7 h-7 ${theme.buttoncolor} hover:${theme.buttonhovercolor} rounded-full flex items-center justify-center ${theme.buttontext} font-bold text-sm shadow-lg`}>
                          {quantity}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-col ${theme.cardbackground} flex-1 p-4 md:p-6`}>
                    <h3 className={`text-md md:text-md font-bold ${theme.title} mb-2 text-wrap`}>
                      {product.name}
                    </h3>

                    <p className={`${theme.textsecond} text-sm mb-4 text-wrap flex-1`}>{product.description}</p>

                    <div className="mb-4">
                      <span className={`text-lg font-bold ${theme.title}`}>${product.price.toLocaleString()}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <button
                        onClick={() => handleRemoveItem(product.id)}
                        disabled={quantity === 0}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${quantity === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : `${theme.buttoncolor} ${theme.buttontext} cursor-pointer hover:${theme.buttonhovercolor} shadow-md`
                          }`}
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>

                      <span className={`text-lg font-bold ${theme.textsecond}`}>{quantity}</span>

                      <button
                        onClick={() => handleAddItem(product)}
                        disabled={!canAddMore}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${!canAddMore
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : `${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} cursor-pointer shadow-md`
                          }`}
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

        {/* Paginador - solo se muestra cuando hay más productos que los por página */}
        {products.length > productsPerPage && (
        <div className="flex flex-1 flex-col items-center gap-4 pt-8 pb-8 md:pb-24 w-full px-2">
          {/* Dropdown para seleccionar items por página */}
          <div className="relative w-full max-w-[12rem] sm:w-48">
            <button
              onClick={() => setPaginationDropdownOpen((prev) => !prev)}
              className={`w-full px-3 py-2 cursor-pointer ${theme.cartbackground} ${theme.bordercolor} border rounded-md flex justify-between items-center ${theme.filterText} font-semibold shadow-sm hover:ring-1 ${theme.dropdownring} transition-all duration-200 text-sm sm:text-base`}
            >
              {productsPerPage} por página
              <ChevronDown
                className={`ml-2 transition-transform duration-200 ${paginationDropdownOpen ? "rotate-180" : ""}`}
                size={18}
              />
            </button>

            <div
              className={`absolute z-50 mt-1 w-full ${theme.cartbackground} ${theme.bordercolor} border rounded-md shadow-lg overflow-hidden transition-all duration-200 origin-top ${paginationDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
            >
              {[5, 10].map((value) => (
                <div
                  key={value}
                  onClick={() => {
                    handleProductsPerPageChange(value);
                    setPaginationDropdownOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer ${theme.filterText} hover:bg-opacity-20 ${productsPerPage === value ? `bg-opacity-30 ${theme.dropdownselected} font-semibold` : ""} transition-colors duration-200 text-sm sm:text-base`}
                >
                  {value} por página
                </div>
              ))}
            </div>
          </div>

          {/* Controles de paginación */}
          <div className="flex flex-wrap justify-center items-center gap-2 w-full max-w-sm sm:max-w-md">
            {/* Primera página */}
            <button
              onClick={handleFirstPage}
              disabled={currentPage === 1}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 text-sm sm:text-base ${currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : `${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} cursor-pointer shadow-md`
                }`}
            >
              <ChevronsLeft size={14} strokeWidth={2} />
            </button>

            {/* Botón Anterior */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 text-sm sm:text-base ${currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : `${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} cursor-pointer shadow-md`
                }`}
            >
              <ChevronLeft size={14} strokeWidth={2} />
            </button>

            {/* Números de página */}
            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 font-semibold text-sm sm:text-base ${currentPage === page
                  ? `${theme.buttoncolor} ${theme.buttontext} shadow-lg`
                  : `bg-white ${theme.title} hover:bg-opacity-20 hover:${theme.background} cursor-pointer shadow-sm`
                  }`}
              >
                {page}
              </button>
            ))}

            {/* Botón Siguiente */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 text-sm sm:text-base ${currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : `${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} cursor-pointer shadow-md`
                }`}
            >
              <ChevronRight size={14} strokeWidth={2} />
            </button>

            {/* Última página */}
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 text-sm sm:text-base ${currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : `${theme.buttoncolor} ${theme.buttontext} hover:${theme.buttonhovercolor} cursor-pointer shadow-md`
                }`}
            >
              <ChevronsRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {/* Botón de Checkout */}
      {total > 0 && (
        <div className={`fixed bottom-0 left-0 right-0 ${theme.background} backdrop-blur-md border-t-1 ${theme.bordermain} p-4 md:p-6 shadow-xl`}>
          <div className="max-w-md mx-auto">
            <button
              onClick={openCartSidebar}
              disabled={total !== plan.maxItems}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-lg md:text-xl transition-all duration-300 ${total === plan.maxItems
                ? `${theme.buttoncolor} ${theme.buttontext} shadow-lg hover:${theme.buttonhovercolor}`
                : "bg-gray-300 text-gray-600 cursor-not-allowed shadow"
                }`}
            >
              {total === plan.maxItems && <ShoppingBasket className={theme.buttontext} size={28} strokeWidth={1.75} />}
              {total === plan.maxItems ? "Ir a carrito" : `Selecciona ${plan.maxItems - total} viandas más`}
            </button>
          </div>
        </div>
      )}
    </main>
    <div className={`${theme.background} w-full h-[85px] sm:h-[55px]`}>

    </div>
  </div>
);
}