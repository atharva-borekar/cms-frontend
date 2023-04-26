import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "react-bootstrap";
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

import { FaEye, FaDownload, FaFileSignature } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";

const Home = () => {
  const [viewCertificate, setViewCertificate] = useState<{
    certificate?: string;
    common_name?: string;
    country?: string;
    state?: string;
    locality?: string;
    email?: string;
    organization_unit?: string;
    organization_name?: string;

    issuer_common_name?: string;
    issuer_country?: string;
    issuer_state?: string;
    issuer_locality?: string;
    issuer_email?: string;
    issuer_organization_unit?: string;
    issuer_organization_name?: string;
  }>({});

  const [csrModalType, setCsrModalType] = useState("");

  const [openCsrModal, setOpenCsrModal] = useState(false);
  const toggleCsrModal = (certificateType: string) => {
    setOpenCsrModal((p) => {
      if (p) {
        setCsrModalType("");
      } else {
        setCsrModalType(certificateType);
      }
      return !p;
    });
  };

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
        headerName: "Type",
        field: "certificate_type",
        wrapText: true,
        autoHeight: true,
        cellRendererFramework: (val: any) => {
          return val?.data?.certificate_type?.toUpperCase();
        },
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
          return moment(val.data?.not_valid_before).format(
            "DD-MMM-YYYY (HH:MM) A"
          );
        },
      },
      {
        headerName: "Not Valid After",
        field: "not_valid_after",
        tooltipField: "not_valid_after",
        valueGetter: (val: any) => {
          return moment(val.data?.not_valid_after).format(
            "DD-MMM-YYYY (HH:MM) A"
          );
        },
      },
      {
        headerName: "Actions",
        minWidth: 300,
        cellRendererFramework: (val: any) => {
          return (
            <>
              <Button
                className="mx-3"
                size="sm"
                onClick={() => {
                  const userId = getLocalStorageData("user")?.id;
                  const certificateId = val.data?.id;
                  downloadCertificate({
                    userId,
                    certificateId,
                  });
                }}
                title="Download"
              >
                <FaDownload size={15} />
              </Button>
              <Button
                className="mx-3"
                size="sm"
                onClick={() => {
                  setViewCertificate(val.data);
                  toggleViewCertificateModal();
                }}
                title="View"
              >
                <FaEye size={15} />
              </Button>
              {moment(val.data.not_valid_after) < moment() ? (
                <Button
                  className="mx-3"
                  size="sm"
                  onClick={() => {
                    const userId = getLocalStorageData("user")?.id;
                    const certificateId = val.data?.id;
                    renewCertiticate({
                      userId,
                      certificateId,
                    });
                  }}
                  title="Renew"
                >
                  <BiRefresh size={20} />
                </Button>
              ) : (
                ""
              )}
              {val?.data?.certificate_type !== "certificate" ? (
                <Button
                  className="mx-3"
                  size="sm"
                  onClick={() => {
                    // const userId = getLocalStorageData("user")?.id;
                    // const certificateId = val.data?.id;
                    // renewCertiticate({
                    //   userId,
                    //   certificateId,
                    // });
                    window.alert(`Sign Certificate ${val?.data?.id}`);
                  }}
                  title="Sign CSR"
                >
                  <FaFileSignature size={20} />
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

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <h2 className="text-primary">Certificates</h2>
          <div>
            <Button className="mx-2" onClick={() => toggleCsrModal("csr")}>
              Generate CSR
            </Button>
            <Button className="mx-2" onClick={toggleAddCertificateModal}>
              Add Certificate
            </Button>
            <Button
              className="mx-2"
              onClick={() => toggleCsrModal("certificate")}
            >
              Create Certificate
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="w-100">
          <h3>All Certificates</h3>
          <CustomTable columns={columns} data={allCertificates} />
          <h3>Expired Certificates</h3>
          <CustomTable columns={columns} data={expiredCertificates} />
          <h3>Near Expiry Certificates</h3>
          <CustomTable columns={columns} data={nearExpiryCertificates} />
        </Card.Body>
      </Card>
      <Modal size="xl" show={openCsrModal} onHide={() => toggleCsrModal("")}>
        <ModalHeader>
          {csrModalType === "csr" ? "Generate CSR" : "Create Certificate"}{" "}
        </ModalHeader>
        <ModalBody>
          <CSRForm isCsr={csrModalType === "csr"} />
        </ModalBody>
      </Modal>
      <Modal
        size="xl"
        show={openAddCertificateModal}
        onHide={toggleAddCertificateModal}
      >
        <ModalHeader>Add Certificate</ModalHeader>
        <ModalBody>
          <AddCertificateModal />
        </ModalBody>
      </Modal>
      <Modal
        size="xl"
        show={openViewCertificateModal}
        onHide={toggleViewCertificateModal}
      >
        <ModalHeader>View Certificate</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Card>
                <Card.Header>Certificate</Card.Header>
                <Card.Body className="d-flex flex-column">
                  <Table
                    responsive
                    variant="dark"
                    striped
                    hover
                    bordered
                    cellPadding={5}
                  >
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewCertificate?.common_name && (
                        <tr>
                          <td>Common Name</td>
                          <td>{viewCertificate.common_name}</td>
                        </tr>
                      )}
                      {viewCertificate?.country && (
                        <tr>
                          <td>Country</td> <td>{viewCertificate.country}</td>
                        </tr>
                      )}
                      {viewCertificate?.state && (
                        <tr>
                          <td>State</td> <td>{viewCertificate.state}</td>
                        </tr>
                      )}
                      {viewCertificate?.locality && (
                        <tr>
                          <td>Locality</td> <td>{viewCertificate.locality}</td>
                        </tr>
                      )}
                      {viewCertificate?.email && (
                        <tr>
                          <td>Email</td> <td>{viewCertificate.email}</td>
                        </tr>
                      )}
                      {viewCertificate?.organization_unit && (
                        <tr>
                          <td>Organization Unit</td>
                          <td>{viewCertificate.organization_unit}</td>
                        </tr>
                      )}
                      {viewCertificate?.organization_name && (
                        <tr>
                          <td>Organization Name</td>
                          <td>{viewCertificate.organization_name}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Issuer</Card.Header>
                <Card.Body className="d-flex flex-column">
                  <Table
                    responsive
                    variant="dark"
                    striped
                    hover
                    bordered
                    cellPadding={5}
                  >
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewCertificate?.issuer_common_name && (
                        <tr>
                          <td>Common Name</td>
                          <td>{viewCertificate.issuer_common_name}</td>
                        </tr>
                      )}
                      {viewCertificate?.issuer_country && (
                        <tr>
                          <td>Country</td>{" "}
                          <td>{viewCertificate.issuer_country}</td>
                        </tr>
                      )}
                      {viewCertificate?.issuer_state && (
                        <tr>
                          <td>State</td> <td>{viewCertificate.issuer_state}</td>
                        </tr>
                      )}
                      {viewCertificate?.issuer_locality && (
                        <tr>
                          <td>Locality</td>
                          <td>{viewCertificate.issuer_locality}</td>
                        </tr>
                      )}
                      {viewCertificate?.issuer_email && (
                        <tr>
                          <td>Email</td> <td>{viewCertificate.issuer_email}</td>
                        </tr>
                      )}
                      {viewCertificate?.issuer_organization_unit && (
                        <tr>
                          <td>Organization Unit</td>
                          <td>{viewCertificate.issuer_organization_unit}</td>
                        </tr>
                      )}
                      {viewCertificate?.issuer_organization_name && (
                        <tr>
                          <td>Organization Name</td>
                          <td>{viewCertificate.issuer_organization_name}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />

          <Form.Control
            type="text"
            as="textarea"
            readOnly
            value={viewCertificate.certificate}
            rows={16}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Home;
