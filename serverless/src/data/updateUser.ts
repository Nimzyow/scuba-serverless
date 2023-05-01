import {
    UpdateItemCommand,
    DynamoDBClient,
    ConditionalCheckFailedException,
} from "@aws-sdk/client-dynamodb"
import { User, userFromItem, UserItem } from "../entities"

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION })

export const updateUser = async ({ user }: { user: User }) => {
    try {
        const command = new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: user.key(),
            ConditionExpression: "attribute_exists(PK)",
            UpdateExpression:
                "SET #email = :email, #firstName = :firstName, #lastName = :lastName, #updatedAt = :updatedAt",
            ExpressionAttributeNames: {
                "#email": "Email",
                "#firstName": "FirstName",
                "#lastName": "LastName",
                "#updatedAt": "UpdatedAt",
            },
            ExpressionAttributeValues: {
                ":email": { S: user.email },
                ":firstName": { S: user.firstName },
                ":lastName": { S: user.lastName },
                ":updatedAt": { S: new Date().toISOString() },
            },
            ReturnValues: "ALL_NEW",
        })

        const response = await dynamodb.send(command)

        return {
            user: userFromItem(response.Attributes as UserItem),
        }
    } catch (error) {
        console.log("Error updating user")
        console.log(error)
        let errorMessage = "Could not update user"

        if (error instanceof ConditionalCheckFailedException) {
            errorMessage = "User does not exist."
        }

        return {
            error: errorMessage,
        }
    }
}
