import { Column, Entity, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

@Entity('tbl_todo')
export class ToDo {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'title' })
    public title: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'is_completed' })
    public isCompleted: number;

    @Column({ name: 'created_date', type: 'timestamp' })
    public createdDate: Date;

    @Column({ name: 'modified_date', type: 'timestamp' })
    public modifiedDate: Date;

    @BeforeUpdate()
    public async updatedDetails() {
        this.modifiedDate = new Date();
    }
}