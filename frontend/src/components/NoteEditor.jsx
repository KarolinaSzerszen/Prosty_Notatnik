import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import cross from "../assets/cross.png";

const NoteEditor = ({ note, onClose, onUpdate }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [saving, setSaving] = useState(false);

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

  return (
    <div className="min-h-[60vh] h-fit w-[50vw] border-2 border-solid blue-border bg-white absolute left-[26%] top-[12%] ">
      <div className="flex flex-row justify-around mt-4">
        <p>Created: {new Date(note.created_at).toLocaleString()}</p>
        {note.updated_at && (
          <p>Edited: {new Date(note.updated_at).toLocaleString()} </p>
        )}
        <button onClick={onClose}>
          <img src={cross} className="h-4" />
        </button>
      </div>
      <div className="flex flex-col m-4 gap-4">
        <input
          type="text"
          value={title}
          onChange={(e_) => setTitle(e_.target.value)}
          className="m-4 h-8 mt-4 border-b-2 border-solid blue-border"
        />
        <textarea
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="m-4 h-[46vh] resize-none"
        />
      </div>
      <div className="flex flex-col justify-end mh-[90%]">
        <button
          className="w-[40%]  self-center blue-background text-white font-semibold h-8 mb-6"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
