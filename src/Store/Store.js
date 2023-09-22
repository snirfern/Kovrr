import React, {createContext, useContext, useReducer} from "react";
import {extractFields, fieldsToExtract, flattenObject, getRandomPrice} from "../Utils/Utils";


const StoreContext = createContext();

const initialState = {
    company: 'Online shop',
    drawer: false,
    checkout: false,
    books: [],
    cart: {},
    itemsInCart: 0,
    totalPayment: 0,

    pagesPerCall: 10,
    startIndex: 0,
    searchTerm: ''
};

const reducer = (state, action) => {
    switch (action.type) {

        case 'GET_BOOKS':
            const books = extractFields(Object.keys(fieldsToExtract), flattenObject(action.payload.data)).map(book => ({
                ...book,
                price: getRandomPrice()
            }))
            return {
                ...state,
                startIndex: state.startIndex + books.length,
                books: action.payload.isNewSearchTerm ? [...books] : [...state.books, ...books],
            }

        case 'ADD_CART_ITEM': {

            const itemId = action.payload.id
            const totalPayment = Number(state.totalPayment) + Number(action.payload.price)
            return {
                ...state,
                itemsInCart: state.itemsInCart + 1,
                totalPayment: Number(totalPayment).toFixed(2),
                cart: {
                    ...state.cart,
                    [itemId]: (state.cart[itemId] || 0) + 1,
                }
            }
        }

        case 'REMOVE_CART_ITEM': {

            const itemId = action.payload.id
            const totalPayment = Number(state.totalPayment) - Number(action.payload.price).toFixed(2)


            return {
                ...state,
                totalPayment: totalPayment.toFixed(2),
                itemsInCart: state.itemsInCart - 1,
                cart: {
                    ...state.cart,
                    [itemId]: Math.max((state.cart[itemId] || 0) - 1, 0),
                },
            };
        }
        case 'EMPTY_CART': {
            return {...state, cart: {}, itemsInCart: 0, totalPayment: 0}
        }
        case 'CHECKOUT': {
            return {
                ...state, checkout: !state.checkout
            }
        }
        case 'SET_PAGINATION':
            return {
                ...state,
                pagesPerCall: action.payload,
                startIndex: state.startIndex + action.payload
            }
        case 'SET_SEARCH_TERM':
            return {...state, searchTerm: action.payload}
        default:
            console.log("default case")
    }
};

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, () => initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext)
