export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  shippingAddress: User['address'];
  paymentStatus: 'pending' | 'completed' | 'failed';
}
