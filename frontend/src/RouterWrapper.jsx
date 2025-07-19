import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import BookPage from "./pages/BookPage";

export default function RouterWrapper() {
  const routes = [
    { path: "/", element: <LandingPage /> },
    {
      path: "/search",
      element: <SearchPage />,
    },
    {
      path: "/books/:id",
      element: <BookPage />,
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
