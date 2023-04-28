import {
  useCreateCertificate,
  useGenerateCsr,
} from "customHooks/certificate.hooks";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import CustomFormField from "sharedComponents/formField";
import { getLocalStorageData } from "utils/loalStorageUtils";
import * as yup from "yup";

const csrSchema = yup.object({
  name: yup.string().required("Name is required!"),
  country: yup.string().required("Country is required!"),
  state: yup.string().required("State is required!"),
  email: yup.string().required("Email is required!"),
  common_name: yup.string().required("Common name is required!"),
  organization_unit: yup.string().required("Organization unit is required!"),
  organization_name: yup.string().required("Organization name is required!"),
  locality: yup.string().required("Locality is required!"),
});

interface ICSRFormProps {
  isCsr?: boolean;
}

const CSRForm = (props: ICSRFormProps) => {
  const { isCsr } = props;
  const { id: userId } = getLocalStorageData("user");
  const { mutate: createCertificate } = useCreateCertificate();
  const { mutate: generateCsr } = useGenerateCsr();
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      name: "New Cert",
      country: "IN",
      state: "Maharashtra",
      email: "cms@josh.com",
      common_name: "CMS",
      organization_unit: "POC",
      organization_name: "Josh Software Pvt. Ltd.",
      locality: "Pune",
    },
    onSubmit: (values) => {
      const certificatePayload = {
        certificate: values,
      };
      if (isCsr) generateCsr({ certificatePayload });
      else createCertificate({ userId, certificatePayload });
    },
    validationSchema: csrSchema,
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
        onChange={(e) => handleValueChange(e, "name")}
        isInvalid={Boolean(errors.name)}
        error={errors.name}
      />
      <CustomFormField
        label={"Country Name (2 letter code)"}
        placeholder="IN"
        value={values.country}
        onChange={(e) => handleValueChange(e, "country")}
        isInvalid={Boolean(errors.country)}
        error={errors.country}
      />
      <CustomFormField
        label={"State or Province Name (full name)"}
        placeholder="Maharashtra"
        value={values.state}
        onChange={(e) => handleValueChange(e, "state")}
        isInvalid={Boolean(errors.state)}
        error={errors.state}
      />
      <CustomFormField
        label={"Locality Name (eg, city)"}
        placeholder="Pune"
        value={values.locality}
        onChange={(e) => handleValueChange(e, "locality")}
        isInvalid={Boolean(errors.locality)}
        error={errors.locality}
      />
      <CustomFormField
        label={"Organization Name (eg, company)"}
        placeholder="Josh Software Pvt. Ltd."
        value={values.organization_name}
        onChange={(e) => handleValueChange(e, "organization_name")}
        isInvalid={Boolean(errors.organization_name)}
        error={errors.organization_name}
      />
      <CustomFormField
        label={"Organizational Unit Name (eg, section)"}
        placeholder="Unit Name"
        value={values.organization_unit}
        onChange={(e) => handleValueChange(e, "organization_unit")}
        isInvalid={Boolean(errors.organization_unit)}
        error={errors.organization_unit}
      />
      <CustomFormField
        label={"Common Name (e.g. server FQDN or YOUR name)"}
        placeholder="Project Name"
        value={values.common_name}
        onChange={(e) => handleValueChange(e, "common_name")}
        isInvalid={Boolean(errors.common_name)}
        error={errors.common_name}
      />
      <CustomFormField
        label={"Email Address"}
        placeholder="abc@xyz.com"
        value={values.email}
        onChange={(e) => handleValueChange(e, "email")}
        isInvalid={Boolean(errors.email)}
        error={errors.email}
      />
      <hr />
      <Button onClick={() => handleSubmit()}>
        Create {isCsr ? "CSR" : "Certificate"}
      </Button>
    </>
  );
};

export default CSRForm;
