import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (i) =>
          i.id === item.id &&
          i.material === item.material &&
          i.color === item.color &&
          i.switchType === item.switchType
      );
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id &&
          i.material === item.material &&
          i.color === item.color &&
          i.switchType === item.switchType
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...prev,
        {
          ...item,
          material: item.material || "N/A",
          color: item.color || "N/A",
          switchType: item.switchType || "N/A",
          quantity: 1,
        },
      ];
    });
  };

  const removeItem = (item) => {
    setCartItems((prev) =>
      prev.filter(
        (i) =>
          !(i.id === item.id && i.material === item.material && i.color === item.color && i.switchType === item.switchType)
      )
    );
  };

  const increaseQuantity = (item) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === item.id &&
        i.material === item.material &&
        i.color === item.color &&
        i.switchType === item.switchType
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
          i.material === item.material &&
          i.color === item.color &&
          i.switchType === item.switchType
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
        cartItemCount,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
