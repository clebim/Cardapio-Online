import * as yup from 'yup';
import { errorMessages } from '../../../../Utils/ErrorMessages';

export const CreateMenuItemValidator = yup.object().shape({
  // eslint-disable-next-line no-template-curly-in-string
  menu_section_id: yup
    .number()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  item_name: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  price: yup
    .number()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  description: yup
    .string()
    .required(errorMessages.required)
    .typeError(errorMessages.type),

  observation: yup.string().nullable().typeError(errorMessages.type),
});
