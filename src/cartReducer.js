export const cartReducer = (cart, action) => {
  switch (action.type) {
    case "empty":
      return [];
    case "add":
      const { id, sku } = action;
      // Check if the item with the same 'sku' is already in the basket
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        // If the item is already in the basket, increase its quantity by 1
        // Return a new array with the matching item replaced with the updated quantity
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        // If the item is not in the basket, add a new item with quantity 1
        // Return a new array with the new item appended
        return [...cart, { id, sku, quantity: 1 }];
      }
    case "updateQuantity": {
      const { quantity } = action;
      return quantity === 0
        ? cart.filter((i) => i.sku !== sku)
        : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    }
    default:
      throw new Error("Unhandled action" + action.type);
  }
};
