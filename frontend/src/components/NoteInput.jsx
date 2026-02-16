import { useState, useRef, useEffect } from "react";

const NoteInput = ({
  title,
  setTitle,
  noteContent,
  setNoteContent,
  handlePostIt,
  isActive,
  setIsActive,
}) => {
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={formRef} className="absolute bg-white top-32">
      {isActive ? (
        <form
          onSubmit={handlePostIt}
          className="flex flex-col gap-6 border-2 border-solid blue-border h-[56vh] w-[40vw]  "
        >
          <input
            name="noteTitle"
            className="m-4 h-8 mt-4"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            name="noteContent"
            className="m-4 h-40 resize-none"
            placeholder="Note content"
            value={noteContent}
            type="text"
            onChange={(e) => setNoteContent(e.target.value)}
          />
          <button
            className="w-[40%]  self-center blue-background text-white font-semibold h-8 mb-10"
            type="submit"
          >
            Make a note
          </button>{" "}
        </form>
      ) : (
        <form
          onFocus={() => setIsActive(true)}
          className=" border-2 border-solid blue-border h-[10vh] w-[40vw] "
        >
          <input
            name="noteTitle"
            className="m-4 h-8 mt-4 w-[94%]"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </form>
      )}
    </div>
  );
};

export default NoteInput;
