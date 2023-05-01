import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { User } from "../entities"
import { createUser } from "../data"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const {
        email,
        firstName,
        lastName,
        username,
    }: { email: string; firstName: string; lastName: string; username: string } = JSON.parse(
        event.body as string
    )

    const userObj = new User({
        email,
        firstName,
        lastName,
        username,
    })

    const { user, error } = await createUser({ user: userObj })

    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ user })

    return {
        statusCode,
        body,
    }
}
