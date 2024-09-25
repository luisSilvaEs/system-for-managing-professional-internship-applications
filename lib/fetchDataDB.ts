import  { ScanCommand } from "@aws-sdk/client-dynamodb";
import dynamoClient from "./dynamoClient";

const fetchData = async () => {
  const params = {
    TableName: process.env.NEXT_PUBLIC_TABLE_NAME || '', // Replace with your table name
  };

  try {
    const data = await dynamoClient.send(new ScanCommand(params));
    return data.Items; // Returns the items from the DynamoDB table
  } catch (error) {
    console.error("Error fetching data from DynamoDB:", error);
    return [];
  }
};

export default fetchData;
