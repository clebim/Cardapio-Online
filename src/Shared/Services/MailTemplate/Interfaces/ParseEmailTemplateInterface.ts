interface TemplateVariables {
  name: string;
  hash: string;
}

export default interface ParseEmailTemplateInterface {
  file: string;
  variables: TemplateVariables;
}
