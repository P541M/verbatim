import React from "react";

const QuoteCard = ({ quote, onLike }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md my-2">
      <p className="text-lg">"{quote.text}"</p>
      <p className="text-sm text-gray-600 mt-2">- {quote.author}</p>
      <button
        className="mt-4 bg-blue-500 text-white py-1 px-4 rounded"
        onClick={() => onLike(quote.id)}
      >
        Like {quote.likes}
      </button>
    </div>
  );
};

export default QuoteCard;
