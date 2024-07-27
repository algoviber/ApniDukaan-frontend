import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
    AllShopsResponse, CategoriesResponse,
    DeleteShopRequest, MessageResponse,
    NewShopRequest,
    SearchShopsRequest, SearchShopsResponse,
    SingleShopProductResponse,
    SingleShopResponse,
    UpdateShopRequest
} from "../../types/api-types";

export const shopAPI = createApi({
    reducerPath: "shopApi",
    baseQuery:fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/shop/`}),
    tagTypes:["shop"],
    endpoints: (builder) => ({
        latestShops: builder.query<AllShopsResponse, string>({query:()=>"latest", providesTags:["shop"],}),
        allShops: builder.query<AllShopsResponse, string>({query:(id)=>`admin-products?id=${id}`, providesTags:["shop"],}),
        categoriesShops: builder.query<CategoriesResponse, string>({query:()=>`categories`, providesTags:["shop"],}),

        searchShops: builder.query<SearchShopsResponse, SearchShopsRequest>({query:({search,deliveryAddress,page})=>{

            let base = `all?search=${search}&page=${page}`;
            if(deliveryAddress) base+= `&deliveryAddress=${deliveryAddress}`;

            return base;
        },
        providesTags:["shop"],
        }),

        searchByAddress: builder.query<SearchShopsResponse, string | undefined>({query:(deliveryAddress)=>`address?deliveryAddress=${deliveryAddress}`,}),

        shopDetails: builder.query<SingleShopResponse, string>({query:(id)=>id, providesTags:["shop"],}),

        shopProductsDetails: builder.query<SingleShopProductResponse, string>({query:(id)=>`details/${id}`, providesTags:["shop"],}),

        newShop: builder.mutation<MessageResponse, NewShopRequest>({query:({formData,id})=>({
                url: `new?id=${id}`,
                method: "POST",
                body: formData,
        }),
        invalidatesTags: ["shop"],
        }),

        updateShop: builder.mutation<MessageResponse, UpdateShopRequest>({query:({formData,userId,_shopId})=>({
            url: `${_shopId}?id=${userId}`,
            method: "PUT",
            body: formData,
        }),
        invalidatesTags: ["shop"],
        }),

        deleteShop: builder.mutation<MessageResponse, DeleteShopRequest>({query:({userId,_shopId})=>({
            url: `${_shopId}?id=${userId}`,
            method: "DELETE",
        }),
        invalidatesTags: ["shop"],
        }),

    }),
});

export const {
    useLatestShopsQuery,
    useAllShopsQuery,
    useCategoriesShopsQuery,
    useSearchShopsQuery,
    useNewShopMutation,
    useShopDetailsQuery,
    useShopProductsDetailsQuery,
    useUpdateShopMutation,
    useDeleteShopMutation,
    useSearchByAddressQuery,
} = shopAPI;