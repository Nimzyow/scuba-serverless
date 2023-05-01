import { AttributeValue } from "@aws-sdk/client-dynamodb"
import KSUID from "ksuid"

export class Post {
    postId: string
    username: string
    post: string
    createdAt: string
    updatedAt: string

    constructor({
        postId = KSUID.randomSync().string,
        username,
        post,
        createdAt = new Date().toISOString(),
        updatedAt = new Date().toISOString(),
    }: {
        postId?: string
        username: string
        post?: string
        createdAt?: string
        updatedAt?: string
    }) {
        if (!username) {
            throw new Error("Post requires a user name")
        }
        if (!post) {
            throw new Error("Post requires a post")
        }
        this.postId = postId
        this.username = username
        this.post = post
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    get key() {
        return {
            PK: {
                S: `USER#${this.username}`,
            },
            SK: {
                S: `#POST#${this.postId}`,
            },
        }
    }

    toItem() {
        return {
            ...this.key,
            PostId: { S: this.postId },
            Username: { S: this.username },
            Post: { S: this.post },
            Entity: { S: "Post" },
            CreatedAt: { S: this.createdAt },
            UpdatedAt: { S: this.updatedAt },
        }
    }
}

export type PostItem = ReturnType<Post["toItem"]>

export const postFromItem = (item: Record<string, AttributeValue>) => {
    if (!item) throw new Error("Must set an item")
    return new Post({
        postId: item.PostId.S as string,
        username: item.Username.S as string,
        post: item.Post.S as string,
        createdAt: new Date(item.CreatedAt.S as string).toISOString(),
        updatedAt: new Date(item.UpdatedAt.S as string).toISOString(),
    })
}
