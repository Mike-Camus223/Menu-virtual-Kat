import { useTheme } from "@/context/themeContext";
import { TicketCheck, Wheat } from "lucide-react";
import { Link } from "react-router-dom";


export default function About() {
    const {theme} = useTheme();
    return (
        <div>
            <div className={`w-full h-auto flex flex-col items-center pt-4 ${theme.background}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 max-w-8xl mx-auto">
                    <div className="flex-col flex">
                        <div className="flex flex-col">
                            <div className="grid grid-cols-3 sm:grid-cols-3 px-4 gap-4">
                                {[
                                    {
                                        src: "https://alicante.com.ar/wp-content/uploads/2022/06/147_receta.jpg",
                                        alt: "Tarta de espinaca",
                                    },
                                    {
                                        src: "https://hiraoka.com.pe/media/mageplaza/blog/post/r/e/receta-de-estofado-de-pollo-como-hacer-estofado-de-pollo-facil-y-rapido.jpg",
                                        alt: "Estofado de pollo",
                                    },
                                    {
                                        src: "https://content-cocina.lecturas.com/medio/2021/07/12/tarta-de-galleta_061960d1_1200x1200.jpg",
                                        alt: "Tarta de limon",
                                    },
                                ].map((img) => (
                                    <div key={img.alt} className="overflow-hidden shadow-xl">
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-full h-full object-cover aspect-[4/3]"
                                            draggable="false"
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Sección de imágenes */}

                        </div>

                        <div className="flex flex-col my-auto">
                            {/* Texto */}
                            <div className="text-center max-w-4xl mx-auto my-2 md:mb-8 px-4 md:px-0">
                                <div className="py-4 lg:py-8">
                                    <h2
                                        className={`text-3xl sm:text-4xl text-shadow-lg md:text-5xl font-semibold ${theme.title} mb-4`}
                                        style={{ fontFamily: "Times New Roman, serif" }}
                                    >
                                        Bienvenido a{" "}
                                        <span className={`${theme.titleSecond} text-shadow-lg`} style={{ fontFamily: "Times New Roman, serif" }}>
                                            Katyka
                                        </span>
                                    </h2>
                                </div>
                                <p className={`text-base sm:text-lg ${theme.text} leading-relaxed`}>
                                    En <span className="font-semibold">Katyka</span> creemos que comer bien no tiene por qué ser complicado.
                                    Nuestro plan de viandas te ayuda a alcanzar tu peso ideal con porciones justas y sabor casero.
                                    <br /><br />
                                    Preparamos comidas equilibradas para toda la semana, para que tengas más tiempo para vos y
                                    disfrutes de energía y bienestar sin excesos.
                                    <br /><br />
                                    No harinas, no azúcar, no frituras, no alcohol. Solo equilibrio y orden en tu alimentación.
                                </p>

                            </div>

                            {/* Botón */}
                            <div className={`w-full flex justify-center py-4 mb-2 md:mb-0 md:py-8 ${theme.background} px-4`}>
                                <Link
                                    to="/pedidos"
                                    className={`flex items-center gap-2 rounded-lg ${theme.buttoncolor} ${theme.buttontext} text-lg md:text-xl px-4 py-3 shadow-lg hover:scale-105 active:scale-95 hover:${theme.buttonhovercolor} transition-all duration-300`}
                                    style={{ fontFamily: "Times New Roman, serif" }}
                                >
                                    <TicketCheck className={`${theme.buttontext}`} size={28} strokeWidth={1.75} />
                                    Haz tu pedido ya
                                </Link>
                            </div>

                        </div>

                    </div>

                    {/* Columna derecha */}
                    <div className="relative overflow-hidden shadow-xl h-full min-h-[300px]">
                        <img
                            src="https://i.guim.co.uk/img/media/d151221abab9bf4181178553b561c1a96dec7fa7/0_188_5632_3380/master/5632.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=64ef7900961307f2305f1198dfe1191e"
                            alt="Fondo saludable"
                            className="w-full scale-120 object-right h-full object-cover aspect-[4/3]"
                            draggable="false"
                        />
                    </div>
                </div>
            </div>
            <div className={`w-full h-auto flex flex-col items-center ${theme.background}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 max-w-8xl mx-auto">
                    {/* Imagen */}
                    <div className="overflow-hidden shadow-xl h-full w-full order-2 lg:order-1">
                        <img
                            src="https://i.guim.co.uk/img/media/d151221abab9bf4181178553b561c1a96dec7fa7/0_188_5632_3380/master/5632.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=64ef7900961307f2305f1198dfe1191e"
                            alt="Viandas"
                            className="w-full object-right h-full object-cover aspect-[4/3]"
                            draggable="false"
                        />
                    </div>
                    {/* Texto / Info */}
                    <div className={`${theme.background} relative z-5 flex justify-center items-center w-full py-16 md:py-20 lg:py-20 xl:py-4 px-4 order-1 lg:order-2`}>
                        <div className="absolute top-0 right-0 z-[-1]">
                            <Wheat className={`${theme.iconssecond} w-50 h-50sm:w-72 sm:h-72md:w-72 md:h-72 lg:w-[20rem] lg:h-[20rem] `}strokeWidth={2}/>
                        </div>
                        <div className={`max-w-xl w-full flex flex-col gap-3 ${theme.text}`}>
                            <h2
                                className="text-4xl text-center pb-2 sm:pb-0 text-shadow-lg sm:text-2xl md:text-3xl lg:text-5xl font-semibold sm:text-start"
                                style={{ fontFamily: "Times New Roman, serif" }}
                            >
                                Viandas<br />
                                <span className={`${theme.titleSecond}`}>Saludables</span>
                            </h2>

                            {/* Viandas */}
                            <div className="flex flex-col gap-2 text-xs sm:text-sm">

                                {/* Pastas / Pollo / Vegetarianas / Tartas */}
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold text-start">Pastas / Pollo / Vegetarianas / Tartas</p>
                                    <div className="flex justify-between px-4">
                                        <span>Chicas</span>
                                        <span>$7300</span>
                                    </div>
                                    <div className="flex justify-between px-4">
                                        <span>Grandes</span>
                                        <span>$8000</span>
                                    </div>
                                </div>

                                {/* Carnes */}
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold text-start">Peceto / Cuadril / Cuadrada / Pescado</p>
                                    <div className="flex justify-between px-4">
                                        <span>Chicas</span>
                                        <span>$7500</span>
                                    </div>
                                    <div className="flex justify-between px-4">
                                        <span>Grandes</span>
                                        <span>$8500</span>
                                    </div>
                                </div>

                                {/* Postres */}
                                <div className="flex justify-between px-4 mt-2">
                                    <span className="font-semibold">Postres</span>
                                    <span>$5500</span>
                                </div>
                            </div>

                            {/* Espaciador */}
                            <div className={`border-t ${theme.bordercolor}`}></div>

                            {/* Entregas */}
                            <div className="italic text-sm text-center font-bold">
                                Entregas a domicilio: miercoles y viernes durante el dia. <br />
                                Reservar 3 dias antes el pedido. <br />
                                Para mas detalles consultenos al  <span className="font-bold">numero de whatsapp 1121911765</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
