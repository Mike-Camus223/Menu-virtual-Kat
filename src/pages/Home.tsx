"use client";

export default function Home() {
  const cards = [
    { src: "https://recetasdecocina.elmundo.es/wp-content/uploads/2024/01/receta-de-salteado-de-verduras-1024x657.jpg", alt: "Frescura" },
    { src: "https://content-cocina.lecturas.com/medio/2024/07/15/arroz-chaufa-peruano_483d3313_1218071266_240715103150_1200x1200.jpg", alt: "Nutrición" },
    { src: "https://www.gourmet.cl/wp-content/uploads/2013/03/guiso-de-verduras.jpg", alt: "Variedad" },
    { src: "https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/b9e5673058f8bcc1d7853f5b20110db5.png", alt: "Sabor" },
    { src: "https://d36fw6y2wq3bat.cloudfront.net/recipes/salteado-de-pollo-zanahorias-y-champinones/900/salteado-de-pollo-zanahorias-y-champinones.jpg", alt: "Calidad" },
    { src: "https://cocinerosargentinos.com/content/recipes/original/recipes.20262.jpg", alt: "Pasión" },
  ];

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
        `,
        }}
      />

      <div className="max-w-screen h-auto bg-[#FFF6F0]">
        {/* Título */}
        <div className="pt-16 pb-20 w-full flex justify-center items-center text-center">
          <h1
            className="underline text-shadow-lg text-rose-950 text-3xl sm:text-5xl md:text-6xl max-w-2xl px-4"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Platos ricos y nutritivos
          </h1>
        </div>

        {/* Carrusel infinito */}
        <div className="relative overflow-hidden py-10 sm:py-16 h-80 md:h-96 lg:h-[28rem]">
          <div className="scroll-track gap-6 sm:gap-10 md:gap-12">
            {[...cards, ...cards].map((c, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-72 rounded-xl shadow-xl overflow-hidden"
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
      </div>
    </>
  );
}
