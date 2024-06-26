import { Link } from 'react-router-dom';
import { Product } from '../../types';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div className="group relative">
      <div className="aspect-w-4 aspect-h-5 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover object-center w-full h-full group-hover:opacity-75 transition-opacity"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={addToCart}
            fullWidth
            size="sm"
            className="backdrop-blur-sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-pink-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-sm font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
