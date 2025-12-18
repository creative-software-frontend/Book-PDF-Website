import React from 'react';

const ProductCrd = ({ product, onOrder }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img
        src={`https://admin.prothomashop.com/product/${product.image}`}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>

        <div
          className="text-gray-600 text-sm mb-4 flex-1"
          dangerouslySetInnerHTML={{
            __html: product.short_description,
          }}
        />

        <div className="flex justify-between items-center mb-4">
          <span className="text-green-600 font-bold text-lg">
            {product.sale_price} Tk
          </span>
          {product.price !== product.sale_price && (
            <span className="line-through text-gray-400 text-sm">
              {product.price} Tk
            </span>
          )}
        </div>

        <button
          onClick={() => onOrder(product)}
          className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCrd;
