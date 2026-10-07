import dotenv from 'dotenv';

dotenv.config();

function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const env = {
    database: {
        host: requiredEnv('DATABASE_HOST'),
        port: Number(requiredEnv('DATABASE_PORT')),
        username: requiredEnv('DATABASE_USERNAME'),
        password: requiredEnv('DATABASE_PASSWORD'),
        database: requiredEnv('DATABASE_NAME')
    },

    serverPort: Number(process.env.SERVER_PORT) || 8000
};