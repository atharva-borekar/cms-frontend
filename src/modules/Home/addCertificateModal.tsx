import { useAddCertificate } from "customHooks/certificate.hooks";
import { HTMLInputTypeAttribute, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControlProps,
  FormGroup,
} from "react-bootstrap";
import { getLocalStorageData } from "utils/loalStorageUtils";

const AddCertificateModal = () => {
  const { id: userId } = getLocalStorageData("user");
  const { mutate: addCertificate } = useAddCertificate();

  const [certificate, setCertificate] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");

  const addCertificateClick = () => {
    const postAddCertificatePayload = {
      certificate,
    };
    addCertificate({
      userId,
      postAddCertificatePayload,
    });
  };

  const readFileContents = (e: any, isCert: boolean) => {
    const file = e.target?.files?.[0] as File;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const fileContents = reader.result?.toString() ?? "";
      if (isCert) setCertificate(fileContents);
      else setPrivateKey(fileContents);
    };
  };
  return (
    <>
      <Form.Group>
        <FloatingLabel label="SSL Certificate">
          <Form.Control
            style={{ height: 200 }}
            value={certificate}
            as="textarea"
            rows={10}
            placeholder="-----BEGIN CERTIFICATE-----\n\n-----END CERTIFICATE-----"
            onChange={(e) => setCertificate(e.target.value)}
          />
        </FloatingLabel>
        <Form.Label>Select SSL Certificate File</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => readFileContents(e, true)}
          accept=".pem"
        />
      </Form.Group>
      <br />
      <Form.Group className="my-3">
        <FloatingLabel label="Private Key">
          <Form.Control
            style={{ height: 200 }}
            value={privateKey}
            as="textarea"
            rows={10}
            placeholder="-----BEGIN CERTIFICATE-----"
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </FloatingLabel>
        <Form.Label>Select Private Key File</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => readFileContents(e, false)}
          accept=".pem"
        />
      </Form.Group>
      <hr />
      <Button onClick={addCertificateClick}>Add Certificate</Button>
    </>
  );
};

export default AddCertificateModal;
