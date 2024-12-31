import App from "./app";
import config from "./config/config";
import { logger } from "./utils/logging";

try {
  const app = new App();
  app.listen(config.port);
  logger.info(`Application started in ${config.env} mode.`);
} catch (error: unknown) {
  if (error instanceof Error) logger.error("Failed to start the application:", error);
  process.exit(1);
}
