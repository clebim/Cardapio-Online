import * as yup from 'yup';
import { errorMessages } from '../../../../Utils/ErrorMessages';

export const userSchemaValidator = yup.object().shape({
  // eslint-disable-next-line no-template-curly-in-string
  restaurant_name: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  email: yup
    .string()
    .email(errorMessages.email)
    .required(errorMessages.required),

  password: yup
    .string()
    .min(6, errorMessages.min)
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  confirmation_password: yup
    .string()
    .min(6, errorMessages.min)
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  city: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),
  phone: yup
    .string()
    .required(errorMessages.required)
    .length(14, errorMessages.length)
    .typeError(errorMessages.type),
  neighborhood: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  street: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  number: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  zip_code: yup
    .string()
    .required(errorMessages.required)
    .length(9, errorMessages.length)
    .typeError(errorMessages.type),
});
