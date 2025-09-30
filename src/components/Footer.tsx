import { useTheme } from "@/context/themeContext";

export default function Footer() {
    const { theme } = useTheme();

  return (
     <footer className={`${theme.footer} ${theme.buttontext} text-center py-4`}>
      © 2025 Katyka
    </footer>
  );
}
