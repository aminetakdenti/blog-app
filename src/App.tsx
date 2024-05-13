import { Route, Routes } from "react-router-dom";
import Layout from "@/pages/_layout";
import Home from "@/pages/home";
import Upload from "@/pages/upload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Route>
    </Routes>
  );
}

export default App;
