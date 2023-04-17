import { Button, Card, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import "./home.scss";
import CustomTable from "sharedComponents/CustomTable";
import CSRForm from "modules/CSR";
import { useState } from "react";
import { getLocalStorageData } from "utils/loalStorageUtils";
import { useGetAllCertificates } from "customHooks/certificate.hooks";

const columns = [
  { field: "subject" },
  { field: "issuer" },
  { field: "not_valid_before" },
  { field: "not_valid_after" },
  { field: "serial_number" },
  { field: "signature_hash_algorithm" },
  { field: "version" },
];

const Home = () => {
  const [openCsrModal, setOpenCsrModal] = useState(false);
  const toggleCsrModal = () => setOpenCsrModal((p) => !p);

  const user = getLocalStorageData("user");

  const { data } = useGetAllCertificates(user.id);
  console.log({ data });
  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <h2 className="text-primary">Certificates</h2>
          <Button onClick={toggleCsrModal}>Create CSR</Button>
        </Card.Header>
        <Card.Body>
          <CustomTable columns={columns} data={data} />
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
