import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import CustomFormField from "sharedComponents/formField";

const CSRForm = () => {
  //   const navigate = useNavigate();
  //   const { mutate: signIn } = useSignIn();
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      name: "",
      country: "",
      state: "",
      email: "",
      common_name: "",
      organization_unit: "",
      organization_name: "",
      locality: "",
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
        label={"Name"}
        placeholder="Certificate Name"
        value={values.name}
        onChange={(e) => handleValueChange(e, "country")}
      />
      <CustomFormField
        label={"Country Name (2 letter code)"}
        placeholder="IN"
        value={values.country}
        onChange={(e) => handleValueChange(e, "country")}
      />
      <CustomFormField
        label={"State or Province Name (full name)"}
        placeholder="Maharashtra"
        value={values.state}
        onChange={(e) => handleValueChange(e, "state")}
      />
      <CustomFormField
        label={"Locality Name (eg, city)"}
        placeholder="Pune"
        value={values.locality}
        onChange={(e) => handleValueChange(e, "locality")}
      />
      <CustomFormField
        label={"Organization Name (eg, company)"}
        placeholder="Josh Software Pvt. Ltd."
        value={values.organization_name}
        onChange={(e) => handleValueChange(e, "organization_name")}
      />
      <CustomFormField
        label={"Organizational Unit Name (eg, section)"}
        placeholder="Unit Name"
        value={values.organization_unit}
        onChange={(e) => handleValueChange(e, "organization_uni")}
      />
      <CustomFormField
        label={"Common Name (e.g. server FQDN or YOUR name)"}
        placeholder="Project Name"
        value={values.common_name}
        onChange={(e) => handleValueChange(e, "common_name")}
      />
      <CustomFormField
        label={"Email Address"}
        placeholder="abc@xyz.com"
        value={values.email}
        onChange={(e) => handleValueChange(e, "email")}
      />
      <hr />
      <Button onClick={() => handleSubmit()}>Create CSR</Button>
    </>
  );
};

export default CSRForm;
