import * as dynamoDbLib from "../../../libs/dynamodb-lib";
import { success, failure } from "../../../libs/response-lib";

export async function main(event) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.usersTableName,
    Item: {
      User_ID: event.requestContext.identity.cognitoIdentityId,
      Email: data.email,
      Onboard: false,
      First_Login: true,
      Display_Name: "NA",
    },
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.error(e);
    return failure({ status: false });
  }
}
