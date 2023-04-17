import { Col, Form, Row } from "react-bootstrap";

interface IFormFieldProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  isInvalid?: boolean;
  error?: string;
}

const CustomFormField = ({
  label,
  value,
  onChange,
  isInvalid,
  error,
  placeholder,
}: IFormFieldProps) => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Col>
        <Form.Control
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          isInvalid={isInvalid}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};
export default CustomFormField;
