import { Route, Routes } from "react-router-dom";
import Layout from "@/_layout";
import Home from "@/pages/home";
import Upload from "@/pages/upload";
import { BlogContextProvider } from "@/BlogContext";

function App() {
  return (
    <BlogContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </BlogContextProvider>
  );
}

export default App;
