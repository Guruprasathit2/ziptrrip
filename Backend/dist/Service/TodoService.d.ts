import { ToDo } from '../Model/Todo';
import { FindOneOptions, FindManyOptions } from 'typeorm';
export declare class ToDoService {
    static findOne(data: FindOneOptions<ToDo>): Promise<ToDo | null>;
    static find(data: FindManyOptions<ToDo>): Promise<ToDo[]>;
    static save(data: ToDo): Promise<ToDo>;
    static bulkSave(data: ToDo[]): Promise<ToDo[]>;
    static count(data: FindManyOptions<ToDo>): Promise<number>;
    static delete(data: any): Promise<import("typeorm").DeleteResult>;
    static listByQueryBuilder(limit: number, offset: number, select?: any[], whereConditions?: any[], searchConditions?: any[], relations?: any[], groupBy?: any[], sort?: any[], count?: boolean | number, rawQuery?: boolean): Promise<ToDo[]>;
}
//# sourceMappingURL=TodoService.d.ts.map