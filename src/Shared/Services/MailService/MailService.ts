import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import { mailConfig } from '../../../Config/Mail';
import MailTemplateServiceInterface from '../MailTemplate/Interfaces/MailTemplateServiceInterface';
import MailServiceInterface from './Interfaces/MailServiceInterface';
import SendMailInterface from './Interfaces/SendMailInterface';

@injectable()
export default class MailService implements MailServiceInterface {
  private client: Transporter;

  constructor(
    @inject('MailTemplateService')
    private mailTemplateService: MailTemplateServiceInterface,
  ) {
    const transporter = nodemailer.createTransport(mailConfig);

    this.client = transporter;
  }

  public teste(): string {
    return 'chamou';
  }

  public async sendMail(data: SendMailInterface): Promise<void> {
    await this.client.sendMail({
      from: {
        name: data.from?.name || 'Equipe MenuOnline',
        address: data.from?.email || 'equipe@menuonline.com.br',
      },

      to: {
        name: data.to.name,
        address: data.to.email,
      },

      subject: data.subject,

      html: await this.mailTemplateService.parse(data.templateData),
    });
  }
}
