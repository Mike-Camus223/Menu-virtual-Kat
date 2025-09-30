"use client";

export default function Motherday() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-teal-50 px-4 sm:px-6 lg:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full items-center gap-12 lg:gap-16">
        
        {/* Texto */}
        <div className="flex flex-col items-start justify-center space-y-6 order-2 lg:order-1">
          <div className="space-y-2">
            <p className="text-rose-300 text-lg sm:text-xl font-medium tracking-wide">
              FELIZ
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none">
              <span className="block text-gray-900">DÍA DE</span>
              <span className="block text-gray-900">LAS</span>
              <span className="block text-gray-900">MADRES</span>
            </h1>
          </div>
          
          <p className="text-gray-600 text-base sm:text-lg max-w-lg leading-relaxed">
            Haz un regalo especial y celebra este día tan importante con mucho
            amor y alegría.
          </p>
          
          <button className="bg-rose-300 text-white px-8 py-3.5 rounded-full text-base sm:text-lg font-medium hover:bg-rose-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Leer más
          </button>
        </div>

        {/* Imagen + decoraciones */}
        <div className="relative flex items-center justify-center w-full order-1 lg:order-2 py-8">
          <div className="relative w-full max-w-md aspect-square">
            
            {/* Círculo de fondo rosa suave */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-rose-100 rounded-full opacity-60"></div>
            
            {/* Imagen con clip-path corazón mejorado */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] overflow-hidden shadow-2xl"
              style={{ 
                clipPath: "polygon(50% 15%, 61% 6%, 75% 4%, 85% 10%, 91% 20%, 93% 32%, 91% 44%, 85% 54%, 75% 62%, 62% 72%, 50% 85%, 38% 72%, 25% 62%, 15% 54%, 9% 44%, 7% 32%, 9% 20%, 15% 10%, 25% 4%, 39% 6%)"
              }}
            >
              <img 
                src="https://images.pexels.com/photos/3770585/pexels-photo-3770585.jpeg"
                alt="Madres"
                className="w-full h-full object-cover scale-110"
              />
            </div>

            {/* Decoraciones florales - Posición superior izquierda */}
            <div className="absolute top-[5%] left-[8%] w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
              <div className="relative w-full h-full">
                {/* Pétalos rojos */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-7 sm:h-7 bg-rose-400 rounded-full opacity-80"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-7 sm:h-7 bg-rose-400 rounded-full opacity-80"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-5 h-5 sm:w-7 sm:h-7 bg-rose-400 rounded-full opacity-80"></div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-5 h-5 sm:w-7 sm:h-7 bg-rose-400 rounded-full opacity-80"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-300 rounded-full"></div>
              </div>
            </div>

            {/* Decoraciones florales - Posición inferior derecha */}
            <div className="absolute bottom-[8%] right-[5%] w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
              <div className="relative w-full h-full">
                {/* Pétalos azules */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-teal-300 rounded-full opacity-80"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-teal-300 rounded-full opacity-80"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-6 h-6 sm:w-8 sm:h-8 bg-teal-300 rounded-full opacity-80"></div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-teal-300 rounded-full opacity-80"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-7 sm:h-7 bg-yellow-300 rounded-full"></div>
              </div>
            </div>

            {/* Decoración pequeña izquierda media */}
            <div className="absolute top-[45%] left-[2%] w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-rose-300 rounded-full opacity-70"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-rose-300 rounded-full opacity-70"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 sm:w-4 sm:h-4 bg-rose-300 rounded-full opacity-70"></div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-rose-300 rounded-full opacity-70"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-200 rounded-full"></div>
              </div>
            </div>

            {/* Decoración pequeña derecha superior-media */}
            <div className="absolute top-[30%] right-[2%] w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-teal-200 rounded-full opacity-70"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-teal-200 rounded-full opacity-70"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 sm:w-4 sm:h-4 bg-teal-200 rounded-full opacity-70"></div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-teal-200 rounded-full opacity-70"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-200 rounded-full"></div>
              </div>
            </div>

            {/* Elementos decorativos adicionales sutiles */}
            <div className="absolute top-[15%] right-[20%] w-3 h-3 bg-rose-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-[20%] left-[15%] w-3 h-3 bg-teal-200 rounded-full opacity-50"></div>
            <div className="absolute top-[60%] right-[12%] w-2 h-2 bg-rose-300 rounded-full opacity-40"></div>
            <div className="absolute bottom-[45%] left-[25%] w-2 h-2 bg-teal-300 rounded-full opacity-40"></div>
            
            {/* Hojas decorativas */}
            <div className="absolute bottom-[15%] left-[10%] w-16 h-20 sm:w-20 sm:h-24 opacity-60">
              <div className="w-full h-full bg-teal-400 rounded-tl-full rounded-br-full transform -rotate-12"></div>
            </div>
            
            <div className="absolute top-[12%] right-[15%] w-12 h-16 sm:w-16 sm:h-20 opacity-50">
              <div className="w-full h-full bg-rose-300 rounded-tr-full rounded-bl-full transform rotate-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}