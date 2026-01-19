import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { BoardContext } from "../../../context/BoardProvider";
import { Checkbox } from "antd";
import AddCheckList from "../Checklist/AddCheckList";

const FullCard = ({ setIsCardOpen }) => {
  const { showCard } = useContext(BoardContext);

  if (!showCard) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setIsCardOpen(false)}
      />

      {/* Modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[700px] max-w-[95%]">
        <Card sx={{ borderRadius: 3 }}>
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Checkbox />
                <Typography variant="h4" fontWeight={600}>
                  {showCard.name || "Untitled Card"}
                </Typography>
              </div>

              <IconButton onClick={() => setIsCardOpen(false)}>
                <RxCross2 />
              </IconButton>
            </div>

            {/* Description */}
            <div>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Description
              </Typography>

              <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-200">
                Add a more detailed description…
              </div>
            </div>

            {/* Actions */}
            <div>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Actions
              </Typography>

              <div className="flex flex-wrap gap-2">
                <AddCheckList
                  cardId={showCard.id}
                  checlistId={showCard.idChecklists}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FullCard;
