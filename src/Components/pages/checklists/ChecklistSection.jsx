import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChecklists,
  addChecklist,
  removeChecklist,
} from "../../../Redux/checklists/checkListThunk";
import CheckItemSection from "../checkItem/CheckItemSection";

const ChecklistSection = ({ cardId }) => {
  const dispatch = useDispatch();
  const { byCardId, loading } = useSelector((state) => state.checklists);

  const checklists = byCardId[cardId] || [];
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    dispatch(fetchChecklists(cardId));
  }, [dispatch, cardId]);

  const handleAddChecklist = () => {
    if (!title.trim()) return;
    dispatch(addChecklist({ cardId, name: title }));
    setTitle("");
    setShowInput(false);
  };

  return (
    <div className="space-y-4 mt-4">
      {checklists.map((list) => (
        <div key={list.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-base">{list.name}</h4>
            <button
              onClick={() =>
                dispatch(removeChecklist({ checklistId: list.id, cardId }))
              }
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>

          <CheckItemSection checklistId={list.id} />
        </div>
      ))}

      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="text-sm text-gray-600 hover:text-black"
        >
          + Add an item
        </button>
      ) : (
        <div className="space-y-2 mt-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Checklist title"
            className="w-full border p-2 rounded"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddChecklist}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-1.5 rounded"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowInput(false);
                setTitle("");
              }}
              className="text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistSection;
