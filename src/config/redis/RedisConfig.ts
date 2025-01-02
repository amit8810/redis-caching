export interface IRedisConfig {
  host: string;
  port: number;
  password: string;
}

export class RedisConfig implements IRedisConfig {
  public readonly host: string;
  public readonly port: number;
  public readonly password: string;

  constructor(host: string, port: number, password: string) {
    this.host = host;
    this.port = port;
    this.password = password;
  }
}
