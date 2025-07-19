import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import BookPage from "./pages/BookPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import MyLibraryPage from "./pages/MyLibraryPage";

export default function RouterWrapper() {
  const routes = [
    { path: "*", element: <ErrorPage /> },
    { path: "/", element: <LandingPage /> },
    { path: "/sign-up", element: <SignUpPage /> },
    { path: "/log-in", element: <LogInPage /> },
    {
      path: "/search",
      element: <SearchPage />,
    },
    {
      path: "/library/:filter?",
      element: <MyLibraryPage />,
    },
    {
      path: "/books/:id",
      element: <BookPage />,
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
