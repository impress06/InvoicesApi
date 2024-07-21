import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgatForm from "../pages/loginSignUp/ForgotPassword";
import NotFound404 from "../pages/NotFound";
import PrivateRouter from "../routers/PrivateRouter";
import Involves from "../pages/Involves";
import Customers from "../pages/Customers";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import InvoicesList from "../components/InvoicesList";
import EditBill from "../components/EditBill";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ForgatForm />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound404 />} />
        <Route path="/stock" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="involves" element={<Involves />} />
            <Route path="listInvoives" element={<InvoicesList />} />
            <Route path="fixInvoives" element={<EditBill />} />
            <Route path="customer" element={<Customers />} exact />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
