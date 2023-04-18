import { useAddCertificate } from "customHooks/certificate.hooks";
import { useState } from "react";
import { Button, FloatingLabel, FormControl, FormGroup } from "react-bootstrap";
import { getLocalStorageData } from "utils/loalStorageUtils";

const AddCertificateModal = () => {
  const { id: userId } = getLocalStorageData("user");
  const { mutate: addCertificate } = useAddCertificate();

  const [certificate, setCertificate] = useState("");
  const addCertificateClick = () => {
    const postAddCertificatePayload = {
      certificate,
    };
    addCertificate({
      userId,
      postAddCertificatePayload,
    });
  };
  return (
    <>
      <FormGroup>
        <FloatingLabel label="Certificate">
          <FormControl
            style={{ height: 200 }}
            value={certificate}
            as="textarea"
            rows={10}
            placeholder="-----BEGIN CERTIFICATE-----"
            onChange={(e) => setCertificate(e.target.value)}
          />
        </FloatingLabel>
      </FormGroup>
      <hr />
      <Button onClick={addCertificateClick}>Add Certificate</Button>
    </>
  );
};

export default AddCertificateModal;
