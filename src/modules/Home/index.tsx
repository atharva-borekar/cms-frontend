import { Button, Card, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import "./home.scss";
import CustomTable from "sharedComponents/CustomTable";
import CSRForm from "modules/CSR";
import { useState } from "react";
import { getLocalStorageData } from "utils/loalStorageUtils";
import {
  useAllCertificates,
  useExpiredCertificates,
  useNearExpiryCertificates,
} from "customHooks/certificate.hooks";

const columns = [
  { headerName: "Subject", field: "subject", tooltipField: "subject" },
  { headerName: "Issuer", field: "issuer", tooltipField: "issuer" },
  {
    headerName: "Not Valid Before",
    field: "not_valid_before",
    tooltipField: "not_valid_before",
  },
  {
    headerName: "Not Valid After",
    field: "not_valid_after",
    tooltipField: "not_valid_after",
  },
  {
    headerName: "Serial Number",
    field: "serial_number",
    tooltipField: "serial_number",
  },
  {
    headerName: "Signature Hash Algorithm",
    field: "signature_hash_algorithm",
    tooltipField: "signature_hash_algorithm",
  },
  { headerName: "Version", field: "version", tooltipField: "version" },
];

const Home = () => {
  const [openCsrModal, setOpenCsrModal] = useState(false);
  const toggleCsrModal = () => setOpenCsrModal((p) => !p);

  const user = getLocalStorageData("user");

  const { data: allCertificates } = useAllCertificates(user.id);
  const { data: expiredCertificates } = useExpiredCertificates(user.id);
  const { data: nearExpiryCertificates } = useNearExpiryCertificates(user.id);

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <h2 className="text-primary">Certificates</h2>
          <Button onClick={toggleCsrModal}>Create CSR</Button>
        </Card.Header>
        <Card.Body>
          <h3>All Certificates</h3>
          <CustomTable columns={columns} data={allCertificates} />
          <h3>Expired Certificates</h3>
          <CustomTable columns={columns} data={expiredCertificates} />
          <h3>Near Expiry Certificates</h3>
          <CustomTable columns={columns} data={nearExpiryCertificates} />
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
