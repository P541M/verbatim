import React, { useState, useEffect } from "react";
import axios from "axios";
import QuoteCard from "./QuoteCard";

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
        <div className="mt-10">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-600"
            onClick={() => handleCategoryClick("friends")}
          >
            Friends
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded mr-4 hover:bg-green-600"
            onClick={() => handleCategoryClick("family")}
          >
            Family
          </button>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded mr-4 hover:bg-yellow-600"
            onClick={() => handleCategoryClick("anonymous")}
          >
            Anonymous
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={() => handleCategoryClick("luminaries")}
          >
            Luminaries
          </button>
        </div>
      </div>
      <div className="absolute top-20 right-20 w-1/3">
        {selectedCategory && (
          <div>
            <h2 className="text-3xl font-bold mb-5 capitalize">
              {selectedCategory}
            </h2>
            {quotes.length === 0 ? (
              <p>No quotes available</p>
            ) : (
              quotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} onLike={() => {}} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
