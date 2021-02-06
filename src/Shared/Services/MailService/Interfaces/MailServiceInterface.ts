import SendMailInterface from './SendMailInterface';

export default interface MailServiceInterface {
  sendMail(data: SendMailInterface): Promise<void>;
}
