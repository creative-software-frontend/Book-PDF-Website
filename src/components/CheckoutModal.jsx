import axios from 'axios';
import React, { forwardRef } from 'react';
import {
  FaPlus,
  FaMinus,
  FaLock,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
} from 'react-icons/fa';

const CheckoutModal = forwardRef(
  (
    { product, quantity, setQuantity, totalPrice, formData, handleInputChange },
    ref
  ) => {
    if (!product) {
      return (
        <div ref={ref} className="py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              আপনার কার্ট খালি
            </h3>
            <p className="text-gray-500">
              চেকআউট শুরু করতে একটি পণ্য নির্বাচন করুন
            </p>
          </div>
        </div>
      );
    }
    const handleSubmitOrder = async e => {
      e.preventDefault();

      // ----------
      const order = {
        user_name: formData.name,
        user_phone: formData.phone,
        user_address: formData.address,
        product_id: product.id,
        product_name: product.title,
        product_image: product.image,
        quantity: Number(quantity),
        total: Number(totalPrice),
        payment_method: 'zpay',
      };

      try {
        const response = await axios.post(
          `https://sarbarna.com/api/order/store`,
          order
        );

        const { payment_url } = response.data;

        // ✅ save order id

        // ✅ MUST be immediate
        if (payment_url) {
          const newWindow = window.open(
            payment_url,
            '_blank',
            'noopener,noreferrer'
          );

          if (!newWindow) {
            alert('Popup blocked! Please allow popups.');
          }
        }

        // setShowSuccess(true);
      } catch (error) {
        console.error('❌ API Error:', error);
        alert(
          error?.response?.data?.message ||
            'Failed to submit order. Please try again.'
        );
      }
    };

    return (
      <div ref={ref} className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              আপনার কেনাকাটা সম্পন্ন করুন
            </h2>
            <p className="text-gray-600 mb-8">অর্ডার ডেলিভারির শেষ ধাপ</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary Card */}
              <div className="bg-white ">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    অর্ডার সারসংক্ষেপ
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    আপনার পণ্য এবং মোট মূল্য যাচাই করুন
                  </p>
                </div>

                {/* Product Card */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={`https://admin.prothomashop.com/product/${product.image}`}
                      alt={product.title}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-gray-900">
                        {product.sale_price} টাকা
                      </span>
                      {product.original_price && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.original_price} টাকা
                        </span>
                      )}
                      {product.original_price && (
                        <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                          সাশ্রয় {product.original_price - product.sale_price}{' '}
                          টাকা
                        </span>
                      )}
                    </div>
                    {product.category && (
                      <span className="inline-block text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded mt-2">
                        {product.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Control */}
                <div className="mb-8">
                  <p className="text-gray-700 font-medium mb-3">
                    পরিমাণ পরিবর্তন করুন
                  </p>
                  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
                        <button
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                          className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full transition-all shadow-sm"
                          aria-label="পরিমাণ কমান"
                        >
                          <FaMinus className="text-gray-600 text-sm" />
                        </button>
                        <span className="text-xl font-bold text-gray-900 min-w-[2rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(q => q + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full transition-all shadow-sm"
                          aria-label="পরিমাণ বাড়ান"
                        >
                          <FaPlus className="text-gray-600 text-sm" />
                        </button>
                      </div>
                      <span className="text-gray-600 text-sm">
                        {quantity} টি পণ্য নির্বাচন করা হয়েছে
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">একক মূল্য</p>
                      <p className="font-semibold text-gray-900">
                        {product.sale_price} টাকা
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-4">
                  <div className="border-t border-gray-100 pt-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">পণ্যের মোট মূল্য</span>
                      <span className="font-medium">
                        {product.sale_price} × {quantity}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-gray-600 text-sm">
                      <span>কর ও চার্জ</span>
                      <span>অন্তর্ভুক্ত</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">
                          মোট পরিশোধযোগ্য
                        </span>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {totalPrice} টাকা
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            পরিশোধযোগ্য পরিমাণ
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information Form */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaCreditCard className="text-indigo-600" />
                  ডেলিভারি তথ্য
                </h3>

                <form onSubmit={handleSubmitOrder} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      পূর্ণ নাম
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="আপনার পুরো নাম লিখুন"
                      required
                      className="w-full border p-4 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      ফোন নম্বর
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="মোবাইল নম্বর লিখুন"
                      required
                      className="w-full border p-4 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      ডেলিভারি ঠিকানা
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="সম্পূর্ণ ঠিকানা লিখুন"
                      required
                      rows="3"
                      className="w-full border p-4 rounded-xl resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FaShieldAlt className="text-indigo-600" />
                      <div>
                        <p className="font-medium">নিরাপদ পেমেন্ট</p>
                        <p className="text-sm text-gray-600">
                          আপনার তথ্য সম্পূর্ণ সুরক্ষিত
                        </p>
                      </div>
                    </div>
                    <FaLock className="text-green-500 text-xl" />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-semibold"
                  >
                    অর্ডার নিশ্চিত করুন – {totalPrice} টাকা
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    নিশ্চিত করার মাধ্যমে আপনি আমাদের শর্তাবলীতে সম্মত হচ্ছেন
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-300 p-4 text-center">
            <p className="text-sm text-gray-600">
              সাহায্য প্রয়োজন? কল করুন:
              <span className="font-medium text-indigo-600">
                +880 XXX-XXXXXX
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default CheckoutModal;
