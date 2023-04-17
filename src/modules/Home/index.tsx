import { Button, Card, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import "./home.scss";
import CustomTable from "sharedComponents/CustomTable";
import CSRForm from "modules/CSR";
import { useState } from "react";
const Home = () => {
  const [openCsrModal, setOpenCsrModal] = useState(false);
  const toggleCsrModal = () => setOpenCsrModal((p) => !p);

  return (
    <div className="h-1000">
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <h2 className="text-primary">Home</h2>
          <Button onClick={toggleCsrModal}>Create CSR</Button>
        </Card.Header>
        <Card.Body>
          <CustomTable />
        </Card.Body>
      </Card>
      <Modal size="lg" show={openCsrModal} onHide={toggleCsrModal}>
        <ModalHeader>Create CSR</ModalHeader>
        <ModalBody>
          <CSRForm />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Home;
