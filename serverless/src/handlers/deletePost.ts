import { APIGatewayProxyEvent } from "aws-lambda"
import { getUser } from "../data/getUser"
import { Post, User } from "../entities"
import { getPost } from "../data/getPost"
import { deletePost } from "../data/deletePost"

export const handler = async (event: APIGatewayProxyEvent) => {
    const username = event.pathParameters?.username as string

    const user_obj = new User({
        username,
    })

    const { user } = await getUser({ user: user_obj })

    if (!user) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                error: "User not found",
            }),
        }
    }

    const post_obj = new Post({
        postId: "sdasd",
        username: "sdasd",
    })

    const { post } = await getPost({ post: post_obj })

    if (!post) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                error: "Post not found",
            }),
        }
    }

    if (post.username !== user.username) {
        return {
            statusCode: 403,
            body: JSON.stringify({
                error: "You are not authorized to delete this post",
            }),
        }
    }

    const { error } = await deletePost({ post })

    if (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error,
            }),
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            post,
        }),
    }
}
