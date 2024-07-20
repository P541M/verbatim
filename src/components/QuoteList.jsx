import React, { useState, useEffect } from "react";
import axios from "axios";
import QuoteCard from "./QuoteCard";

const getDeviceId = () => {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = "_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
};

const QuoteList = () => {
  const [quotes, setQuotes] = useState({ generic: [], specific: [] });

  useEffect(() => {
    axios
      .get("http://localhost:5000/quotes")
      .then((response) => {
        console.log("Fetched quotes:", response.data); // Debugging statement
        const genericQuotes = response.data.filter(
          (q) => q.category === "generic"
        );
        const specificQuotes = response.data.filter(
          (q) => q.category === "specific"
        );
        setQuotes({ generic: genericQuotes, specific: specificQuotes });
        console.log("Generic quotes:", genericQuotes); // Debugging statement
        console.log("Specific quotes:", specificQuotes); // Debugging statement
      })
      .catch((error) => console.error("Error fetching quotes:", error));
  }, []);

  const handleLike = (id) => {
    const deviceId = getDeviceId();
    axios
      .post(`http://localhost:5000/quotes/${id}/like`, { deviceId })
      .then((response) => {
        if (response.data.success) {
          const updatedQuotes = {
            generic: quotes.generic.map((quote) =>
              quote.id === id ? { ...quote, likes: quote.likes + 1 } : quote
            ),
            specific: quotes.specific.map((quote) =>
              quote.id === id ? { ...quote, likes: quote.likes + 1 } : quote
            ),
          };
          setQuotes(updatedQuotes);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => console.error("Error liking quote:", error));
  };

  const handleResetLikes = () => {
    axios
      .post("http://localhost:5000/reset-likes")
      .then((response) => {
        if (response.data.success) {
          const updatedQuotes = {
            generic: quotes.generic.map((quote) => ({
              ...quote,
              likes: 0,
              likedBy: [],
            })),
            specific: quotes.specific.map((quote) => ({
              ...quote,
              likes: 0,
              likedBy: [],
            })),
          };
          setQuotes(updatedQuotes);
        } else {
          alert("Failed to reset likes");
        }
      })
      .catch((error) => console.error("Error resetting likes:", error));
  };

  return (
    <div>
      <button
        className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
        onClick={handleResetLikes}
      >
        Reset Likes
      </button>
      <h2 className="text-2xl font-bold mt-6">Generic Quotes</h2>
      {quotes.generic.length === 0 ? (
        <p>No generic quotes available</p>
      ) : (
        quotes.generic.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} onLike={handleLike} />
        ))
      )}
      <h2 className="text-2xl font-bold mt-6">Specific Quotes</h2>
      {quotes.specific.length === 0 ? (
        <p>No specific quotes available</p>
      ) : (
        quotes.specific.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} onLike={handleLike} />
        ))
      )}
    </div>
  );
};

export default QuoteList;
