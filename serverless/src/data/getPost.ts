import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb"
import { Post, PostItem, postFromItem } from "../entities"

const dynamodb = new DynamoDBClient({
    region: process.env.AWS_REGION,
})

export const getPost = async ({ post }: { post: Post }) => {
    try {
        const command = new GetItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: post.key,
        })

        const response = await dynamodb.send(command)

        if (!response.Item) {
            return { error: "Post not found" }
        }

        return { post: postFromItem(response.Item as PostItem) }
    } catch (error) {
        console.log("Error getting post")
        console.log(error)
        const errorMessage = "Error getting post"

        return { error: errorMessage }
    }
}
