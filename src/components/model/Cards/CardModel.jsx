import React, { useContext, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { Button } from "antd";
import { deleteCard } from "../../../services/cards/deleteCards";
import { BoardContext } from "../../../context/BoardProvider";
import { getCard } from "../../../services/cards/completeCard";
import FullCard from "./FullCard";

const CardModel = ({ name, cardId, listId }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const { setLists, setShowCard } = useContext(BoardContext);

  const handleDeleteList = async (cardId, listId) => {
    await deleteCard(cardId);

    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, cards: list.cards.filter((c) => c.id !== cardId) }
          : list
      )
    );
  };

  const displayCard = async (cardId) => {
    try {
      setIsCardOpen(true);
      const response = await getCard(cardId);
      setShowCard(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className="group bg-white hover:bg-gray-50 cursor-pointer hover:border hover:border-blue-300"
      sx={{
        borderRadius: 2,
        boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
      }}
    >
      <CardContent
        className="relative flex items-start gap-2"
        sx={{
          padding: "6px 8px",
          "&:last-child": { paddingBottom: "6px" },
        }}
      >
        <div
          className="flex w-full gap-2.5 "
          onClick={() => displayCard(cardId)}
        >
          <div>
            <div className="mt-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <input
                type="checkbox"
                className="
              appearance-none
              w-4 h-4
              border border-gray-400
              rounded-full
              cursor-pointer
            "
              />
            </div>
          </div>

          {/* Title + delete */}
          <div className="flex-1 flex justify-between items-start">
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ wordBreak: "break-word" }}
            >
              {name}
            </Typography>

            <Button
              size="small"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDeleteList(cardId, listId)}
            >
              <RxCross2 />
            </Button>
          </div>
        </div>

        {isCardOpen && <FullCard setIsCardOpen={setIsCardOpen} />}
      </CardContent>
    </Card>
  );
};

export default CardModel;
