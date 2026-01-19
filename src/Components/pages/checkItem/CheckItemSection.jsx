import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCheckItems,
  removeCheckItem,
} from "../../../Redux/checkItems/checkItemThunk";
import CheckItemModel from "./CheckItemModel";

const CheckItemSection = ({ checklistId }) => {
  const dispatch = useDispatch();
  const { byChecklistId } = useSelector((state) => state.checkItems);

  const checkItems = byChecklistId[checklistId] || [];
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    dispatch(fetchCheckItems(checklistId));
  }, [dispatch, checklistId]);

  return (
    <div className="mt-3">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">Items</h4>

      <div className="space-y-2">
        {checkItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.state === "complete"}
                readOnly
                className="accent-green-500"
              />
              <span
                className={`text-sm ${
                  item.state === "complete"
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {item.name}
              </span>
            </label>

            <button
              className="text-gray-400 hover:text-red-500"
              onClick={() =>
                dispatch(
                  removeCheckItem({
                    checklistId,
                    checkItemId: item.id,
                  }),
                )
              }
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add item */}
      {!showInput ? (
        <button
          className="mt-3 text-sm text-gray-600 hover:text-black"
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
