import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import "./signin.scss";
import { useSignUp } from "customHooks/auth.hooks";
import { useNavigate } from "react-router-dom";

const signInSchema = yup.object({
  name: yup.string().required("Name is required!").nonNullable(),
  username: yup.string().required("Username is required!").nonNullable(),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be atleast 6 characters!")
    .nonNullable(),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate: signUp } = useSignUp();
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      signUp(values, {
        onSuccess: () => navigate("/signin"),
      });
    },
    validationSchema: signInSchema,
  });

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="signin">
        <Card>
          <Card.Header className="d-flex justify-content-center">
            Sign Up
          </Card.Header>
          <Card.Body className="d-flex flex-column ">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label>Name</Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Name"
                  value={values.name}
                  onChange={(e) => setFieldValue("name", e.target.value)}
                  isInvalid={Boolean(errors.name)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label>Username</Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Username"
                  value={values.username}
                  onChange={(e) => setFieldValue("username", e.target.value)}
                  isInvalid={Boolean(errors.username)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label>Password</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  isInvalid={Boolean(errors.password)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Button onClick={() => handleSubmit()}>Sign Up</Button>
            <span>
              Already registered? <a href="/signin">Sign In</a>
            </span>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default SignUp;
