import React, { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaShoppingBag,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaReceipt,
  FaHome,
  FaBook,
  FaShareAlt,
  FaPrint,
  FaDownload,
  FaWhatsapp,
  FaFacebook,
  FaEnvelope,
} from 'react-icons/fa';
import { GiBookmarklet } from 'react-icons/gi';

const OrderComplete = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [countdown, setCountdown] = useState(5);

  // Mock order data - In real app, this would come from your order API/context
  useEffect(() => {
    // Simulate API call
    const mockOrder = {
      orderId: 'BK-2024-789456',
      orderDate: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customer: {
        name: 'John Doe',
        phone: '+880 1712 345678',
        email: 'john.doe@example.com',
        address: '123 Book Street, Knowledge City, Dhaka 1212',
      },
      books: [
        {
          id: 1,
          title: 'The Psychology of Money',
          author: 'Morgan Housel',
          price: 420,
          quantity: 1,
          image: 'book1.jpg',
        },
        {
          id: 2,
          title: 'Atomic Habits',
          author: 'James Clear',
          price: 380,
          quantity: 2,
          image: 'book2.jpg',
        },
        {
          id: 3,
          title: 'Deep Work',
          author: 'Cal Newport',
          price: 350,
          quantity: 1,
          image: 'book3.jpg',
        },
      ],
      payment: {
        method: 'Cash on Delivery',
        status: 'Pending',
        subtotal: 1530,
        shipping: 60,
        discount: 150,
        total: 1440,
      },
      shipping: {
        method: 'Standard Delivery',
        estimatedDelivery: '3-5 business days',
        trackingId: 'TRK789456123',
      },
    };

    setOrderDetails(mockOrder);

    // Countdown timer for redirect
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to home after countdown
          // window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Invoice will be downloaded shortly!');
  };

  const handleShare = platform => {
    const shareText = `I just ordered books from BookHaven! Order ID: ${orderDetails?.orderId}`;
    const shareUrl = window.location.href;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`
        );
        break;
      case 'email':
        window.open(
          `mailto:?subject=My Book Order&body=${encodeURIComponent(shareText)}`
        );
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: 'My Book Order',
            text: shareText,
            url: shareUrl,
          });
        }
    }
  };

  if (!orderDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <FaCheckCircle className="text-5xl md:text-6xl" />
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                      Order Confirmed!
                    </h1>
                    <p className="text-green-100">
                      Thank you for your purchase from BookHaven
                    </p>
                  </div>
                </div>
                <div className="bg-white text-green-700 px-4 py-2 rounded-full font-bold">
                  ✓ Payment Pending
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaShoppingBag className="mr-3 text-indigo-600" />
                Order Summary
              </h2>

              <div className="space-y-4">
                {orderDetails.books.map(book => (
                  <div
                    key={book.id}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-20 bg-gray-200 rounded overflow-hidden mr-4">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                        <FaBook className="text-2xl text-indigo-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 text-sm">by {book.author}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">
                        {book.price}৳ × {book.quantity}
                      </p>
                      <p className="font-bold text-indigo-600">
                        {book.price * book.quantity}৳
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Breakdown */}
              <div className="mt-8 pt-6 border-t">
                <div className="space-y-3 max-w-md ml-auto">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {orderDetails.payment.subtotal}৳
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {orderDetails.payment.shipping}৳
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">
                      -{orderDetails.payment.discount}৳
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t">
                    <span className="text-gray-800">Total Amount</span>
                    <span className="text-indigo-600">
                      {orderDetails.payment.total}৳
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={handlePrint}
                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 flex items-center justify-center space-x-2 transition-all"
              >
                <FaPrint />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={handleDownload}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 flex items-center justify-center space-x-2 transition-all"
              >
                <FaDownload />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => handleShare()}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 flex items-center justify-center space-x-2 transition-all"
              >
                <FaShareAlt />
                <span>Share Order</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Order Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaReceipt className="mr-3 text-indigo-600" />
                Order Details
              </h2>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-3 text-indigo-400" />
                  <div>
                    <p className="text-sm">Order Date</p>
                    <p className="font-medium">{orderDetails.orderDate}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaShoppingBag className="mr-3 text-indigo-400" />
                  <div>
                    <p className="text-sm">Payment Method</p>
                    <p className="font-medium">{orderDetails.payment.method}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaShoppingBag className="mr-3 text-indigo-400" />
                  <div>
                    <p className="text-sm">Shipping Method</p>
                    <p className="font-medium">
                      {orderDetails.shipping.method}
                    </p>
                    <p className="text-xs text-gray-500">
                      {orderDetails.shipping.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaUser className="mr-3 text-indigo-600" />
                Customer Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start text-gray-600">
                  <FaUser className="mr-3 mt-1 text-indigo-400" />
                  <div>
                    <p className="text-sm">Name</p>
                    <p className="font-medium">{orderDetails.customer.name}</p>
                  </div>
                </div>

                <div className="flex items-start text-gray-600">
                  <FaPhone className="mr-3 mt-1 text-indigo-400" />
                  <div>
                    <p className="text-sm">Phone</p>
                    <p className="font-medium">{orderDetails.customer.phone}</p>
                  </div>
                </div>

                <div className="flex items-start text-gray-600">
                  <FaMapMarkerAlt className="mr-3 mt-1 text-indigo-400" />
                  <div>
                    <p className="text-sm">Delivery Address</p>
                    <p className="font-medium">
                      {orderDetails.customer.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Tracking */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Shipping & Tracking
              </h2>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Tracking Number</p>
                  <p className="font-mono font-bold text-lg">
                    {orderDetails.shipping.trackingId}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Order Placed</span>
                    <span className="text-sm font-medium text-green-600">
                      ✓ Completed
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Processing</span>
                    <span className="text-sm font-medium text-blue-600">
                      In Progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-8 border-t text-center">
          <div className="mb-4">
            <p className="text-gray-600">
              Redirecting to homepage in{' '}
              <span className="font-bold text-indigo-600">{countdown}</span>{' '}
              seconds
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => (window.location.href = '/')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 flex items-center justify-center space-x-2 transition-all"
            >
              <FaHome />
              <span>Back to Homepage</span>
            </button>
            <button
              onClick={() => (window.location.href = '/shop')}
              className="bg-white border border-indigo-600 text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 flex items-center justify-center space-x-2 transition-all"
            >
              <FaBook />
              <span>Continue Shopping</span>
            </button>
          </div>

          <p className="mt-6 text-gray-500 text-sm">
            Need help? Contact our support at support@bookhaven.com or call +880
            1712 345678
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
