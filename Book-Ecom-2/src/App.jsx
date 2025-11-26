import './App.css';
import { useRef, useState, useMemo } from 'react';
import CheckoutModal from './components/CheckoutModal';
import Navbar from './components/Navbar';
import Heading from './components/Heading';
import Faq from './components/Faq';
import ContactIcon from './components/ContactIcon';
import ReviewSection from './components/ReviewSection';

function App() {
  const [quantity, setQuantity] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  // ✅ Checkout section ref
  const checkoutRef = useRef(null);

  const book = {
    title: 'The Great Adventure',
    author: 'John Smith',
    price: 24,
    originalPrice: 34,
    rating: 4.5,
    reviews: 1284,
    description:
      "An epic journey through uncharted territories, 'The Great Adventure' takes readers on a thrilling ride filled with mystery, courage, and self-discovery.",
    image:
      'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    features: [
      'Bestselling novel of the year',
      'Signed copy available',
      'Free worldwide shipping',
      'Money-back guarantee',
    ],
    details: {
      pages: 384,
      language: 'English',
      publisher: 'Penguin Books',
      isbn: '978-3-16-148410-0',
      publicationDate: 'March 15, 2024',
    },
  };

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = e => {
    e.preventDefault();
    setTimeout(() => {
      setOrderComplete(true);
    }, 2000);
  };

  const totalPrice = useMemo(
    () => (book.price * quantity).toFixed(2),
    [book.price, quantity]
  );
  const savings = useMemo(
    () => ((book.originalPrice - book.price) * quantity).toFixed(2),
    [book.originalPrice, book.price, quantity]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar quantity={quantity} />

      {/* ✅ Heading with Scroll Handler */}
      <Heading
        onBuyNow={() => {
          checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Review Section */}
      <ReviewSection />
      <Faq />

      {/* ✅ Checkout Section (with ref) */}
      <CheckoutModal
        ref={checkoutRef}
        book={book}
        quantity={quantity}
        setQuantity={setQuantity}
        savings={savings}
        totalPrice={totalPrice}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmitOrder={handleSubmitOrder}
      />

      <ContactIcon />
    </div>
  );
}

export default App;
