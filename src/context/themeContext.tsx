// src/context/themeContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = {
    name: string;
    navbar: string;
    footer: string;
    background: string;
    title: string;
    titleSecond: string;
    text: string;
    textsecond: string;
    subtitle: string;
    icons: string;
    iconssecond: string;
    bordercolor: string;
    buttoncolor: string;
    buttonhovercolor: string;
    buttontext: string;
    filterText: string;
    loader: string;
    loadertext: string;
    cardbackground: string;
    bordermain: string;
    cartbackground: string;
    plansBg: string;
    dropdownselected: string;
    dropdownring: string;
};

interface ThemeContextProps {
    theme: Theme;
}

const defaultTheme: Theme = {
    name: "default",
    navbar: "bg-green-800",
    footer: "from-lime-800 to-green-800",
    background: "bg-amber-100",
    title: 'text-lime-800',
    titleSecond: 'text-amber-500',
    text: 'text-lime-800',
    textsecond: 'text-gray-700',
    subtitle: 'text-amber-800',
    icons: 'text-lime-800',
    iconssecond: 'text-lime-200',
    bordercolor: 'border-lime-800',
    buttoncolor: 'bg-green-800',
    buttonhovercolor: 'bg-green-900',
    buttontext: 'text-white',
    filterText: 'text-gray-800',
    loader: 'bg-green-600',
    loadertext: 'text-lime-500',
    cardbackground: 'bg-[#F7FEE7]',
    bordermain: 'border-gray-300',
    cartbackground: 'bg-white',
    plansBg: 'bg-[#51591B]',
    dropdownring: "ring-lime-400",
    dropdownselected: "bg-lime-200",
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// localStorage.removeItem('theme_test_date'); location.reload();
//localStorage.setItem('theme_test_date','2025-10-05');location.reload();   

type EventRange = {
    name: string;
    start: { month: number; day: number }; // month: 1..12 (más legible)
    end: { month: number; day: number };
    theme: Theme;
};

// Orden = prioridad (el primero que matchee se aplica)
const EVENTS: EventRange[] = [
    {
        name: "motherday",
        start: { month: 10, day: 4 },
        end: { month: 10, day: 17 },
        theme: {
            name: "motherday",
            navbar: "bg-[#830C41]",
            footer: "bg-[#830C41]",
            background: "bg-[#FCF2F8]",
            title: "text-[#C5005A]",
            titleSecond: "text-pink-500",
            text: "text-[#C5005A]",
            textsecond: "text-gray-700",
            subtitle: "text-pink-600",
            icons: "text-[#C4005A]",
            iconssecond: "text-pink-100",
            bordercolor: "border-[#C4005A]",
            buttoncolor: "bg-[#830C41]",
            buttonhovercolor: "bg-[#770A3A]",
            buttontext: "text-[#F9CBE5]",
            filterText: "text-pink-700",
            loader: "bg-pink-500",
            loadertext: "text-white",
            cardbackground: "bg-[#FCF2F8]",
            bordermain: "border-[#F9CBE5]",
            cartbackground: "bg-pink-50",
            plansBg: "bg-[#F9CBE5]",
            dropdownring: "ring-pink-400",
            dropdownselected: "bg-[#F9CBE5]",
        },
    },
];

// intenta parsear una fecha de prueba (localStorage, query param o variable global)
function parseTestDate(): Date | null {
    if (typeof window === "undefined") return null;
    const fromLS = localStorage.getItem("theme_test_date");
    const fromQuery = new URLSearchParams(window.location.search).get("theme_date");
    const fromGlobal = (window as any).__THEME_DATE_FOR_TESTING;
    const raw = fromLS ?? fromQuery ?? fromGlobal;
    if (!raw) return null;
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
}

// comprueba si 'today' cae dentro del rango (start..end) manejando wrap-around y cruces de año
function isDateInRange(today: Date, start: { month: number; day: number }, end: { month: number; day: number }): boolean {
    // probamos anclar el range en varios años para cubrir casos como: start = dic, end = ene (cruce año)
    const candidateYears = [today.getFullYear(), today.getFullYear() - 1, today.getFullYear() + 1];
    for (const year of candidateYears) {
        const s = new Date(year, start.month - 1, start.day, 0, 0, 0, 0);
        let e = new Date(year, end.month - 1, end.day, 23, 59, 59, 999);
        if (e.getTime() < s.getTime()) {
            // el rango cruza hacia el año siguiente
            e.setFullYear(e.getFullYear() + 1);
        }
        if (today.getTime() >= s.getTime() && today.getTime() <= e.getTime()) return true;
    }
    return false;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const computeTheme = () => {
            const testDate = parseTestDate();
            const today = testDate ?? new Date();

            for (const ev of EVENTS) {
                if (isDateInRange(today, ev.start, ev.end)) {
                    setTheme(ev.theme);
                    return;
                }
            }

            setTheme(defaultTheme);
        };

        computeTheme();

        // Recalcular automáticamente a la medianoche siguiente y luego cada 24h.
        const now = new Date();
        const nextMidnight = new Date(now);
        nextMidnight.setDate(now.getDate() + 1);
        nextMidnight.setHours(0, 0, 1, 0);
        const msUntilMidnight = nextMidnight.getTime() - now.getTime();

        const midnightTimeout = setTimeout(() => {
            computeTheme();
            const dailyInterval = setInterval(computeTheme, 1000 * 60 * 60 * 24);
            // guardamos el id para limpiarlo si se desmonta
            (window as any).__theme_daily_interval = dailyInterval;
        }, msUntilMidnight);

        return () => {
            clearTimeout(midnightTimeout);
            const dailyInterval = (window as any).__theme_daily_interval;
            if (dailyInterval) clearInterval(dailyInterval);
        };
    }, []);

    return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme debe usarse dentro de ThemeProvider");
    return ctx;
};
