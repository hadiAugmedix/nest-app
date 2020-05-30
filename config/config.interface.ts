export interface ConfigInterface {
    server: ServerConfigInterface;
    db: DbConfigInterface;
    jwt: JwtConfigInterface;
}

export interface ServerConfigInterface {
    port: number;
}

export interface DbConfigInterface {
    type: any;
    port: number;
    database: string;
    host: string;
    username: string;
    password: string;
    synchronize: boolean;
    logging: boolean;
}

export interface JwtConfigInterface {
    expiresIn: number;
    secret: string;
}
