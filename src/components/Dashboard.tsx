"use client";
import { useState } from "react";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import Card from "../components/Card";
import AddRemoveButtons from "../components/AddRemoveButtons";
import DragAndDropToDelete from "./DragAndDropToDelete";

const initialCards = [
  { id: "1", size: "w-64 h-40" },
  { id: "2", size: "w-80 h-40" },
  { id: "3", size: "w-64 h-56" },
];

export default function Dashboard() {
  const [cards, setCards] = useState(initialCards);

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const ativoId = String(active.id);
    const overId = String(over.id);

    if (overId === "delete-zone") {
      removeCard(ativoId); 
    } else {
      const oldIndex = cards.findIndex((card) => card.id === ativoId);
      const newIndex = cards.findIndex((card) => card.id === overId);
      setCards(arrayMove(cards, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="relative flex flex-col items-center gap-4 p-4">
        <SortableContext items={[...cards.map((card) => card.id), "delete-zone"]}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
              <Card key={card.id} id={card.id} size={card.size} />
            ))}
            <DragAndDropToDelete />
          </div>
        </SortableContext>
        <AddRemoveButtons setCards={setCards} />
      </div>
    </DndContext>
  );
}