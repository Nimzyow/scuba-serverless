import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { User } from "../entities"
import { updateUser } from "../data"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userName = event.pathParameters?.userName as string
    const { firstName, lastName }: { email: string; firstName?: string; lastName?: string } = JSON.parse(
        event.body as string
    )

    const userObj = new User({
        username: userName,
        firstName,
        lastName,
    })

    const { user, error } = await updateUser({ user: userObj })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ user })

    return {
        statusCode,
        body,
    }
}
