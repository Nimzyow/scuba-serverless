import { QueryCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { User, postsFromItem } from "../entities"

const client = new DynamoDBClient({ region: process.env.AWS_REGION })

export const getUserPosts = async ({ user }: { user: User }) => {
    const command = new QueryCommand({
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: "#pk = :pk",
        ExpressionAttributeNames: {
            "#pk": "PK",
        },
        ExpressionAttributeValues: {
            ":pk": user.pk,
        },
        ScanIndexForward: false,
        Limit: 20,
    })
    try {
        const response = await client.send(command)

        if (!response.Items) {
            return {
                posts: [],
            }
        }

        return {
            posts: response.Items.map((item) => postsFromItem(item)),
        }
    } catch (error) {
        console.log("Error getting user posts")
        console.log(error)
        const errorMessage = "Error getting user posts"

        return { error: errorMessage }
    }
}
