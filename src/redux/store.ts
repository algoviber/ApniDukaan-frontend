import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderAPI";
import { dashboardApi } from "./api/dashboardAPI";
import { shopAPI } from "./api/shopApi";
import { reviewAPI } from "./api/reviewApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [shopAPI.reducerPath]: shopAPI.reducer,
        [reviewAPI.reducerPath]: reviewAPI.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
    },
    middleware: (mid) => mid().concat(
        userAPI.middleware,
        productAPI.middleware,
        shopAPI.middleware,
        orderApi.middleware,
        dashboardApi.middleware,
        reviewAPI.middleware,
        ),
});
