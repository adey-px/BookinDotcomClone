import { createContext, useReducer } from 'react';
/*
SearchContext to manage hotel search
*/
const INITIAL_STATE = {
	city: undefined,
	date: [],
	option: {
		adult: undefined,
		children: undefined,
		room: undefined,
	},
};

export const SearchContext = createContext(INITIAL_STATE);

// Create reducer
const SearchReducer = (state, action) => {
	switch (action.type) {
		case 'NEW_SEARCH':
			return action.payload;
		case 'RESET_SEARCH':
			return INITIAL_STATE;
		default:
			return state;
	}
};

// Use the reducer in the context, use this to wrap entire app in index.js
export const SearchContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		SearchReducer,
		INITIAL_STATE
	);

	return (
		<SearchContext.Provider
			value={{
				city: state.city,
				date: state.date,
				option: state.option,
				dispatch,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};
