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
  planType: "gran" | "peq";
  quantity: number;
  totalPrice: number;
  items: CartItem[];
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
  motherDayItems: CartItem[];
  setPlan: (plan: PlanData | null) => void
  addItem: (item: CartItem) => void;
  incrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  clearItems: () => void;
  addMultiPlan: (plan: MultiPlan) => void;
  removeMultiPlan: (planId: number) => void;
  clearMultiPlans: () => void;
  removeCurrentPlan: () => void;
  removeMultiPlanById: (planId: number) => void;
  addMotherDayItem: (item: CartItem) => void;
  removeMotherDayItem: (id: string) => void;
  decrementMotherDayItem: (id: string) => void;
  clearMotherDayItems: () => void;
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
  const [motherDayItems, setMotherDayItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    saveToStorage();
  }, [plan, items, multiPlans, motherDayItems]);

  const saveToStorage = () => {
    try {
      const data = {
        plan,
        items,
        multiPlans,
        motherDayItems,
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
          setMotherDayItems(data.motherDayItems || []);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.warn("No se pudo cargar desde localStorage:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const setPlan = (newPlan: PlanData | null) => setPlanState(newPlan);

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
    setMotherDayItems([]);
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

  const removeCurrentPlan = () => {
    // Solo vaciar los items, mantener el plan activo
    setItems([]);
  };

  const removeMultiPlanById = (planId: number) => {
    setMultiPlans((prev) => prev.filter((p) => p.planId !== planId));
  };

  const addMotherDayItem = (item: CartItem) => {
    setMotherDayItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeMotherDayItem = (id: string) => {
    setMotherDayItems((prev) => prev.filter((item) => item.id !== id));
  };

  const decrementMotherDayItem = (id: string) => {
    setMotherDayItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearMotherDayItems = () => {
    setMotherDayItems([]);
  };

  const openCartSidebar = () => setIsCartOpen(true);
  const closeCartSidebar = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        plan,
        items,
        multiPlans,
        motherDayItems,
        setPlan,
        addItem,
        incrementItem,
        removeItem,
        clearCart,
        clearItems,
        addMultiPlan,
        removeMultiPlan,
        clearMultiPlans,
        removeCurrentPlan,
        removeMultiPlanById,
        addMotherDayItem,
      removeMotherDayItem,
      decrementMotherDayItem,
      clearMotherDayItems,
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
