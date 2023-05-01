import { getUser } from "../data/getUser"
import { User } from "../entities/users"

export const handler = async ({ username }: { username: string }) => {
    const user_obj = new User({
        username,
    })

    const { user, error } = await getUser({ user: user_obj })
    const statusCode = error ? 500 : 200
    const body = error ? JSON.stringify({ error }) : JSON.stringify({ user })
    return {
        statusCode,
        body,
    }
}
