import { useRef, useState, useMemo, useEffect } from 'react';
import ProductCrd from '../../components/ProductCrd';
import ContactIcon from '../../components/ContactIcon';
import CheckoutModal from '../../components/CheckoutModal';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Home = () => {
  const { cartItems, setCartItems } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const checkoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          'https://admin.prothomashop.com/api/category/51/products'
        );
        const data = await res.json();
        const productsList = data?.result?.products || [];

        setProducts(productsList);

        if (productsList.length > 0 && cartItems.length === 0) {
          setCartItems([{ ...productsList[0], quantity: 1 }]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cartItems.length]);

  const totalPrice = useMemo(() => {
    return cartItems
      .reduce((sum, item) => sum + item.sale_price * item.quantity, 0)
      .toFixed(2);
  }, [cartItems]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleOrderSubmit = () => {
    // API call for order can be added here
    navigate('/order-complete');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCrd
              key={product.id}
              product={product}
              onOrder={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Checkout Modal */}

      <div className="max-w-7xl mx-auto md:px-4 py-8">
        <CheckoutModal
          ref={checkoutRef}
          cartItems={cartItems}
          setCartItems={setCartItems}
          totalPrice={totalPrice}
          formData={formData}
          handleInputChange={handleInputChange}
          handleOrderSubmit={handleOrderSubmit}
        />
      </div>

      <ContactIcon />
    </>
  );
};

export default Home;
