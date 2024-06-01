import { Outlet } from "react-router-dom";
// import Navbar from "@/components/Navbar";
import Nav from "@/components/nav";

export default function _layout() {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      <Nav />
      <div className="container lg:px-24 mx-auto py-4 flex flex-col gap-5 md:w-[1000px]">
        <Outlet />
      </div>
    </div>
  );
}
