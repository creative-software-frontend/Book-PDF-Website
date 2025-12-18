import './App.css';
import { useRef, useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import CheckoutModal from './components/CheckoutModal';
import ProductCrd from './components/ProductCrd';
import ContactIcon from './components/ContactIcon';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const checkoutRef = useRef(null);

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://admin.prothomashop.com/api/category/51/products'
        );
        const data = await res.json();
        const productsList = data?.result?.products || [];

        setProducts(productsList);

        // ✅ first product auto add only if cart empty
        if (productsList.length > 0 && cartItems.length === 0) {
          setCartItems([{ ...productsList[0], quantity: 1 }]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
    // ⚠️ cartItems.length dependency important
  }, [cartItems.length]);

  // 🔹 Total price (multiple product)
  const totalPrice = useMemo(() => {
    return cartItems
      .reduce((sum, item) => sum + item.sale_price * item.quantity, 0)
      .toFixed(2);
  }, [cartItems]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Add to cart
  const handleAddToCart = product => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === product.id);

      if (exists) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-10">
      <Navbar quantity={cartItems.length} />

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCrd
              key={product.id}
              product={product}
              onOrder={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Checkout */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CheckoutModal
          ref={checkoutRef}
          cartItems={cartItems}
          setCartItems={setCartItems}
          totalPrice={totalPrice}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </div>

      <ContactIcon />
    </div>
  );
}

export default App;
