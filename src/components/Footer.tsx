import { useTheme } from "@/context/themeContext";

export default function Footer() {
    const { theme } = useTheme();

  return (
     <footer className={`bg-gradient-to-r ${theme.footer} text-white text-center py-4`}>
      © 2025 Katyka
    </footer>
  );
}
