import { PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { Post } from "../entities"

const dynamodb = new DynamoDBClient({
    region: process.env.AWS_REGION,
})

export const createPost = async ({ post }: { post: Post }) => {
    try {
        const command = new PutItemCommand({
            TableName: process.env.TABLE_NAME,
            Item: post.toItem(),
        })

        await dynamodb.send(command)

        return { post }
    } catch (error) {
        console.log("Error creating post")
        console.log(error)
        const errorMessage = "Error creating post"

        return { error: errorMessage }
    }
}
