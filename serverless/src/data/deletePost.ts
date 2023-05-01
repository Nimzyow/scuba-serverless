import { Post } from "../entities/posts"
import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb"

const dynamoDbClient = new DynamoDBClient({
    region: process.env.REGION,
})

export const deletePost = async ({ post }: { post: Post }) => {
    const command = new DeleteItemCommand({
        TableName: process.env.POSTS_TABLE,
        Key: post.key,
    })

    await dynamoDbClient.send(command)

    try {
        return { post }
    } catch (error) {
        console.log("Error deleting post")
        console.log(error)
        return { error: "Error deleting post" }
    }
}
