// frontend/src/context/CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';

const CartContext = createContext();

// Acciones del carrito
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  UPDATE_PRODUCT_DATA: 'UPDATE_PRODUCT_DATA',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Reducer del carrito
const cartReducer = (state, action) => {
  console.log('🛒 CartReducer:', action.type);
  
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      console.log('➕ Agregando:', product.name, 'x', quantity);
      
      const existingItemIndex = state.items.findIndex(item => 
        (item.product.id || item.product._id) === (product.id || product._id)
      );
      
      if (existingItemIndex >= 0) {
        // Si el producto ya existe, actualizar cantidad
        const updatedItems = [...state.items];
        const currentQuantity = updatedItems[existingItemIndex].quantity;
        const newQuantity = currentQuantity + quantity;
        
        // Verificar que no exceda el stock disponible
        if (newQuantity <= product.stock) {
          updatedItems[existingItemIndex].quantity = newQuantity;
          console.log('✅ Cantidad actualizada:', currentQuantity, '->', newQuantity);
          return { ...state, items: updatedItems };
        } else {
          // Si excede el stock, mantener la cantidad actual
          console.log('⚠️ Excede stock disponible');
          return state;
        }
      } else {
        // Si es un producto nuevo, agregarlo
        if (quantity <= product.stock) {
          console.log('🆕 Producto nuevo agregado');
          return {
            ...state,
            items: [...state.items, { product, quantity }]
          };
        }
        console.log('⚠️ Cantidad excede stock para producto nuevo');
        return state;
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const productId = action.payload;
      console.log('🗑️ Eliminando producto:', productId);
      return {
        ...state,
        items: state.items.filter(item => 
          (item.product.id || item.product._id) !== productId
        )
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      console.log('📊 Actualizando cantidad:', productId, 'nueva cantidad:', quantity);
      
      if (quantity <= 0) {
        console.log('🗑️ Cantidad <= 0, eliminando item');
        return {
          ...state,
          items: state.items.filter(item => 
            (item.product.id || item.product._id) !== productId
          )
        };
      }
      
      const updatedItems = state.items.map(item => {
        if ((item.product.id || item.product._id) === productId) {
          // Verificar que no exceda el stock
          const newQuantity = Math.min(quantity, item.product.stock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      return { ...state, items: updatedItems };
    }
    
    case CART_ACTIONS.UPDATE_PRODUCT_DATA: {
      const { productId, productData } = action.payload;
      console.log('🔄 Actualizando datos del producto:', productId);
      
      const updatedItems = state.items.map(item => {
        if ((item.product.id || item.product._id) === productId) {
          return { ...item, product: { ...item.product, ...productData } };
        }
        return item;
      });
      
      return { ...state, items: updatedItems };
    }
    
    case CART_ACTIONS.CLEAR_CART: {
      return { ...state, items: [] };
    }
    
    case CART_ACTIONS.LOAD_CART: {
      return { ...state, items: action.payload || [] };
    }
    
    default:
      return state;
  }
};

// Estado inicial
const initialState = {
  items: []
};

// Provider del carrito
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const lastAddToCartRef = useRef(null);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState.items));
  }, [cartState.items]);

  // Funciones del carrito
  const addToCart = (product, quantity = 1) => {
    console.log('🛒 addToCart:', product.name);
    
    // Evitar llamadas duplicadas rápidas SOLO para addToCart
    const now = Date.now();
    
    if (lastAddToCartRef.current && 
        lastAddToCartRef.current.productId === (product.id || product._id) &&
        (now - lastAddToCartRef.current.timestamp) < 500) { // 500ms debounce
      console.log('🚫 Llamada duplicada ignorada');
      return;
    }
    
    lastAddToCartRef.current = {
      productId: product.id || product._id,
      timestamp: now
    };
    
    dispatch({ 
      type: CART_ACTIONS.ADD_ITEM, 
      payload: { product, quantity } 
    });
  };

  const removeFromCart = (productId) => {
    console.log('🗑️ removeFromCart:', productId);
    dispatch({ 
      type: CART_ACTIONS.REMOVE_ITEM, 
      payload: productId 
    });
  };

  const updateQuantity = (productId, quantity) => {
    console.log('📊 updateQuantity:', productId, '->', quantity);
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { productId, quantity } 
    });
  };

  const updateProductData = (productId, productData) => {
    console.log('🔄 updateProductData:', productId);
    dispatch({ 
      type: CART_ACTIONS.UPDATE_PRODUCT_DATA, 
      payload: { productId, productData } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Funciones de cálculo
  const getTotalItems = () => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartState.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getItemQuantity = (productId) => {
    const item = cartState.items.find(item => 
      (item.product.id || item.product._id) === productId
    );
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return cartState.items.some(item => 
      (item.product.id || item.product._id) === productId
    );
  };

  const value = {
    items: cartState.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateProductData,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemQuantity,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
