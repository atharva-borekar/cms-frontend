// const signInSchema = yup.object({
//   username: yup.string().required("Username is required!").nonNullable(),
//   password: yup
//     .string()
//     .required("Password is required!")
//     .min(6, "Password must be atleast 6 characters!")
//     .nonNullable(),
// });

import { useFormik } from "formik";
import { Button, Card, Container } from "react-bootstrap";
import CustomFormField from "sharedComponents/formField";

const CSRForm = () => {
  //   const navigate = useNavigate();
  //   const { mutate: signIn } = useSignIn();
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      country: "",
      state: "",
    },
    onSubmit: (values) => {},
    // validationSchema: signInSchema,
  });

  const handleValueChange = (e: any, fieldName: string) => {
    setFieldValue(fieldName, e.target.value);
  };

  return (
    <>
      <CustomFormField
        label={"Country Name (2 letter code)"}
        placeholder="IN"
        value={values.country}
        onChange={(e) => handleValueChange(e, "country")}
      />
      <CustomFormField
        label={"State or Province Name (full name)"}
        placeholder="Maharashtra"
        value={values.country}
        onChange={(e) => handleValueChange(e, "country")}
      />
      <CustomFormField
        label={"Locality Name (eg, city)"}
        placeholder="Pune"
        value={values.country}
        onChange={(e) => handleValueChange(e, "country")}
      />
      <CustomFormField
        label={"Organization Name (eg, company)"}
        placeholder="Josh Software Pvt. Ltd."
        value={values.country}
        onChange={(e) => handleValueChange(e, "country")}
      />
      <CustomFormField
        label={"Organizational Unit Name (eg, section)"}
        placeholder="Unit Name"
        value={values.country}
        onChange={(e) => handleValueChange(e, "country")}
      />
      <CustomFormField
        label={"Common Name (e.g. server FQDN or YOUR name)"}
        placeholder="Project Name"
        value={values.country}
        onChange={(e) => handleValueChange(e, "country")}
      />
      <CustomFormField
        label={"Email Address"}
        placeholder="abc@xyz.com"
        value={values.country}
        onChange={(e) => handleValueChange(e, "country")}
      />
      <hr />
      <Button onClick={() => handleSubmit()}>Create CSR</Button>
    </>
  );
};

export default CSRForm;
