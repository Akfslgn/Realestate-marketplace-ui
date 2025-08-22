import { useContext, useDebugValue } from 'react';
import { StoreContext } from '../store/StoreContext.jsx';

/*
 * Custom hook to access the global store.
 * This hook uses React's context API to provide access to the store.
 * It must be used within a component wrapped by the StoreProvider.
 */
export function useGlobalStore() {
  const contextValue = useContext(StoreContext);
  useDebugValue(
    contextValue,
    (value) => `Global Store: ${JSON.stringify(value)}`
  );

  if (!contextValue)
    throw new Error('useStore must be used within StoreProvider');

  return contextValue;
}
