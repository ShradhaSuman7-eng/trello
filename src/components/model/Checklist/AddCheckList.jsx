import React, { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { createChecklist } from "../../../services/checkList/addCheckList";
import { BoardContext } from "../../../context/BoardProvider";
import { getAllCheckLists } from "../../../services/checkList/getAllCheckList";
import CheckListModel from "./CheckListModel";

const AddCheckList = ({ cardId }) => {
  const [ischeckListOpen, setIsCheckListOpen] = useState(false);
  const [checkListVal, setCheckListVal] = useState(null);
  const { checkLists, setCheckLists } = useContext(BoardContext);

  const fetchAllCheckLists = async () => {
    try {
      const data = await getAllCheckLists(cardId);
      setCheckLists(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCheckList = async () => {
    try {
      if (!checkListVal.trim()) return;

      const response = await createChecklist(cardId, checkListVal);
      setCheckLists((prev) => [...prev, response]);
      setCheckListVal("");
      setIsCheckListOpen(false);
      fetchAllCheckLists();
    } catch (error) {
      console.error("error occurred", error);
    }
  };

  useEffect(() => {
    if (!cardId) return;
    fetchAllCheckLists();
  }, [cardId]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outlined">Members</Button>
        <Button variant="outlined">Labels</Button>
        <Button variant="outlined" onClick={() => setIsCheckListOpen(true)}>
          Checklist
        </Button>
        <Button variant="outlined">Dates</Button>
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </div>

      {ischeckListOpen && (
        <div className="shadow-2xl px-8 py-3 flex flex-col w-[250px]">
          <TextField
            size="small"
            placeholder="Enter Checklist"
            value={checkListVal}
            onChange={(e) => setCheckListVal(e.target.value)}
            autoFocus
          />

          <div className="flex justify-center gap-2 mt-2">
            <Button onClick={handleAddCheckList}>Add</Button>
            <Button
              onClick={() => {
                setIsCheckListOpen(false);
                setCheckListVal("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {checkLists.length > 0 && <CheckListModel />}
    </div>
  );
};

export default AddCheckList;
