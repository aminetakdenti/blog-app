import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  layout("./routes/layout.tsx", [
    index("./routes/home/index.tsx"),
    route("/upload", "./routes/upload/index.tsx"),
    route("/blog/:id", "./routes/blog/index.tsx"),
    route("/user/:id", "./routes/user/index.tsx"),
    route("*?", "./routes/404/index.tsx"),
  ]),
] satisfies RouteConfig;
