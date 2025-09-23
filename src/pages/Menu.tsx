import React from "react";
import { Laugh, Ham, Drumstick, Soup, Fish, CakeSlice, LineSquiggle, Carrot, Dessert, TicketCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { mealsGran, pollosGran, pastasGran, pescadosGran, tartasGran, tartasBaseRicottaGran, vegetarianasGran, postresGran } from "../components/utils/DataProduct";

// ======================= ARRAYS CONVERTIDOS =======================

// Función para extraer solo nombre y descripción
const extractNameAndDescription = (products: any[]) => {
  return products.map(product => ({
    name: product.name,
    description: product.description
  }));
};

// Carnes
export const meals = extractNameAndDescription(mealsGran);

// Pollos
export const pollos = extractNameAndDescription(pollosGran);

// Pastas
export const pastas = extractNameAndDescription(pastasGran);

// Pescados
export const pescados = extractNameAndDescription(pescadosGran);

// Tartas
export const tartas = extractNameAndDescription(tartasGran);

// Tartas Base Ricotta
export const tartasBaseRicotta = extractNameAndDescription(tartasBaseRicottaGran);

// Vegetarianas
export const vegetarianas = extractNameAndDescription(vegetarianasGran);

// Postres
export const postres = extractNameAndDescription(postresGran);


// ======================= COMPONENTE GENÉRICO =======================
interface MenuSectionProps {
  title: string;
  icon: React.ReactNode;
  items: { name: string; description: string }[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, icon, items }) => {
  return (
    <div className="flex flex-col items-center bg-amber-100 w-full py-10">
      <div className="flex flex-col items-center mb-10">
        <Laugh className="text-lime-800 text-shadow-lg" size={34} strokeWidth={2.75} absoluteStrokeWidth />
        <div className="flex flex-row text-shadow-lg h-35 gap-3 w-full justify-center items-center my-2">
          {icon}
          <h2
            className="underline text-lime-800 mt-4 text-3xl sm:text-4xl md:text-5xl"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Renderizado del menú */}
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 lg:px-0 gap-6 w-full max-w-4xl">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-lime-800 pb-4"
          >
            <div>
              <h2
                className="font-semibold text-lime-800 text-lg sm:text-lg md:text-xl"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {item.name}
              </h2>
              <p className="text-sm sm:text-sm md:text-base text-amber-800">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// ======================= PÁGINA MENÚ =======================
const Menu: React.FC = () => {
  return (
    <div>
      <div className="pb-18 pt-15 bg-amber-100 h-auto w-full flex justify-center items-center">
        <h1
          className="underline text-shadow-lg text-lime-800 text-4xl sm:text-5xl md:text-7xl"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Nuestros Menús
        </h1>
      </div>

      {/* Secciones */}
      <MenuSection
        title="Carnes"
        icon={<Ham className="text-lime-800 text-shadow-lg" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={meals}
      />

      <MenuSection
        title="Pollos"
        icon={<Drumstick className="text-lime-800" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={pollos}
      />

      <MenuSection
        title="Pastas"
        icon={<Soup className="text-lime-800" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={pastas}
      />

      <MenuSection
        title="Pescados"
        icon={<Fish className="text-lime-800" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={pescados}
      />

      <MenuSection
        title="Tartas"
        icon={<CakeSlice className="text-lime-800" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={tartas}
      />

      <MenuSection
        title="Tartas con base ricotta"
        icon={<LineSquiggle className="text-lime-800" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={tartasBaseRicotta}
      />

      <MenuSection
        title="Vegetarianas"
        icon={<Carrot className="text-lime-800" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={vegetarianas}
      />

      <MenuSection
        title="Postres"
        icon={<Dessert className="text-lime-800" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={postres}
      />

      <div className="w-full flex justify-center py-12 bg-amber-100 px-4">
        <Link
          to="/pedidos"
          className="flex items-center gap-2 bg-green-800 text-white text-lg md:text-xl px-4 py-3 rounded-lg shadow-lg hover:bg-green-900 hover:scale-105 active:scale-95 transition-all duration-300"
          style={{ color: '#fff', fontFamily: "Times New Roman, serif" }}
        >
          <TicketCheck className="text-white" size={28} strokeWidth={1.75} />
          Haz tu pedido ya
        </Link>
      </div>
    </div>
  );
};

export default Menu;