import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/signin";
import RootLayout from "./Rootlayout/RootLayout";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<Signin />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
