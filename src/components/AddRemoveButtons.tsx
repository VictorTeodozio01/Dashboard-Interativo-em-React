"use client";
interface AddRemoveProps { setCards: React.Dispatch<React.SetStateAction<{ 
    id: string; 
    size: string
  }[]>>;
}

export default function AddRemoveButtons({ setCards }: AddRemoveProps) {
  const addCard = () => {
    setCards((prev) => {
      if (prev.length >= 4) return prev;
      const nextId = prev.reduce((maxId, card) => {
        const cardId = parseInt(card.id);
        return cardId > maxId ? cardId : maxId;
      }, 0) + 1; 
      return [
        ...prev, { 
          id: nextId.toString(), 
          size: "w-64 h-40" 
        }
      ];
    }
    );
  };

  const removeCard = () => {
    setCards((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button 
        onClick={addCard} 
        className={`p-2 rounded ${setCards.length >= 4 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 text-white"}`}
        disabled={setCards.length >= 4}
      >
        Adicionar Card
      </button>
      <button 
        onClick={removeCard} 
        className="bg-red-500 text-white p-2 rounded"
      >
        Remover Card
      </button>
    </div>
  );
}