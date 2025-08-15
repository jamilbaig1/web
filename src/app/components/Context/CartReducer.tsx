export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  qty: number;
}

export interface CartState {
  cartItems: CartItem[];
}

// ✅ Load from localStorage if available
export const initialState: CartState = {
  cartItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string | number }
  | { type: "CLEAR_CART" };

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  let updatedState: CartState;

  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        updatedState = {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + action.payload.qty }
              : item
          ),
        };
      } else {
        updatedState = {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
      break;

    case "REMOVE_ITEM":
      updatedState = {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };
      break;

    case "CLEAR_CART":
      updatedState = { ...state, cartItems: [] };
      break;

    default:
      return state;
  }

  // ✅ Save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(updatedState.cartItems));
  }

  return updatedState;
};
