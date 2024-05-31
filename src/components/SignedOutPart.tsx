import { SignInButton } from "@clerk/clerk-react";
import { Unauthenticated } from "convex/react";

export default function SignedOutPart() {
  return (
    <Unauthenticated>
      <SignInButton />
    </Unauthenticated>
  );
}
