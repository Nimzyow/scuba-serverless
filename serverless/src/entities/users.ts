export class User {
    firstName: string
    lastName: string
    username: string
    email: string
    createdAt: Date
    updatedAt: Date

    constructor({
        firstName = "",
        lastName = "",
        username,
        email,
        createdAt = new Date(),
        updatedAt = new Date(),
    }: {
        firstName?: string
        lastName?: string
        username: string
        email?: string
        createdAt?: Date
        updatedAt?: Date
    }) {
        if (!username) {
            throw new Error("User requires a user name")
        }
        if (!email) {
            throw new Error("User requires an email")
        }
        this.firstName = firstName
        this.lastName = lastName
        this.username = username
        this.email = email
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    get key() {
        return {
            PK: { S: `USER#${this.username}` },
            SK: { S: `#USER#${this.username}` },
        }
    }

    get pk() {
        return {
            S: `USER#${this.username}`,
        }
    }

    toItem() {
        return {
            ...this.key,
            Type: { S: "User" },
            Email: { S: this.email },
            FirstName: { S: this.firstName },
            LastName: { S: this.lastName },
            Username: { S: this.username },
            CreatedAt: { S: this.createdAt.toISOString() },
            UpdatedAt: { S: this.updatedAt.toISOString() },
            GSI1PK: {
                S: `USER#${this.username}`,
            },
            GSI1SK: {
                S: `USER#${this.username}`,
            },
            GSI2PK: {
                S: `USER#${this.username}`,
            },
            GSI2SK: {
                S: `USER#${this.username}`,
            },
        }
    }
    userFromItem(item: UserItem) {
        if (!item) throw new Error("No item")
        return new User({
            email: item.Email.S,
            firstName: item.FirstName.S,
            lastName: item.LastName.S,
            username: item.Username.S,
            createdAt: new Date(item.CreatedAt.S),
            updatedAt: new Date(item.UpdatedAt.S),
        })
    }
}

export type UserItem = ReturnType<User["toItem"]>

export const userFromItem = (item: UserItem) => {
    return new User({
        email: item.Email.S,
        firstName: item.FirstName.S,
        lastName: item.LastName.S,
        username: item.Username.S,
        createdAt: new Date(item.CreatedAt.S),
        updatedAt: new Date(item.UpdatedAt.S),
    })
}
