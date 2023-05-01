export class SuggestedUser {
    userName: string
    firstName: string
    lastName: string

    constructor({
        userName,
        firstName,
        lastName,
    }: {
        userName: string
        firstName: string
        lastName: string
    }) {
        if (!userName) {
            throw new Error("Suggested user requires a user name")
        }
        this.userName = userName
        this.firstName = firstName
        this.lastName = lastName
    }

    key() {
        return {
            PK: {
                S: "SUGGESTEDUSER",
            },
            SK: {
                S: `USER#${this.userName}`,
            },
        }
    }

    toItem() {
        return {
            ...this.key(),
            Entity: {
                S: "SuggestedUser",
            },
            FirstName: {
                S: this.firstName,
            },
            LastName: {
                S: this.lastName,
            },
            UserName: {
                S: this.userName,
            },
        }
    }
}
