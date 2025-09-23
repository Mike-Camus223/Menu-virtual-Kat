import React from "react";
import { Laugh, Ham, Drumstick, Soup, Fish, CakeSlice, LineSquiggle, Carrot, Dessert, TicketCheck } from "lucide-react";
import { Link } from "react-router-dom";

// ======================= ARRAYS =======================

// Carnes
export const meals = [
  { name: "Carne a la Mostaza con Verduras", description: "Carne suave con salsa de mostaza y verduras." },
  { name: "Carne Crema Espinaca", description: "Carne acompañada con crema y espinacas." },
  { name: "Carne al Puerro con Verduras", description: "Receta de carne salteada con puerros y verduras." },
  { name: "Carne al Champiñón con arroz", description: "Carne en salsa de champiñones servida con arroz." },
  { name: "Carne 2 Purés", description: "Carne servida con dos tipos de puré casero." },
  { name: "Pulpetas con Arroz", description: "Albóndigas de carne con guarnición de arroz." },
  { name: "Hamburguesitas", description: "Mini hamburguesas caseras." },
  { name: "Ajíes Rellenos", description: "Ajíes rellenos de carne y especias." },
  { name: "Pastel de Carne", description: "Clásico pastel con carne picada." },
  { name: "Lasaña de Berenjenas", description: "Capas de berenjena con carne y salsa." },
  { name: "Goulash", description: "Guiso de carne con especias al estilo húngaro." },
  { name: "Pan de Carne", description: "Pan relleno con carne horneada." },
  { name: "Colita rellena con vegetales", description: "Colita de cuadril rellena con verduras." },
  { name: "Carne rellena con queso", description: "Carne jugosa rellena de queso fundido." },
];

// Pollos
export const pollos = [
  { name: "Pollo al Champiñón con arroz", description: "Pollo en salsa de champiñones con arroz." },
  { name: "Pollo a la Portuguesa", description: "Pollo guisado al estilo portugués." },
  { name: "Pollo al Curry", description: "Pollo especiado con salsa de curry." },
  { name: "Pollo Crema Espinaca", description: "Pollo acompañado con crema y espinacas." },
  { name: "Pollo al puerro con Verduras", description: "Pollo salteado con puerros y vegetales." },
  { name: "Pollo al Verdeo", description: "Pollo con salsa de cebolla de verdeo." },
  { name: "Pollo a la Napolitana", description: "Suprema de pollo al estilo napolitano." },
  { name: "Cazuela de Pollo", description: "Estofado de pollo con vegetales." },
  { name: "Pastel de Pollo", description: "Pastel relleno de pollo desmenuzado." },
  { name: "Yakimeshi de Pollo", description: "Arroz frito japonés con pollo." },
  { name: "Chop Suey de Pollo", description: "Salteado oriental de pollo y verduras." },
  { name: "Suprema Rellena con verduras", description: "Suprema de pollo rellena con vegetales." },
  { name: "Pollo oriental con sésamo y lino", description: "Pollo con toque asiático de semillas." },
];

// Pastas
export const pastas = [
  { name: "Canelones de Ricotta y Espinaca", description: "Canelones rellenos de ricotta cremosa y espinaca fresca." },
  { name: "Canelones de Jamón y Queso", description: "Clásicos canelones con jamón y queso fundido." },
  { name: "Canelones de Jamón y Pollo", description: "Canelones rellenos de pollo y jamón bien sabrosos." },
  { name: "Fideos a la Boloñesa", description: "Fideos con salsa boloñesa casera." },
  { name: "Lasaña de Carne y Verduras", description: "Lasaña con carne picada y verduras frescas." },
];

// Pescados
export const pescados = [
  { name: "Pescado Primavera", description: "Filet de pescado con vegetales de estación." },
  { name: "Cazuela de Merluza", description: "Estofado de merluza con vegetales." },
  { name: "Rollitos de Pescado y Ricotta", description: "Rollitos de pescado rellenos de ricotta suave." },
  { name: "Gefilte Fish", description: "Clásico plato de pescado al estilo tradicional." },
];

// Tartas
export const tartas = [
  { name: "Berenjenas con Queso", description: "Tarta rellena de berenjenas y queso fundido." },
  { name: "Jamón y Queso", description: "Tarta clásica de jamón y queso." },
  { name: "Zapallitos", description: "Tarta de zapallitos frescos." },
  { name: "Acelga y/o Espinaca", description: "Tarta de hojas verdes con ricotta suave." },
];

// Tartas Base Ricotta
export const tartasBaseRicotta = [
  { name: "Berenjenas con Queso", description: "Tarta de ricotta, berenjenas y queso." },
  { name: "Cebolla con Queso", description: "Tarta de ricotta, cebolla y queso gratinado." },
  { name: "Jamón y Queso", description: "Tarta de ricotta, jamón y queso." },
];

// Vegetarianas
export const vegetarianas = [
  { name: "Budín Tricolor", description: "Budín de vegetales en tres colores." },
  { name: "Canelones de Queso y Verdura", description: "Canelones rellenos de queso y verduras." },
  { name: "Lentejas Guisadas", description: "Guiso casero de lentejas con verduras." },
  { name: "Milanesa de Calabaza a la Suiza", description: "Calabaza empanada con queso gratinado." },
  { name: "Milanesa de Berenjena a la Napolitana", description: "Berenjenas empanadas con salsa y queso." },
  { name: "Soufflé de Calabaza y Zapallito", description: "Soufflé liviano de calabaza y zapallito." },
  { name: "Soufflé de Ricotta", description: "Soufflé suave a base de ricotta." },
  { name: "Soufflé de Verdura", description: "Soufflé esponjoso de verduras mixtas." },
  { name: "Soufflé de Zanahorias", description: "Soufflé liviano de zanahorias dulzonas." },
];

// Postres
export const postres = [
  { name: "Cheesecake", description: "Torta de queso suave y cremosa." },
  { name: "Torta de Ricotta", description: "Clásica torta húmeda de ricotta." },
  { name: "Tarta de Manzana", description: "Tarta casera de manzanas caramelizadas." },
  { name: "Budín Loreta", description: "Budín tradicional con sabor casero." },
];


// ======================= COMPONENTE GENÉRICO =======================
interface MenuSectionProps {
  title: string;
  icon: React.ReactNode;
  items: { name: string; description: string }[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, icon, items }) => {
  return (
    <div className="flex flex-col items-center bg-[#FFF6F0] w-full py-10">
      <div className="flex flex-col items-center mb-10">
        <Laugh className="text-rose-950 text-shadow-lg" size={34} strokeWidth={2.75} absoluteStrokeWidth />
        <div className="flex flex-row text-shadow-lg h-35 gap-3 w-full justify-center items-center my-2">
          {icon}
          <h2
            className="underline text-rose-950 mt-4 text-3xl sm:text-4xl md:text-5xl"
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
            className="flex justify-between items-center border-b border-gray-300 pb-4"
          >
            <div>
              <h2
                className="font-semibold text-rose-950 text-lg sm:text-lg md:text-xl"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {item.name}
              </h2>
              <p className="text-sm sm:text-sm md:text-base text-rose-900">{item.description}</p>
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
      <div className="pb-18 pt-15 bg-[#FFF6F0] h-auto w-full flex justify-center items-center">
        <h1
          className="underline text-shadow-lg text-rose-950 text-4xl sm:text-5xl md:text-7xl"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Nuestros Menús
        </h1>
      </div>

      {/* Secciones */}
      <MenuSection
        title="Carnes"
        icon={<Ham className="text-rose-950 text-shadow-lg" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={meals}
      />

      <MenuSection
        title="Pollos"
        icon={<Drumstick className="text-rose-950" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={pollos}
      />

      <MenuSection
        title="Pastas"
        icon={<Soup className="text-rose-950" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={pastas}
      />

      <MenuSection
        title="Pescados"
        icon={<Fish className="text-rose-950" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={pescados}
      />

      <MenuSection
        title="Tartas"
        icon={<CakeSlice className="text-rose-950" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={tartas}
      />

      <MenuSection
        title="Tartas con base ricotta"
        icon={<LineSquiggle className="text-rose-950" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={tartasBaseRicotta}
      />

      <MenuSection
        title="Vegetarianas"
        icon={<Carrot className="text-rose-950" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={vegetarianas}
      />

      <MenuSection
        title="Postres"
        icon={<Dessert className="text-rose-950" size={48} strokeWidth={2.75} absoluteStrokeWidth />}
        items={postres}
      />

      <div className="w-full flex justify-center py-12 bg-[#FFF6F0] px-4">
        <Link
          to="/pedidos"
          className="flex items-center gap-2 bg-rose-950 text-white text-lg md:text-xl px-4 py-3 rounded-lg shadow-lg hover:bg-rose-900 transition-all duration-300"
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