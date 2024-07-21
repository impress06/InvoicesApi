import "bootstrap/dist/css/bootstrap.min.css";
import "../components/invoice.css";
import Container from "react-bootstrap/Container";
import InvoiceForm from "../components/FormInvoices";

const Involves = () => {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <InvoiceForm />
      </Container>
    </div>
  );
};

export default Involves;
