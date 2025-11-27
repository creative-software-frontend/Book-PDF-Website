import React from 'react';

const ProductCrd = ({ product }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Product Image */}
      <img
        src={`https://admin.prothomashop.com/product/${product.image}`}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      {/* Content + Buttons Wrapper */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {product.title}
        </h2>

        {/* Short Description */}
        <div
          className="text-gray-600 text-sm mb-4 flex-1"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        ></div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-green-600">
            ${product.sale_price}
          </span>
          {product.price !== product.sale_price && (
            <span className="text-sm line-through text-gray-400">
              ${product.price}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200">
            Add to Cart
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100 transition-colors duration-200">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCrd;
