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
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/quotes")
      .then((response) => setQuotes(response.data))
      .catch((error) => console.error("Error fetching quotes:", error));
  }, []);

  const handleLike = (id) => {
    const deviceId = getDeviceId();
    axios
      .post(`http://localhost:5000/quotes/${id}/like`, { deviceId })
      .then((response) => {
        if (response.data.success) {
          const updatedQuotes = quotes.map((quote) =>
            quote.id === id ? { ...quote, likes: quote.likes + 1 } : quote
          );
          setQuotes(updatedQuotes);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => console.error("Error liking quote:", error));
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
