import React, { useState } from "react";
import { quotes as initialQuotes } from "../data/quotes";
import QuoteCard from "./QuoteCard";

const QuoteList = () => {
  const [quotes, setQuotes] = useState(initialQuotes);

  const handleLike = (id) => {
    const updatedQuotes = quotes.map((quote) =>
      quote.id === id ? { ...quote, likes: quote.likes + 1 } : quote
    );
    setQuotes(updatedQuotes);
  };

  return (
    <div>
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} onLike={handleLike} />
      ))}
    </div>
  );
};

export default QuoteList;
