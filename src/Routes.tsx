import Layout from "@/pages/_layout";
import BlogPage from "@/pages/blog";
import Home from "@/pages/home";
import Upload from "@/pages/upload";
import User from "@/pages/user";
import { SignedIn } from "@clerk/clerk-react";
import { Route, Routes as Router } from "react-router-dom";
import NotFound from "./pages/404";

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
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/user/:id" element={<User />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Router>
  );
}

export default Routes;
