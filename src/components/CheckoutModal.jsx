import React, { forwardRef } from 'react';
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaShoppingBag,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
} from 'react-icons/fa';

const CheckoutModal = forwardRef(
  (
    { cartItems, setCartItems, totalPrice, formData, handleInputChange },
    ref
  ) => {
    if (cartItems.length === 0) {
      return (
        <div ref={ref} className="py-12 md:py-20 text-center px-4">
          <div className="flex flex-col items-center justify-center">
            <FaShoppingBag className="text-5xl md:text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-400 mb-2">
              আপনার কার্ট খালি
            </h3>
            <p className="text-gray-500 text-sm md:text-base">
              শুরু করতে কিছু পণ্য যোগ করুন
            </p>
          </div>
        </div>
      );
    }

    const updateQuantity = (id, type) => {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id
            ? {
                ...item,
                quantity:
                  type === 'inc'
                    ? item.quantity + 1
                    : Math.max(1, item.quantity - 1),
              }
            : item
        )
      );
    };

    const removeItem = id => {
      setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleSubmitOrder = e => {
      e.preventDefault();

      const order = {
        customer: formData,
        products: cartItems.map(item => ({
          product_id: item.id,
          name: item.title,
          price: item.sale_price,
          quantity: item.quantity,
          total: item.sale_price * item.quantity,
        })),
        grandTotal: totalPrice,
      };

      console.log('অর্ডার ডেটা 👉', order);
      alert('অর্ডার সফলভাবে জমা হয়েছে! বিস্তারিত দেখতে কনসোল চেক করুন।');
    };

    return (
      <div
        ref={ref}
        className="w-full px-3 sm:px-4 md:px-6 py-4 md:py-6 bg-gradient-to-br from-white to-gray-50 rounded-md shadow-lg md:shadow-2xl"
      >
        <div className="flex  items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              চেকআউট
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              আপনার ক্রয় সম্পূর্ণ করুন
            </p>
          </div>
          <div className="bg-indigo-100 text-indigo-700 px-3 py-2 md:px-4 md:py-2 rounded-full font-semibold flex items-center gap-2 w-fit">
            <FaShoppingBag className="text-sm" />
            <span className="text-sm md:text-base">
              {cartItems.length} {cartItems.length === 1 ? 'আইটেম' : 'আইটেম'}
            </span>
          </div>
        </div>

        {/* Products Section - Responsive Table */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
            অর্ডার সামারি
          </h3>

          <div className="overflow-hidden rounded-md border border-gray-200">
            {/* Table Headers - Hidden on mobile */}
            <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-700">
              <div className="col-span-5 sm:col-span-5">পণ্য</div>
              <div className="col-span-2 text-center">দাম</div>
              <div className="col-span-3 text-center">পরিমাণ</div>
              <div className="col-span-2 text-right">মোট</div>
            </div>

            {/* Table Items */}
            <div className="divide-y divide-gray-100">
              {cartItems.map(item => (
                <div key={item.id} className="p-3 md:p-4 hover:bg-gray-50">
                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={`https://admin.prothomashop.com/product/${item.image}`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm md:text-base mb-1">
                            {item.title}
                          </h4>
                          <div className="text-sm text-gray-600 mb-2">
                            দাম: {item.sale_price} টাকা
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 ml-2"
                        title="মুছে ফেলুন"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, 'dec')}
                          className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className="text-xs" />
                        </button>

                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, 'inc')}
                          className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-gray-900 text-sm md:text-base">
                          {item.sale_price * item.quantity} টাকা
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:grid sm:grid-cols-12 items-center">
                    {/* Product Info */}
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={`https://admin.prothomashop.com/product/${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm md:text-base">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center text-gray-700 text-sm md:text-base">
                      {item.sale_price} টাকা
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-3 flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, 'dec')}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus className="text-xs" />
                      </button>

                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, 'inc')}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>

                    {/* Total and Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-3">
                      <span className="font-semibold text-gray-900 text-sm md:text-base">
                        {item.sale_price * item.quantity} টাকা
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                        title="মুছে ফেলুন"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-md border border-indigo-100">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">
            অর্ডার বিস্তারিত
          </h3>
          <div className="space-y-2 md:space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-gray-600 text-sm md:text-base">
                  {item.title} × {item.quantity}
                </span>
                <span className="font-medium text-sm md:text-base">
                  {item.sale_price * item.quantity} টাকা
                </span>
              </div>
            ))}
            <div className="border-t pt-2 md:pt-3 mt-2 md:mt-3">
              <div className="flex justify-between items-center">
                <span className="text-base md:text-lg font-semibold text-gray-800">
                  মোট মূল্য
                </span>
                <span className="text-xl md:text-2xl font-bold text-indigo-700">
                  {totalPrice} টাকা
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information Form */}
        <form onSubmit={handleSubmitOrder} className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-md p-4 md:p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 md:mb-6 flex items-center gap-2">
              <FaUser className="text-indigo-600 text-sm md:text-base" />
              গ্রাহকের তথ্য
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  পুরো নাম
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    name="name"
                    placeholder="জন ডো"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 md:p-3 pl-9 md:pl-10 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  ফোন নম্বর
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    name="phone"
                    placeholder="+৮৮০ ১XXX XXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 md:p-3 pl-9 md:pl-10 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  ডেলিভারি ঠিকানা
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400 text-sm" />
                  <textarea
                    name="address"
                    placeholder="আপনার সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 p-2 md:p-3 pl-9 md:pl-10 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-sm md:text-base"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 md:py-4 rounded-md font-bold text-base md:text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 md:gap-3"
          >
            <FaCheckCircle className="text-sm md:text-base" />
            <span className="text-sm md:text-base">
              অর্ডার নিশ্চিত করুন &nbsp; • &nbsp; {totalPrice} টাকা
            </span>
          </button>
        </form>
      </div>
    );
  }
);

export default CheckoutModal;
