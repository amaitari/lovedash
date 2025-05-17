export interface Config {
  apiUrl: string;
  isDev: boolean;
}

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL,
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  isDev: import.meta.env.DEV,
};

export default config;
