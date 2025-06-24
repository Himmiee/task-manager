import * as yup from "yup";

export const FormValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
});

export type FormDataType = yup.InferType<typeof FormValidationSchema>;
