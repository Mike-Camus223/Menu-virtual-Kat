"use client";
import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/themeContext';


export default function Mainpage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { theme} = useTheme();

  const cards = [
    { src: "https://recetasdecocina.elmundo.es/wp-content/uploads/2024/01/receta-de-salteado-de-verduras-1024x657.jpg", alt: "Frescura" },
    { src: "https://content-cocina.lecturas.com/medio/2024/07/15/arroz-chaufa-peruano_483d3313_1218071266_240715103150_1200x1200.jpg", alt: "Nutrición" },
    { src: "https://www.gourmet.cl/wp-content/uploads/2013/03/guiso-de-verduras.jpg", alt: "Variedad" },
    { src: "https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/b9e5673058f8bcc1d7853f5b20110db5.png", alt: "Sabor" },
    { src: "https://d36fw6y2wq3bat.cloudfront.net/recipes/salteado-de-pollo-zanahorias-y-champinones/900/salteado-de-pollo-zanahorias-y-champinones.jpg", alt: "Calidad" },
    { src: "https://cocinerosargentinos.com/content/recipes/original/recipes.20262.jpg", alt: "Pasión" },
  ];

  // Animación para mobile/tablet
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentCardIndex((prev) => (prev + 1) % cards.length);
        setIsVisible(true);
      }, 500); // Tiempo del fade out
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          
          .scroll-track {
            display: flex;
            flex-wrap: nowrap;
            animation: scroll 60s linear infinite;
          }
          
          .fade-card {
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
          }
          
          .fade-in {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          
          .fade-out {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
        `,
        }}
      />

      <div className={`max-w-screen h-auto ${theme.background}`}>

        {/* Título */}
        <div className="pt-10 pb-10 md:pb-16 md:pt-20 w-full flex justify-center items-center text-center">
          <h1
            className={`underline text-shadow-lg ${theme.title} text-5xl sm:text-5xl md:text-6xl max-w-4xl px-4`}
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Platos ricos y nutritivos
          </h1>
        </div>

        {/* Carrusel para desktop, cards animadas para mobile/tablet */}
        <div className="pb-10 pt-0 sm:pb-16 sm:pt-16">
          {/* Carousel para desktop (lg y superior) */}
          <div className="hidden lg:block relative overflow-hidden h-[28rem]">
            <div className="scroll-track gap-12">
              {[...cards, ...cards].map((c, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-72 rounded-xl shadow-xl overflow-hidden"
                  style={{ aspectRatio: "4/5" }}
                >
                  <img
                    src={c.src}
                    alt={c.alt}
                    draggable="false"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Cards animadas para tablet y mobile */}
          <div className="lg:hidden flex justify-center items-center px-4">
            <div className="relative w-full max-w-md">
              <div
                className={`fade-card ${isVisible ? 'fade-in' : 'fade-out'} w-full rounded-xl shadow-xl overflow-hidden`}
                style={{ aspectRatio: "3/3" }}
              >
                <img
                  src={cards[currentCardIndex].src}
                  alt={cards[currentCardIndex].alt}
                  draggable="false"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Indicadores de progreso */}
              <div className="flex justify-center mt-6 space-x-2">
                {cards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentCardIndex 
                        ? `${theme.buttoncolor} w-8` 
                        : `${theme.plansBg}`
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Botón de pedido */}
        <div className={`w-full flex justify-center pb-8 ${theme.background} px-4`}>
          <Link to="/pedidos">   
          <button
            className={`flex items-center cursor-pointer gap-3 rounded-lg ${theme.buttoncolor} ${theme.buttontext} text-xl px-6 py-4 shadow-lg hover:${theme.buttonhovercolor} transition-all duration-300 hover:scale-105 active:scale-95`}
            style={{fontFamily: "Times New Roman, serif" }}
          >
            <ShoppingCart className={`${theme.buttontext}`} size={32} strokeWidth={1.75} />
            ¡HAZ TU PEDIDO YA!
          </button>
            </Link>
        </div>
      </div>
    </>
  );
}