import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import dynamoClient from "./dynamoClient";

const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoClient);

export const fetchData = async () => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME, // Replace with your table name
  };

  try {
    const data = await dynamoDbDocClient.send(new ScanCommand(params));
    return data.Items; // Returns the items from the DynamoDB table
  } catch (error) {
    console.error("Error fetching data from DynamoDB:", error);
    return [];
  }
};
