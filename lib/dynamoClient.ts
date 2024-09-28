
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Initialize the DynamoDB client
const dynamoClient = new DynamoDBClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
    }
});


export default dynamoClient;
