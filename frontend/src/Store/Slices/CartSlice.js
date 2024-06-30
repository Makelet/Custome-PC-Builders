import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useAuth } from "../../Context/Context";
const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        setCart(state, action) {
            state.cart = action.payload;
        },
        add(state, action) {
            state.cart.push(action.payload);
        },
        remove(state, action) {
            // state.cart.push(action.payload);
        },
    }
})

export const { add, remove, setCart } = CartSlice.actions;
export default CartSlice.reducer;


export function addItems(pId, image, title, price, userId) {
    return async function addItemsThunk(dispatch, getState) {
        try {
            let { data } = await axios.post(`https://modxtech-backend.onrender.com/allproducts/add`, { pId, image, title, price, userId, qty: 1 })
            dispatch(add(data));
        } catch (e) {
            console.log(e);
        }
    }
}

export function getItems() {
    return async function getItemsThunk(dispatch, getState) {
        try {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            // alert(userInfo.token)
            if (userInfo) {

                let config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    }
                }
                let { data } = await axios.get(`https://modxtech-backend.onrender.com/allproducts/getitems`, config)
                dispatch(setCart(data));
            }
        } catch (e) {
            console.log(e);
        }
    }
}



export function deleteItems(pId) {
    return async function deleteItemsThunk(dispatch, getState) {
        try {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            let { _id } = userInfo;

            let { data } = await axios.delete(`https://modxtech-backend.onrender.com/allproducts/deleteitems/${pId}`, { data: { id: _id } })

            dispatch(getItems());
        }
        catch (e) {
            console.log(e);
        }
    }
}

export function updateQty(pId, qty) {
    return async function updateQtyThunk(dispatch, getState) {
        try {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            let { _id } = userInfo;

            let { data } = await axios.put(`https://modxtech-backend.onrender.com/allproducts/updateqty`, { _id, pId, qty })
            dispatch(getItems());
        }
        catch (e) {
            console.log(e);
        }
    }
}