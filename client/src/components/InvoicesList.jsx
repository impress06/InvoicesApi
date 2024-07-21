import { useEffect, useState } from "react";
import { useAuthApiCall } from "../service/useApiCall";
import { useSelector } from "react-redux";
import InvoicesTable from "./InvoicesTable";

const InvoicesList = () => {
  const { listInvoices } = useAuthApiCall();
  const [invoice, setInvoices] = useState([]);
  useEffect(() => {
    listInvoices();
  }, []);
  const { bill } = useSelector((state) => state.bill);

  return (
    <>
      <div>InvoicesList</div>
      <InvoicesTable />
    </>
  );
};

export default InvoicesList;
