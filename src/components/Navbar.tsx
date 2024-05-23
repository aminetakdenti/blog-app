import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import SignedInPart from "./SignedInPart";
import SignedOutPart from "./SignedOutPart";

export default function navbar() {
  return (
    <nav className="sticky backdrop-blur-2xl top-0 left-0 right-0 z-50 border-b container">
      <div className="flex items-center w-full justify-between ">
        <Link to="/">
          <h1 className="flex-1 font-logo jacquard-24-regular">My Blog</h1>
        </Link>
        <div className="flex gap-4">
          <SignedInPart />
          <SignedOutPart />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
