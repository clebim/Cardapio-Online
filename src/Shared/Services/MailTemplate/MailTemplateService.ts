import handlebars from 'handlebars';
import fs from 'fs';
import MailTemplateServiceInterface from './Interfaces/MailTemplateServiceInterface';
import ParseEmailTemplateInterface from './Interfaces/ParseEmailTemplateInterface';

export default class MailTemplateService
  implements MailTemplateServiceInterface {
  public async parse({
    file,
    variables,
  }: ParseEmailTemplateInterface): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
