import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Newsletter from './components/marketing/Newsletter';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/category/:category" element={<HomePage />} />
            </Routes>
          </main>
          <Newsletter />
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
