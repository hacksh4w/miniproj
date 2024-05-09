'use client'
import { supabase } from "@/utils/supabase";
import { debounce } from "lodash";
import { createContext, useContext, useState } from "react";
import { useUser} from "./UserContext";


const ShoppingCartContext = createContext();

export const useShoppingCart = () => useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const userProf = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [userData,setUserData] = useState([]);
  const inputSearchedTerm = debounce((term) => {
    setSearchTerm(term);
  }, 500);

  function getItemsQuantity(id) {
    return (
      cartItems?.find((currentItem) => currentItem.id === id)?.quantity || 0
    );
  }

  function addItemToCart(id) {
    setCartItems((currentItem) => {
      if (currentItem?.find((item) => item.id === id) == null) {
        return [...currentItem, { id, quantity: 1 }];
      } else {
        return currentItem?.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeItem(id) {
    setCartItems((currentItem) => currentItem.filter((item) => item.id !== id));
  }

  const cartItemsQuantity = cartItems?.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  useEffect(() => {
    // Fetch cart items from supabase
    console.log(userProf)
    
    const fetchCartItems = async () => {
      try {
        console.log(userProf)
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("id", userProf.id); 
      }  catch (error) {
        console.log("cant fetch cart items", error.message)
      }
      if (error) {
        console.error("Error fetching cart items:", error.message);
      } else {
        setCartItems(data);
      }
  }
    fetchCartItems();
  }, [userID]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        getItemsQuantity,
        removeItem,
        addItemToCart,
        cartItemsQuantity,
        searchTerm,
        inputSearchedTerm,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
