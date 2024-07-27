import { Bar, CartItem, Line, Order, Pie, Product, Review, ShippingInfo, Shop, Stats, User } from "./types";

export type CustomError = {
    status: number;
    data: {
        message: string;
        success: boolean;
    };
}

export type MessageResponse = {
    success: boolean;
    message: string;
}

export type AllUsersResponse = {
    success: boolean;
    users: User[];
}

export type UserResponse = {
    success: boolean;
    user: User;
}

export type AllProductsResponse = {
    success: boolean;
    products: Product[];
}

export type AllShopsResponse = {
    success: boolean;
    shops: Shop[];
}

export type CategoriesResponse = {
    success: boolean;
    categories: string[];
}

export type SearchProductsResponse = {
    success: boolean;
    products: Product[];
    totalPage: number;
}

export type SearchShopsResponse = {
    success: boolean;
    totalPage: number;
    shops: Shop[];
}

export type SearchShopsRequest = {
    search?: string;
    deliveryAddress?: string;
    page: number;
}

export type AllOrdersResponse = {
    success: boolean;
    orders: Order[];
}

export type SingleOrderResponse = {
    success: boolean;
    order: Order;
}

export type StatsResponse = {
    success: boolean;
    stats: Stats;
}

export type PieResponse = {
    success: boolean;
    charts: Pie;
}

export type BarResponse = {
    success: boolean;
    charts: Bar;
}

export type LineResponse = {
    success: boolean;
    charts: Line;
}

export type SearchProductsRequest = {
    price: number;
    page: number;
    category: string;
    sort: string;
    search: string;
}

export type NewProductRequest = {
    id: string;
    formData: FormData;
}

export type NewShopRequest = {
    id: string;
    formData: FormData;
}

export type SingleProductsResponse = {
    success: boolean;
    product: Product;
}

export type SingleShopProductResponse = {
    success: boolean;
    shop: Shop;
    products: Product[];
}

export type SingleShopResponse = {
    success: boolean;
    shop: Shop;
}

export type UpdateProductRequest = {
    userId: string;
    productId: string;
    formData: FormData;
}

export type UpdateProductRatingRequest = {
    id: string;
    avgRate: number;
}

export type UpdateShopRequest = {
    userId: string;
    _shopId: string;
    formData: FormData;
}

export type DeleteProductRequest = {
    userId: string;
    productId: string;
}

export type DeleteShopRequest = {
    userId: string;
    _shopId: string;
}

export type NewOrderRequest = {
    shippingInfo: ShippingInfo;
    orderItems: CartItem[];
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    user: string;
    shopId: string;
}

export type UpdateOrderRequest = {
    userId: string;
    orderId: string;
}

export type DeleteUserRequest = {
    userId: string;
    adminUserId: string;
}

export type NewReviewRequest = {
    userId: string;
    productId: string;
    rating: number;
    reviewText: string;
}

export type AllReviewsResponse = {
    success: boolean;
    limitedReviews: Review[];
    reviews: Review[];
}