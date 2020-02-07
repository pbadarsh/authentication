import { config } from "dotenv";
config();
import AWS from "aws-sdk";
import { MessageDTO } from "./message.dto";
const { accessKeyId, secretAccessKey, region } = process.env

export class SMSService {
    constructor () {

    }
    async sendSMS(data: MessageDTO) {
        try {
            AWS.config.update({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                region: null
            });
            const { message, mobileNumber } = data;
            const sns = new AWS.SNS({ apiVersion: "2010-03-31" });
            const params = {
                Message: message,
                MessageStructure: "string",
                PhoneNumber: mobileNumber
            };

            sns
                .setSMSAttributes({
                    attributes: {
                        DefaultSMSType: "Transactional"
                    }
                })
                .promise();
            return sns.publish(params).promise();
        } catch (error) {
            console.log("-------------------------------", error)
            return error;
        }
    }
}

