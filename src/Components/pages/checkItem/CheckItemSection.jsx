import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCheckItems,
  removeCheckItem,
} from "../../../Redux/checkItems/checkItemThunk";
import CheckItemModel from "./CheckItemModel";

const CheckItemSection = ({ checklistId }) => {
  const dispatch = useDispatch();
  const { byChecklistId, loading } = useSelector((state) => state.checkItems);

  const checkItems = byChecklistId[checklistId] || [];
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    dispatch(fetchCheckItems(checklistId));
  }, [dispatch, checklistId]);

  return (
    <div className="mt-2">
      <h4 className="font-semibold mb-2">Items</h4>

      {checkItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-gray-50 p-2 rounded mb-1"
        >
          <div>
            <input
              type="checkbox"
              checked={item.state === "complete"}
              readOnly
              className="mr-2"
            />
            <span
              className={
                item.state === "complete" ? "line-through text-gray-400" : ""
              }
            >
              {item.name}
            </span>
          </div>

          <button
            className="text-red-500 hover:text-red-700"
            onClick={() =>
              dispatch(removeCheckItem({ checklistId, checkItemId: item.id }))
            }
          >
            ✕
          </button>
        </div>
      ))}

      {/* Add new checkItem */}
      {!showInput ? (
        <button
          className="text-sm text-gray-600 hover:bg-gray-200 p-1 rounded mt-2 w-full text-left"
          onClick={() => setShowInput(true)}
        >
          + Add an item
        </button>
      ) : (
        <CheckItemModel
          checklistId={checklistId}
          onClose={() => setShowInput(false)}
        />
      )}
    </div>
  );
};

export default CheckItemSection;
