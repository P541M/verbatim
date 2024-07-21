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

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get("http://localhost:5000/quotes")
        .then((response) => {
          const filteredQuotes = response.data.filter(
            (q) => q.category === selectedCategory
          );
          setQuotes(filteredQuotes);
        })
        .catch((error) => console.error("Error fetching quotes:", error));
    }
  }, [selectedCategory]);

  const handleLike = (id) => {
    const deviceId = getDeviceId();
    const quote = quotes.find((q) => q.id === id);

    if (quote.likedBy.includes(deviceId)) {
      axios
        .post(`http://localhost:5000/quotes/${id}/unlike`, { deviceId })
        .then((response) => {
          if (response.data.success) {
            const updatedQuotes = quotes.map((quote) =>
              quote.id === id
                ? {
                    ...quote,
                    likes: quote.likes - 1,
                    likedBy: quote.likedBy.filter((id) => id !== deviceId),
                  }
                : quote
            );
            setQuotes(updatedQuotes);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => console.error("Error unliking quote:", error));
    } else {
      axios
        .post(`http://localhost:5000/quotes/${id}/like`, { deviceId })
        .then((response) => {
          if (response.data.success) {
            const updatedQuotes = quotes.map((quote) =>
              quote.id === id
                ? {
                    ...quote,
                    likes: quote.likes + 1,
                    likedBy: [...quote.likedBy, deviceId],
                  }
                : quote
            );
            setQuotes(updatedQuotes);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => console.error("Error liking quote:", error));
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-[#F8F6F7] text-[#0E0007] h-screen flex flex-col justify-center relative">
      <div className="absolute top-8 right-8 max-w-lg tracking-wider"></div>
      <div className="absolute top-20 left-20 text-left">
        <h1 id="title" className="text-9xl mb-5 tracking-tighter">
          Verbatim.
        </h1>
        <p id="slogan" className="text-5xl my-10 tracking-wide">
          ver·ba·tim /vərˈbādəm/
        </p>
        <p id="slogan" className="italic text-3xl my-10 tracking-wide">
          In exactly the same words as were used originally.
        </p>
        <p className="body-font text-xl mt-10 max-w-lg tracking-wide">
          Verbatim is a collection of quotes from people who inspire me. It
          features memorable sayings from friends, family, and influential
          individuals. Discover wisdom and insights from a variety of voices
          that have left a lasting impact.
        </p>
        <div className="mt-10 flex flex-col space-y-4 text-base">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => handleCategoryClick("family")}
          >
            Family
          </span>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => handleCategoryClick("friends")}
          >
            Friends
          </span>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => handleCategoryClick("anonymous")}
          >
            Anonymous
          </span>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => handleCategoryClick("luminaries")}
          >
            Luminaries
          </span>
        </div>
      </div>
      <div className="absolute top-20 right-20 max-w-4xl">
        {selectedCategory && (
          <div>
            <h2 className="text-3xl font-bold mb-5 capitalize">
              {selectedCategory}
            </h2>
            {quotes.length === 0 ? (
              <p>No quotes available</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {quotes.map((quote) => (
                  <QuoteCard key={quote.id} quote={quote} onLike={handleLike} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
