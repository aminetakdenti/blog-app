import { ThemeProvider } from "@/providers/themeProvider";
import Routes from "@/Routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes />
    </ThemeProvider>
  );
}

export default App;
