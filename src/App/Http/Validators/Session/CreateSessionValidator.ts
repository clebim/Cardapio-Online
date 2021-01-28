import * as yup from 'yup';
import { errorMessages } from '../../../../Utils/ErrorMessages';

export const sessionSchemaValidator = yup.object().shape({
  email: yup
    .string()
    .email(errorMessages.email)
    .required(errorMessages.required),

  password: yup
    .string()
    .min(6, errorMessages.min)
    .required(errorMessages.required)
    .typeError(errorMessages.type),
});
