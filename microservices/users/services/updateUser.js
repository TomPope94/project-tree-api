import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.usersTableName,
    Key: {
      User_ID: event.requestContext.identity.cognitoIdentityId,
    },
    UpdateExpression:
      "SET First_Login = :First_Login, Email = :email, Onboard = :onboard, Display_Name = :displayName",
    ExpressionAttributeValues: {
      ":displayName": data.displayName || null,
      ":firstLogin": data.firstLogin || null,
      ":email": data.email || null,
      ":onboard": data.onboard || null,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    console.error(e);
    return failure({ status: false });
  }
}
