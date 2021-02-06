/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Job } from 'bee-queue';
import path from 'path';
import { container } from 'tsyringe';
import MailService from '../../../../Shared/Services/MailService/MailService';
import MailServiceInterface from '../../../../Shared/Services/MailService/Interfaces/MailServiceInterface';
import { DataHandleInterface } from './Interfaces/ForgotPasswordDataInterface';
import ForgotPasswordMailJobInterface from './Interfaces/ForgotPasswordMailJobInterface';

class ForgotPasswordMailJob implements ForgotPasswordMailJobInterface {
  get key(): string {
    return 'ForgotPasswordMail';
  }

  async handle({ data }: Job<DataHandleInterface>): Promise<void> {
    const mailService = container.resolve<MailServiceInterface>(MailService);

    const { variables } = data;

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'Views',
      'ForgotPassword.hbs',
    );

    await mailService.sendMail({
      to: {
        name: variables.name,
        email: variables.email,
      },
      subject: '[MenuOnline] Recuperação de senha',

      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: variables.name,
          hash: variables.hash,
        },
      },
    });
  }
}

export default new ForgotPasswordMailJob();
