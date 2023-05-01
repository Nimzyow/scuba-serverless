import {
    DynamoDBClient,
    PutItemCommand,
    ConditionalCheckFailedException,
} from "@aws-sdk/client-dynamodb"
import { User } from "../entities"

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION })

export const createUser = async ({ user }: { user: User }) => {
    try {
        const command = new PutItemCommand({
            TableName: process.env.TABLE_NAME,
            Item: user.toItem(),
            ConditionExpression: "attribute_not_exists(PK)",
        })

        await dynamodb.send(command)

        return {
            user,
        }
    } catch (error) {
        console.log("Error creating user")
        console.log(error)
        let errorMessage = "Could not create user"

        if (error instanceof ConditionalCheckFailedException) {
            errorMessage = error.message
        }

        return {
            error: errorMessage,
        }
    }
}
