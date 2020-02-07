import { config } from "dotenv";
config();
import AWS from "aws-sdk";
import { EmailDTO } from "./mailer.dto";
const { accessKeyId, secretAccessKey, region } = process.env;
export class EmailService {
  constructor () {
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region
    });
  }
  async sendEmail(data: EmailDTO) {
    try {
      const { message, subject, to } = data;
      const ses = new AWS.SES({ apiVersion: "2010-12-01" });

      const params = {
        Destination: {
          ToAddresses: [to]
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: message
            }
            /* replace Html attribute with the following if you want to send plain text emails. 
                                    Text: {
                                        Charset: "UTF-8",
                                        Data: message
                                    }
                                 */
          },
          Subject: {
            Charset: "UTF-8",
            Data: subject
          }
        },
        ReturnPath: "parsh1@gmail.com", //from address
        Source: "parsh1@gmail.com" // from address
      };

      return ses.sendEmail(params).promise();
    } catch (error) {
      return error;
    }
  }
}
