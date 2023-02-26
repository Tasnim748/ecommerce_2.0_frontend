import * as actionTypes from './actionTypes';
import axios from 'axios';

import { BACK_URL } from '../Data/productData';


export const loadData = data => {
    return {
        type: actionTypes.LOAD_PROD,
        payload: data
    }
}

export const loadOrders = data => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: data
    }
}

export const loadingFailed = () => {
    return {
        type: actionTypes.LOADING_FAILED
    }
}

export const fetchProducts = (session) => dispaz => {
    axios.get(`${BACK_URL}/products`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(session.access)
            }
        }
    )
    .then(async resp => {
        dispaz(loadData(resp.data));
    })
    .catch(err => {
        alert("failed to fetch new products");
    });
}

export const fetchDetail = (id) => dispaz => {
    dispaz(loadData(""));
    axios.get(`${BACK_URL}/products/${id}`)
    .then(resp => {
        dispaz(loadData(resp.data));
    })
    .catch(err => {
        document.alert('fetching failed!');
    });
}

export const loadSession = data => {
    return {
        type: actionTypes.LOAD_SESSION,
        payload: data
    }
}

export const fetchOrders = (session) => dispaz => {
    axios.get(`${BACK_URL}/orders`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(session.access)
            }
        }
    )
    .then(resp => {
        if (resp.data) {
            console.log(resp.data);
            dispaz(loadOrders(resp.data));
        } else {
            dispaz(loadOrders([]));
        }
        
    })
    .catch(err => {
        alert("failed to fetch new orders");
    });
}