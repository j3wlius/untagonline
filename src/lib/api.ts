import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async (limit = 12) => {
  try {
    const response = await api.get('/products', {
      params: { limit },
    });
    // Transform the data to match our Product type
    return response.data.map((item: any) => ({
      id: item.id,
      name: item.title,
      description: item.description,
      price: item.price,
      images: [item.image], // Fake Store API only provides one image
      category: item.category,
      stock: 10, // Fake Store API doesn't provide stock info
      slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProduct = async (slug: string) => {
  try {
    // First get all products since Fake Store API doesn't support slug search
    const response = await api.get('/products');
    const products = response.data.map((item: any) => ({
      id: item.id,
      name: item.title,
      description: item.description,
      price: item.price,
      images: [item.image],
      category: item.category,
      stock: 10,
      slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    }));
    
    return products.find((product: any) => product.slug === slug);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data.map((category: string) => ({
      id: category.toLowerCase(),
      name: category.charAt(0).toUpperCase() + category.slice(1),
      slug: category.toLowerCase(),
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (category: string, limit = 12) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data.slice(0, limit).map((item: any) => ({
      id: item.id,
      name: item.title,
      description: item.description,
      price: item.price,
      images: [item.image],
      category: item.category,
      stock: 10,
      slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export default api;
