import React from "react";
import QuoteList from "./components/QuoteList";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <LandingPage />
      <QuoteList />
    </div>
  );
}

export default App;
