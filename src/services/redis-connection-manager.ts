import Redis from "ioredis";
import { RedisConfig } from "@src/config/redis-config";
import { logger } from "@src/utils/logging";

export class RedisConnectionManager {
  private redis: Redis;

  constructor(config: RedisConfig) {
    this.redis = new Redis({
      host: config.host,
      port: config.port,
      password: config.password,
    });

    this.initializerListener();
  }

  private initializerListener(): void {
    this.redis.on("connect", this.handleConnect);
    this.redis.on("error", this.handleError);
  }

  private handleConnect(): void {
    logger.info(`Connected to Redis`);
  }

  private handleError(err: Error): void {
    logger.error(`Redis connection error: ${err}`);
  }

  public getClient(): Redis {
    return this.redis;
  }
}
