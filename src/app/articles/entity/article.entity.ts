import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    Generated,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('article')
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    auid: string;

    @Column({
        type: 'varchar',
        length: 150
    })
    title: string;

    @Column({ type: 'text' })
    description: string;

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

    @ManyToOne(() => UserEntity, {
        cascade: true,
        onDelete: 'RESTRICT'
    })
    @JoinColumn({ name: 'createdBy' })
    createdBy: UserEntity;
}
