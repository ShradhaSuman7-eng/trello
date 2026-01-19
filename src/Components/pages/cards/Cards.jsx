import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Checkbox } from "antd";
import { RxCross2 } from "react-icons/rx";
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
  const [selectedCardId, setSelectedCardId] = useState(null);

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
    <div className="space-y-2">
      {cards.map((card) => (
        <Card
          key={card.id}
          className="group cursor-pointer hover:border-blue-400"
          sx={{
            borderRadius: 2,
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            background: "#fff",
          }}
          onClick={() => setSelectedCardId(card.id)}
        >
          <CardContent
            className="relative flex items-center gap-2"
            sx={{ padding: "10px 12px" }}
          >
            <div className="opacity-0 group-hover:opacity-100">
              <input
                type="checkbox"
                className="w-4 h-4 border border-gray-400 rounded"
              />
            </div>

            <Typography
              variant="body2"
              fontWeight={500}
              className="flex-1 text-sm"
            >
              {card.name}
            </Typography>

            <IconButton
              size="small"
              className="opacity-0 group-hover:opacity-100"
              onClick={(e) => handleDelete(e, card.id)}
            >
              <RxCross2 size={18} />
            </IconButton>
          </CardContent>
        </Card>
      ))}

      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="w-full text-left text-sm text-gray-700 hover:bg-gray-200 p-2 rounded-md"
        >
          + Add a card
        </button>
      ) : (
        <div className="bg-white rounded-md p-2 shadow space-y-2">
          <textarea
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full p-2 text-sm border rounded-md"
            rows={3}
            autoFocus
            placeholder="Enter card title..."
          />

          <div className="flex gap-2 items-center">
            <button
              className="bg-blue-600 text-white px-4 py-1.5 rounded"
              onClick={handleAddCard}
              disabled={loading}
            >
              Add card
            </button>
            <IconButton onClick={() => setShowInput(false)}>
              <RxCross2 />
            </IconButton>
          </div>
        </div>
      )}

      {selectedCardId && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSelectedCardId(null)}
          />

          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-[720px] max-w-[95%]">
            <Card sx={{ borderRadius: 3 }}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <Checkbox />
                    <Typography variant="h5" fontWeight={600}>
                      Card Details
                    </Typography>
                  </div>

                  <IconButton onClick={() => setSelectedCardId(null)}>
                    <RxCross2 />
                  </IconButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <Typography fontWeight={600}>Description</Typography>
                      <div className="bg-gray-100 p-3 rounded text-sm text-gray-600">
                        Add a more detailed description…
                      </div>
                    </div>

                    <CheckListModel cardId={selectedCardId} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;
