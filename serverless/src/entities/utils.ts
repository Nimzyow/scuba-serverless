import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
})

export const createStripeCustomer = async ({ email }: { email: string }) => {
    const params: Stripe.CustomerCreateParams = { email }
    const stripeCustomer: Stripe.Customer = await stripe.customers.create(params)
    return stripeCustomer
}

export const updateStripeCustomer = async ({
    id,
    email,
    fullName,
}: {
    id: string
    email: string
    fullName: string
}) => {
    const params: Stripe.CustomerUpdateParams = { email, name: fullName }
    const stripeCustomer: Stripe.Customer = await stripe.customers.update(id, params)
    return stripeCustomer
}

export const zeroPadNumber = (number: number) => {
    return ("0000" + number).slice(-4)
}

export enum PaymentPlanStatus {
    Draft = "DRAFT",
    Accepted = "ACCEPTED",
}

export enum PaymentPlanCategory {
    Shares = "SHARES",
    Vouchers = "VOUCHERS",
    Reservation = "RESERVATION",
}
