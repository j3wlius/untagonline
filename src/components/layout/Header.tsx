import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, UserIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useCart } from '../../context/CartContext';
import { fetchCategories } from '../../lib/api';
import SearchBar from '../ui/SearchBar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const { state: { items } } = useCart();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-serif text-pink-600">
              Untago
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <SearchBar />
            <Link to="/account" className="text-gray-600 hover:text-pink-600">
              <UserIcon className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-pink-600 relative">
              <ShoppingBagIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="block py-2 text-gray-600 hover:text-pink-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
