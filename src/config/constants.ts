export const API_BASE_URL = import.meta.env.VITE_WP_API_URL || 'http://localhost:8000/wp-json';
export const PESAPAL_API_URL = import.meta.env.VITE_PESAPAL_API_URL;
export const PESAPAL_CONSUMER_KEY = import.meta.env.VITE_PESAPAL_CONSUMER_KEY;
export const PESAPAL_CONSUMER_SECRET = import.meta.env.VITE_PESAPAL_CONSUMER_SECRET;

export const PRODUCTS_PER_PAGE = 12;

export const CATEGORIES = [
  'New Arrivals',
  'Dresses',
  'Tops',
  'Bottoms',
  'Accessories',
  'Sale'
] as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;
