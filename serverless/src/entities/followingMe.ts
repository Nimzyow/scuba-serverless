export class FollowingMe {
    userFollowingMe: string
    me: string
    firstName: string
    lastName: string
    userName: string

    constructor({
        userFollowingMe,
        me,
        firstName,
        lastName,
        userName,
    }: {
        userFollowingMe: string
        me: string
        firstName: string
        lastName: string
        userName: string
    }) {
        if (!userFollowingMe) {
            throw new Error("FollowingMe requires a user following me")
        }
        if (!me) {
            throw new Error("FollowingMe requires a me")
        }
        this.userFollowingMe = userFollowingMe
        this.me = me
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
    }

    key() {
        return {
            PK: {
                S: `FOLLOWINGME#${this.me}`,
            },
            SK: {
                S: `FOLLOWINGME#${this.userFollowingMe}`,
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
            GSI2PK: {
                S: `USER#${this.me}`,
            },
            GSI2SK: {
                S: `FOLLOWING#${this.userFollowingMe}`,
            },
        }
    }
}
