import React, {createContext, useContext, useReducer} from "react";

const StoreContext = createContext('general_store_context');
const initialState = {};

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_BOOKS':
            const {payload} = action;
            return {...state, books: payload}
        default:
            console.log("default case")
    }
};

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, (initialState) => console.log(initialState));

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext)
