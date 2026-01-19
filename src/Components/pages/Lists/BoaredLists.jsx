import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "antd";
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
    <div className="p-4 overflow-x-auto">
      <Typography variant="h5" fontWeight={600} mb={2}>
        Board Lists
      </Typography>

      <div className="flex gap-4 min-h-[70vh]">
        {/* Lists */}
        {lists.map((list) => (
          <Card
            key={list.id}
            className="h-fit"
            sx={{ width: 280, borderRadius: 3 }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={600}>{list.name}</Typography>
                <Button
                  size="small"
                  color="error"
                  onClick={() => dispatch(deleteListBoard(list.id))}
                >
                  ✕
                </Button>
              </Stack>

              <Typography variant="body2" color="text.secondary" mt={1}>
                <Cards listId={list.id} />
              </Typography>
            </CardContent>
          </Card>
        ))}

        {/* Add List */}
        <div className="w-[280px]">
          {!showInput ? (
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setShowInput(true)}
            >
              Add another list
            </Button>
          ) : (
            <Card>
              <CardContent>
                <Input
                  placeholder="Enter list title"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  autoFocus
                />

                <Stack direction="row" spacing={1} mt={2}>
                  <Button
                    variant="contained"
                    onClick={handleCreateList}
                    disabled={!listName.trim() || loading}
                  >
                    Add List
                  </Button>
                  <Button
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      setShowInput(false);
                      setListName("");
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default BoardLists;
