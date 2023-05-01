import { UserItem } from "../entities"
import { User, userFromItem } from "../entities/users"
import { GetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb"

const dynamodb = new DynamoDBClient({
    region: process.env.AWS_REGION,
})

export const getUser = async ({ user }: { user: User }) => {
    try {
        const command = new GetItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: user.key,
        })

        const response = await dynamodb.send(command)

        if (!response.Item) {
            return { error: "User not found" }
        }

        return { user: userFromItem(response.Item as UserItem) }
    } catch (error) {
        console.log("Error getting user")
        console.log(error)
        const errorMessage = "Error getting user"

        return { error: errorMessage }
    }
}
