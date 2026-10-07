"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function requiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}
exports.env = {
    database: {
        host: requiredEnv('DATABASE_HOST'),
        port: Number(requiredEnv('DATABASE_PORT')),
        username: requiredEnv('DATABASE_USERNAME'),
        password: requiredEnv('DATABASE_PASSWORD'),
        database: requiredEnv('DATABASE_NAME')
    },
    serverPort: Number(process.env.SERVER_PORT) || 8000
};
//# sourceMappingURL=env.js.map