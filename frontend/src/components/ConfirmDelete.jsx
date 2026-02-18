const ConfirmDelete = ({ onConfirm, onCancel }) => {
  return (
    <div className="bg-white border-2 border-solid blue-border w-80 h-44 absolute top-40 left-[38%] z-20">
      <div className="p-6 flex flex-col gap-4">
        <h1>Are you sure?</h1>
        <p>This action cannot be undone</p>
      </div>

      <div className="flex flex-row gap-6 absolute bottom-2 left-4">
        <button className="text-center bg-red-500 w-32" onClick={onConfirm}>
          Yes, delete
        </button>
        <button className="text-center w-32 blue-background" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
