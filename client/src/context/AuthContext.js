import { useEffect } from 'react';
import { createContext, useReducer } from 'react';
/*
AuthContext to manage user authentication
*/
const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	loading: false,
	error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

// Create reducer
const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_START':
			return {
				user: null,
				loading: true,
				error: null,
			};
		case 'LOGIN_SUCCESS':
			return {
				user: action.payload,
				loading: false,
				error: null,
			};
		case 'LOGIN_FAILURE':
			return {
				user: null,
				loading: false,
				error: action.payload,
			};
		case 'LOGOUT':
			return {
				user: null,
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};

// Use the reducer in the context, use this to wrap entire app in index.js
export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		AuthReducer,
		INITIAL_STATE
	);

	// Save user to local storage, avoid logout on page refresh
	useEffect(() => {
		localStorage.setItem(
			'user',
			JSON.stringify(state.user)
		);
	}, [state.user]);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				loading: state.loading,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
