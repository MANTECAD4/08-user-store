import nodemailer, { Transporter } from "nodemailer";

export interface EmailEnvOptions {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  mailerEmail: string;
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  token: string;
}

export class EmailService {
  private emailFromInfo = "NanelMtzz <danielmt.002@gmail.com>";
  private transporter: Transporter;

  constructor(envs: EmailEnvOptions) {
    const { clientId, clientSecret, refreshToken, mailerEmail } = envs;

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: mailerEmail,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
      },
    });
  }

  async sendEmail(options: EmailOptions) {
    const res = await this.transporter.sendMail({
      ...options,
      from: this.emailFromInfo,
    });
    return res;
  }
}
