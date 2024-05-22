import { ThemeProvider } from "@/providers/themeProvider";
import Routes from "@/Routes";
import { useUser } from "@clerk/clerk-react";

function App() {
  const user = useUser();
  console.log(user.user);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes />
    </ThemeProvider>
  );
}

export default App;
