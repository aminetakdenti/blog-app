import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useStoreUserEffect } from "../hooks/useUserAuth";

function App() {
  const { isLoading, isAuthenticated } = useStoreUserEffect();
  return (
    <main>
      {isLoading && "Loading..."}
      {!isAuthenticated && <SignInButton />}
      {isAuthenticated && (
        <>
          <UserButton />
          <Content />
        </>
      )}
    </main>
  );
}

function Content() {
  const messages = useQuery(api.blog.list);
  return <div>Authenticated content: {messages?.length}</div>;
}

export default App;
