"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  id: string;
  size: string;
}

export default function Card({ id, size }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {transform: CSS.Transform.toString(transform),transition,};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-blue-500 text-white flex justify-center items-center ${size} rounded-lg shadow-md cursor-grab`}
    >
      Card {id}
    </div>
  );
}