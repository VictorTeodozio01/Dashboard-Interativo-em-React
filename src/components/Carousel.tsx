"use client";
import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import Card from "./Card";
import { initialCarousel } from "./consts";

interface CarouselProps {
  addCardToDashboard: (id: string) => void;
}

export default function Carousel({ addCardToDashboard }: CarouselProps) {
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
            <div
              key={item.id}
              onClick={() => addCardToDashboard(item.id)}
              className="cursor-pointer"
            >
              <Card id={item.id} size={item.size} />
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
