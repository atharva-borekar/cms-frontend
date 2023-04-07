import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import "./signin.scss";

const SignIn = () => {
  return (
    <Container>
      <div className="signin">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label>Email</Form.Label>
            <Col sm="10">
              <Form.Control defaultValue="email@example.com" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label>Password</Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <Button>Sign In</Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignIn;
