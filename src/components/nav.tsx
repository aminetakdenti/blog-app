import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import SignedInPart from "./SignedInPart";
import SignedOutPart from "./SignedOutPart";

function Nav() {
  return (
    <header className="sticky top-0 left-0 right-0 backdrop-blur-2xl shadow-sm shadow-slate-500">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link to="/">
              <h1 className="flex-1 font-logo jacquard-24-regular">My Blog</h1>
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <ModeToggle />
            <SignedInPart />
            <SignedOutPart />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Nav;
