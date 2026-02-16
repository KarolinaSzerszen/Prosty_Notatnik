import logoBlack from "../assets/logo-black.png";

const Navbar = () => {
  return (
    <div className="border-2 border-solid blue-border h-14 absolute w-full top-0 flex flex-row ">
      <img src={logoBlack} alt="post it note icon" className="h-8 m-2 ml-10" />
      <h2 className="text-center self-center">NoteBox</h2>
    </div>
  );
};

export default Navbar;
