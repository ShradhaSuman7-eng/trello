import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCards,
  createCardThunk,
  deleteCardThunk,
} from "../../../Redux/card/cardThunks";
import CheckListModel from "../checklists/ChecklistModel";

const Cards = ({ listId }) => {
  const dispatch = useDispatch();
  const { cardsByList, loading } = useSelector((state) => state.cards);
  const cards = cardsByList[listId] || [];

  const [showInput, setShowInput] = useState(false);
  const [cardName, setCardName] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(null); // <-- selected card

  useEffect(() => {
    dispatch(fetchCards(listId));
  }, [dispatch, listId]);

  const handleAddCard = () => {
    if (!cardName.trim()) return;
    dispatch(createCardThunk({ listId, cardName }));
    setCardName("");
    setShowInput(false);
  };

  const handleDelete = (e, cardId) => {
    e.stopPropagation();
    dispatch(deleteCardThunk(cardId));
  };

  return (
    <div className="space-y-2 relative">
      {/* Cards */}
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => setSelectedCardId(card.id)}
          className="bg-white rounded-md p-2 shadow hover:bg-gray-50 cursor-pointer group"
        >
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-800">{card.name}</p>

            <button
              onClick={(e) => handleDelete(e, card.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      {/* Add Card */}
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="w-full text-left text-sm text-gray-600 hover:bg-gray-200 p-2 rounded-md"
        >
          + Add a card
        </button>
      ) : (
        <div className="space-y-2">
          <textarea
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Enter a title for this card..."
            className="w-full p-2 text-sm border rounded-md"
            rows={3}
            autoFocus
          />

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddCard}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm"
            >
              Add card
            </button>

            <button
              onClick={() => {
                setShowInput(false);
                setCardName("");
              }}
              className="text-gray-600 text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Checklist Modal */}
      {selectedCardId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-[600px] max-h-[80vh] overflow-auto relative">
            <button
              onClick={() => setSelectedCardId(null)}
              className="absolute top-2 right-2 text-gray-600 text-lg"
            >
              ✕
            </button>

            <CheckListModel cardId={selectedCardId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
