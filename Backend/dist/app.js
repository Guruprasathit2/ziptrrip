"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const env_1 = require("./env");
const DbConfig_1 = require("./Common/DbConfig");
const route_1 = __importDefault(require("./Route/route"));
const port = env_1.env.serverPort || 9001;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
DbConfig_1.DbConnection.initialize().then(async () => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.log('Error: ', err);
});
app.use("/api", route_1.default);
app.listen(port, () => {
    console.log('Server running in', port, 'port.');
});
//# sourceMappingURL=app.js.map