import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const getRequiredEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

function createAuth() {
  const client = new MongoClient(getRequiredEnv("MONGODB_URL"));
  const db = client.db();

  return betterAuth({
    baseURL: getRequiredEnv("BETTER_AUTH_URL"),
    secret: getRequiredEnv("BETTER_AUTH_SECRET"),
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
    },

    emailAndPassword: {
      enabled: true,
    },

    database: mongodbAdapter(db, { client }),
  });
}

let authInstance: ReturnType<typeof createAuth> | null = null;

export function getAuth(): ReturnType<typeof createAuth> {
  if (!authInstance) {
    authInstance = createAuth();
  }
  return authInstance;
}
