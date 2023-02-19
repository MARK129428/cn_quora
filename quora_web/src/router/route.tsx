import { RouteConfig } from "react-router-config"

import Home from "@page/Home"
import About from "@page/About"

const routes: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    component: About
  },
]

export default routes