import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Button, Input } from "antd";

import { Card, CardContent } from "@mui/material";
import { BoardContext } from "../../../context/BoardProvider";
import { useContext } from "react";
import { createList } from "../../../services/lists/addLists";

const ListModel = ({ boardId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { lists, setLists } = useContext(BoardContext);
  const [input, setInput] = useState("");

  const handleCreateLists = async () => {
    if (!input.trim()) return;

    try {
      const newList = await createList(input, boardId);
      setLists((prev) => [...prev, newList]);
      setInput("");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create list", error);
    }
  };

  return (
    <>
      <Card sx={{ width: 260 }}>
        <CardContent className="flex flex-col gap-4">
          {isOpen ? (
            <>
              <Input
                placeholder="Enter List name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="flex justify-between">
                <Button
                  type="primary"
                  className="w-4"
                  block
                  onClick={() => handleCreateLists(boardId)}
                >
                  +Add list
                </Button>

                <Button className="self-end" onClick={() => setIsOpen(false)}>
                  <RxCross2 />
                </Button>
              </div>
            </>
          ) : (
            <Button type="primary" block onClick={() => setIsOpen(true)}>
              + Add Another list
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ListModel;
