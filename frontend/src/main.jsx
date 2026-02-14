import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./routes/LogInPage.jsx";
import HomePage from "./routes/HomePage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    //element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LogInPage />,
      },
      {
        path: "/HomePage",
        element: <HomePage />,
      },
      //{
      //  path: "/notes",
      //  element: <Homepage />,
      //},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
