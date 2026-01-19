import React, { useContext, useState } from "react";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "antd";
import { BoardContext } from "../../context/BoardProvider";
import { Link, useNavigate } from "react-router-dom";

const { TextArea } = Input;

const HomePage = () => {
  const [displayBoard, setDisplayBoard] = useState(false);
  const [boardName, setBoardName] = useState("");

  const { createBoard, loading, storeBoard } = useContext(BoardContext);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!boardName.trim()) return;

    try {
      const board = await createBoard(boardName);
      setBoardName("");
      setDisplayBoard(false);
      navigate(`/boards/${board.id}`);
    } catch (error) {
      console.error("Board creation failed", error);
    }
  };

  return (
    <>
      {/* Create Board Section */}
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <div className="flex flex-col">
          {!displayBoard ? (
            <Card sx={{ width: 360 }}>
              <CardContent className="flex flex-col items-center gap-4">
                <Typography variant="h6" fontWeight={600}>
                  Create a new board
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setDisplayBoard(true)}
                >
                  Create Board
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ width: 460 }}>
              <CardContent className="flex flex-col gap-4">
                <Typography variant="h6" fontWeight={600}>
                  Board title
                </Typography>

                <TextArea
                  placeholder="Enter a new board"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  autoFocus
                />

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled={!boardName.trim() || loading}
                    onClick={handleCreate}
                  >
                    {loading ? "Creating..." : "Create"}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      setDisplayBoard(false);
                      setBoardName("");
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Boards Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        {storeBoard.map((board) => (
          <Link
            key={board.id}
            to={`/boards/${board.id}`}
            className="block"
            style={{ textDecoration: "none" }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              sx={{
                height: 120,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0c66e4, #1d7af3)",
                color: "white",
              }}
            >
              <CardContent className="h-full flex items-start">
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {board.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
