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
    <div className="flex flex-col mt-2 gap-2">
      <TextField
        size="small"
        placeholder="Enter item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        autoFocus
      />

      <div className="flex gap-2 justify-end">
        <Button
          variant="contained"
          size="small"
          onClick={handleAddItem}
          disabled={loading}
        >
          Add
        </Button>
        <Button variant="outlined" size="small" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CheckItemModel;
