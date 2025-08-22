import { createContext, useReducer } from 'react';
import { initialState } from './initialStore.js';
import { storeReducer } from './storeReducer.js';

export const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialState());

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
