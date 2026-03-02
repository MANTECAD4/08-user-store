export interface EmailOptions {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
}
export abstract class EmailService {
  abstract sendEmail: (options: EmailOptions) => Promise<any>;
}
