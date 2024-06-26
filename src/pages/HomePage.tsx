import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { fetchProducts, fetchProductsByCategory, fetchCategories } from '../lib/api';
import ProductGrid from '../components/product/ProductGrid';
import { FilterIcon } from '@heroicons/react/outline';
import ProductFilter from '../components/product/ProductFilter';

export default function HomePage() {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = category
          ? await fetchProductsByCategory(category)
          : await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    // In a real application, you would apply these filters to the products
    console.log('Filter changed:', { filterId, value, checked });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-serif text-gray-900">
          {category
            ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
            : 'All Products'}
        </h1>

        <div className="flex items-center">
          <button
            type="button"
            className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="sr-only">Filters</span>
            <FilterIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pt-6 pb-24">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
          {/* Filters */}
          <div className="hidden lg:block">
            <ProductFilter
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Product grid */}
          <div className="lg:col-span-3">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    </div>
  );
}
