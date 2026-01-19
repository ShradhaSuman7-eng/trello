import React, { useContext, useState } from "react";
import { BoardContext } from "../../../context/BoardProvider";
import { deleteChecklist } from "../../../services/checkList/deleteCheckList";
import { addCheckItem } from "../../../services/items/addCheckItems";
import { deleteCheckItem } from "../../../services/items/deleteCheckItem";
import { Input, Button } from "antd";
import { RxCross2 } from "react-icons/rx";
import CheckItemModel from "../CheckItems/CheckItemModel";

const CheckListModel = () => {
  const { checkLists, setCheckLists } = useContext(BoardContext);

  const [activeChecklistId, setActiveChecklistId] = useState(null);
  const [itemName, setItemName] = useState("");

  const handleDeleteCheckList = async (checkListId) => {
    try {
      await deleteChecklist(checkListId);
      setCheckLists((prev) => prev.filter((c) => c.id !== checkListId));
    } catch (error) {
      console.error("Failed to delete checklist", error);
    }
  };

  const handleAddCheckItems = async (checkListId) => {
    if (!itemName.trim()) return;

    try {
      const newItem = await addCheckItem(checkListId, itemName);

      setCheckLists((prev) =>
        prev.map((cl) =>
          cl.id === checkListId
            ? { ...cl, checkItems: [...(cl.checkItems || []), newItem] }
            : cl
        )
      );

      setItemName("");
      setActiveChecklistId(null);
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  const handleDeleteCheckItem = async (checkListId, itemId) => {
    try {
      await deleteCheckItem(checkListId, itemId);

      setCheckLists((prev) =>
        prev.map((cl) =>
          cl.id === checkListId
            ? {
                ...cl,
                checkItems: cl.checkItems.filter((item) => item.id !== itemId),
              }
            : cl
        )
      );
    } catch (error) {
      console.error("Failed to delete check item", error);
    }
  };

  const getProgress = (items = []) => {
    if (!items.length) return 0;
    const completed = items.filter((i) => i.state === "complete").length;
    return Math.round((completed / items.length) * 100);
  };

  return (
    <div className="space-y-5 mt-4">
      {checkLists.map((checklist) => {
        const progress = getProgress(checklist.checkItems);

        return (
          <div key={checklist.id} className="bg-gray-50 p-4 rounded-md">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-base">{checklist.name}</h3>
              <RxCross2
                className="cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => handleDeleteCheckList(checklist.id)}
              />
            </div>

            {/* Progress */}
            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-1">{progress}%</div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-green-500 rounded transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="mt-3 space-y-2">
              {checklist.checkItems?.map((item) => (
                <CheckItemModel
                  key={item.id}
                  item={item}
                  onDelete={(itemId) =>
                    handleDeleteCheckItem(checklist.id, itemId)
                  }
                />
              ))}
            </div>

            {/* Add Item */}
            {activeChecklistId === checklist.id ? (
              <div className="mt-3 space-y-2">
                <Input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Add an item"
                />
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    onClick={() => handleAddCheckItems(checklist.id)}
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setActiveChecklistId(null);
                      setItemName("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <button
                className="mt-3 text-sm text-gray-600 hover:text-black"
                onClick={() => setActiveChecklistId(checklist.id)}
              >
                + Add an item
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckListModel;
