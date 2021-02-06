import ParseEmailTemplateInterface from 'Shared/Services/MailTemplate/Interfaces/ParseEmailTemplateInterface';

interface MailContactInterface {
  name: string;
  email: string;
}

export default interface SendMailInterface {
  to: MailContactInterface;
  from?: MailContactInterface;
  subject: string;
  templateData: ParseEmailTemplateInterface;
}
