import './App.css';
import { useRef, useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import CheckoutModal from './components/CheckoutModal';
import ProductCrd from './components/ProductCrd';
import ContactIcon from './components/ContactIcon';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

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
        setProducts(data?.result?.products || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Total price (API sale_price)
  const totalPrice = useMemo(() => {
    if (!selectedProduct) return 0;
    return (selectedProduct.sale_price * quantity).toFixed(2);
  }, [selectedProduct, quantity]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar quantity={quantity} />

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCrd
              key={product.id}
              product={product}
              onOrder={prod => {
                setSelectedProduct(prod);
                setQuantity(1);
                checkoutRef.current?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Checkout */}
      <CheckoutModal
        ref={checkoutRef}
        product={selectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        totalPrice={totalPrice}
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <ContactIcon />
    </div>
  );
}

export default App;
