import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { PencilLine } from "lucide-react";

export default function SignedPart() {
  return (
    <SignedIn>
      <div className="flex gap-4">
        <Link to="/upload">
          <Button variant="outline">
            <PencilLine className="mr-2 h-4 w-4" />
            write
          </Button>
        </Link>
        <UserButton />
      </div>
    </SignedIn>
  );
}
