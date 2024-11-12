import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (i) =>
          i.id === item.id &&
          i.material === normalizeValue(item.material) &&
          i.color === normalizeValue(item.color) &&
          i.switchType === normalizeValue(item.switchType)
      );

      const validPrice = typeof item.price === 'number' && item.price > 0 ? item.price : 0;

      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id &&
          i.material === normalizeValue(item.material) &&
          i.color === normalizeValue(item.color) &&
          i.switchType === normalizeValue(item.switchType)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          material: normalizeValue(item.material),
          color: normalizeValue(item.color),
          switchType: normalizeValue(item.switchType),
          price: validPrice,
          quantity: 1,
        },
      ];
    });
  };

  const normalizeValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || 'N/A'; // Extract a name or title if it's an object
    }
    return typeof value === 'string' ? value : 'N/A'; // Ensure it's a string
  };

  const removeItem = (item) => {
    setCartItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.id === item.id &&
            i.material === normalizeValue(item.material) &&
            i.color === normalizeValue(item.color) &&
            i.switchType === normalizeValue(item.switchType)
          )
      )
    );
  };

  const increaseQuantity = (item) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === item.id &&
        i.material === normalizeValue(item.material) &&
        i.color === normalizeValue(item.color) &&
        i.switchType === normalizeValue(item.switchType)
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decreaseQuantity = (item) => {
    setCartItems((prev) =>
      prev.reduce((acc, i) => {
        if (
          i.id === item.id &&
          i.material === normalizeValue(item.material) &&
          i.color === normalizeValue(item.color) &&
          i.switchType === normalizeValue(item.switchType)
        ) {
          if (i.quantity > 1) {
            acc.push({ ...i, quantity: i.quantity - 1 });
          }
        } else {
          acc.push(i);
        }
        return acc;
      }, [])
    );
  };

  const updateItemPrice = (itemId, newPrice) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, price: newPrice } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        updateItemPrice,
        cartItemCount,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
