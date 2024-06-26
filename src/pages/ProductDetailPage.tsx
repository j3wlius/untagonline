import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { fetchProduct } from '../lib/api';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!slug) {
          navigate('/');
          return;
        }
        const data = await fetchProduct(slug);
        if (!data) {
          setError('Product not found');
          return;
        }
        setProduct(data);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug, navigate]);

  const addToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch({ type: 'ADD_ITEM', payload: product });
      }
      // Optional: Show a success message or navigate to cart
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col">
          <div className="aspect-w-1 aspect-h-1 sm:rounded-lg overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-serif text-gray-900">{product.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              {product.description}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label htmlFor="quantity" className="sr-only">
                  Quantity
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={addToCart} size="lg">
                Add to Cart
              </Button>
            </div>
          </div>

          <section className="mt-12">
            <h3 className="text-lg font-medium text-gray-900">Details</h3>
            <div className="mt-4 prose prose-sm text-gray-500">
              <ul role="list">
                <li>Category: {product.category}</li>
                <li>Stock: {product.stock} items available</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
