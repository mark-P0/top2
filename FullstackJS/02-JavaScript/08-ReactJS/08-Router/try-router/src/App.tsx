import { BrowserRouter, Routes, Route } from "react-router-dom";
import routeTreeFn from "./routes";

export default function App() {
  const trees = Object.entries(routeTreeFn).map(([path, RouteTree], idx) => (
    <Route key={idx} path={path} element={<RouteTree />} />
  ));

  return (
    <BrowserRouter>
      <Routes>{trees}</Routes>
    </BrowserRouter>
  );
}
