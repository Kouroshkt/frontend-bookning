import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/signin";
import RootLayout from "./Rootlayout/RootLayout";
import CreateAccount from "./pages/CreateAccount";
import { CarInfo } from "./pages/CarInfo";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<Signin />} />
        <Route path="carinfo/:carId" element={<CarInfo />} />
        <Route path="createaccount" element={<CreateAccount />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
