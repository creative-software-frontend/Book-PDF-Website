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
  FaMoneyBillWave,
  FaTag,
  FaShippingFast,
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const OrderComplete = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const location = useLocation();
  const order = location.state?.finalData;

  // Mock order data
  useEffect(() => {
    const mockOrder = {
      orderDate: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      payment: {
        method: 'Cash on Delivery',
        status: 'Pending',
        subtotal: 1530,
        shipping: 60,
        discount: 150,
        total: 1440,
      },
    };

    setOrderDetails(mockOrder);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
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

  if (!orderDetails || !order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Single Card Container */}
        <div className="bg-white rounded-md shadow-2xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 md:p-8 text-white">
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
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div>
                {/* Order Items */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaShoppingBag className="mr-3 text-indigo-600" />
                    Order Products
                  </h2>
                  <div className="space-y-4">
                    {order?.courses?.map(course => (
                      <div
                        key={course.id}
                        className="flex items-center p-4 bg-gray-50 rounded-lg "
                      >
                        <img
                          src={`https://admin.prothomashop.com/product/${course.image}`}
                          alt={course.title}
                          className="w-16 h-20 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {course.title}
                          </h3>
                          <p className="text-indigo-600 font-medium">
                            {course.price} টাকা
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaReceipt className="mr-3 text-indigo-600" />
                    Payment Details
                  </h2>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5">
                    <div className="space-y-3">
                      <div className="pt-3 ">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-800">
                            Total Amount
                          </span>
                          <span className="text-2xl font-bold text-indigo-600">
                            {order.amount}৳
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                  <button
                    onClick={handlePrint}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 flex items-center justify-center space-x-2 transition-all"
                  >
                    <FaPrint />
                    <span>Print Invoice</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 flex items-center justify-center space-x-2 transition-all"
                  >
                    <FaDownload />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Order & Customer Info */}
                <div className="space-y-6">
                  {/* Order Info */}
                  <div className="bg-indigo-50 rounded-xl p-5">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <FaCalendarAlt className="mr-3 text-indigo-600" />
                      Order Information
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Order Date</span>
                        <span className="font-semibold">
                          {orderDetails.orderDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Payment Status</span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {orderDetails.payment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <FaUser className="mr-3 text-indigo-600" />
                      Customer Information
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <FaUser className="mr-3 mt-1 text-indigo-500" />
                        <div>
                          <p className="text-sm text-gray-600">Full Name</p>
                          <p className="font-semibold">{order.name}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaPhone className="mr-3 mt-1 text-indigo-500" />
                        <div>
                          <p className="text-sm text-gray-600">Phone Number</p>
                          <p className="font-semibold">{order.mobile}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaMapMarkerAlt className="mr-3 mt-1 text-indigo-500" />
                        <div>
                          <p className="text-sm text-gray-600">
                            Delivery Address
                          </p>
                          <p className="font-semibold">{order.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="pt-8 border-t">
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  Redirecting to homepage in{' '}
                  <span className="font-bold text-indigo-600">{countdown}</span>{' '}
                  seconds
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => (window.location.href = '/')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 flex items-center justify-center space-x-2 transition-all"
                >
                  <FaHome />
                  <span>Back to Homepage</span>
                </button>
                <button
                  onClick={() => (window.location.href = '/shop')}
                  className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-50 flex items-center justify-center space-x-2 transition-all"
                >
                  <FaBook />
                  <span>Continue Shopping</span>
                </button>
              </div>

              <p className="mt-6 text-center text-gray-500 text-sm">
                Need help? Contact our support at support@bookhaven.com or call
                +880 1712 345678
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
