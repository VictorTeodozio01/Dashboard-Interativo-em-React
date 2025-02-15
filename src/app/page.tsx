"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Dashboard = dynamic(() => import("../components/Dashboard"), { ssr: false });
const Carousel = dynamic(() => import("../components/Carousel"), { ssr: false });

export default function Home() {
  const [cards, setCards] = useState([
    { id: "1", size: "w-64 h-40" },
    { id: "2", size: "w-80 h-40" },
    { id: "3", size: "w-64 h-56" },
  ]);

  const addCardToDashboard = (id: string) => {
    setCards((prev) => [
      ...prev,
      { id: `${id}-${prev.length + 1}`, size: "w-40 h-24" },
    ]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Dashboard cards={cards} setCards={setCards} />
      <div className="mt-auto">
        <Carousel addCardToDashboard={addCardToDashboard} />
      </div>
    </div>
  );
}
