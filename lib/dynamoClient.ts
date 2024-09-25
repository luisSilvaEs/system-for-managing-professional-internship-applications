
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Initialize the DynamoDB client
const dynamoClient = new DynamoDBClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
    }
});

console.log('SES_REGION:', process.env.SES_REGION);
console.log('SES_ACCESS_KEY_ID:', process.env.SES_ACCESS_KEY_ID);
console.log('SES_SECRET_ACCESS_KEY:', process.env.SES_SECRET_ACCESS_KEY);

export default dynamoClient;
