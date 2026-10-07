import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_todo_log')
export class ToDoLog {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'todo_id', type: 'integer' })
    public todoId: number;

    @Column({ name: 'title', type: 'varchar', length: 1000 })
    public title: string;

    @Column({ name: 'description', type: 'varchar', length: 1000 })
    public description: string;

    @Column({ name: 'is_completed', type: 'integer', default: 0 })
    public isCompleted: number;

    @Column({ name: 'created_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdDate: Date;
}