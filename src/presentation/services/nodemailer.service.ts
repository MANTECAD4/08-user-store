import nodemailer, { Transporter } from "nodemailer";
import { EmailOptions } from "../../domain/services/email.service";

export interface NodemailerEnvOptions {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  mailerEmail: string;
}

export class NodemailerService {
  private emailFromInfo = "NanelMtzz <danielmt.002@gmail.com>";
  private transporter: Transporter;

  constructor(envs: NodemailerEnvOptions) {
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
