import { config as loadEnv } from "dotenv";
import { configDotenv } from "dotenv";
import path from "path";

configDotenv();
const environment = process.env.NODE_ENV || "development";

// Load environment-specific .env file
loadEnv({ path: path.resolve(__dirname, `../../.env.${environment}`) });

interface Config {
  port: number;
  env: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || "8000", 10),
  env: environment,
};

export default config;
