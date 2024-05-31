import { ThemeProvider } from "@/providers/themeProvider";
import Routes from "@/Routes";
import { useStoreUserEffect } from "./hooks/useUserAuth";

function App() {
  useStoreUserEffect();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes />
    </ThemeProvider>
  );
}

export default App;
