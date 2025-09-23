import { useEffect, useState, type JSX } from "react";
import { X, CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

interface NotificationProps {
  message: string;
  type?: "aceptado" | "rechazado" | "warning" | "neutro";
  onClose: () => void;
  duration?: number; // tiempo antes de cerrarse solo
}

export default function Notification({
  message,
  type = "neutro",
  onClose,
  duration = 3000,
}: NotificationProps) {
  const [visible, setVisible] = useState(false); // iniciar invisible para animación de entrada

  // Animación de entrada
  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(enterTimer);
  }, []);

  // Auto-cierre con animación de salida
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // dispara animación de salida
      setTimeout(onClose, 400); // espera a que termine para desmontar
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const base =
    "fixed top-5 right-5 max-w-xs w-[90%] sm:w-auto z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white transition-all duration-400 ease-out";

  const styles: Record<typeof type, string> = {
    aceptado: "bg-green-600",
    rechazado: "bg-red-600",
    warning: "bg-yellow-500",
    neutro: "bg-blue-600",
  };

  const icons: Record<typeof type, JSX.Element> = {
    aceptado: <CheckCircle2 size={22} />,
    rechazado: <XCircle size={22} />,
    warning: <AlertTriangle size={22} />,
    neutro: <Info size={22} />,
  };

  return (
    <div
      className={`${base} ${styles[type]} ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      {icons[type]}
      <span className="font-medium text-sm break-words">{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 400);
        }}
        className="ml-2 text-white/80 hover:text-white"
      >
        <X size={16} />
      </button>
    </div>
  );
}
