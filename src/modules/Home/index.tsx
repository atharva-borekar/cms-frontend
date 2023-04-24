import { Button, Card, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import "./home.scss";
import CustomTable from "sharedComponents/CustomTable";
import CSRForm from "modules/CSR";
import { useMemo, useState } from "react";
import { getLocalStorageData } from "utils/loalStorageUtils";
import {
  useAllCertificates,
  useDownloadCertificate,
  useExpiredCertificates,
  useNearExpiryCertificates,
  useRenewCertificate,
} from "customHooks/certificate.hooks";
import moment from "moment";
import AddCertificateModal from "./addCertificateModal";

const Home = () => {
  const [viewCertificate, setViewCertificate] = useState<{
    common_name?: string;
    country?: string;
    state?: string;
    locality?: string;
    email?: string;
    organization_unit?: string;
    organization_name?: string;
  }>({});

  const [openCsrModal, setOpenCsrModal] = useState(false);
  const toggleCsrModal = () => setOpenCsrModal((p) => !p);

  const [openAddCertificateModal, setOpenAddCertificateModal] = useState(false);
  const toggleAddCertificateModal = () => setOpenAddCertificateModal((p) => !p);

  const [openViewCertificateModal, setOpenViewCertificateModal] =
    useState(false);
  const toggleViewCertificateModal = () => {
    setOpenViewCertificateModal((p) => {
      if (p) {
        setViewCertificate({});
      }
      return !p;
    });
  };

  const { mutate: downloadCertificate } = useDownloadCertificate();
  const { mutate: renewCertiticate } = useRenewCertificate();

  const columns = useMemo(
    () => [
      {
        headerName: "Name",
        field: "common_name",
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: "Issuer",
        field: "issuer_common_name",
        tooltipField: "issuer",
      },
      {
        headerName: "Not Valid Before",
        field: "not_valid_before",
        tooltipField: "not_valid_before",
        valueGetter: (val: any) => {
          return moment(val.data.not_valid_before).format(
            "DD-MMM-YYYY (HH:MM) A"
          );
        },
      },
      {
        headerName: "Not Valid After",
        field: "not_valid_after",
        tooltipField: "not_valid_after",
        valueGetter: (val: any) => {
          return moment(val.data.not_valid_after).format(
            "DD-MMM-YYYY (HH:MM) A"
          );
        },
      },
      {
        headerName: "Actions",
        cellRendererFramework: (val: any) => {
          return (
            <>
              <Button
                className="mx-3"
                size="sm"
                onClick={() => {
                  const userId = getLocalStorageData("user").id;
                  const certificateId = val.data.id;
                  downloadCertificate({
                    userId,
                    certificateId,
                  });
                }}
              >
                D
              </Button>
              <Button
                className="mx-3"
                size="sm"
                onClick={() => {
                  setViewCertificate(val.data);
                  toggleViewCertificateModal();
                }}
              >
                View
              </Button>
              {moment(val.data.not_valid_after) < moment() ? (
                <Button
                  size="sm"
                  onClick={() => {
                    const userId = getLocalStorageData("user").id;
                    const certificateId = val.data.id;
                    renewCertiticate({
                      userId,
                      certificateId,
                    });
                  }}
                >
                  R
                </Button>
              ) : (
                ""
              )}
            </>
          );
        },
      },
    ],
    []
  );

  const user = getLocalStorageData("user");

  const { data: allCertificates } = useAllCertificates(user.id);
  const { data: expiredCertificates } = useExpiredCertificates(user.id);
  const { data: nearExpiryCertificates } = useNearExpiryCertificates(user.id);

  console.log({ viewCertificate });
  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <h2 className="text-primary">Certificates</h2>
          <div>
            <Button className="mx-3" onClick={toggleAddCertificateModal}>
              Add Certificate
            </Button>
            <Button onClick={toggleCsrModal}>Create CSR</Button>
          </div>
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
      <Modal
        size="lg"
        show={openAddCertificateModal}
        onHide={toggleAddCertificateModal}
      >
        <ModalHeader>Add Certificate</ModalHeader>
        <ModalBody>
          <AddCertificateModal />
        </ModalBody>
      </Modal>
      <Modal
        size="lg"
        show={openViewCertificateModal}
        onHide={toggleViewCertificateModal}
      >
        <ModalHeader>View Certificate</ModalHeader>
        <ModalBody>
          Certificate Details:
          <div className="d-flex flex-column">
            {viewCertificate?.common_name && (
              <span>Common Name: {viewCertificate.common_name}</span>
            )}
            {viewCertificate?.country && (
              <span>Country: {viewCertificate.country}</span>
            )}
            {viewCertificate?.state && (
              <span>State: {viewCertificate.state}</span>
            )}
            {viewCertificate?.locality && (
              <span>Locality: {viewCertificate.locality}</span>
            )}
            {viewCertificate?.email && (
              <span>Email: {viewCertificate.email}</span>
            )}
            {viewCertificate?.organization_unit && (
              <span>
                Organization Unit: {viewCertificate.organization_unit}
              </span>
            )}
            {viewCertificate?.organization_name && (
              <span>
                Organization Name: {viewCertificate.organization_name}
              </span>
            )}
          </div>
          <br />
          Issuer:
          <div className="d-flex flex-column">
            {viewCertificate?.common_name && (
              <span>Common Name: {viewCertificate.common_name}</span>
            )}
            {viewCertificate?.country && (
              <span>Country: {viewCertificate.country}</span>
            )}
            {viewCertificate?.state && (
              <span>State: {viewCertificate.state}</span>
            )}
            {viewCertificate?.locality && (
              <span>Locality: {viewCertificate.locality}</span>
            )}
            {viewCertificate?.email && (
              <span>Email: {viewCertificate.email}</span>
            )}
            {viewCertificate?.organization_unit && (
              <span>
                Organization Unit: {viewCertificate.organization_unit}
              </span>
            )}
            {viewCertificate?.organization_name && (
              <span>
                Organization Name: {viewCertificate.organization_name}
              </span>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Home;
