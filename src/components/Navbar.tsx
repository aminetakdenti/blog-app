import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import SignedInPart from "./SignedInPart";
import SignedOutPart from "./SignedOutPart";

export default function navbar() {
  return (
    <nav className="sticky container backdrop-blur-2xl top-0 left-0 right-0 z-50 shadow shadow-slate-800">
      <div className="flex items-center w-full justify-between ">
        <Link to="/">
          <h1 className="flex-1 font-logo jacquard-24-regular">My Blog</h1>
        </Link>
        <div className="flex gap-4">
          <ModeToggle />
          <SignedInPart />
          <SignedOutPart />
        </div>
        <div className="hidden gap-4 ">
          <div className=" flex flex-col bg-white dark:bg-slate-900 h-fit mt-1 p-2 rounded-lg border-2 absolute top-full left-0 right-0 mx-8 gap-4">
            <ModeToggle />
            <SignedInPart />
            <SignedOutPart />
          </div>
        </div>
      </div>
    </nav>
  );
}
