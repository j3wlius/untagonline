import { useState } from 'react';
import Button from '../ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Implement newsletter subscription
    // This is where you'd integrate with your newsletter service
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-gray-900">
            Join Our Newsletter
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Subscribe to get special offers, free giveaways, and updates on new arrivals.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              required
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              className="flex-shrink-0"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
          {status === 'success' && (
            <p className="mt-2 text-sm text-green-600">
              Thank you for subscribing! Check your email for confirmation.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-2 text-sm text-red-600">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
