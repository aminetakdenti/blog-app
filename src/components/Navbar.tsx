import { FilePlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function navbar() {
  return (
    <nav className="flex items-center w-full justify-between">
      <Link to="/">
        <h1 className="flex-1 font-logo jacquard-24-regular">My Blog</h1>
      </Link>
      <Link to="/upload">
        <FilePlus size={50} />
      </Link>
    </nav>
  );
}
