import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
    AllReviewsResponse,
    MessageResponse,
    NewReviewRequest
} from "../../types/api-types";

export const reviewAPI = createApi({
    reducerPath: "reviewApi",
    baseQuery:fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/review/`}),
    endpoints: (builder) => ({
        allReviews: builder.query<AllReviewsResponse, string>({query:(id)=>`all/${id}`}),

        newReview: builder.mutation<MessageResponse, NewReviewRequest>({query:({userId,productId,rating,reviewText})=>({
                url: `new?userId=${userId}&productId=${productId}`,
                method: "POST",
                body: { rating,reviewText }
        })
        }),

    }),
});

export const {
    useAllReviewsQuery,
    useNewReviewMutation,
} = reviewAPI;