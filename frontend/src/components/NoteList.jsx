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
    if (updatedNote.deleted) {
      setNotes((prev) => prev.filter((note) => note.id !== updatedNote.id));
    } else {
      setNotes((prev) =>
        prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)),
      );
    }
  }

  function handleDelete(deletedId) {
    setNotes((prev) => prev.filter((note) => note.id !== deletedId));
  }

  return (
    <div className="flex flex-col lg:flex-row flex-wrap gap-8 mt-40 ">
      {notes.map((note) => (
        <div
          key={note.id}
          className="my-2 min-w-60 w-[80vw] sm:w-[60vw] lg:w-[20vw] h-[24vh] p-6 border border-solid blue-border hover:shadow-lg "
          onClick={() => setSelectedNote(note)}
          ref={formRef}
        >
          <h2 className="text-base  xl:text-xl mb-2">{note.title}</h2>
          <p className="h-fit text-wrap w-full break-words text-gray-700 text-sm">
            {expanded
              ? note.content
              : note.content?.length > previewLength
                ? note.content?.substring(0, previewLength) + "..."
                : note.content}
          </p>
        </div>
      ))}
      {selectedNote && (
        <NoteEditor
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default NoteList;
