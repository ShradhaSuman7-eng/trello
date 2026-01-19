import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCheckItem } from "../../../Redux/checkItems/checkItemThunk";
const CheckItemModel = ({ checklistId, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.checkItems);

  const [itemName, setItemName] = useState("");

  const handleAddItem = () => {
    if (!itemName.trim()) return;
    dispatch(addCheckItem({ checklistId, name: itemName }));
    setItemName("");
    onClose();
  };

  return (
    <div className="mt-3 bg-white shadow-md rounded-md p-3 w-full">
      <TextField
        size="small"
        fullWidth
        placeholder="Add an item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        autoFocus
      />

      <div className="flex justify-end gap-2 mt-2">
        <Button
          variant="contained"
          size="small"
          onClick={handleAddItem}
          disabled={loading}
        >
          Add
        </Button>
        <Button variant="text" size="small" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CheckItemModel;
