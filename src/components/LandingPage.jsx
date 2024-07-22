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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get("http://localhost:5000/quotes")
        .then((response) => {
          const filteredQuotes = response.data.filter((q) =>
            q.category.includes(selectedCategory)
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

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="bg-[#F8F6F7] text-[#0E0007] h-screen flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-8 right-8 max-w-lg tracking-wider"></div>
      <div className="absolute top-20 left-20 text-left">
        <h1 id="title" className="text-9xl mb-3 tracking-tighter">
          Verbatim.
        </h1>
        <p id="slogan" className="text-5xl mb-5 tracking-wide">
          ver·ba·tim /vərˈbādəm/
        </p>
        <p id="slogan" className="italic text-3xl mb-10 tracking-wide">
          In exactly the same words as were used originally.
        </p>
        <p className="body-font mb-5 text-xl max-w-xl tracking-wide">
          Verbatim is a collection of quotes from people who inspire. It
          features memorable sayings from friends, family, and many others.
          Discover wisdom and insights from a variety of voices that have left a
          lasting impact.
        </p>
        <div className="flex flex-row space-x-4 text-base">
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
        <div className="mt-5 text-sm">
          <button
            onClick={handleModalToggle}
            className=" text-[#0E0007] hover:underline"
          >
            Want your quote displayed?
          </button>
        </div>
      </div>
      <div className="absolute top-40 right-20 max-w-4xl h-[70vh] overflow-y-scroll overflow-x-hidden custom-scrollbar">
        {selectedCategory && (
          <div>
            <h2 className="text-3xl font-bold pb-8 capitalize sticky top-0 bg-[#F8F6F7]">
              {selectedCategory}
            </h2>
            {quotes.length === 0 ? (
              <p>No quotes available</p>
            ) : (
              <div className="grid grid-cols-2 gap-10">
                {quotes.map((quote) => (
                  <QuoteCard key={quote.id} quote={quote} onLike={handleLike} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-3xl text-left">
            <h2 className="text-3xl font-bold mb-5">
              Want your quote displayed?
            </h2>
            <p className="body-font text-xl mb-5">
              If you have a quote you'd like to share, we'd love to feature it
              on{" "}
              <span className="text-lg font-bold header-font tracking-tight">
                Verbatim
              </span>
              . Please contact us at
              <a
                href="mailto:verbatimquotes@gmail.com"
                className="text-blue-500"
              >
                {" "}
                verbatimquotes@gmail.com
              </a>
              .
            </p>
            <p className="body-font text-xl mb-5">
              Include the following details:
              <ul className="list-disc ml-5 mt-2">
                <li>
                  Your name (please mention if you want to appear anonymous)
                </li>
                <li>Your quote</li>
              </ul>
            </p>
            <button
              onClick={handleModalToggle}
              className=" text-[#0E0007] pt-2 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
