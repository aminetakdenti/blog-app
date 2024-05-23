import { SignInButton, SignedOut } from "@clerk/clerk-react";

export default function SignedOutPart() {
  return (
    <SignedOut>
      <SignInButton />
    </SignedOut>
  );
}
