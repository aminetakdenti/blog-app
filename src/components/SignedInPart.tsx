import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { PencilLine } from "lucide-react";

export default function SignedPart() {
  return (
    <SignedIn>
      <div className="flex flex-row gap-4">
        <Link to="/upload">
          <Button
            variant="outline"
            className="hidden md:flex items-center justify-center gap-2"
          >
            <PencilLine className="h-4 w-4" />
            <p className="hidden md:block">write</p>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="flex items-center justify-center md:hidden"
          >
            <PencilLine className="h-4 w-4" />
          </Button>
        </Link>
        <UserButton />
      </div>
    </SignedIn>
  );
}
