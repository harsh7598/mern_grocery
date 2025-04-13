import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  //Fetch All Products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  //Add Product to Cart
  const addToCart = (itemID) =>{
    let cartData = structuredClone(cartItems);
    if(cartData[itemID]){
      cartData[itemID] += 1;
    }else{
      cartData[itemID] = 1;
    }
    setCartItems(cartData);
    toast.success("Product Added to Cart");
  }

  //Update Cart Item Quantity
  const updateCartItem = (itemID, quantity) =>{
    let cartData = structuredClone(cartItems);
    cartData[itemID] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  }

  //Remove Product from Cart
  const removeFromCart = (itemID) =>{
    let cartData = structuredClone(cartItems);
    if(cartData[itemID]){
      cartData[itemID] -= 1;
      if(cartData[itemID] === 0){
        delete cartData[itemID];
      }
    }
    toast.success("Product Removed from Cart");
    setCartItems(cartData);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
