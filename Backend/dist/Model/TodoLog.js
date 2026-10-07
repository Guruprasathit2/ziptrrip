"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoLog = void 0;
const typeorm_1 = require("typeorm");
let ToDoLog = class ToDoLog {
};
exports.ToDoLog = ToDoLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ToDoLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'todo_id', type: 'integer' }),
    __metadata("design:type", Number)
], ToDoLog.prototype, "todoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', type: 'varchar', length: 1000 }),
    __metadata("design:type", String)
], ToDoLog.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'varchar', length: 1000 }),
    __metadata("design:type", String)
], ToDoLog.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_completed', type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], ToDoLog.prototype, "isCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ToDoLog.prototype, "createdDate", void 0);
exports.ToDoLog = ToDoLog = __decorate([
    (0, typeorm_1.Entity)('tbl_todo_log')
], ToDoLog);
//# sourceMappingURL=TodoLog.js.map