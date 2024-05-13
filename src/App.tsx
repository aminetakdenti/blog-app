import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@/providers/themeProvider";
import Layout from "@/pages/_layout";
import Home from "@/pages/home";
import Upload from "@/pages/upload";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
