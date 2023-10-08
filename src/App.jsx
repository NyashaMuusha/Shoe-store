import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Route, Routes } from "react-router-dom";
import Detail from "./Details";
import Cart from "./Cart";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? "";
    } catch (error) {
      console.error("The cart could not be parsed into JSON");
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  const addToCart = (id, sku) => {
    setCart((items) => {
      // Check if the item with the same 'sku' is already in the basket
      const itemInCart = items.find((i) => i.sku === sku);

      if (itemInCart) {
        // If the item is already in the basket, increase its quantity by 1
        // Return a new array with the matching item replaced with the updated quantity
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        // If the item is not in the basket, add a new item with quantity 1
        // Return a new array with the new item appended
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (sku, quantity) => {
    setCart((items) => {
      return quantity === 0
        ? items.filter((i) => i.sku !== sku)
        : items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    });
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={<h1> Welcome To Carved Rock Fitness</h1>}
            />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
