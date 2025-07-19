import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";

export default function RouterWrapper() {
  const routes = [
    { path: "/", element: <LandingPage /> },
    {
      path: "/search",
      element: <SearchPage />,
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
