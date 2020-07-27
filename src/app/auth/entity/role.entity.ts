import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    ruid: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true
    })
    role: string;

    @CreateDateColumn({
        name: 'createdAt',
        nullable: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updatedAt',
        nullable: true
    })
    updatedAt: Date;
}
