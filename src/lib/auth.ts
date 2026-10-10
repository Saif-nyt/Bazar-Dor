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

// On Vercel serverless, module scope resets between invocations but the
// lambda environment can be reused (warm). Caching on globalThis reuses the
// same MongoClient / auth instance across invocations and avoids the
// "MongoTopologyClosedError: Topology is closed" failure.
const globalForAuth = globalThis as unknown as {
  _mongoClient?: MongoClient;
  _auth?: ReturnType<typeof createAuth>;
};

function getMongoClient(): MongoClient {
  if (!globalForAuth._mongoClient) {
    globalForAuth._mongoClient = new MongoClient(getRequiredEnv("MONGODB_URL"), {
      maxPoolSize: 10,
      minPoolSize: 0,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  }
  return globalForAuth._mongoClient;
}

function createAuth() {
  const client = getMongoClient();
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

export function getAuth(): ReturnType<typeof createAuth> {
  if (!globalForAuth._auth) {
    globalForAuth._auth = createAuth();
  }
  return globalForAuth._auth;
}
