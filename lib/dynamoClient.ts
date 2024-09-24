
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Initialize the DynamoDB client
const dynamoClient = new DynamoDBClient({
    region: process.env.SES_REGION,
    credentials: {
        accessKeyId: process.env.SES_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || '',
    }
});


export default dynamoClient;
