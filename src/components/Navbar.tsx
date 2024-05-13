import { PencilLine } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function navbar() {
  return (
    <nav className="sticky backdrop-blur-2xl top-0 left-0 right-0 z-50 border-b container">
      <div className="flex items-center w-full justify-between ">
        <Link to="/">
          <h1 className="flex-1 font-logo jacquard-24-regular">My Blog</h1>
        </Link>
        <Link to="/upload">
          <Button variant="outline">
            <PencilLine className="mr-2 h-4 w-4" />
            write
          </Button>
        </Link>
      </div>
    </nav>
  );
}
