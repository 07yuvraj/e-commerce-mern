import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productUpdateReducer,
    productCreateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productUpdateOnOrderReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import {
    userLoginReducer,
    userDeleteReducer,
    userRegisterReducer,
    userUpdateReducer,
    userDetailsReducer,
    updateUserProfileReducer,
    userListReducer
} from './reducers/userReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListReducer,
    orderAdminListReducer,
    orderDeliverReducer
} from './reducers/orderReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productUpdateOnOrder: productUpdateOnOrderReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    updateUserProfile: updateUserProfileReducer,
    userList: userListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderAdminList: orderAdminListReducer,
    orderDeliver: orderDeliverReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store