import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ListModel from "./ListModel";
import { BoardContext } from "../../../context/BoardProvider";
import { getLists } from "../../../services/lists/getAllLists";
import { getAllCards } from "../../../services/cards/getAllcards";
import { Card, CardContent, Typography, TextField } from "@mui/material";
import { Button } from "antd";
import { RxCross2 } from "react-icons/rx";
import { deleteList } from "../../../services/lists/deleteLists";
import { createCard } from "../../../services/cards/addCards";
import CardModel from "../Cards/CardModel";

const Lists = () => {
  const { boardId } = useParams();
  const { lists, setLists } = useContext(BoardContext);

  const [openListId, setOpenListId] = useState(null);
  const [cardTitle, setCardTitle] = useState("");

  useEffect(() => {
    const fetchListsWithCards = async () => {
      try {
        const listsData = await getLists(boardId);

        const safeLists = Array.isArray(listsData) ? listsData : [];

        const listsWithCards = await Promise.all(
          safeLists.map(async (list) => {
            const cardsData = await getAllCards(list.id);

            return {
              ...list,
              cards: Array.isArray(cardsData) ? cardsData : [],
            };
          }),
        );

        setLists(listsWithCards);
      } catch (err) {
        console.error("Failed to fetch lists/cards:", err);
        setLists([]);
      }
    };

    fetchListsWithCards();
  }, [boardId, setLists]);

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      setLists((prev) => prev.filter((l) => l.id !== listId));
    } catch (err) {
      console.error("Failed to delete list:", err);
    }
  };

  const handleAddCard = async (listId) => {
    if (!cardTitle.trim()) return;

    try {
      const newCard = await createCard(listId, cardTitle);

      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                cards: [
                  ...(Array.isArray(list.cards) ? list.cards : []),
                  newCard,
                ],
              }
            : list,
        ),
      );

      setCardTitle("");
      setOpenListId(null);
    } catch (err) {
      console.error("Failed to add card:", err);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="block md:hidden mb-4">
        <ListModel boardId={boardId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.isArray(lists) &&
          lists.map((list) => (
            <Card key={list.id} className="h-fit bg-gray-100 rounded-lg shadow">
              <CardContent className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <Typography fontWeight={600}>{list.name}</Typography>

                  <Button
                    type="primary"
                    onClick={() => handleDeleteList(list.id)}
                  >
                    <RxCross2 />
                  </Button>
                </div>

                <div className="flex flex-col gap-2">
                  {Array.isArray(list.cards) &&
                    list.cards.map((card) => (
                      <div
                        key={card.id}
                        className="bg-white p-2 rounded shadow-sm text-sm"
                      >
                        <CardModel
                          name={card.name}
                          cardId={card.id}
                          listId={list.id}
                        />
                      </div>
                    ))}
                </div>

                {openListId === list.id ? (
                  <>
                    <TextField
                      size="small"
                      placeholder="Enter card title"
                      value={cardTitle}
                      onChange={(e) => setCardTitle(e.target.value)}
                      autoFocus
                    />

                    <div className="flex gap-2">
                      <Button
                        type="primary"
                        onClick={() => handleAddCard(list.id)}
                      >
                        Add
                      </Button>

                      <Button
                        onClick={() => {
                          setOpenListId(null);
                          setCardTitle("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button block onClick={() => setOpenListId(list.id)}>
                    + Add card
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

        <div className="hidden md:block">
          <ListModel boardId={boardId} />
        </div>
      </div>
    </div>
  );
};

export default Lists;
