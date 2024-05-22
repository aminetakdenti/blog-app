import { Routes as Router, Route } from "react-router-dom";
import Layout from "@/pages/_layout";
import Home from "@/pages/home";
import Upload from "@/pages/upload";
import { SignedIn } from "@clerk/clerk-react";

function Routes() {
  return (
    <Router>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/upload"
          element={
            <SignedIn>
              <Upload />
            </SignedIn>
          }
        />
      </Route>
    </Router>
  );
}

export default Routes;
