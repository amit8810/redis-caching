export class RedisConfig {
    public readonly host: string;
    public readonly port: number;
    public readonly password: string;

    constructor(host: string, port: number, password: string){
        this.host = host;
        this.port = port;
        this.password = password;
    }
}