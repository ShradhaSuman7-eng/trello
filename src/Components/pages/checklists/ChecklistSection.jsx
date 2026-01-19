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
    <div>
      <h3 className="font-semibold text-lg mb-3">Checklist</h3>

      {/* Render each checklist */}
      {checklists.map((list) => (
        <div key={list.id} className="bg-white rounded-md p-4 mb-4 shadow">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{list.name}</h4>
            <button
              onClick={() =>
                dispatch(removeChecklist({ checklistId: list.id, cardId }))
              }
              className="text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
          </div>

          {/* Render items inside checklist */}
          <CheckItemSection checklistId={list.id} />
        </div>
      ))}

      {/* Add Checklist Input */}
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="text-sm text-gray-600 hover:bg-gray-200 p-2 rounded w-full text-left"
        >
          + Add a checklist
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
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistSection;
