import Redis from "ioredis";
import { RedisConfig } from "@src/config/redis/RedisConfig";
import { logger } from "@src/utils/logging";

export interface IRedisConnectionListener {
  onConnect(): void;
  onError(err: Error): void;
}

export class DefaultRedisConnectionListener implements IRedisConnectionListener {
  onConnect(): void {
    logger.info("Connected to Redis");
  }

  onError(err: Error): void {
    logger.error(`Redis connection error: ${err.message}`);
  }
}

export interface IRedisConnectionManager {
  getClient(): Redis;
}

export class RedisConnectionManager implements IRedisConnectionManager {
  private redis: Redis;

  constructor(config: RedisConfig, listener: IRedisConnectionListener) {
    this.redis = new Redis({
      host: config.host,
      port: config.port,
      password: config.password,
    });

    this.initializeListener(listener);
  }

  private initializeListener(listener: IRedisConnectionListener): void {
    this.redis.on("connect", () => listener.onConnect());
    this.redis.on("error", err => listener.onError(err));
  }

  public getClient(): Redis {
    return this.redis;
  }
}
