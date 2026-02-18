import NoteInput from "../components/NoteInput";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NoteList from "../components/NoteList";
import axios from "axios";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [notes, setNotes] = useState([]);
  const { token } = useAuth();

  async function handlePostIt(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/notes/add/",
        { title, content: noteContent },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNotes((prev) => [res.data, ...prev]);
      setTitle("");
      setNoteContent("");
    } catch (err) {
      console.error(err);
    }
  }

  async function onSubmit(e) {
    await handlePostIt(e);
    setIsActive(false);
  }
  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/notes/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    if (token) fetchNotes();
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center mt-28 h-fit ">
      <Navbar />
      <NoteInput
        title={title}
        setTitle={setTitle}
        noteContent={noteContent}
        setNoteContent={setNoteContent}
        handlePostIt={onSubmit}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <NoteList notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default HomePage;
