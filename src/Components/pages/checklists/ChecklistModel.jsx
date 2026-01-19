import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addChecklist } from "../../../Redux/checklists/checkListThunk";
import ChecklistSection from "./ChecklistSection";

const CheckListModel = ({ cardId }) => {
  const [isCheckListOpen, setIsCheckListOpen] = useState(false);
  const [checkListVal, setCheckListVal] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.checklists);

  const handleAddChecklist = () => {
    if (!checkListVal.trim()) return;
    dispatch(addChecklist({ cardId, name: checkListVal }));
    setCheckListVal("");
    setIsCheckListOpen(false);
  };

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

      {isCheckListOpen && (
        <div className="shadow-2xl px-8 py-3 flex flex-col w-[250px] mt-2 bg-white rounded">
          <TextField
            size="small"
            placeholder="Enter Checklist"
            value={checkListVal}
            onChange={(e) => setCheckListVal(e.target.value)}
            autoFocus
          />

          <div className="flex justify-center gap-2 mt-2">
            <Button onClick={handleAddChecklist}>Add</Button>
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

      <ChecklistSection cardId={cardId} />
    </div>
  );
};

export default CheckListModel;
