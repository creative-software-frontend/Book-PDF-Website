import React, { useEffect, useState } from 'react';

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      text: 'Amazing product! Highly recommend it. The quality exceeded my expectations and delivery was faster than promised.',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      productImage:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      rating: 5,
      product: 'Wireless Headphones',
    },
    {
      id: 2,
      name: 'Sarah Lee',
      text: 'Very good quality and fast delivery! The packaging was eco-friendly and the product works perfectly.',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      productImage:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      rating: 5,
      product: 'Smart Watch',
    },
    {
      id: 3,
      name: 'David Smith',
      text: 'Excellent experience, will buy again. Customer service was outstanding and the product is durable.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      productImage:
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop',
      rating: 4,
      product: 'Bluetooth Speaker',
    },
    {
      id: 4,
      name: 'Emma Watson',
      text: 'Loved it! Great customer service too. The attention to detail in this product is remarkable.',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      productImage:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      rating: 5,
      product: 'Running Shoes',
    },
    {
      id: 5,
      name: 'Michael Brown',
      text: 'Worth every penny. Totally satisfied with my purchase and would recommend to friends and family.',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
      productImage:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      rating: 5,
      product: 'Wireless Earbuds',
    },
    {
      id: 6,
      name: 'Olivia Green',
      text: 'The packaging was perfect! Product arrived in excellent condition and works flawlessly.',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
      productImage:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      rating: 4,
      product: 'Fitness Tracker',
    },
    {
      id: 7,
      name: 'Chris Johnson',
      text: 'Superb product, highly impressed! Better than I expected in every way.',
      avatar:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=80&h=80&fit=crop&crop=face',
      productImage:
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop',
      rating: 5,
      product: 'Portable Speaker',
    },
    {
      id: 8,
      name: 'Sophia Miller',
      text: 'Perfect for gifting. Love it! The recipient was thrilled with the quality.',
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face',
      productImage:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      rating: 5,
      product: 'Sports Shoes',
    },
  ];

  const [current, setCurrent] = useState(0);
  const visibleCards = 3;

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % (reviews.length - visibleCards + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % (reviews.length - visibleCards + 1));
  };

  const prevSlide = () => {
    setCurrent(
      prev =>
        (prev - 1 + (reviews.length - visibleCards + 1)) %
        (reviews.length - visibleCards + 1)
    );
  };

  return (
    <div className="max-w-7xl mx-auto    overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Customer Reviews
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover what our customers are saying about their shopping experience
        </p>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 -ml-6"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 -mr-6"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Reviews Container */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${(current * 100) / visibleCards}%)`,
            }}
          >
            {reviews.map(review => (
              <div
                key={review.id}
                className="w-[calc(100%/3)] px-3 flex-shrink-0"
              >
                <div className="bg-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300 px-2 pt-2 h-full flex flex-col mb-3">
                  {/* Header with avatar and product image */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {review.name}
                        </h3>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <img
                      src={review.productImage}
                      alt={review.product}
                      className="w-full h-40 rounded-lg object-cover shadow-md group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: reviews.length - visibleCards + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
