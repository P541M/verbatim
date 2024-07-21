import React from "react";

const LandingPage = () => {
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
          <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-600">
            Friends
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded mr-4 hover:bg-green-600">
            Family
          </button>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded mr-4 hover:bg-yellow-600">
            Anonymous
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Luminaries
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
