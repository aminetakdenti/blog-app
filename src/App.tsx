import Navbar from "./components/navbar";
import Blog from "./components/blog";
import { blogs } from "./constant";

function App() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-4 flex flex-col gap-5">
        <Navbar />
        <div className="flex flex-col gap-4 divide-y">
          {blogs.map((blog, index) => (
            <Blog key={index} title={blog.title} content={blog.content} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
