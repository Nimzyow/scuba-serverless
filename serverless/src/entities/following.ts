export class Following {
    userToFollow: string
    me: string
    firstName: string
    lastName: string
    userName: string

    constructor({
        userToFollow,
        me,
        firstName,
        lastName,
        userName,
    }: {
        userToFollow: string
        me: string
        firstName: string
        lastName: string
        userName: string
    }) {
        if (!userToFollow) {
            throw new Error("Following requires a user to follow")
        }
        if (!me) {
            throw new Error("Following requires a me")
        }
        this.userToFollow = userToFollow
        this.me = me
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
    }

    key() {
        return {
            PK: {
                S: `FOLLOWING#${this.userToFollow}`,
            },
            SK: {
                S: `FOLLOWING#${this.me}`,
            },
        }
    }

    toItem() {
        return {
            ...this.key(),
            Entity: {
                S: "Following",
            },
            UserName: {
                S: this.userName,
            },
            FirstName: {
                S: this.firstName,
            },
            LastName: {
                S: this.lastName,
            },
            GSI1PK: {
                S: `USER#${this.me}`,
            },
            GSI1SK: {
                S: `FOLLOWING#${this.userToFollow}`,
            },
        }
    }
}
