import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface MultiPlan {
  planId: number;
  quantity: number;
  totalPrice: number;
}

export interface PlanData {
  id: number;
  type: "gran" | "peq";
  maxItems: number;
}

interface CartContextType {
  plan: PlanData | null;
  items: CartItem[];
  multiPlans: MultiPlan[];
  setPlan: (plan: PlanData) => void;
  addItem: (item: CartItem) => void;
  incrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  clearItems: () => void;
  addMultiPlan: (plan: MultiPlan) => void;
  removeMultiPlan: (planId: number) => void;
  clearMultiPlans: () => void;
  saveToStorage: () => void;
  loadFromStorage: () => void;
  isCartOpen: boolean;
  openCartSidebar: () => void;
  closeCartSidebar: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "katyka_cart_data";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlanState] = useState<PlanData | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [multiPlans, setMultiPlans] = useState<MultiPlan[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    saveToStorage();
  }, [plan, items, multiPlans]);

  const saveToStorage = () => {
    try {
      const data = {
        plan,
        items,
        multiPlans,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn("No se pudo guardar en localStorage:", error);
    }
  };

  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
        if (data.timestamp && Date.now() - data.timestamp < TWENTY_FOUR_HOURS) {
          setPlanState(data.plan || null);
          setItems(data.items || []);
          setMultiPlans(data.multiPlans || []);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.warn("No se pudo cargar desde localStorage:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const setPlan = (newPlan: PlanData) => setPlanState(newPlan);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id: item.id, name: item.name, quantity: item.quantity, price: item.price }];
    });
  };

  const incrementItem = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => {
    setPlanState(null);
    setItems([]);
    setMultiPlans([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const clearItems = () => setItems([]);

  const addMultiPlan = (plan: MultiPlan) => {
    setMultiPlans((prev) => {
      const existing = prev.find((p) => p.planId === plan.planId);
      if (existing) {
        return prev.map((p) =>
          p.planId === plan.planId
            ? {
                ...p,
                quantity: p.quantity + plan.quantity,
                totalPrice: p.totalPrice + plan.totalPrice,
              }
            : p
        );
      }
      return [...prev, plan];
    });
  };

  const removeMultiPlan = (planId: number) => {
    setMultiPlans((prev) => prev.filter((p) => p.planId !== planId));
  };

  const clearMultiPlans = () => setMultiPlans([]);

  const openCartSidebar = () => setIsCartOpen(true);
  const closeCartSidebar = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        plan,
        items,
        multiPlans,
        setPlan,
        addItem,
        incrementItem,
        removeItem,
        clearCart,
        clearItems,
        addMultiPlan,
        removeMultiPlan,
        clearMultiPlans,
        saveToStorage,
        loadFromStorage,
        isCartOpen,
        openCartSidebar,
        closeCartSidebar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
