import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

export default function RouterWrapper() {
  const routes = [{ path: "/", element: <LandingPage /> }];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
