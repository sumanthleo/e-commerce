import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/header/NavBar";
import Footer from "./components/footer copy/Footer";
import SinglePost from "./pages/singlePost/singlePost/SinglePost";
import Register from "./pages/signup/Register";
import FilterPage from "./pages/filterPage/FilterPage";
import Cart from "./pages/cartPage/Cart";
import SignIn from "./pages/login/SignIn";
import ShippingPage from "./pages/shipping/ShippingPage";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import PlaceOrder from "./pages/placeorder/PlaceOrder";
import OrderPage from "./pages/Order/OrderPage";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single/:id" element={<SinglePost />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/filter/:category" element={<FilterPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
