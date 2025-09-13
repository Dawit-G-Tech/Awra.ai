import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; 
import * as schema from"@/db/schema"; 
import { polar, checkout, portal } from "@polar-sh/better-auth";
import { polarClient } from "./polar";
import { sendEmailAction } from "./send-email-action";

export const auth = betterAuth({
    trustedOrigins: [
        "http://localhost:3000", 
        "https://up-painfully-crayfish.ngrok-free.app" 
    ],

    plugins:[
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    authenticatedUsersOnly: true,
                    successUrl: "/upgrade",
                }),
                portal(),
            ],
        }),
    ],


    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url}) => {
            await sendEmailAction({
                to: user.email,
                subject: "Reset your password",
                meta: {
                    description: "Click the link below to reset your password.",
                    link: url,
                },
            });
        },
    },

    database: drizzleAdapter(db, {
        provider: "pg", 
        schema:{
            ...schema,
        },
    }),
});