import { app } from "./app";
import { RedisConfig } from "./config/redis-config";
import { RedisConnectionManager } from "./services/redis-connection-manager";
import { configDotenv } from "dotenv";
import Logging from "./utils/logging";
import Redis from "ioredis";

export let redisClient: Redis;

const startApplication = async () => {
    try {
        configDotenv();
        const port = process.env.PORT || 8000;
        const redisHost = process.env.REDIS_HOST;
        const redisPort = Number(process.env.REDIS_PORT);
        const redisPassword = process.env.REDIS_PASS;
        if(!redisHost || !redisPort || !redisPassword){
            throw new Error('Redis environment variables are not set properly.')
        }
        const redisConfig = new RedisConfig(redisHost, redisPort, redisPassword)
        const redisManager = new RedisConnectionManager(redisConfig);
        redisClient = redisManager.getClient()

        app.listen(port, () => {
            Logging.info(`Server listening at http://localhost:${port}`)
        })
    } catch (error) {
        Logging.error(`Something went wrong while starting the application: Error ${error}`)
        process.exit(1)
    }
}

startApplication()
