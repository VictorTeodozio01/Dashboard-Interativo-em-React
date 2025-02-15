"use client";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import Card from "./Card";
import DragAndDropToDelete from "./DragAndDropToDelete";
import AddRemoveButtons from "./AddRemoveButtons";

interface DashboardProps {
  cards: { id: string; size: string }[];
  setCards: React.Dispatch<
    React.SetStateAction<{ id: string; size: string }[]>
  >;
}

export default function Dashboard({ cards, setCards }: DashboardProps) {
  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (overId === "delete-zone") {
      removeCard(activeId);
    } else {
      const oldIndex = cards.findIndex((card) => card.id === activeId);
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
