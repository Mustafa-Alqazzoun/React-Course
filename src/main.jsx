import { Profiler, StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateProduct from "./pages/CreateProduct.jsx";
import SignIn from "./pages/Signin.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import UserProvider from "./Provider/UserProvider.jsx";
import { Provider } from 'react-redux'
import { store } from "./store/store.js";
import Cart from "../src/pages/Cart.jsx"
import ProtectedDashboard from "./HOC/ProtectedDashboard.js";
import CircularProgress from '@mui/material/CircularProgress';
const SignUp = lazy(() => import("./pages/Signup.jsx"));
const ProductDetailsLazyLoading = lazy(() => import("./pages/ProductDetails.jsx"))
//lazy loading vs eager loading
const onRenderCallback = (
  id, // the "id" prop of the Profiler tree
  phase, // "mount" or "update"
  actualDuration, // time spent rendering
  baseDuration, // estimated time without memoization
  startTime,
  commitTime,
  interactions
) => {
  console.log(`[Profiler: ${id}]`);
  console.log('Phase:', phase);
  console.log('Actual render time:', actualDuration);
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <UserProvider> */}
<Provider store={store}>
 
  <Profiler id="app" onRender={onRenderCallback}>
  <Suspense fallback={<CircularProgress />}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
       <Route path="/products" element={<ProtectedDashboard />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/items/:id" element={<ProductDetailsLazyLoading />} />
        <Route path="/cart" element={<Cart />} />
        {/* nested routes */}
        <Route path="user">
          <Route index element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </UserProvider> */}
    </Suspense>
    </Profiler>
    
    </Provider>
  </StrictMode>
);
