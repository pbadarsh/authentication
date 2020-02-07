import { config } from "dotenv";
config();
import AWS from "aws-sdk";
import { MessageDTO } from "./message.dto";
const { accessKeyId, secretAccessKey, region } = process.env;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
});

export class SMSService {
  async sendSMS(data: MessageDTO) {
    const { message, mobileNumber } = data;
    const sns = new AWS.SNS({ apiVersion: "2010-03-31" });
    const params = {
      Message: message,
      MessageStructure: "string",
      PhoneNumber: mobileNumber
    };

    await sns
      .setSMSAttributes({
        attributes: {
          DefaultSMSType: "Transactional"
        }
      })
      .promise();
    return await sns.publish(params).promise();
  }
}
