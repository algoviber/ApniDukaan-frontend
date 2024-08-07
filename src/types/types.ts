export type User = {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
}

export type Product = {
    name: string;
    price: number;
    stock: number;
    rating: number;
    category: string;
    photo: {
        public_id: string,
        url: string,
    };
    _id: string;
    description: string;
    productId: string;
}

export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
}

export type CartItem = {
    productId: string;
    name: string;
    photo: string;
    price: number;
    quantity: number;
    stock: number;
}

export type Shop={
    _id: string;
    _shopId: string;
    name: string;
    photo: {
        public_id: string,
        url: string,
    };
    category: string;
    rating: number;
}

export type Review={
    _id: string;
    productId: string;
    userId: string;
    reviewText: string;
    rating: number;
}

export type OrderItem = Omit<CartItem, "stock"> & {_id: string};

export type Order = {
    shippingInfo: ShippingInfo;
    orderItems: OrderItem[];
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    shopId: string;
    _id: string;
    user: {
        name: string;
        _id: string;
    }
}

type CountAndChange = {
    revenue: number;
    product: number;
    user: number;
    order: number;
}

type LatestTransaction = {
    _id: string;
    amount: number;
    discount: number;
    quantity: number;
    status: string;
}

export type Stats = {
    categoryAndCount: Record<string, number>[];
    changePercent: CountAndChange;
    count: CountAndChange;
    chart:{
        order: number[];
        revenue: number[];
    };
    genderRatio:{
        male: number;
        female: number;
    };
    latestTransaction: LatestTransaction[];
}

export type Pie = {
    orderFullfillment: {
        processing: number;
        shipped: number;
        delivered: number;
    };
    productCategories: Record<string, number>[];
    stockAvailability: {
        inStock: number;
        outOfStock: number;
    };
    revenueDistribution: {
        netMargin: number;
        discount: number;
        productionCost: number;
        burnt: number;
        marketingCost: number;
    };
    usersAgeGroup: {
        teen: number;
        adult: number;
        old: number;
    };
    adminCustomer: {
        admins: number;
        customers: number;
    };
}

export type Bar = {
    users: number[],
    products: number[],
    orders: number[],
}

export type Line = {
    users: number[],
    products: number[],
    discount: number[],
    revenue: number[],
}