import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import NoteEditor from "./NoteEditor.jsx";

const NoteList = ({ notes, setNotes }) => {
  const [expanded, setExpanded] = useState(false);

  const previewLength = 80;
  const [selectedNote, setSelectedNote] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleUpdate(updatedNote) {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)),
    );
  }

  return (
    <div className="flex flex-row flex-wrap gap-8 mt-40 ml-[6%]">
      {notes.map((note) => (
        <div
          key={note.id}
          className="border my-2 min-w-60 w-[20vw] h-[22vh] p-6 "
          onClick={() => setSelectedNote(note)}
          ref={formRef}
        >
          <h3>{note.title}</h3>
          <p className="h-fit text-wrap w-full break-words ">
            {expanded
              ? note.content
              : note.content.length > previewLength
                ? note.content.substring(0, previewLength) + "..."
                : note.content}
          </p>
        </div>
      ))}
      {selectedNote && (
        <NoteEditor
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default NoteList;
