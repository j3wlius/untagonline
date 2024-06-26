import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

export default function CartPage() {
  const { state: { items, total }, dispatch } = useCart();

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-gray-900">Your cart is empty</h2>
          <p className="mt-4 text-gray-500">Start shopping to add items to your cart.</p>
          <Button as="a" href="/" className="mt-8">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-4 border-b border-gray-200"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                <div className="mt-2 flex items-center gap-4">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="rounded-md border border-gray-300 text-base"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-lg font-medium text-gray-900">
                  ${total.toFixed(2)}
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <Button fullWidth size="lg">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
