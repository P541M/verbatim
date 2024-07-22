import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

const QuoteCard = ({ quote, onLike }) => {
  const deviceId = localStorage.getItem("deviceId");
  const isLiked = quote.likedBy.includes(deviceId);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-[27rem] flex flex-col justify-between h-full">
      <div>
        <p className="text-lg">"{quote.text}"</p>
        <p className="text-base text-gray-600 mt-2">- {quote.author}</p>
      </div>
      <button
        className="mt-4 text-red-500 pb-1 px-2 rounded body-font self-start"
        onClick={() => onLike(quote.id)}
      >
        <FontAwesomeIcon icon={isLiked ? faSolidHeart : faRegularHeart} />
        <span className="ml-2">{quote.likes}</span>
      </button>
    </div>
  );
};

export default QuoteCard;
