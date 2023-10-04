import { Path } from "./paths.js";
import Home from "./Home.js";
import Profile from "./Profile.js";
import About from "./About.js";

const routeTreeFn: { [path in Path]: () => JSX.Element } = {
  "/": Home,
  "/profile": Profile,
  "/about": About,
};
export default routeTreeFn;
