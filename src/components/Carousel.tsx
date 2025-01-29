"use client"; 
import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import Card from "./Card";

const initialCarousel = [
  { id: "A", size: "w-40 h-24" },
  { id: "B", size: "w-40 h-24" },
  { id: "C", size: "w-40 h-24" },
];

export default function Carousel() {
  const [carouselItems, setCarouselItems] = useState(initialCarousel);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = carouselItems.findIndex((item) => item.id === active.id);
    const newIndex = carouselItems.findIndex((item) => item.id === over.id);
    setCarouselItems(arrayMove(carouselItems, oldIndex, newIndex));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={carouselItems.map((item) => item.id)}>
        <div className="flex gap-4 p-4 overflow-x-auto">
          {carouselItems.map((item) => (
            <Card 
            key={item.id} 
            id={item.id} 
            size={item.size} 
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}