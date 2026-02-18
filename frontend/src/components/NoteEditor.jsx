import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import cross from "../assets/cross.png";
import deleteBlack from "../assets/delete-black.png";
import ConfirmDelete from "./ConfirmDelete";

const NoteEditor = ({ note, onClose, onUpdate, onDelete }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(false);

  async function handleSave() {
    try {
      setSaving(true);
      const res = await axios.put(
        `http://127.0.0.1:8000/api/notes/${note.id}/`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      onUpdate(res.data);
      setSaving(false);
      onClose();
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/notes/${note.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate({ id: note.id, delete: true });
      onClose();
      onDelete(note.id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-[60vh] h-fit  border-2 border-solid blue-border bg-white absolute lg:left-[25%] top-[12%]  w-[80vw]  sm:w-[60vw] lg:w-[50vw]">
      <div className="flex  flex-row justify-around mt-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
          <p>Created: {new Date(note.created_at).toLocaleString()}</p>
          {note.updated_at && (
            <p>Edited: {new Date(note.updated_at).toLocaleString()} </p>
          )}
        </div>
        <button onClick={onClose}>
          <img src={cross} className="h-4" />
        </button>
      </div>
      <div className="flex flex-col m-4 gap-4">
        <input
          type="text"
          value={title}
          onChange={(e_) => setTitle(e_.target.value)}
          className="m-4 h-8 mt-4 border-b-2 border-solid blue-border pl-3"
        />
        <textarea
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="m-4 h-[46vh] resize-none p-3 border border-solid blue-border"
        />
      </div>
      <div className="flex flex-col justify-end mh-[90%]">
        <button
          className="w-[40%]  self-center blue-background text-white font-semibold h-8 mb-6 "
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>

        <div className=" absolute right-10 bottom-8">
          <img
            src={deleteBlack}
            alt="delete"
            className="h-4"
            onClick={() => setToDelete(true)}
          />
        </div>
      </div>
      {toDelete && (
        <ConfirmDelete
          top="top-[13vh]"
          left="left-[32%]"
          onConfirm={handleDelete}
          onCancel={() => setToDelete(false)}
        />
      )}
    </div>
  );
};

export default NoteEditor;
