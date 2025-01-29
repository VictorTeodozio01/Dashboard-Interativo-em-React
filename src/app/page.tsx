"use client"; 
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("../components/Dashboard"), { ssr: false });
const Carousel = dynamic(() => import("../components/Carousel"), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Dashboard />
      <div className="mt-auto">
        <Carousel />
      </div>
    </div>
  );
}
