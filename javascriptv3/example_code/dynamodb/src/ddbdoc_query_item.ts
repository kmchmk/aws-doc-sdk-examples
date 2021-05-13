/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html.

Purpose:
ddbdoc_update_query.js demonstrates how to use the Amazon DynamoDB document client to query items from an Amazon DynamoDB table.

Inputs (replace in code):
- TABLE_NAME
- REGION

Running the code:
ts-node ddbdoc_update_query.js
*/
// snippet-start:[dynamodb.JavaScript.docClient.queryV3]
const {
  DynamoDBDocumentClient,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const REGION = "eu-west-1";

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the clients.
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client, translateConfig);

// Set the parameters
const params = {
  TableName: "TABLE_NAME",
  /*
  Convert the JavaScript object defining the objects to the required
  Amazon DynamoDB record. The format of values specifies the datatype. The
  following list demonstrates different datatype formatting requirements:
  String: "String",
  NumAttribute: 1,
  BoolAttribute: true,
  ListAttribute: [1, "two", false],
  MapAttribute: { foo: "bar" },
  NullAttribute: null
   */
  ExpressionAttributeValues: {
    ":s": 1,
    ":e": 1,
    ":topic": "Title2"
  },
  // Specifies the values that define the range of the retrieved items. In this case, items in Season 2 before episode 9.
  KeyConditionExpression: "Season = :s and Episode > :e",
  // Filter that returns only episodes that meet previous criteria and have the subtitle 'The Return'
  FilterExpression: "contains (Subtitle, :topic)",
};

const run = async () => {
  try {
    const data = await ddbDocClient.send(new QueryCommand(params));
    console.log("Success. Item details: ", data.Items);
  } catch (err) {
    console.log("Error", err);
  }
};
run();
// snippet-end:[dynamodb.JavaScript.docClient.queryV3]
