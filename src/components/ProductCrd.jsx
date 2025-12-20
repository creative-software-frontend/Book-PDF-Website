import React from 'react';

const ProductCrd = ({ product, onOrder }) => {
  return (
    <div className="w-full bg-white rounded-md shadow-md sm:shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative pt-[75%] sm:pt-[70%] md:pt-[65%] overflow-hidden bg-gray-100">
        <img
          src={`https://admin.prothomashop.com/product/${product.image}`}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.price !== product.sale_price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Save {product.price - product.sale_price}৳
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Product Title */}
        <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 line-clamp-2 h-10 sm:h-12 overflow-hidden">
          {product.title}
        </h2>

        {/* Product Description - Shows only on larger screens */}
        <div
          className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-0 flex-1 hidden sm:block"
          dangerouslySetInnerHTML={{
            __html: product.short_description,
          }}
        />

        {/* Price Section */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold text-lg sm:text-xl">
              {product.sale_price}৳
            </span>
            {product.price !== product.sale_price && (
              <span className="line-through text-gray-400 text-sm sm:text-base">
                {product.price}৳
              </span>
            )}
          </div>

          {/* Discount Badge - Shows on mobile only */}
          {product.price !== product.sale_price && (
            <div className="block sm:hidden bg-red-100 text-red-600 text-xs px-2 py-1 rounded w-fit">
              {Math.round(
                ((product.price - product.sale_price) / product.price) * 100
              )}
              % off
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onOrder(product)}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 active:scale-95 active:bg-blue-800 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCrd;
