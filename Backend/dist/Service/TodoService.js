"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoService = void 0;
const DbConfig_1 = require("../Common/DbConfig");
const Todo_1 = require("../Model/Todo");
const typeorm_1 = require("typeorm");
class ToDoService {
    static async findOne(data) {
        return await DbConfig_1.DbConnection.getRepository(Todo_1.ToDo).findOne(data);
    }
    static async find(data) {
        return await DbConfig_1.DbConnection.getRepository(Todo_1.ToDo).find(data);
    }
    static async save(data) {
        return await DbConfig_1.DbConnection.getRepository(Todo_1.ToDo).save(data);
    }
    static async bulkSave(data) {
        return await DbConfig_1.DbConnection.getRepository(Todo_1.ToDo).save(data);
    }
    static async count(data) {
        return await DbConfig_1.DbConnection.getRepository(Todo_1.ToDo).count(data);
    }
    static async delete(data) {
        return await DbConfig_1.DbConnection.getRepository(Todo_1.ToDo).delete(data);
    }
    static async listByQueryBuilder(limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count = false, rawQuery = false) {
        const query = DbConfig_1.DbConnection.getRepository(Todo_1.ToDo).createQueryBuilder('ToDo');
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                }
                else if (joinTb.op === 'left-select') {
                    query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                }
                else {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                }
            });
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(item.name + ' = ' + item.value);
                }
                else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + item.value);
                }
                else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(' \'' + item.name + '\'' + ' ' + item.sign + ' \'' + item.value + '\'');
                }
                else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                }
                else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(item.name + ' = ' + item.value);
                }
                else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(item.name + ' IN (' + item.value + ')');
                }
            });
        }
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table) => {
                if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                    const namesArray = table.name;
                    namesArray.forEach((name, index) => {
                        query.andWhere(new typeorm_1.Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value, subIndex) => {
                                if (subIndex === 0) {
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    });
                }
                else if (table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new typeorm_1.Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name, index) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                        });
                    }));
                }
                else if (table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new typeorm_1.Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value, index) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                        });
                    }));
                }
            });
        }
        if (groupBy && groupBy.length > 0) {
            let i = 0;
            groupBy.forEach((item) => {
                if (i === 0) {
                    query.groupBy(item.name);
                }
                else {
                    query.addGroupBy(item.name);
                }
                i++;
            });
        }
        if (sort && sort.length > 0) {
            sort.forEach((item) => {
                query.orderBy('' + item.name + '', '' + item.order + '');
            });
        }
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        if (!count) {
            if (rawQuery) {
                return query.getRawMany();
            }
            return query.getMany();
        }
        else {
            return query.getCount();
        }
    }
}
exports.ToDoService = ToDoService;
//# sourceMappingURL=TodoService.js.map