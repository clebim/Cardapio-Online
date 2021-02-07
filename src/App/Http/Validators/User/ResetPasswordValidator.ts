/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { errorMessages } from '../../../../Utils/ErrorMessages';

export const ResetPasswordValidator = yup.object().shape({
  hash: yup
    .string()
    .length(6, errorMessages.length)
    .required(errorMessages.required)
    .typeError(errorMessages.type),
  old_password: yup
    .string()
    .min(6, errorMessages.min)
    .required(errorMessages.required)
    .typeError(errorMessages.type),
  password: yup
    .string()
    .min(6, errorMessages.min)
    .required(errorMessages.required)
    .typeError(errorMessages.type),
  confirmation_password: yup
    .string()
    .when('password', (password: string, field: any) =>
      password
        ? field.required(errorMessages.required).oneOf([yup.ref('password')])
        : field,
    )
    .typeError(errorMessages.type),
});
