export class Feed {
    userName: string
    postId: string
    post: string

    constructor({ userName, postId, post = "" }: { userName: string; postId: string; post: string }) {
        if (!userName) {
            throw new Error("Feed requires a user name")
        }
        if (!postId) {
            throw new Error("Feed requires a post id")
        }
        this.userName = userName
        this.postId = postId
        this.post = post
    }

    key() {
        return {
            PK: {
                S: `USER#${this.userName}`,
            },
            SK: {
                S: `#FEED#${this.postId}`,
            },
        }
    }

    toItem() {
        return {
            ...this.key(),
            Entity: {
                S: "Feed",
            },
            FeedId: {
                S: this.postId,
            },
            UserName: {
                S: this.userName,
            },
            Post: {
                S: this.post,
            },
        }
    }
}
