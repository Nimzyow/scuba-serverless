export const handler = ({ username }: { username: string }) => {
    const { user, error } = await getUserPosts({ username })

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World!" }),
    }
}
