"use client";
import { useDroppable } from "@dnd-kit/core";

export default function DragAndDropToDelete () {
  const { isOver, setNodeRef } = useDroppable({ id: "delete-zone" });

  return (
    <div
      ref={setNodeRef}
      className={`flex justify-center items-center w-64 h-40 border-2 border-dashed transition-all rounded-lg shadow-md ${
        isOver ? "bg-red-600 text-white border-red-800 scale-110" : "bg-gray-200 text-gray-500 border-gray-400"
      }`}
    >
      Solte aqui para excluir
    </div>
  );
}