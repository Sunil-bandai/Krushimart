import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => set((state) => {
        const normalizedProduct = {
          ...product,
          id: product.id || product._id,
          quantity: product.quantity || 1,
        };

        const existingItem = state.items.find((item) => item.id === normalizedProduct.id);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === normalizedProduct.id
                ? {
                    ...item,
                    quantity: (item.quantity || 1) + normalizedProduct.quantity,
                  }
                : item
            ),
          };
        }
        return { items: [...state.items, normalizedProduct] };
      }),

      updateItemQuantity: (id, quantity) => set((state) => {
        const nextQuantity = Number(quantity);
        if (!id || Number.isNaN(nextQuantity)) return state;

        if (nextQuantity <= 0) {
          return {
            items: state.items.filter((item) => item.id !== id && item._id !== id),
          };
        }

        return {
          items: state.items.map((item) =>
            item.id === id || item._id === id
              ? { ...item, id: item.id || item._id, quantity: nextQuantity }
              : item
          ),
        };
      }),

      // Replace local items with server cart payload (convert populated items)
      replaceItemsFromServer: (cart) => set(() => {
        if (!cart || !cart.items) return { items: [] };
        const transformed = cart.items.map((it) => ({
          id: it.product?._id || it.product?.id || String(it.product),
          name: it.product?.name,
          category: it.product?.category,
          unit: it.product?.unit,
          image: it.product?.image,
          price: it.price || it.product?.price,
          quantity: it.quantity,
        }));
        return { items: transformed };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id && item._id !== id),
      })),

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = typeof item.price === 'number' 
            ? item.price 
            : parseFloat(item.price?.replace(/[^0-9.]/g, '') || 0);
          return total + price * (item.quantity || 1);
        }, 0);
      },
    }),
    {
      name: 'krushimart-cart',
    }
  )
);

export default useCartStore;
