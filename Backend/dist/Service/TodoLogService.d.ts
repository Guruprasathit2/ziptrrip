import { ToDoLog } from '../Model/TodoLog';
import { FindOneOptions, FindManyOptions } from 'typeorm';
export declare class ToDoLogService {
    static findOne(data: FindOneOptions<ToDoLog>): Promise<ToDoLog | null>;
    static find(data: FindManyOptions<ToDoLog>): Promise<ToDoLog[]>;
    static save(data: ToDoLog): Promise<ToDoLog>;
    static bulkSave(data: ToDoLog[]): Promise<ToDoLog[]>;
    static count(data: FindManyOptions<ToDoLog>): Promise<number>;
    static listByQueryBuilder(limit: number, offset: number, select?: any[], whereConditions?: any[], searchConditions?: any[], relations?: any[], groupBy?: any[], sort?: any[], count?: boolean | number, rawQuery?: boolean): Promise<ToDoLog[]>;
}
//# sourceMappingURL=TodoLogService.d.ts.map