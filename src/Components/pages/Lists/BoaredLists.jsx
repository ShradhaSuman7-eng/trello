import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, TextField } from "@mui/material";
import { Button, Input } from "antd";
import { RxCross2 } from "react-icons/rx";
import Cards from "../cards/Cards";

import {
  fetchLists,
  createLists,
  deleteListBoard,
} from "../../../Redux/lists/listThunk";

const BoardLists = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();

  const { lists, loading } = useSelector((state) => state.lists);

  const [showInput, setShowInput] = useState(false);
  const [listName, setListName] = useState("");

  useEffect(() => {
    dispatch(fetchLists(boardId));
  }, [dispatch, boardId]);

  const handleCreateList = () => {
    if (!listName.trim()) return;
    dispatch(createLists({ listName, boardId }));
    setListName("");
    setShowInput(false);
  };

  return (
    <div className="w-full p-4">
      {/* Mobile Add List */}
      <div className="block md:hidden mb-4">
        <Card sx={{ width: "100%" }}>
          <CardContent className="flex flex-col gap-4">
            {showInput ? (
              <>
                <Input
                  placeholder="Enter list name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />

                <div className="flex justify-between">
                  <Button type="primary" onClick={handleCreateList}>
                    + Add List
                  </Button>

                  <Button onClick={() => setShowInput(false)}>
                    <RxCross2 />
                  </Button>
                </div>
              </>
            ) : (
              <Button type="primary" onClick={() => setShowInput(true)}>
                + Add Another List
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.isArray(lists) &&
          lists.map((list) => (
            <Card key={list.id} className="h-fit bg-gray-100 rounded-lg shadow">
              <CardContent className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <Typography fontWeight={600}>{list.name}</Typography>

                  <Button
                    type="primary"
                    onClick={() => dispatch(deleteListBoard(list.id))}
                  >
                    <RxCross2 />
                  </Button>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2">
                  <Cards listId={list.id} />
                </div>
              </CardContent>
            </Card>
          ))}

        {/* Desktop Add List */}
        <div className="hidden md:block">
          <Card sx={{ width: 260 }}>
            <CardContent className="flex flex-col gap-4">
              {showInput ? (
                <>
                  <Input
                    placeholder="Enter list name"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                  />

                  <div className="flex justify-between">
                    <Button type="primary" onClick={handleCreateList}>
                      + Add List
                    </Button>

                    <Button onClick={() => setShowInput(false)}>
                      <RxCross2 />
                    </Button>
                  </div>
                </>
              ) : (
                <Button type="primary" onClick={() => setShowInput(true)}>
                  + Add Another List
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BoardLists;
