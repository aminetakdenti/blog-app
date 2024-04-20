import { Route, Routes } from "react-router-dom";
import Layout from "@/_layout";
import Home from "@/pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
