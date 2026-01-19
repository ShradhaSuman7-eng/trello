import React from "react";
import { Checkbox } from "@mui/material";
import { Button } from "antd";
import { RxCross2 } from "react-icons/rx";

const CheckItemModel = ({ item, onDelete, onToggle }) => {
  // Determine if the checkbox should be checked based on item.state
  const isChecked = item.state === "complete";

  return (
    <div className="flex w-full justify-between group">
      <div className="flex w-full items-center gap-2">
        <Checkbox
          checked={isChecked}
          onChange={() => onToggle(item.id, isChecked)}
        />

        <span
          className={`text-sm ${isChecked ? "line-through text-gray-400" : ""}`}
        >
          {item.name}
        </span>

        <Button
          size="small"
          className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
          onClick={() => onDelete(item.id)}
        >
          <RxCross2 />
        </Button>
      </div>
    </div>
  );
};

export default CheckItemModel;
