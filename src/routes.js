import { Switch, Route } from "react-router-dom";

import App from "./pages/App";
import Details from "./pages/Details";

export const MAIN_ROUTE = "MAIN_ROUTE";
export const PEOPLE_DETAILS_ROUTE = "PEOPLE_DETAILS_ROUTE";

export const routes = [
  {
    id: MAIN_ROUTE,
    path: "/",
    exact: true,
    component: App,
  },
  {
    id: PEOPLE_DETAILS_ROUTE,
    path: "/people/:id",
    exact: true,
    component: Details,
  },
];

export const getRouteConfig = (id) => {
  const route = routes.find((route) => route.id === id);

  if (route) {
    const { component, ...rest } = route;

    return rest;
  }
};

function Routes() {
  return (
    <Switch>
      {routes.map((route) => {
        const { id, ...rest } = route;
        return <Route key={id} {...rest} />;
      })}
    </Switch>
  );
}

export default Routes;
