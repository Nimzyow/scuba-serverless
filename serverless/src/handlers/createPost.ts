import { APIGatewayProxyEvent } from "aws-lambda"
import { Post } from "../entities"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { post, username }: { post: string; username: string } = JSON.parse(event.body as string)

    const postObj = new Post({
        post,
        username,
    })

    const { user, error } = await createPost({ post: postObj })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ user })

    return {
        statusCode,
        body,
    }
}
