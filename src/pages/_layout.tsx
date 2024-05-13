import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function _layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container lg:px-24 mx-auto py-4 flex flex-col gap-5">
        <Outlet />
      </div>
    </div>
  );
}