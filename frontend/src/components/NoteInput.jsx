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
          className="flex flex-col gap-6 border-2 border-solid blue-border h-[56vh] w-[80vw]  sm:w-[60vw] lg:w-[40vw]"
        >
          <input
            name="noteTitle"
            className="m-3 h-8 ml-3 border-b-2 border-solid blue-border pl-3 pb-1"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            autocomplete="off"
          />
          <textarea
            name="noteContent"
            className="m-4 h-40 resize-none border border-solid blue-border p-3"
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
          className=" border-2 border-solid blue-border h-[10vh]  w-[80vw]  sm:w-[60vw] lg:w-[40vw]"
        >
          <input
            name="noteTitle"
            className="m-2 ml-3 h-8  w-[94%] border-b-2 border-solid blue-border pl-3"
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
