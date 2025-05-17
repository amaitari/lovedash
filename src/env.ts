import { z } from "zod";

const PUBLIC_ENV_PREFIX = "VITE_" as const;

const publicSchema = createEnvSchema("Public", {
  VITE_APP_NAME: z.string(),
  VITE_API_URL: z.string(),
});

const privateSchema = createEnvSchema("Private", {
  CALENDLY_USER: z.string(),
  CALENDLY_ORGANIZATION: z.string(),
  CALENDLY_TOKEN: z.string(),
});

const envSchema = z.object({
  ...publicSchema.shape,
  ...privateSchema.shape,
});

async function parseEnv() {
  const result = envSchema.safeParse(process.env);

  if (result.error) {
    console.log(result.error.message);

    throw new Error("Invalid environment variables");
  }

  const total = Object.keys(result.data).length;

  console.log(`Environment variables parsed successfully (${total} variables)`);

  return result.data;
}

function createEnvSchema<Shape extends z.ZodRawShape>(type: "Public" | "Private", shape: Shape) {
  for (const key in shape) {
    if (type === "Public" && !key.startsWith(PUBLIC_ENV_PREFIX)) {
      throw new Error(
        `Public environment variables must start with "${PUBLIC_ENV_PREFIX}", got "${key}"`
      );
    }

    if (type === "Private" && key.startsWith(PUBLIC_ENV_PREFIX)) {
      throw new Error(
        `Private environment variables must not start with "${PUBLIC_ENV_PREFIX}", got "${key}"`
      );
    }
  }

  return z.object(shape);
}

type ViteBuiltInEnv = {
  MODE: "development" | "production" | "test";
  DEV: boolean;
  SSR: boolean;
  PROD: boolean;
  BASE_URL: string;
};

type Env = z.infer<typeof envSchema>;
type PublicEnv = z.infer<typeof publicSchema>;
type PrivateEnv = z.infer<typeof privateSchema>;

declare global {
  interface ImportMetaEnv extends PublicEnv, ViteBuiltInEnv {}

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export { parseEnv, PUBLIC_ENV_PREFIX };
export type { Env, PublicEnv, PrivateEnv };
