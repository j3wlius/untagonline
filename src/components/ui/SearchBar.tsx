import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-gray-500"
      >
        <SearchIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-50">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border-gray-300 rounded-md pl-10 pr-4 py-2 focus:border-pink-500 focus:ring-pink-500"
                placeholder="Search for products..."
                autoFocus
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Dresses', 'Summer Collection', 'New Arrivals'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      handleSubmit(new Event('submit') as any);
                    }}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
