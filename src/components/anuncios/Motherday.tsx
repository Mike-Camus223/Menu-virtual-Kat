"use client";
import { useTheme } from "@/context/themeContext";
import { Cake } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Motherday() {
  const { theme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const cards = [
    { src: "https://es.cravingsjournal.com/wp-content/uploads/2020/07/sheet-cake-de-red-velvet-9.jpg", alt: "Redvelt" },
    { src: "https://tofuu.getjusto.com/orioneat-local/resized2/WdEZ4hztxejn82vQd-1080-x.webp", alt: "Chocolate" },
    { src: "https://www.reposterialanonna.com/Img/del_bosque.jpg", alt: "Variedad" },
    { src: "https://d3b5jqy5xuub7g.cloudfront.net/wp-content/uploads/2021/05/cheesecake-de-limon-min.png", alt: "Sabor" },
    { src: "https://alicante.com.ar/wp-content/uploads/2024/06/Brownie-sin-pack-edit-scaled.jpg", alt: "Calidad" },
    { src: "https://i.pinimg.com/474x/66/33/f5/6633f527f47da69338ac2cc1cf3dff4a.jpg", alt: "Pasión" },
  ];

  // Intersection Observer para detectar cuando la sección es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Efecto para cambiar imágenes solo cuando es visible
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setFadeState("fade-out");

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === cards.length - 1 ? 0 : prevIndex + 1
        );
        setFadeState("fade-in");
      }, 500);

    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, cards.length]);

  return (
    <div
      ref={sectionRef}
      className={`w-full motherdaybg min-h-screen flex items-center justify-center ${theme.background} relative overflow-hidden`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* Animaciones optimizadas con transform y opacity */
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(var(--start-rotate));
            }
            33% {
              transform: translateY(-8px) rotate(calc(var(--start-rotate) + 2deg));
            }
            66% {
              transform: translateY(4px) rotate(calc(var(--start-rotate) - 1deg));
            }
          }

          /* Animación de pétalos optimizada */
          @keyframes petalFall {
            0% {
              opacity: 0;
              transform: translateY(-10vh) translateX(0px) rotate(0deg);
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              opacity: 0;
              transform: translateY(100vh) translateX(calc(var(--sway) * 100px)) rotate(360deg);
            }
          }
          
          .fade-card {
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
            will-change: transform, opacity;
          }
          
          .fade-in {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          
          .fade-out {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }

          .float-animation {
            animation: float 6s ease-in-out infinite;
            will-change: transform;
            transform: translateZ(0);
          }

          .petal {
            position: absolute;
            top: -50px;
            width: 20px;
            height: 20px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23f9a8d4' d='M10 2C12 0 15 1 16 3C17 5 16 8 14 9C12 10 9 9 8 7C7 5 8 2 10 2Z'/%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
            animation: petalFall linear infinite;
            will-change: transform, opacity;
            pointer-events: none;
          }

          /* Animaciones pausadas cuando no son visibles */
          .pause-animation {
            animation-play-state: paused;
          }

          /* Optimización para móviles - menos pétalos */
          @media (max-width: 768px) {
      .petal {
        animation-duration: calc(var(--duration) * 1.2) !important;
        width: 18px !important;
        height: 18px !important;
      }
    }
        `,
        }}
      />

      {/* Pétalos animados optimizados - cantidad reducida para mejor rendimiento */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={`petal z-30 ${!isVisible ? 'pause-animation' : ''}`}
          style={{
            left: `${Math.random() * 100}vw`,
            '--duration': `${Math.random() * 5 + 8}`,
            '--sway': `${Math.random() * 2 - 1}`,
            animationDuration: `calc(var(--duration) * 1s)`,
            animationDelay: `${Math.random() * 10}s`,
            width: `${Math.random() * 15 + 10}px`, // Aumenté un poco el tamaño
            height: `${Math.random() * 15 + 10}px`,
            opacity: Math.random() * 0.8 + 0.3, // Aumenté la opacidad
          } as React.CSSProperties}
        />
      ))}

      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full items-center gap-4 z-10">

        {/* Columna izquierda - Texto */}
        <div className="flex flex-col mt-4 md:mt-0 items-center justify-center text-center lg:text-center space-y-6 sm:space-y-8 lg:space-y-10 px-4">
          {/* Título */}
          <div className="space-y-3 hidden lg:block sm:space-y-4 lg:space-y-5">
            <p className={`${theme.text} title3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-wide`}>
              FELIZ DÍA
            </p>
            <h1 className="text-4xl sm:text-5xl title3 lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight">
              <span className={`block ${theme.text}`}>DE LAS</span>
              <span className={`block ${theme.text}`}>MADRES</span>
            </h1>
          </div>

          <div className="space-y-3 block lg:hidden sm:space-y-4 lg:space-y-5">
            <p className={`${theme.text} title3 text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-wide`}>
              FELIZ DÍA DE
            </p>
            <h1 className="text-5xl sm:text-5xl title3 lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight">
              <span className={`block ${theme.text}`}>LAS MADRES</span>
            </h1>
          </div>

          {/* Texto descriptivo */}
          <div className="pt-1">
            <p className={`${theme.text} text-base titles sm:text-lg text-shadow-lg lg:text-xl xl:text-lg max-w-sm sm:max-w-lg lg:max-w-md font-semibold  leading-relaxed sm:leading-loose`}>
              Haz un regalo especial y celebra este día tan importante con mucho
              amor y alegría.
            </p>
          </div>

          {/* Botón */}
          <div className={`w-full pt-1 flex justify-center ${theme.background}`}>
            <Link to="/pedidos">
              <button
                className={`flex items-center cursor-pointer gap-3 rounded-lg ${theme.buttoncolor} ${theme.buttontext} text-xl px-6 py-4 shadow-lg hover:${theme.buttonhovercolor} transition-all duration-300 hover:scale-105 active:scale-95`}
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                <Cake className={`${theme.buttontext}`} size={32} strokeWidth={1.75} />
                Ver más
              </button>
            </Link>
          </div>

        </div>

        {/* Columna derecha - Imagen con animación */}
        <div className="flex pb-4 lg:pb-0 items-center justify-center w-full order-first lg:order-last px-4">
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-square flex items-center justify-center">

            {/* Círculo de fondo responsivo con animación suave */}
            <div
              className={`absolute inset-0 flex items-center justify-center float-animation ${!isVisible ? 'pause-animation' : ''
                }`}
              style={{
                animationDelay: '0s',
                '--start-rotate': '0deg'
              } as React.CSSProperties}
            >
              <div className={`w-4/5 h-4/5 rounded-full ${theme.plansBg} opacity-40`}></div>
            </div>

            {/* Rosas con animación de flotación optimizada */}
            <img
              src="/images/rose.png"
              alt="rose"
              className={`absolute top-12 left-12 sm:top-16 sm:left-16 md:top-20 md:left-20 lg:top-18 lg:left-18 xl:top-20 xl:left-20 w-13 h-13 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 float-animation ${!isVisible ? 'pause-animation' : ''
                }`}
              style={{
                animationDelay: '0.5s',
                '--start-rotate': '-45deg'
              } as React.CSSProperties}
            />

            <img
              src="/images/rose.png"
              alt="rose"
              className={`absolute top-12 right-12 sm:top-16 sm:right-16 md:top-20 md:right-20 lg:top-18 lg:right-18  xl:top-20 xl:right-20 w-13 h-13 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 float-animation ${!isVisible ? 'pause-animation' : ''
                }`}
              style={{
                animationDelay: '1s',
                '--start-rotate': '30deg'
              } as React.CSSProperties}
            />

            <img
              src="/images/rose.png"
              alt="rose"
              className={`absolute bottom-12 left-12 sm:bottom-16 sm:left-16 md:bottom-20 md:left-20 lg:bottom-18 lg:left-18 xl:bottom-20 xl:left-20 w-13 h-13 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 float-animation ${!isVisible ? 'pause-animation' : ''
                }`}
              style={{
                animationDelay: '1.5s',
                '--start-rotate': '-140deg'
              } as React.CSSProperties}
            />

            <img
              src="/images/rose.png"
              alt="rose"
              className={`absolute bottom-12 right-12 sm:bottom-16 sm:right-16 md:bottom-20 md:right-20 lg:bottom-18 lg:right-18 xl:bottom-20 xl:right-20 w-13 h-13 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 float-animation ${!isVisible ? 'pause-animation' : ''
                }`}
              style={{
                animationDelay: '2s',
                '--start-rotate': '140deg'
              } as React.CSSProperties}
            />

            {/* Corazón con imagen animada */}
            <div className={`relative z-10 w-3/4 h-3/4 flex items-center justify-center fade-card ${fadeState}`}>
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <clipPath id="heartClip">
                    <path d="M50,90 C50,90 10,60 10,40 C10,25 20,15 32,15 C40,15 47,20 50,27 C53,20 60,15 68,15 C80,15 90,25 90,40 C90,60 50,90 50,90 Z" />
                  </clipPath>
                </defs>
                <image
                  className="object-contain"
                  href={cards[currentImageIndex].src}
                  width="100"
                  height="100"
                  clipPath="url(#heartClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}