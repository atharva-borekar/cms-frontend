import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import "./signin.scss";
import { useSignIn } from "customHooks/auth.hooks";
import { useNavigate } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";

const signInSchema = yup.object({
  username: yup.string().required("Username is required!").nonNullable(),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be atleast 6 characters!")
    .nonNullable(),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { mutate: signIn } = useSignIn();
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      signIn(values, {
        onSuccess: () => navigate("/home"),
      });
    },
    validationSchema: signInSchema,
  });

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="signin">
        <Card>
          <Card.Header className="d-flex justify-content-center">
            Sign In
          </Card.Header>
          <Card.Body className="d-flex flex-column ">
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
            <Button className="signin-button" onClick={() => handleSubmit()}>
              Sign In
            </Button>
            <span>
              Not registered? <a href="/signup">Sign Up</a>
            </span>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default SignIn;
