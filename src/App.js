import React from "react";
import QuoteList from "./components/QuoteList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Inspiring Quotes</h1>
      <QuoteList />
    </div>
  );
}

export default App;
