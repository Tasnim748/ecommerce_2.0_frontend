import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    products: [],
    orders: [],
    loading: true,
    orderLoading: true,
    loadingFailed: false,
    detailProduct: null,
    sessionData: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : undefined,
}

export const reducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.LOAD_PROD:
            if(Array.isArray(action.payload)) {
                let products = [];
                for(let id in action.payload) {
                    products.push({
                        ...action.payload[id]
                    });
                }
                return {
                    ...state,
                    products: products,
                    loading: false
                }
            }
            else {
                let detailProduct = action.payload;
                return {
                    ...state,
                    detailProduct: detailProduct
                }
            }

        case actionTypes.LOAD_SESSION:
            return {
                ...state,
                sessionData: action.payload
            }
        
        case actionTypes.LOAD_ORDERS:
            let orders = []
            for (let id in action.payload) {
                orders.push({
                    ...action.payload[id]
                });
            }
            return {
                ...state,
                orders: orders,
                orderLoading: false
            }

        default:
            return state;
    }
}