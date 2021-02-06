import ParseEmailTemplateInterface from './ParseEmailTemplateInterface';

export default interface MailTemplateServiceInterface {
  parse(data: ParseEmailTemplateInterface): Promise<string>;
}
