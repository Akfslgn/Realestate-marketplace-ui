import { clearToken, saveToken } from "../utils/auth";

/**
 * Reducer function to manage the state.
 *
 * @returns {Object} The new state after the action has been applied.
 *
 * @note The structure of the payload is crucial for the correct functioning of this reducer.
 *
 * @example
 * // Adding a task
 * dispatch({ type: 'ADD_TASK', payload: { task: 'New Task' } });
 *
 * @example
 * // Deleting a task
 * dispatch({ type: 'DELETE_TASK', payload: { id: 'task-id' } });
 *
 * @adjustment To adjust this reducer for your project's needs, ensure that the action types and payload structures match your specific requirements.
 *
 * @author dmytro-ch21
 */
export function storeReducer(state, action) {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        auth: { ...state.auth, loading: true, error: null },
      };
    case "AUTH_SUCCESS": {
      const { token, user } = action.payload;
      saveToken(token);
      return {
        ...state,
        auth: {
          loading: false,
          error: null,
          isAuthenticated: true,
          user,
          token,
        },
      };
    }
    case "AUTH_FAILURE":
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: action.payload,
          isAuthenticated: false,
        },
      };
    case "LOGOUT":
      clearToken();
      return {
        ...state,
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        },
      };

    case "SET_USER":
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
        },
      };

    default:
      return state;
  }
}
